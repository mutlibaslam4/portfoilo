// All entries below are DUMMY content — replace with real clients, prices and articles.

export const testimonials = [
  {
    name: "Sarah Mitchell", role: "Founder, Nova Foods",
    quote: "Our store went from painfully slow to instant. Sales climbed within the first month and the process was effortless from start to finish.",
  },
  {
    name: "Daniel Okafor", role: "CTO, Atlas Logistics",
    quote: "Rare to find someone who is great at both design and backend. The dashboard has saved our team hours every single week.",
  },
  {
    name: "Aisha Rahman", role: "Marketing Lead, Orbit Labs",
    quote: "The new landing page doubled our sign-ups. Communication was clear, deadlines were met and the details were spotless.",
  },
  {
    name: "Tom Becker", role: "Director, Lumen Studio",
    quote: "Our clients now comment on how beautiful the website feels. It finally matches the quality of our work.",
  },
  {
    name: "Priya Nair", role: "Owner, Verde Realty",
    quote: "Built exactly around how we work. Our agents actually use it, which is something no other CRM ever achieved for us.",
  },
];

export const plans = [
  {
    key: "starter", price: 499, popular: false,
    blurb: "A polished one-page site to launch fast.",
    features: ["Custom landing page", "Mobile responsive", "Contact form", "Basic SEO", "7-day delivery"],
  },
  {
    key: "business", price: 1499, popular: true,
    blurb: "A complete website for growing businesses.",
    features: ["Up to 8 pages", "CMS integration", "Premium animations", "Advanced SEO & analytics", "30 days support"],
  },
  {
    key: "premium", price: 3999, popular: false,
    blurb: "Custom web app or full e-commerce build.",
    features: ["Custom web application", "Auth & payments", "Admin dashboard", "API & database design", "90 days support"],
  },
] as const;

export const calc = {
  types: [
    { key: "landing", base: 400, perPage: 60, weeks: 1 },
    { key: "business", base: 900, perPage: 90, weeks: 2 },
    { key: "ecommerce", base: 2200, perPage: 110, weeks: 4 },
    { key: "webapp", base: 3500, perPage: 150, weeks: 6 },
  ],
  features: [
    { key: "cms", price: 300 },
    { key: "auth", price: 450 },
    { key: "payments", price: 500 },
    { key: "animations", price: 350 },
    { key: "seo", price: 250 },
    { key: "i18n", price: 300 },
  ],
};

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  minutes: number;
  image: string;
  tag: string;
  content: Block[];
};

export const posts: Post[] = [
  {
    slug: "why-nextjs-for-client-websites",
    title: "Why I choose Next.js for most client websites",
    excerpt: "Speed, SEO and a great developer experience — here's how those translate into real results for clients.",
    date: "2026-08-12", minutes: 5, image: "/projects/nova-store.jpg", tag: "Next.js",
    content: [
      { type: "p", text: "When a client asks for a website, they are really asking for results: more visitors, more enquiries, more sales. The framework behind the scenes matters because it shapes how fast, how visible and how maintainable that website will be." },
      { type: "h", text: "1. Speed that visitors can feel" },
      { type: "p", text: "Server rendering and automatic image optimisation mean pages arrive fast even on slow mobile connections. Faster pages keep people around, and search engines reward them." },
      { type: "h", text: "2. SEO without the hacks" },
      { type: "p", text: "Because pages are rendered on the server, search engines can read everything immediately. Metadata, sitemaps and structured data are first-class features instead of afterthoughts." },
      { type: "h", text: "3. Room to grow" },
      { type: "ul", items: ["Start with a simple marketing site", "Add a blog or CMS later", "Grow into a full web app without a rewrite"] },
      { type: "p", text: "That flexibility is why a small project today can become a serious product tomorrow without throwing the work away." },
    ],
  },
  {
    slug: "five-ways-to-speed-up-your-website",
    title: "Five practical ways to speed up your website",
    excerpt: "Small changes that usually cut load time in half — no rebuild required.",
    date: "2026-07-03", minutes: 4, image: "/projects/launchpad.jpg", tag: "Performance",
    content: [
      { type: "p", text: "Most slow websites are slow for the same handful of reasons. Fixing them rarely needs a rebuild." },
      { type: "ul", items: ["Compress and properly size every image", "Serve modern formats like AVIF and WebP", "Load third-party scripts late", "Cache static assets aggressively", "Remove unused JavaScript and fonts"] },
      { type: "h", text: "Measure first" },
      { type: "p", text: "Run Lighthouse before you change anything. It tells you which fix will move the needle most, so you don't waste time optimising the wrong thing." },
      { type: "code", text: "npx lighthouse https://your-site.com --view" },
    ],
  },
  {
    slug: "animation-that-feels-premium",
    title: "Animation that feels premium (and doesn't hurt performance)",
    excerpt: "How to use Framer Motion with restraint so interfaces feel alive without feeling heavy.",
    date: "2026-05-21", minutes: 6, image: "/projects/lumen-studio.jpg", tag: "Design",
    content: [
      { type: "p", text: "Good animation is mostly restraint. The goal is to guide attention and give feedback, not to show off." },
      { type: "h", text: "Animate transform and opacity" },
      { type: "p", text: "These properties are cheap for the browser. Animating width, height or top often triggers layout work and causes jank on lower-end phones." },
      { type: "code", text: '<motion.div\n  initial={{ opacity: 0, y: 24 }}\n  whileInView={{ opacity: 1, y: 0 }}\n  viewport={{ once: true }}\n/>' },
      { type: "h", text: "Respect reduced motion" },
      { type: "p", text: "Some visitors prefer less movement. Honouring that setting is a small detail that makes a site more inclusive." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
