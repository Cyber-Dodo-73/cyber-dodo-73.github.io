"use client";

import { useState, type FormEvent } from "react";
import { contactEndpoint, site } from "@/data/site";

const TYPES = ["Site internet", "Logiciel sur mesure", "Appli mobile", "Automatisation", "Autre chose"];
// TODO : ajuster les tranches à tes tarifs
const BUDGETS = ["Moins de 3 000 €", "3 000 à 10 000 €", "Plus de 10 000 €", "Je ne sais pas encore"];

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message" | "consent", string>>;

export function ContactForm() {
  const [types, setTypes] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  const toggleType = (t: string) => setTypes((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      types,
      budget,
      consent: data.get("consent") === "on",
      website: String(data.get("website") ?? ""), // piège à robots
      page: typeof window !== "undefined" ? window.location.href : "",
    };

    const errs: Errors = {};
    if (!payload.name) errs.name = "Indiquez votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) errs.email = "Indiquez une adresse e-mail valide, par exemple vous@exemple.fr.";
    if (payload.message.length < 10) errs.message = "Décrivez votre projet en quelques mots.";
    if (!payload.consent) errs.consent = "Cochez la case pour que je puisse vous recontacter.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }
    if (payload.website) {
      setStatus("sent");
      return;
    }

    if (!contactEndpoint) {
      // Pas de webhook configuré : on ouvre la messagerie avec la demande pré-remplie.
      const lines = [`Nom : ${payload.name}`];
      if (payload.company) lines.push(`Entreprise : ${payload.company}`);
      if (payload.phone) lines.push(`Téléphone : ${payload.phone}`);
      if (types.length) lines.push(`Projet : ${types.join(", ")}`);
      if (budget) lines.push(`Budget : ${budget}`);
      lines.push("", payload.message);
      const body = lines.join("\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Demande de devis")}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
      setTypes([]);
      setBudget(null);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-sent" role="status">
        <img src="/images/mark.png" alt="" />
        <h2 className="display">Demande envoyée.</h2>
        <p>Merci. Je lis votre message et je reviens vers vous rapidement pour en parler.</p>
        <button type="button" className="btn btn-ghost" onClick={() => setStatus("idle")}>
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <div className="field">
          <label htmlFor="f-name">Nom *</label>
          <input id="f-name" name="name" className="input" autoComplete="name" placeholder="Votre nom"
            aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
          {errors.name && <span id="e-name" className="field-error">{errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor="f-company">Entreprise</label>
          <input id="f-company" name="company" className="input" autoComplete="organization" placeholder="Nom de votre structure" />
        </div>
        <div className="field">
          <label htmlFor="f-email">E-mail *</label>
          <input id="f-email" name="email" type="email" className="input" autoComplete="email" placeholder="vous@exemple.fr"
            aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined} />
          {errors.email && <span id="e-email" className="field-error">{errors.email}</span>}
        </div>
        <div className="field">
          <label htmlFor="f-phone">Téléphone</label>
          <input id="f-phone" name="phone" type="tel" className="input" autoComplete="tel" placeholder="06 00 00 00 00" />
        </div>
      </div>

      <fieldset className="field">
        <legend>Votre projet concerne</legend>
        <div className="chips">
          {TYPES.map((t) => (
            <button key={t} type="button" className="chip" aria-pressed={types.includes(t)} onClick={() => toggleType(t)}>
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="field">
        <legend>Budget envisagé</legend>
        <div className="chips">
          {BUDGETS.map((b) => (
            <button key={b} type="button" className="chip" aria-pressed={budget === b} onClick={() => setBudget(budget === b ? null : b)}>
              {b}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="f-message">Votre message *</label>
        <textarea id="f-message" name="message" className="input" rows={6}
          placeholder="Décrivez en quelques lignes ce que vous aimeriez faire, ou ce qui vous fait perdre du temps aujourd'hui."
          aria-invalid={!!errors.message} aria-describedby={errors.message ? "e-message" : undefined} />
        {errors.message && <span id="e-message" className="field-error">{errors.message}</span>}
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">Ne pas remplir</label>
        <input id="f-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field">
        <label className="consent" htmlFor="f-consent">
          <input id="f-consent" name="consent" type="checkbox" aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "e-consent" : undefined} />
          J&apos;accepte que mes informations soient utilisées pour être recontacté au sujet de ma demande. Elles ne sont jamais
          transmises à des tiers.
        </label>
        {errors.consent && <span id="e-consent" className="field-error">{errors.consent}</span>}
      </div>

      {status === "error" && (
        <p className="form-error" role="alert">
          La demande n&apos;est pas partie. Réessayez dans un instant, ou écrivez directement à{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}

      <button type="submit" className="btn btn-primary btn-lg" disabled={status === "sending"}>
        {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>
    </form>
  );
}
