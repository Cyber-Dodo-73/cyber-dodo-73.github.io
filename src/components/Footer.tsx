import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <img className="footer-logo" src="/images/logo-footer.png" alt="Cyber-Dodo" width={1118} height={606} />
          <div className="footer-cols">
            <div>
              <span className="mono">Navigation</span>
              <Link href="/">Accueil</Link>
              <Link href="/#realisations">Réalisations</Link>
              <Link href="/contact/">Demander un devis</Link>
            </div>
            <div>
              <span className="mono">Contact</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <span>
                {site.city}, {site.region}
              </span>
            </div>
            <div>
              <span className="mono">Légal</span>
              <span>SIRET {site.siret}</span>
              <span>TVA non applicable, art. 293 B du CGI</span>
              <Link href="/mentions-legales/">Mentions légales</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Cyber-Dodo</span>
          <span>Fait main en Savoie</span>
        </div>
      </div>
    </footer>
  );
}
