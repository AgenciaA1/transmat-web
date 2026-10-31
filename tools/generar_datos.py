#!/usr/bin/env python3
"""Genera data/flota.ts, data/proyectos.ts y data/articulos-recientes.ts desde el inventario
exacto del sitio actual (repo transmat-web-5, docs/inventario/raw/*.json).

Una cifra, una fuente: nada de lo que escribe este script se inventa. La flota sale de la tabla
de /equipamiento/ (marca, modelo, tipo, capacidad y ficha PDF) más los datos técnicos del contexto
maestro (pluma y configuraciones de 9 grúas, Actros 3363, líneas modulares) en OVERRIDES.

Uso: python3 tools/generar_datos.py [--inventario ../Transmat_Web_5.0_Propuesta/docs/inventario/raw]
"""
import argparse
import json
import pathlib
import re
import unicodedata

RAIZ = pathlib.Path(__file__).resolve().parents[1]

CATEGORIAS = {
    'GRÚAS MÓVILES': 'gruas-moviles',
    'SEMIRREMOLQUES': 'semirremolques',
    'TRACTO-CAMIONES': 'tractocamiones',
    'CAMION PLUMA': 'camiones-pluma',
    'GRÚA HORQUILLA': 'gruas-horquilla',
}
TIPOS = {
    'Grúa Crawler': 'crawler',
    'GRÚA AT': 'todo-terreno',
    'GRÚA RT': 'rough-terrain',
    'SEMI-REMOLQUE (CAMA BAJA)': 'cama-baja',
    'SEMI-REMOLQUE (RAMPLA)': 'rampla',
    'TRACTO-CAMIÓN': 'tractocamion',
    'CAMIÓN PLUMA ARTICULADA': 'pluma-articulada',
    'GRÚA HORQUILLA': 'horquilla',
}
ENCABEZADOS = {'TIPO DE EQUIPO', 'DENOMINACIÓN', 'CAPACIDAD', 'FICHA TÉCNICA'}
MARCAS = [
    ('Terex Demag', r'terex\s*demag|demag'), ('Grove', r'grove|gmk|\brt\d|tms\d|grt\d'), ('Liebherr', r'liebherr|\bltm'),
    ('Terex', r'terex|\bac\s?\d|rt130|rt670'), ('XCMG', r'xcmg|\bxca|\bxct|\bqy\d|xcf\d'), ('Sany', r'sany|\bsac\d|\bsrc\d'),
    ('Zoomlion', r'zoomlion|\bzat|\bzrt|fd\s?100'), ('Tadano', r'tadano'), ('Link-Belt', r'link\s?belt|htc'),
    ('Hyster', r'hyster'), ('Randon', r'randon'), ('Tremac', r'tremac'), ('Goren', r'goren'), ('Gurlesenyl', r'gurlesenyl'),
    ('Titan Shandong', r'titan'), ('Cadafa', r'cadafa'), ('Doosung', r'doosung'), ('ERD', r'\berd\b'),
    ('Freightliner', r'freight\s?liner'), ('Volvo', r'volvo'), ('Mack', r'\bmack'), ('MAN', r'\bman\b'),
]

