import Link from "next/link";
import { DodoMatrix } from "@/components/DodoMatrix";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Arrow } from "@/components/Arrow";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

const offer = ["Sites vitrines", "Applications web", "Outils métier", "Applis mobiles", "Automatisation", "Hébergement", "Maintenance", "Sur mesure"];

const steps = [
  { title: "On en parle", text: "Vous m'expliquez votre projet, autour d'un café ou en visio. Je vous envoie ensuite un devis clair, sans jargon." },
  { title: "Vous validez", text: "Je vous montre à quoi ça va ressembler avant de commencer. On ajuste ensemble jusqu'à ce que ça vous plaise." },
  { title: "Je construis", text: "Vous suivez l'avancée au fur et à mesure et vous pouvez tester avant la mise en ligne." },
  { title: "C'est en ligne", text: "Je vous montre comment tout fonctionne, et je reste joignable après. Vous n'êtes pas lâché dans la nature." },
];

const cardLayout = ["span-7", "span-5", "wide"];

export default function Home() {
  const ordered = [projects[0], projects[2], projects[1]]; // Liasseo, Wallet, DodoTopia

  return (
    <>
      {/* Hero */}
      <section className="hero dotgrid">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="hero-chip">
                <span className="dot" />
                Développeur web indépendant · {site.city}, {site.region}
              </span>
              <h1 className="display hero-title">
                Des sites et des applis qui vous font <span className="hl">gagner du temps.</span>
              </h1>
              <p className="hero-lead">
                Je crée des sites internet, des applications et des outils sur mesure pour les entreprises, les commerces et les
                associations. Vous m&apos;expliquez votre besoin, je m&apos;occupe du reste, jusqu&apos;à la mise en ligne.
              </p>
              <div className="hero-actions">
                <Link href="/contact/" className="btn btn-primary">
                  Demander un devis
                  <Arrow />
                </Link>
                <Link href="#realisations" className="btn btn-ghost">
                  Voir mes réalisations
                </Link>
              </div>
            </div>
            <div className="hero-matrix">
              <DodoMatrix />
              <div className="matrix-label top">
                <span>dodo.render()</span>
                <span>1 266 px</span>
              </div>
              <div className="matrix-label bottom">
                <span>
                  &gt; passez la souris<span className="caret">_</span>
                </span>
              </div>
            </div>
          </div>
          <div className="hero-trust">
            <span>Un seul interlocuteur</span>
            <span>Hébergement en France</span>
            <span>Basé à {site.city}</span>
          </div>
        </div>
      </section>

      {/* Bandeau */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...offer, ...offer].map((w, i) => (
            <span key={i} style={{ display: "contents" }}>
              <span className={i % 2 ? "outline" : ""}>{w}</span>
              <span className="star">✳</span>
            </span>
          ))}
        </div>
      </div>

      {/* Services */}
      <section id="services" className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="kicker">[01] Services</span>
              <h2 className="display h2">Ce que je peux faire pour vous.</h2>
            </div>
            <p className="section-intro">
              Pas besoin de parler technique. Dites-moi ce qui vous fait perdre du temps, je vous propose une solution simple.
            </p>
          </div>

          <div className="bento">
            <article className="card card-wide">
              <div className="card-text">
                <span className="card-kicker">Outils métier</span>
                <h3 className="h3">Logiciels sur mesure</h3>
                <p>
                  Vos fichiers Excel deviennent un vrai outil : suivi des clients, des commandes, des dossiers. Toute l&apos;équipe
                  travaille sur la même version, depuis n&apos;importe où.
                </p>
              </div>
              <div className="card-visual" aria-hidden="true">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="mock-label">Avant · clients_V3_final(2).xlsx</div>
                  <div className="mock-sheet">
                    <span className="th">Client</span><span className="th">Statut</span><span className="th">Relance</span>
                    <span>Dupont</span><span className="warn">??</span><span>12/03</span>
                    <span>Martin</span><span>en cours</span><span className="err">#REF!</span>
                    <span>Durand</span><span>OK ?</span><span />
                  </div>
                </div>
                <svg width="40" height="24" viewBox="0 0 40 24">
                  <path d="M0 12H36M28 4L36 12L28 20" fill="none" stroke="var(--accent)" strokeWidth="2" />
                </svg>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="mock-label" style={{ color: "var(--accent)" }}>Après · votre appli</div>
                  <div className="mock-app">
                    <div className="row"><span>Dupont</span><span className="badge badge-ok">Signé</span></div>
                    <div className="row"><span>Martin</span><span className="badge badge-warn">À relancer</span></div>
                    <div className="row"><span>Durand</span><span className="badge badge-line">Devis envoyé</span></div>
                  </div>
                </div>
              </div>
            </article>

            <article className="card">
              <span className="card-kicker">Visibilité</span>
              <h3 className="h3">Sites internet</h3>
              <p>Un site rapide et soigné, qui donne envie de vous contacter et qui est pensé pour être bien trouvé sur Google.</p>
              <div className="mock-browser" aria-hidden="true">
                <div className="bar"><i /><i /><i /></div>
                <div className="body">
                  <span className="b" style={{ gridColumn: "span 3", height: 14, width: "55%", background: "var(--line-2)" }} />
                  <span className="b" style={{ background: "var(--accent)", opacity: 0.85 }} />
                  <span className="b" />
                  <span className="b" />
                  <span className="b" style={{ gridColumn: "span 2", height: 64, background: "#16303a" }} />
                  <span className="b" style={{ height: 64, background: "#16303a" }} />
                </div>
              </div>
            </article>

            <article className="card">
              <span className="card-kicker">Tranquillité</span>
              <h3 className="h3">Hébergement &amp; suivi</h3>
              <p>Je mets tout en ligne sur des serveurs en France et je m&apos;occupe des mises à jour, des sauvegardes et de la sécurité.</p>
              <div className="mock-status" aria-hidden="true">
                <div className="live"><i />Votre site est en ligne</div>
                <div className="kv" style={{ paddingTop: 10, borderTop: "1px solid var(--line)" }}><span>Sauvegarde</span><b>cette nuit</b></div>
                <div className="kv"><span>Connexion sécurisée</span><b>active</b></div>
                <div className="kv"><span>Serveur</span><b>en France</b></div>
              </div>
            </article>

            <article className="card card-wide">
              <div className="card-text">
                <span className="card-kicker">Gain de temps</span>
                <h3 className="h3">Automatisation</h3>
                <p>Vos logiciels ne se parlent pas ? Je les relie entre eux pour en finir avec les ressaisies et les copier-coller.</p>
              </div>
              <div className="mock-flow" aria-hidden="true">
                <div className="node"><small>Entrée</small>Demande client</div>
                <svg width="26" height="16" viewBox="0 0 34 16"><path d="M0 8H30M24 3L30 8L24 13" fill="none" stroke="var(--accent)" strokeWidth="1.8" /></svg>
                <div className="node core"><small>Automatique</small>Votre appli</div>
                <svg width="26" height="16" viewBox="0 0 34 16"><path d="M0 8H30M24 3L30 8L24 13" fill="none" stroke="var(--accent)" strokeWidth="1.8" /></svg>
                <div className="outs">
                  <div className="node">Devis généré</div>
                  <div className="node">E-mail envoyé</div>
                  <div className="node">Facture prête</div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Réalisations */}
      <section id="realisations" className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="kicker">[02] Réalisations</span>
              <h2 className="display h2">Quelques réalisations.</h2>
            </div>
          </div>
          <div className="projects">
            {ordered.map((p, i) => (
              <Link key={p.slug} href={`/realisations/${p.slug}/`} className={`project-card ${cardLayout[i]}`}>
                <div className="project-visual">
                  <ProjectVisual project={p} />
                </div>
                <div className="project-info">
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>
                  <div className="tags" style={{ marginTop: 6 }}>
                    {p.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  {cardLayout[i] === "wide" && <span className="more">Voir le projet</span>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section id="methode" className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="kicker">[03] Méthode</span>
              <h2 className="display h2">Comment ça se passe&nbsp;?</h2>
            </div>
          </div>
          <ol className="steps" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {steps.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* À propos */}
      <section id="a-propos" className="section">
        <div className="wrap about">
          <img className="portrait" src="/images/portrait.jpg" alt={`Portrait de ${site.owner}`} width={1000} height={1250} />
          <div className="about-text">
            <span className="kicker">[04] À propos</span>
            <h2 className="display h2">Un interlocuteur, pas une agence.</h2>
            <p>
              Moi c&apos;est Dorian, développeur à Chambéry. Au quotidien, je conçois les logiciels d&apos;une grande structure
              savoyarde. Avec Cyber-Dodo, j&apos;accompagne les entreprises, les commerces et les associations qui veulent un outil
              qui leur ressemble, et quelqu&apos;un à appeler quand ils ont une question.
            </p>
            <div className="facts">
              <div><b>Un seul contact</b><span>Celui qui construit est celui qui répond.</span></div>
              <div><b>Local</b><span>Basé à Chambéry, on peut se voir.</span></div>
              <div><b>Données en France</b><span>Hébergement sur des serveurs français.</span></div>
              <div><b>Prix clairs</b><span>Un devis détaillé, sans surprise.</span></div>
            </div>
            <div className="about-links">
              <a href={site.github} target="_blank" rel="noopener">GitHub ↗</a>
              <a href={site.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <div id="contact" className="wrap cta-band">
        <div className="cta-box">
          <div>
            <span className="kicker">[05] Contact</span>
            <h2 className="display cta-title">
              Un projet&nbsp;?<br />
              Parlons-en.
            </h2>
            <a className="mail" href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div className="cta-side">
            <Link href="/contact/" className="btn btn-dark btn-lg">
              Demander un devis
              <Arrow color="var(--text)" />
            </Link>
            <span>{site.city}, {site.region} ou à distance</span>
          </div>
        </div>
      </div>
    </>
  );
}
