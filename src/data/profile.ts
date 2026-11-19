export const ABOUT = {
  name: "Alfatta Rezqa",
  jobTitle: "Software Developer",
  description:
    "Highly motivated software developer with 8+ years of experience designing and implementing software solutions with dedication to building high-quality software.",
};

export const techStacks = [
  "Vue.js",
  "Nuxt",
  "React",
  "Next.js",
  "Tauri",
  "Rust",
  "Flutter",
  "Nest",
  "Express",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "SQLite",
  "Docker",
  "Git",
];

export interface Project {
  id: string;
  name: string;
  windowTitle: string;
  eyebrow: string;
  description: string;
  technologies: string[];
  links: { label: string; href: string }[];
  image?: { src: string; alt: string; width: number; height: number };
}

export const featuredProject: Project = {
  id: "ajaib-terminal",
  name: "Ajaib Terminal",
  windowTitle: "ajaib-terminal.app",
  eyebrow: "Built with the Ajaib team",
  description:
    "Contributing to Ajaib’s cross-platform desktop stock trading app, with customizable multi-panel layouts and real-time market monitoring.",
  technologies: ["React", "Tauri", "Rust", "WebSocket"],
  links: [
    { label: "Explore Ajaib Terminal", href: "https://ajaib.co.id/terminal" },
  ],
  // Generated retro illustration; prompt and source PNG live in src/assets.
  image: {
    src: "/img/ajaib-terminal-pixel.webp",
    alt: "Pixel-art illustration of a retro trading workstation with a chart, order book, and keyboard",
    width: 1536,
    height: 1024,
  },
};

export const sideProjects: Project[] = [
  {
    id: "pixrelay",
    name: "PixRelay",
    windowTitle: "pixrelay.project",
    eyebrow: "A small tool. A useful job.",
    description:
      "A fast and efficient image processing service that resizes images from any URL without manually downloading and uploading them.",
    technologies: ["Image processing", "Docker", "API"],
    links: [
      {
        label: "Docker Hub",
        href: "https://hub.docker.com/r/alfatta/pixrelay",
      },
      { label: "GitHub", href: "https://github.com/alfatta/pixrelay" },
    ],
  },
];

interface ContactDetails {
  id: string;
  label: string;
  handle: string;
  description: string;
}

interface SocialContact extends ContactDetails {
  kind: "social";
  href: `https://${string}`;
}

interface EmailContact extends ContactDetails {
  kind: "email";
  href: `mailto:${string}`;
}

export const emailContact: EmailContact = {
  id: "email",
  kind: "email",
  label: "Mail",
  href: "mailto:hello@alfatta.dev",
  handle: "hello@alfatta.dev",
  description: "For ideas, questions, and a simple hello.",
};

export const socialLinks: SocialContact[] = [
  {
    id: "linkedin",
    kind: "social",
    label: "LinkedIn",
    href: "https://linkedin.com/in/alfattarezqa",
    handle: "alfattarezqa",
    description: "Work, experience, and professional connections.",
  },
  {
    id: "github",
    kind: "social",
    label: "GitHub",
    href: "https://github.com/alfatta",
    handle: "alfatta",
    description: "Code, side projects, and things I'm building.",
  },
  {
    id: "instagram",
    kind: "social",
    label: "Instagram",
    href: "https://instagram.com/alfattarezqa",
    handle: "alfattarezqa",
    description: "A little life beyond the keyboard.",
  },
  {
    id: "x",
    kind: "social",
    label: "X",
    href: "https://x.com/alfattarezqa",
    handle: "alfattarezqa",
    description: "Thoughts, updates, and conversations.",
  },
];

export const contactLinks: (SocialContact | EmailContact)[] = [
  ...socialLinks,
  emailContact,
];
