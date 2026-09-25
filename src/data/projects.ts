export type ProjectImage = { src: string; alt: string };

export type Project = {
  slug: string;
  name: string;
  tags: string[];
  status?: string;
  summary: string; // phrase courte pour la carte de l'accueil
  tagline: string;
  type: string;
  role: string;
  tech: string;
  link?: string;
  need: string;
  done: string[];
  result?: string; // section masquée si vide
  images: ProjectImage[]; // captures dans /public/images/projets/<slug>/ ; vide = maquette illustrée
  visual: "liasseo" | "wallet" | "dodotopia";
};

export const projects: Project[] = [
  {
    slug: "liasseo",
    name: "Liasseo",
    tags: ["Outil métier", "IA"],
    status: "En développement",
    summary: "Lit automatiquement les documents reçus et les classe au bon endroit. Fini la saisie à la main.",
    tagline: "Une plateforme qui lit les documents reçus, les vérifie et les range au bon endroit. Fini la saisie à la main.",
    type: "Plateforme web",
    role: "Conception, développement, déploiement",
    tech: "Java, Spring Boot, React, PostgreSQL",
    need:
      "Certaines organisations reçoivent chaque jour des documents à traiter : attestations d'assurance, justificatifs, courriers. Il faut les lire, retrouver le bon dossier et recopier les informations. C'est long, répétitif, et une erreur de rattachement passe facilement inaperçue.",
    done: [
      "Collecte automatique des documents reçus",
      "Lecture des documents par IA et extraction des informations utiles",
      "Rapprochement avec les données existantes : client, logement, contrat",
      "Export propre des informations avec le document d'origine",
      "Connexion avec les comptes de l'entreprise, sans nouveau mot de passe",
      "Une installation par client : les données ne sortent pas de chez lui",
    ],
    // TODO : result (temps gagné, volume traité) une fois en production
    images: [],
    visual: "liasseo",
  },
  {
    slug: "dodotopia",
    name: "DodoTopia",
    tags: ["Logiciel", "Windows · Linux", "Serveur en ligne"],
    status: "Version 2.0",
    summary:
      "Une boîte à outils pour le jeu Heartopia : elle joue vos musiques, peint vos images et cuisine à votre place. Installeur, mises à jour automatiques et serveur en ligne compris.",
    tagline: "Une boîte à outils pour le jeu Heartopia : elle joue vos musiques, peint vos images et cuisine à votre place.",
    type: "Logiciel Windows et Linux, avec serveur en ligne",
    role: "Conception, développement, distribution, hébergement",
    tech: "Python, interface web intégrée, FastAPI, PostgreSQL",
    link: "dodotopia.cyber-dodo.fr",
    need:
      "Dans Heartopia, jouer un morceau à l'instrument, peindre un tableau case par case ou cuisiner des dizaines de plats, ça demande des heures de clics répétitifs. Les joueurs voulaient profiter du jeu, pas refaire mille fois les mêmes gestes.",
    done: [
      "Musique : on importe un fichier MIDI, on l'écoute, puis le logiciel le joue dans le jeu, sur 19 instruments",
      "Jeu à plusieurs : les joueurs se synchronisent en écoutant simplement le son du jeu",
      "Dessin : une image devient un tableau sur la palette du jeu, puis se peint toute seule",
      "Cuisine : la dernière recette est refaite en boucle, feu ajusté et plats récupérés",
      "Un installeur Windows, une version Linux et des mises à jour automatiques",
      "Un serveur en ligne pour le catalogue de morceaux partagé et la publication des versions",
    ],
    result: "Un logiciel distribué publiquement, qui se met à jour tout seul chez les joueurs.", // TODO : ajouter nombre de joueurs ou de téléchargements
    images: [],
    visual: "dodotopia",
  },
  {
    slug: "cartes-fidelite",
    name: "Cartes de fidélité Wallet",
    tags: ["Application web", "Mobile"],
    // TODO : status
    summary: "Les commerçants créent leur carte de fidélité, leurs clients la gardent dans leur téléphone.",
    tagline:
      "Les commerçants créent leur propre carte de fidélité. Leurs clients la gardent dans leur téléphone, à côté de leur carte bancaire.",
    type: "Plateforme en ligne",
    role: "Conception, développement, hébergement",
    tech: "Spring Boot, Next.js, PostgreSQL",
    need:
      "Les cartes de fidélité en carton se perdent et s'oublient au fond d'un portefeuille. Les applis dédiées, personne n'a envie de les télécharger. Résultat : le commerçant ne sait pas vraiment qui revient chez lui.",
    done: [
      "Une plateforme où chaque commerce crée et personnalise sa carte",
      "Des cartes qui s'ajoutent à Apple Wallet et Google Wallet, sans appli à installer",
      "Les tampons se mettent à jour directement dans le téléphone du client",
      "Plusieurs commerces sur la même plateforme, chacun avec son espace",
    ],
    // TODO : result
    images: [],
    visual: "wallet",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
