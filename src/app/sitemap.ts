import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, priority: 1 },
    { url: `${site.url}/contact/`, priority: 0.8 },
    ...projects.map((p) => ({ url: `${site.url}/realisations/${p.slug}/`, priority: 0.7 })),
    { url: `${site.url}/mentions-legales/`, priority: 0.2 },
  ];
}
