import type { Project } from "@/data/projects";

// Illustrations des projets, utilisées tant qu'il n'y a pas de vraies captures.

function Liasseo() {
  return (
    <div className="v-liasseo" aria-hidden="true">
      <div className="v-doc">
        <i className="t" style={{ width: "60%" }} />
        <i style={{ width: "40%" }} />
        <i className="h" style={{ marginTop: 12 }} />
        <i style={{ width: "90%" }} />
        <i style={{ width: "80%" }} />
        <i style={{ width: "85%" }} />
        <i className="h" style={{ width: "70%" }} />
        <i style={{ width: "90%" }} />
        <i style={{ width: "60%" }} />
      </div>
      <svg width="48" height="24" viewBox="0 0 48 24">
        <path d="M0 12H44M36 4L44 12L36 20" fill="none" stroke="var(--accent)" strokeWidth="2" />
      </svg>
      <div className="v-json">
        {"{\n  "}
        <span className="k">&quot;type&quot;</span>: <span className="s">&quot;attestation&quot;</span>
        {",\n  "}
        <span className="k">&quot;bail&quot;</span>: <span className="s">&quot;B-2041&quot;</span>
        {",\n  "}
        <span className="k">&quot;echeance&quot;</span>: <span className="s">&quot;31/12&quot;</span>
        {",\n  "}
        <span className="k">&quot;statut&quot;</span>: <span className="a">&quot;rapproché&quot;</span>
        {"\n}"}
      </div>
    </div>
  );
}

function Wallet() {
  const stamps = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0];
  const qr = [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1];
  return (
    <div className="v-phone" aria-hidden="true">
      <div className="v-pass">
        <div className="head">
          <span>CAFÉ DU COIN</span>
          <span>FIDÉLITÉ</span>
        </div>
        <div className="v-stamps">
          {stamps.map((s, i) => (
            <i key={i} className={s ? "on" : ""} />
          ))}
        </div>
        <div className="v-qr">
          {qr.map((s, i) => (
            <i key={i} className={s ? "on" : ""} />
          ))}
        </div>
      </div>
      <div className="slot" />
      <div className="slot" style={{ background: "#0f262c" }} />
    </div>
  );
}

function DodoTopia() {
  return (
    <div className="v-window" aria-hidden="true">
      <div className="title">
        <span>
          <img src="/images/mark.png" alt="" />
          DodoTopia
        </span>
        <span>— □ ×</span>
      </div>
      <div className="main">
        <div className="side">
          <b className="on">Musique</b>
          <b>Dessin</b>
          <b>Cuisine</b>
        </div>
        <div className="content">
          <i className="bar" />
          <i />
          <i style={{ background: "var(--line)" }} />
          <i />
          <i className="w2" />
          <i className="acc" />
        </div>
      </div>
    </div>
  );
}

export function ProjectVisual({ project }: { project: Project }) {
  if (project.visual === "liasseo") return <Liasseo />;
  if (project.visual === "wallet") return <Wallet />;
  return <DodoTopia />;
}
