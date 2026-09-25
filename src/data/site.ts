// Toutes les infos de l'entreprise au même endroit.
// Les valeurs marquées TODO doivent être complétées avant la mise en ligne.

export const site = {
  name: "Cyber-Dodo",
  url: "https://www.cyber-dodo.fr",
  owner: "Dorian Breuillard",
  status: "entrepreneur individuel (micro-entreprise)",
  siret: "925 110 132 00022",
  email: "contact@cyber-dodo.fr",
  phone: "", // TODO : numéro à afficher (laisser vide pour le masquer)
  address: "TODO : adresse professionnelle", // TODO
  city: "Chambéry",
  region: "Savoie",
  github: "https://github.com/Cyber-Dodo-73",
  linkedin: "https://fr.linkedin.com/in/dorian-breuillard/",
  legalUpdated: "25 septembre 2026",
  dataRetention: "3 ans après notre dernier échange", // TODO : à confirmer
  analytics: "", // TODO : ex. "Umami, auto-hébergé". Vide = pas de mesure d'audience.

  // Hébergeur du site, obligatoire dans les mentions légales.
  // GitHub Pages par défaut (dépôt cyber-dodo-73.github.io).
  // Si tu passes sur ton VPS (Dockerfile fourni), remplace par OuiHeberg.
  host: {
    name: "GitHub, Inc.",
    address: "88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis",
    contact: "https://support.github.com",
  },
};

export const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "";
