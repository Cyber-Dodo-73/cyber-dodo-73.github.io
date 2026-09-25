import type { NextConfig } from "next";

// Site 100 % statique : `next build` produit le dossier `out/`,
// servi tel quel par GitHub Pages ou par le conteneur nginx (voir Dockerfile).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
