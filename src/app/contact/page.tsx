import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Demander un devis",
  description: "Parlez-moi de votre projet de site, d'application ou d'outil sur mesure. Réponse rapide, devis clair et sans engagement.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <div className="dotgrid contact-page">
      <div className="wrap contact-grid">
        <div className="contact-intro">
          <span className="kicker">[Contact]</span>
          <h1 className="display contact-title">Parlez-moi de votre projet.</h1>
          <p style={{ fontSize: 19, lineHeight: 1.6, color: "var(--muted)" }}>
            Quelques lignes suffisent. Même si l&apos;idée n&apos;est pas encore claire, c&apos;est justement le moment d&apos;en discuter.
          </p>
          <div className="contact-list">
            <div><span>E-mail</span><a href={`mailto:${site.email}`}>{site.email}</a></div>
            {site.phone && (
              <div><span>Téléphone</span><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></div>
            )}
            <div><span>Basé à</span><span>{site.city}, {site.region}</span></div>
          </div>
          <div>
            <p className="mono" style={{ fontSize: 13, color: "var(--dim)", marginBottom: 18 }}>Et après&nbsp;?</p>
            <ol className="next-steps">
              <li><span className="mono">01</span>Je lis votre message et je vous recontacte pour en parler.</li>
              <li><span className="mono">02</span>On fait le point ensemble, en visio ou autour d&apos;un café.</li>
              <li><span className="mono">03</span>Je vous envoie un devis clair, sans engagement.</li>
            </ol>
          </div>
        </div>
        <div className="form-card">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
