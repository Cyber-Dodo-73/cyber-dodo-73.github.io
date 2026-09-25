import Link from "next/link";
import { DodoMatrix } from "@/components/DodoMatrix";

export const metadata = { title: "Page introuvable" };

export default function NotFound() {
  return (
    <div className="notfound dotgrid">
      <div className="wrap">
        <div className="notfound-copy">
          <p className="big404" aria-hidden="true">404</p>
          <h1 className="display" style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05 }}>Ce dodo s&apos;est perdu.</h1>
          <p style={{ fontSize: 19, lineHeight: 1.6, color: "var(--muted)" }}>
            La page que vous cherchez n&apos;existe pas, ou plus. Pas de panique, on vous ramène en terrain connu.
          </p>
          <Link href="/" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
            Retour à l&apos;accueil
          </Link>
        </div>
        <div className="hero-matrix">
          <DodoMatrix />
        </div>
      </div>
    </div>
  );
}
