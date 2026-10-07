export const profile = {
  name: "Mutlib Aslam",
  role: "Full-Stack Developer",
  email: "mutlibaslam4@gmail.com",
  /** international format, digits only — dummy number */
  whatsapp: "+923091550508",
  /** dummy booking link — replace with your Cal.com / Calendly URL */
  bookingUrl: "https://cal.com/your-name/30min",
  /** leave empty to show sample GitHub numbers; set a username for live stats */
  github: "",
  cv: "/cv.pdf",
  headline: "I build fast, scalable web applications.",
  subline:
    "Frontend precision. Backend reliability. I turn ideas into polished products that load quickly and scale cleanly.",
  socials: [
    { label: "GitHub", href: "https://github.com/mutlibaslam4" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mutlib-aslam-111186417/" },
  ],
};

export const nav = [
  { key: "home", href: "/#home" },
  { key: "about", href: "/#about" },
  { key: "services", href: "/#services" },
  { key: "work", href: "/#work" },
  { key: "pricing", href: "/#pricing" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/#contact" },
];

// numbers below come straight from the CV (4 yrs frontend + 1 yr backend, TUUR project tests)
export const stats = [
  { value: 5, suffix: "+", key: "stats.exp", label: "Years experience" },
  { value: 4, suffix: "", key: "stats.frontend", label: "Years frontend" },
  { value: 1, suffix: "", key: "stats.backend", label: "Year backend" },
  { value: 140, suffix: "+", key: "stats.tests", label: "Automated tests written" },
];

export const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "MongoDB",
  "GraphQL",
  "Docker",
  "AWS",
  "Framer Motion",
  "Prisma",
];

export const services = [
  {
    icon: "◧",
    title: "Frontend Development",
    text: "Pixel-perfect, accessible interfaces in React and Next.js with buttery animations.",
    span: "md:col-span-2",
  },
  {
    icon: "◨",
    title: "Backend Development",
    text: "Robust Node.js services with clean architecture and testing.",
    span: "",
  },
  {
    icon: "⌘",
    title: "API Design",
    text: "REST and GraphQL APIs that are documented, versioned and secure.",
    span: "",
  },
  {
    icon: "▤",
    title: "Databases",
    text: "Schema design, query tuning and migrations on SQL and NoSQL.",
    span: "",
  },
  {
    icon: "▭",
    title: "Responsive Design",
    text: "Layouts that feel native from a phone to an ultrawide monitor.",
    span: "",
  },
  {
    icon: "↗",
    title: "Deployment & DevOps",
    text: "CI/CD, containers and cloud hosting so releases are boring and safe.",
    span: "md:col-span-2",
  },
];

export const codeLines = [
  { k: "import", rest: " { ship } from ", s: '"@mutlib/craft"', tail: ";" },
  { k: "const", rest: " dev = ", s: "{", tail: "" },
  { k: "", rest: "  role: ", s: '"Full-Stack"', tail: "," },
  { k: "", rest: "  stack: ", s: '["Next.js", "Node"]', tail: "," },
  { k: "", rest: "  available: ", s: "true", tail: "," },
  { k: "", rest: "", s: "};", tail: "" },
  { k: "await", rest: " ship(dev);", s: "", tail: "" },
];
