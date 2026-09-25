import Link from "next/link";
import { Arrow } from "./Arrow";

export function ContactBandCompact({ title = "Un projet dans le même genre ?" }: { title?: string }) {
  return (
    <div className="wrap cta-band">
      <div className="cta-box cta-compact">
        <h2 className="display">{title}</h2>
        <Link href="/contact/" className="btn btn-dark btn-lg">
          Demander un devis
          <Arrow color="var(--text)" />
        </Link>
      </div>
    </div>
  );
}
