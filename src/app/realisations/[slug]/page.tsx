import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectVisual } from "@/components/ProjectVisual";
import { ContactBandCompact } from "@/components/ContactBand";
import { Arrow } from "@/components/Arrow";
import { getProject, nextProject, projects } from "@/data/projects";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.tagline,
    alternates: { canonical: `/realisations/${p.slug}/` },
    openGraph: { title: `${p.name} · Cyber-Dodo`, description: p.tagline },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = nextProject(p.slug);
  const [cover, ...gallery] = p.images;

  return (
    <>
      <article className="wrap" style={{ paddingTop: "clamp(40px, 5vw, 56px)" }}>
        <Link href="/#realisations" className="crumb">
          ← Toutes les réalisations
        </Link>

        <header className="proj-hero">
          <div className="proj-hero-copy">
            <div className="tags">
              {p.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
              {p.status && <span className="status">{p.status}</span>}
            </div>
            <h1 className="display proj-title">{p.name}</h1>
            <p className="proj-tagline">{p.tagline}</p>
          </div>
          <dl className="proj-meta" style={{ margin: 0 }}>
            <div><dt>Type</dt><dd>{p.type}</dd></div>
            <div><dt>Mon rôle</dt><dd>{p.role}</dd></div>
            <div><dt>Technologies</dt><dd>{p.tech}</dd></div>
            <div>
              <dt>En ligne</dt>
              <dd>
                {p.link ? (
                  <a href={`https://${p.link}`} target="_blank" rel="noopener">{p.link} ↗</a>
                ) : (
                  <span style={{ color: "var(--muted-2)" }}>Pas encore public</span>
                )}
              </dd>
            </div>
          </dl>
        </header>

        <div className="proj-visual-lg">
          {cover ? <img src={cover.src} alt={cover.alt} /> : <ProjectVisual project={p} />}
        </div>

        <div className="story">
          <section className="story-row">
            <div><span className="kicker">[01]</span><h2>Le besoin</h2></div>
            <p>{p.need}</p>
          </section>
          <section className="story-row">
            <div><span className="kicker">[02]</span><h2>Ce que j&apos;ai fait</h2></div>
            <ul className="story-list">
              {p.done.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </section>
          {p.result && (
            <section className="story-row">
              <div><span className="kicker">[03]</span><h2>Le résultat</h2></div>
              <p>{p.result}</p>
            </section>
          )}
        </div>

        {gallery.length > 0 && (
          <div className="gallery">
            {gallery.map((img) => (
              <img key={img.src} src={img.src} alt={img.alt} loading="lazy" />
            ))}
          </div>
        )}

        <Link href={`/realisations/${next.slug}/`} className="next-project">
          <span>
            <span className="mono" style={{ fontSize: 14, color: "var(--muted-2)" }}>Réalisation suivante</span>
            <span className="display name">{next.name}</span>
          </span>
          <span className="round" aria-hidden="true">
            <Arrow size={32} color="var(--on-accent)" />
          </span>
        </Link>
      </article>
      <ContactBandCompact />
    </>
  );
}
