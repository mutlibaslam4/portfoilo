export const profile = {
  name: "Mutlib Aslam",
  role: "Full-Stack Developer",
  email: "mutlibaslam4@gmail.com",
  /** international format, digits only — same number as on the CV */
  whatsapp: "+923091550508",
  /** dummy booking link — replace with your Cal.com / Calendly URL */
  bookingUrl: "https://cal.com/your-name/30min",
  /** leave empty to show sample GitHub numbers; set a username for live stats */
  github: "mutlibaslam4",
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

// taken from the CV's technical skills
export const techStack = [
  "React.js",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "HTML5",
  "CSS3",
  "PHP",
  "WordPress",
  "WooCommerce",
  "REST APIs",
  "Git & GitHub",
  "Puppeteer",
];

export const services = [
  {
    icon: "◧",
    title: "Frontend Development",
    text: "Responsive, reusable interfaces in React.js and Next.js with TypeScript.",
    span: "md:col-span-2",
  },
  {
    icon: "◨",
    title: "Backend Development",
    text: "Node.js services and REST APIs built to be reliable and easy to maintain.",
    span: "",
  },
  {
    icon: "⌘",
    title: "API Integration",
    text: "Connecting frontends to REST APIs and third-party services cleanly.",
    span: "",
  },
  {
    icon: "▤",
    title: "WordPress & WooCommerce",
    text: "Custom themes and online stores: cart, checkout, shipping and product sync.",
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
    title: "Testing & Debugging",
    text: "Troubleshooting, performance fixes and automated browser tests with Puppeteer.",
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
