"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Arrow } from "./Arrow";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#realisations", label: "Réalisations" },
  { href: "/#methode", label: "Méthode" },
  { href: "/#a-propos", label: "À propos" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-nav">
      <div className="wrap nav-inner">
        <Link href="/" className="nav-logo" aria-label="Cyber-Dodo, accueil">
          <img className="mark" src="/images/mark.png" alt="" width={544} height={453} />
          <img className="word" src="/images/wordmark.png" alt="Cyber-Dodo" width={1118} height={106} />
        </Link>
        <nav className="nav-links" aria-label="Navigation principale">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact/" className="btn btn-primary btn-sm nav-cta">
          Demander un devis
          <Arrow />
        </Link>
        <button
          type="button"
          className="nav-burger"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true">
            {open ? (
              <path d="M3 1L15 11M15 1L3 11" stroke="currentColor" strokeWidth="1.6" />
            ) : (
              <path d="M0 2H18M0 10H18" stroke="currentColor" strokeWidth="1.6" />
            )}
          </svg>
        </button>
      </div>
      <nav id="menu-mobile" className={`nav-mobile${open ? " open" : ""}`} aria-label="Menu mobile">
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link href="/contact/" className="btn btn-primary" onClick={() => setOpen(false)}>
          Demander un devis
        </Link>
      </nav>
    </header>
  );
}
