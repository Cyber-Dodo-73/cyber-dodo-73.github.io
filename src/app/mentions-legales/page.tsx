import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales et politique de confidentialité du site Cyber-Dodo.",
  alternates: { canonical: "/mentions-legales/" },
  robots: { index: true, follow: true },
};

const sections = [
  { id: "editeur", title: "Éditeur du site" },
  { id: "hebergement", title: "Hébergement" },
  { id: "propriete", title: "Propriété intellectuelle" },
  { id: "donnees", title: "Données personnelles" },
  { id: "cookies", title: "Cookies et mesure d'audience" },
  { id: "credits", title: "Crédits" },
];

export default function LegalPage() {
  const n = (id: string) => String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

  return (
    <div className="wrap" style={{ paddingBlock: "clamp(56px, 7vw, 88px) clamp(72px, 9vw, 120px)" }}>
      <header style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 64 }}>
        <span className="kicker">[Légal]</span>
        <h1 className="display contact-title">Mentions légales</h1>
        <p className="mono" style={{ fontSize: 13, color: "var(--dim)" }}>Dernière mise à jour : {site.legalUpdated}</p>
      </header>

      <div className="legal">
        <nav className="legal-toc" aria-label="Sommaire">
          {sections.map((s, i) => (
            <a key={s.id} href={`#${s.id}`}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {s.title}
            </a>
          ))}
        </nav>

        <div>
          <section id="editeur">
            <h2><span>{n("editeur")}</span>Éditeur du site</h2>
            <p>
              Le site cyber-dodo.fr est édité par {site.owner}, {site.status}, exerçant sous le nom commercial Cyber-Dodo.
            </p>
            <p>
              Adresse : {site.address}
              <br />
              SIRET : {site.siret}
              <br />
              E-mail : <a href={`mailto:${site.email}`}>{site.email}</a>
              {site.phone && (
                <>
                  <br />
                  Téléphone : {site.phone}
                </>
              )}
            </p>
            <p>TVA non applicable, article 293 B du Code général des impôts.</p>
            <p>Directeur de la publication : {site.owner}.</p>
          </section>

          <section id="hebergement">
            <h2><span>{n("hebergement")}</span>Hébergement</h2>
            <p>
              Le site est hébergé par {site.host.name}, {site.host.address}. Contact : {site.host.contact}.
            </p>
          </section>

          <section id="propriete">
            <h2><span>{n("propriete")}</span>Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus de ce site (textes, logo, visuels, mise en page) est la propriété de Cyber-Dodo, sauf
              mention contraire. Toute reproduction, même partielle, est interdite sans accord écrit préalable.
            </p>
            <p>Les noms, marques et captures des projets présentés restent la propriété de leurs titulaires respectifs.</p>
          </section>

          <section id="donnees">
            <h2><span>{n("donnees")}</span>Données personnelles</h2>
            <p>
              Le formulaire de contact recueille votre nom, votre entreprise, votre e-mail, votre téléphone et votre message. Ces
              informations servent uniquement à répondre à votre demande et, si besoin, à vous établir un devis.
            </p>
            <p>
              Elles ne sont ni vendues, ni transmises à des tiers. Elles sont conservées {site.dataRetention}, puis supprimées.
            </p>
            <p>
              Conformément au RGPD, vous pouvez à tout moment demander l&apos;accès, la rectification ou la suppression de vos
              données, ou vous opposer à leur traitement, en écrivant à <a href={`mailto:${site.email}`}>{site.email}</a>. Vous
              pouvez aussi adresser une réclamation à la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener">cnil.fr</a>).
            </p>
          </section>

          <section id="cookies">
            <h2><span>{n("cookies")}</span>Cookies et mesure d&apos;audience</h2>
            <p>Ce site n&apos;utilise aucun cookie publicitaire, et les polices de caractères sont servies depuis le site lui-même.</p>
            <p>
              {site.analytics
                ? `La fréquentation est mesurée avec ${site.analytics}, de façon anonyme, sans cookie et sans collecte de données personnelles. C'est pour cette raison qu'aucun bandeau cookies ne s'affiche.`
                : "Aucune mesure d'audience n'est réalisée. C'est pour cette raison qu'aucun bandeau cookies ne s'affiche."}
            </p>
          </section>

          <section id="credits">
            <h2><span>{n("credits")}</span>Crédits</h2>
            <p>Conception, design et développement : Cyber-Dodo.</p>
            <p>Polices de caractères : Unbounded et Geist, sous licence libre SIL Open Font License.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
