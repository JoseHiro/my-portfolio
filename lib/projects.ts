export type ProjectStyle = "editorial" | "split" | "wip";

export interface Feature {
  title: string;
  desc: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  description: string;
  style: ProjectStyle;
  wip?: boolean;
  images: string[]; // local paths — empty slots render as gray boxes
  features: Feature[];
}

export const PROJECTS: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    subtitle: "A brief tagline for the project",
    year: "2024",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    description:
      "Add your project description here. Explain what it does, the problem it solves, and who it's for.",
    style: "editorial",
    images: [],
    features: [
      { title: "Feature One", desc: "Describe what this feature does and why it matters to users." },
      { title: "Feature Two", desc: "Describe what this feature does and why it matters to users." },
      { title: "Feature Three", desc: "Describe what this feature does and why it matters to users." },
    ],
  },
  {
    slug: "project-two",
    title: "Project Two",
    subtitle: "Another project tagline",
    year: "2024",
    tags: ["React", "Node.js", "PostgreSQL"],
    description:
      "Add your project description here. Explain what it does, the problem it solves, and who it's for.",
    style: "split",
    images: [],
    features: [
      { title: "Feature One", desc: "Describe what this feature does and why it matters to users." },
      { title: "Feature Two", desc: "Describe what this feature does and why it matters to users." },
      { title: "Feature Three", desc: "Describe what this feature does and why it matters to users." },
    ],
  },
  {
    slug: "current",
    title: "Currently Building",
    subtitle: "Work in progress — check back soon",
    year: "2025",
    tags: ["TBD"],
    description:
      "This is what I'm actively working on right now. I'll add more details as it takes shape.",
    style: "wip",
    wip: true,
    images: [],
    features: [
      { title: "Planned Feature", desc: "Details coming soon." },
      { title: "Planned Feature", desc: "Details coming soon." },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
