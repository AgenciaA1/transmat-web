import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { TrackClicks } from "@/components/analitica/TrackClicks";
import { INDEXABLE, SITE } from "@/lib/constants";
import { jsonLd, organizationSchema, websiteSchema } from "@/lib/schema";

/** Tipografía de marca: Roboto (títulos en mayúsculas, 900) y Roboto Mono para datos. */
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700", "900"], display: "swap", variable: "--font-tm-sans" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--font-tm-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Transmat | Izajes y transportes de alta complejidad", template: "%s | Transmat" },
  description: SITE.description,
  applicationName: SITE.nombre,
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  formatDetection: { telephone: false },
  robots: INDEXABLE ? undefined : { index: false, follow: false },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CL" className={`${roboto.variable} ${robotoMono.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([organizationSchema(), websiteSchema()])} />
      </head>
      <body className="min-h-screen bg-tm-negro antialiased">
        {SITE.gtmId && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${SITE.gtmId}');`}
          </Script>
        )}
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:font-bold focus:text-tm-negro">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" className="pt-(--header-height)">
          {children}
        </main>
        <Footer />
        <MobileBar />
        <TrackClicks />
      </body>
    </html>
  );
}
