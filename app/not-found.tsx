import { Button } from "@/components/ui/Button";

export default function NoEncontrada() {
  return (
    <div className="container-tm py-24 md:py-32">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 text-h1">Esta página no existe</h1>
      <p className="mt-4 max-w-xl text-lead text-tm-texto">Puede que el enlace sea antiguo. Las URLs del sitio anterior redirigen a su equivalente; si llegaste aquí, dinos desde dónde.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">Ir al inicio</Button>
        <Button href="/planificador" variante="contorno">
          Planificar operación
        </Button>
      </div>
    </div>
  );
}
