# cyber-dodo.fr

Site vitrine de Cyber-Dodo : Next.js en export statique, sans base de données ni serveur.
`npm run build` produit un dossier `out/` de fichiers HTML, CSS et JS, hébergeable n'importe où.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # génère out/
npm start          # sert out/ en local pour vérifier le rendu final
```

Node 22 recommandé.

## Où modifier quoi

| Quoi | Où |
|---|---|
| Coordonnées, SIRET, hébergeur, durée de conservation | `src/data/site.ts` |
| Réalisations (textes, statut, lien, captures) | `src/data/projects.ts` |
| Page d'accueil | `src/app/page.tsx` |
| Formulaire de devis (types de projet, budgets) | `src/app/contact/ContactForm.tsx` |
| Couleurs, typo, mise en page | `src/app/globals.css` (variables en haut du fichier) |
| Image de partage (réseaux sociaux) | `public/og.png` (1200 × 630) |
| Icônes du site | `src/app/icon.png`, `apple-icon.png`, `favicon.ico` |

## Ajouter des captures à une réalisation

1. Dépose les images dans `public/images/projets/<slug>/` (PNG ou JPG, 1600 × 1000 pour les écrans desktop).
2. Dans `src/data/projects.ts`, remplis `images` :
   ```ts
   images: [
     { src: "/images/projets/liasseo/principal.png", alt: "Un document et les informations extraites, côte à côte" },
     { src: "/images/projets/liasseo/liste.png", alt: "La liste des documents traités" },
   ],
   ```
   La première image remplace l'illustration en haut de la page, les suivantes forment la galerie.
   Tant que `images` est vide, l'illustration dessinée s'affiche.

## Avant la mise en ligne

Cherche `TODO` dans le code :

- `site.ts` : adresse professionnelle, téléphone (facultatif), durée de conservation, outil de stats.
- `site.ts` : hébergeur. Par défaut GitHub Pages. Si tu passes sur ton VPS, mets OuiHeberg.
- `projects.ts` : statut des Cartes de fidélité, phrases de résultat.
- `ContactForm.tsx` : tranches de budget.

## Formulaire de contact

Le formulaire envoie la demande en POST JSON à l'URL de `NEXT_PUBLIC_CONTACT_ENDPOINT`.
Sans cette variable, il ouvre la messagerie du visiteur avec la demande pré-remplie : ça marche, mais c'est moins pratique.

Avec n8n :

1. Nœud **Webhook** : méthode POST, réponse « Immediately ». Dans les options, **Allowed Origins (CORS)** = `https://www.cyber-dodo.fr`.
2. Nœud **IF** : ignorer si le champ `website` n'est pas vide (piège à robots).
3. Nœud **Send Email** (ou Gmail, Telegram...) avec les champs `name`, `company`, `email`, `phone`, `types`, `budget`, `message`.
4. Copie l'URL de production du webhook.

Champs reçus : `name`, `company`, `email`, `phone`, `message`, `types` (liste), `budget`, `consent`, `website`, `page`.

## Déployer sur GitHub Pages (dépôt cyber-dodo-73.github.io)

1. Remplace le contenu du dépôt par ce projet (l'ancien `index.html` et `assets/` ne servent plus).
2. Sur GitHub : *Settings › Pages › Build and deployment › Source* = **GitHub Actions**.
3. *Settings › Pages › Custom domain* = `www.cyber-dodo.fr`, et coche **Enforce HTTPS**.
4. *Settings › Secrets and variables › Actions › Variables* : crée `CONTACT_ENDPOINT` avec l'URL du webhook.
5. Chaque `git push` sur `main` reconstruit et publie le site (workflow `.github/workflows/deploy.yml`).

Le fichier `public/CNAME` garde le domaine personnalisé à chaque déploiement.

## Déployer sur ton VPS (alternative)

Si tu veux que le site soit lui aussi hébergé en France :

```bash
docker compose build --build-arg NEXT_PUBLIC_CONTACT_ENDPOINT=https://ton-n8n/webhook/xxx
docker compose up -d
```

`docker-compose.yml` contient des labels Traefik d'exemple (réseau `traefik`, entrée `websecure`) à adapter à ta config.
Pense à mettre à jour l'hébergeur dans `src/data/site.ts` et le DNS de `www.cyber-dodo.fr`.

## Choix techniques

- **Export statique** : rien à maintenir côté serveur, chargement rapide, aucun risque de faille applicative.
- **Polices auto-hébergées** (`src/fonts/`, licence SIL OFL) : aucun appel à Google Fonts, donc rien à déclarer côté RGPD.
- **Aucun cookie** : pas de bandeau à afficher.
- **Le dodo en points** (`src/components/DodoMatrix.tsx`) : canvas qui dessine les points du logo (`src/data/dodo-dots.json`), se met en pause hors écran et respecte le réglage « réduire les animations » du système.
- **SEO** : titres et descriptions par page, Open Graph, `sitemap.xml`, `robots.txt`, données structurées `ProfessionalService`.