# Datos técnicos verificados del contexto maestro (CONTEXTO_TRANSMAT_AGENTE_COPY.md §3).
OVERRIDES = {
    'xca750sa': {'plumaM': 90, 'configuracion': 'SuperLift, Wind Power Jib, Luffing Jib y jib fijo', 'destacado': True},
    'xca600': {'plumaM': 90, 'configuracion': 'Pluma de 17 a 90 m en 7 secciones; SuperLift, Wind Power Jib y Luffing Jib; contrapeso combinado hasta 180 t; chasis 7 ejes', 'destacado': True},
    'xca500sa': {'plumaM': 85, 'configuracion': 'Pluma de 85 m, ampliable a 150 m con torre y plumines; monitoreo de presión en estabilizadores'},
    'xca500br': {'plumaM': 90, 'configuracion': 'SuperLift y jib fijo; con jib offset de 40° alcanzó 75 m de radio operativo', 'destacado': True},
    'grove-gmk7450': {'plumaM': 60, 'configuracion': '7 ejes, Twin-Lock, Megaform', 'destacado': True},
    'grove-gmk6300l': {'plumaM': 80, 'configuracion': '6 ejes, MEGATRAK, contrapeso de ~92,5 t con montaje hidráulico', 'destacado': True},
    'grove-gmk6300l-1': {'plumaM': 80, 'configuracion': '6 ejes, MEGATRAK, contrapeso de ~92,5 t con montaje hidráulico'},
    'liebherr-ltm1250': {'modelo': 'LTM 1250-5.1', 'configuracion': 'Usada en carga de componentes mineros'},
    'xca160l8': {'configuracion': 'Apoyo en operaciones combinadas'},
    'xct100': {'modelo': 'XCT100 (híbrida)', 'configuracion': 'Incorporada a la flota en 2025'},
}
# Equipos del contexto maestro que no están en la tabla de /equipamiento/.
EXTRA = [
    {'id': 'mercedes-benz-actros-3363', 'categoria': 'tractocamiones', 'subtipo': 'tractocamion', 'marca': 'Mercedes-Benz', 'modelo': 'Actros 3363',
     'capacidadT': None, 'plumaM': None, 'fichaPdf': None, 'configuracion': 'Dos unidades. Motor OM473 de 625 hp y 3.000 Nm, PowerShift 3; arrastre en configuraciones especiales sobre 250 t', 'destacado': True, 'unidades': 2},
    {'id': 'lineas-modulares', 'categoria': 'semirremolques', 'subtipo': 'linea-modular', 'marca': '', 'modelo': 'Líneas modulares',
     'capacidadT': None, 'plumaM': None, 'fichaPdf': None, 'configuracion': 'Más de 80 líneas: ejes múltiples, ruedas y dirección independientes por eje, acoplables en ancho y largo; cargas de más de 100 t', 'destacado': True, 'unidades': 80},
]
CLIENTES_PUBLICADOS = ['Codelco DRT', 'Codelco', 'ENAMI', 'Thiess', 'Techint', 'Altonorte', 'Cerro Dominador', 'AES Andes', 'EFE', 'Komatsu', 'Cimtec', 'DT Hi Load', 'Desarrollos Tecnológicos']
INDUSTRIA_KW = [
    ('ferroviaria', r'locomotora|ferrocarril|efe\b'), ('energia', r'transformador|eólic|aerogenerador|termosolar|cerro dominador|evaporador|parque'),
    ('puertos-y-logistica', r'puerto|angamos|ruta b-400|rescate'), ('construccion-y-montaje', r'puente|mesa de corte|cimtec|montaje de m[óo]dulos'),
    ('mineria', r'miner|codelco|enami|fundici|chancador|caex|komatsu|caterpillar|cat 7|thiess|tolva|chimenea|rotopala|altonorte|convertidor|techint|zanjadora|aljibe'),
]
EQUIPO_RE = re.compile(r'(XCMG\s*)?(XCA\s?\d{3}\w*|XCT\s?\d{3}\w*|GMK\s?\d{4}\w*(?:-1)?|LTM\s?\d{4}[-\.\d]*|Demag\s*CC\s?\d{4}|CC\s?\d{4}|Liebherr\s*T\s?264|Actros\s*3363|FH\s?540)', re.I)
# El tema se decide por el TÍTULO (los términos de WordPress traen "Transmat" en 56 posts y sesgan).
TEMA_KW = [
    ('equipos-y-tecnologia', r'gr[úu]a|xcmg|xca\d|xct\d|dron|moasure|cranebee|euro 6|l[íi]neas modulares|maquinaria|sany|zoomlion|tecnolog[íi]a y seguridad'),
    ('transmat', r'exponor|gesti[óo]n operacional|viaje al gigante|competitividad|la negra'),
    ('logistica-y-transporte', r'puerto|log[íi]stic|transporte|corredores|transmisi[óo]n el[ée]ctrica'),
    ('energia', r'energ|bess|solar|e[óo]lic|subestaci|hidr[óo]geno|geoterm|renovable|descarbonizaci|electromovilidad|di[ée]sel|soiling|almacenamiento|emisiones|neum[áa]ticos'),
    ('mineria', r'miner|cobre|codelco|litio|teniente|chuquicamata|sbap|agua|inversi[óo]n|empleo'),
]


def slug(s):
    s = unicodedata.normalize('NFD', s).encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')


