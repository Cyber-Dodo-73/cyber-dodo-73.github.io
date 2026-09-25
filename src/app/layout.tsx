import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/data/site";
import "./globals.css";

// Polices hébergées dans le dépôt (licence SIL OFL) : aucun appel à un service tiers côté visiteur.
const display = localFont({ src: "../fonts/unbounded.woff2", weight: "200 900", variable: "--font-display", display: "swap" });
const body = localFont({ src: "../fonts/geist.woff2", weight: "100 900", variable: "--font-body", display: "swap" });
const mono = localFont({ src: "../fonts/geist-mono.woff2", weight: "100 900", variable: "--font-mono", display: "swap" });

const description =
  "Développeur web indépendant à Chambéry. Sites internet, logiciels sur mesure, applis mobiles et automatisation pour les entreprises, commerces et associations.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Cyber-Dodo · Développeur web à Chambéry, Savoie",
    template: "%s · Cyber-Dodo",
  },
  description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Cyber-Dodo",
    title: "Cyber-Dodo · Des sites et des applis qui vous font gagner du temps",
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Cyber-Dodo, développeur web à Chambéry" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0B1A1E", colorScheme: "dark" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Cyber-Dodo",
  url: site.url,
  email: site.email,
  image: `${site.url}/og.png`,
  logo: `${site.url}/images/mark.png`,
  founder: { "@type": "Person", name: site.owner },
  address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.region, addressCountry: "FR" },
  areaServed: ["Chambéry", "Savoie", "France"],
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <Nav />
        <main id="contenu">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
