export interface Template {
  id: string
  name: string
  description: string
  thumbnail: string
}

export const templates: Template[] = [
  {
    id: "professional",
    name: "Professional",
    description: "A clean, professional template with a sidebar for skills and contact info.",
    thumbnail: "/templates/professional.svg",
  },
  {
    id: "modern",
    name: "Modern",
    description: "A contemporary design with a bold header and minimalist sections.",
    thumbnail: "/templates/modern.svg",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "A simple, straightforward layout that focuses on content.",
    thumbnail: "/templates/minimal.svg",
  },
  {
    id: "creative",
    name: "Creative",
    description: "A unique design that helps you stand out while remaining professional.",
    thumbnail: "/templates/creative.svg",
  },
  {
    id: "executive",
    name: "Executive",
    description: "An elegant template perfect for senior positions and leadership roles.",
    thumbnail: "/templates/executive.svg",
  },
] 