def marca_de(denominacion, pdf):
    for nombre, patron in MARCAS:
        if re.search(patron, denominacion, re.I):
            return nombre
    for nombre, patron in MARCAS:
        if pdf and re.search(patron, pdf.rsplit('/', 1)[-1], re.I):
            return nombre
    return ''


def parsear_flota(texto):
    lineas = [l.strip() for l in texto.split('\n') if l.strip()]
    items, categoria, i = [], None, 0
    while i < len(lineas):
        l = lineas[i]
        if l in CATEGORIAS and (l != 'GRÚA HORQUILLA' or (i + 1 < len(lineas) and lineas[i + 1] == 'TIPO DE EQUIPO')):
            categoria = CATEGORIAS[l]; i += 1; continue
        if l in ENCABEZADOS or categoria is None:
            i += 1; continue
        if l in TIPOS:
            it = {'categoria': categoria, 'subtipo': TIPOS[l], 'denominacion': lineas[i + 1] if i + 1 < len(lineas) else '', 'capacidadT': None, 'fichaPdf': None}
            i += 2
            if i < len(lineas) and re.fullmatch(r'\d+(?:[.,]\d+)?', lineas[i]):
                it['capacidadT'] = float(lineas[i].replace(',', '.')); i += 1
            if i < len(lineas) and lineas[i].startswith('Ver ficha'):
                it['fichaPdf'] = lineas[i][len('Ver ficha'):].strip(); i += 1
            items.append(it); continue
        i += 1
    return items


def normalizar_equipo(it):
    den = re.sub(r'\s+', ' ', it['denominacion']).strip()
    marca = marca_de(den, it['fichaPdf'])
    modelo = den
    if marca and re.match(re.escape(marca), den, re.I):
        modelo = den[len(marca):].strip(' -')
    elif marca == 'Terex Demag' and re.match(r'terex\s*demag', den, re.I):
        modelo = re.sub(r'^terex\s*demag\s*', '', den, flags=re.I)
    if marca == 'Liebherr' and modelo.upper().startswith('LTM') and not modelo.startswith('LTM '):
        modelo = 'LTM ' + modelo[3:]
    ident = slug(den if not marca or den.lower().startswith(marca.lower()) else f'{marca} {den}')
    ident = ident.replace('zoomlion-zat2500v853', 'zoomlion-zat2500v').replace('zoomlion-zrt1300v532', 'zoomlion-zrt1300')
    eq = {'id': ident, 'categoria': it['categoria'], 'subtipo': it['subtipo'], 'marca': marca, 'modelo': modelo,
          'capacidadT': it['capacidadT'], 'plumaM': None, 'fichaPdf': it['fichaPdf'], 'configuracion': None, 'destacado': False, 'unidades': 1}
    for clave, extra in OVERRIDES.items():
        if ident == clave or ident.endswith(clave):
            eq.update(extra)
    return eq


def ts_val(v):
    if v is None:
        return 'null'
    if isinstance(v, bool):
        return 'true' if v else 'false'
    if isinstance(v, (int, float)):
        return json.dumps(v)
    if isinstance(v, list):
        return '[' + ', '.join(ts_val(x) for x in v) + ']'
    return json.dumps(v, ensure_ascii=False)


def ts_obj(d, campos):
    return '  { ' + ', '.join(f'{k}: {ts_val(d.get(k))}' for k in campos) + ' },'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--inventario', default=str(RAIZ.parent / 'Transmat_Web_5.0_Propuesta' / 'docs' / 'inventario' / 'raw'))
    args = ap.parse_args()
    raw = pathlib.Path(args.inventario)
    pages = json.load(open(raw / 'pages.json', encoding='utf-8'))
    posts = json.load(open(raw / 'posts.json', encoding='utf-8'))
    (RAIZ / 'data').mkdir(exist_ok=True)
    cab = '// GENERADO por tools/generar_datos.py desde el inventario de transmat.cl (30-oct-2026) y el contexto maestro.\n// No editar a mano: corregir la fuente u OVERRIDES en el script y volver a generar con `npm run datos`.\n'

    # ---- Flota ----
    equip = next(p for p in pages if p['link'].rstrip('/').endswith('/equipamiento'))
    flota = [normalizar_equipo(it) for it in parsear_flota(equip.get('texto_pagina', ''))] + EXTRA
    campos = ['id', 'categoria', 'subtipo', 'marca', 'modelo', 'capacidadT', 'plumaM', 'fichaPdf', 'configuracion', 'destacado', 'unidades']
    out = [cab, 'import type { Equipo } from "./tipos";', '', 'export const FLOTA: Equipo[] = [']
    out += [ts_obj(e, campos) for e in flota]
    out += ['];', '']
    (RAIZ / 'data' / 'flota.ts').write_text('\n'.join(out), encoding='utf-8')
    por_cat = {}
    for e in flota:
        por_cat.setdefault(e['categoria'], []).append(e)
    print('flota:', len(flota), {k: len(v) for k, v in por_cat.items()})

    # ---- Proyectos ----
    proyectos = []
    destacados = {'carga-componente-rotopala', 'traslado-de-transformadores-aes-andes', 'traslado-de-locomotora-hacia-estacion-central-efe-ferrocarriles'}
    for p in posts:
        if '/proyectos/' not in p['link']:
            continue
        texto = re.sub(r'\s+', ' ', (p.get('texto_pagina') or p.get('contenido_texto') or ''))
        texto = re.sub(r'► LEER MÁS|Leer más »?|Ver más', '', texto).strip()
        resumen = (p.get('extracto') or texto)[:320].rsplit(' ', 1)[0].rstrip('.,;:') + ('…' if len(texto) > 320 else '')
        blob = f"{p['titulo']} {texto} {' '.join(p['terminos'])}"
        industria = next((ind for ind, kw in INDUSTRIA_KW if re.search(kw, blob, re.I)), 'mineria')
        equipos = sorted({re.sub(r'\s+', ' ', m.group(0)).strip() for m in EQUIPO_RE.finditer(blob)})
        cliente = next((c for c in CLIENTES_PUBLICADOS if re.search(re.escape(c), blob, re.I)), None)
        s = p['link'].rstrip('/').rsplit('/', 1)[-1]
        proyectos.append({'slug': s, 'titulo': p['titulo'], 'fecha': p['fecha'], 'resumen': resumen, 'industria': industria, 'equipos': equipos,
                          'cliente': cliente, 'imagen': p.get('imagen_destacada') or None, 'urlActual': p['link'], 'destacado': s in destacados})
    proyectos.sort(key=lambda x: x['fecha'], reverse=True)
    campos = ['slug', 'titulo', 'fecha', 'resumen', 'industria', 'equipos', 'cliente', 'imagen', 'urlActual', 'destacado']
    out = [cab, 'import type { Proyecto } from "./tipos";', '', 'export const PROYECTOS: Proyecto[] = [']
    out += [ts_obj(p, campos) for p in proyectos]
    out += ['];', '']
    (RAIZ / 'data' / 'proyectos.ts').write_text('\n'.join(out), encoding='utf-8')
    print('proyectos:', len(proyectos), 'destacados:', sum(p['destacado'] for p in proyectos))

    # ---- Artículos recientes ----
    arts = []
    for p in posts:
        if '/articulos/' not in p['link'] and '/noticia/' not in p['link']:
            continue
        tema = next((t for t, kw in TEMA_KW if re.search(kw, p['titulo'], re.I)), 'transmat')
        ruta = p['link'].replace('https://transmat.cl', '').replace('/noticia/', '/noticias/')
        arts.append({'titulo': p['titulo'], 'ruta': ruta, 'urlActual': p['link'], 'fecha': p['fecha'], 'tema': tema, 'imagen': p.get('imagen_destacada') or None,
                     'descripcion': (p['seo'].get('description') or p.get('extracto') or '')[:200]})
    arts.sort(key=lambda x: x['fecha'], reverse=True)
    campos = ['titulo', 'ruta', 'urlActual', 'fecha', 'tema', 'imagen', 'descripcion']
    out = [cab, 'import type { ArticuloResumen } from "./tipos";', '', f'/** Los {len(arts)} artículos y noticias publicados hoy; la migración completa a MDX es de la fase 3. */', 'export const ARTICULOS: ArticuloResumen[] = [']
    out += [ts_obj(a, campos) for a in arts]
    out += ['];', '']
    (RAIZ / 'data' / 'articulos-recientes.ts').write_text('\n'.join(out), encoding='utf-8')
    print('artículos:', len(arts), 'temas:', {t: sum(1 for a in arts if a['tema'] == t) for t, _ in TEMA_KW})


if __name__ == '__main__':
    main()
