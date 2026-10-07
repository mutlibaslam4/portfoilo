export const categories = ["All", "Custom Website", "Brand Website", "Landing Page", "E-commerce"] as const;

export type Category = (typeof categories)[number];

export type Project = {
  id: number;
  slug: string;
  title: string;
  category: Exclude<Category, "All">;
  tags: string[];
  image: string;
  /** grid spans — together they tile the gallery like a jigsaw */
  span: string;
  // ---- case study ----
  client: string;
  role: string;
  year?: string;
  summary: string;
  problem: string;
  solution: string;
  results: { value: string; label: string }[];
  stack: string[];
  /** leave out until the project has a public URL */
  live?: string;
};

// Replace `image` with a real screenshot of the project (put it in /public/projects).
export const projects: Project[] = [
  {
    id: 1, slug: "tuur-micro-roastery", title: "TUUR Micro-Roastery", category: "E-commerce",
    tags: ["WordPress", "WooCommerce"],
    image: "/projects/cartly.jpg", span: "col-span-2 row-span-2",
    client: "TUUR Micro-Roastery", role: "WordPress & WooCommerce Development",
    summary: "A coffee e-commerce storefront built as a custom WordPress theme on top of WooCommerce.",
    problem:
      "The brand had a finished single-file HTML design but no working store: no cart, no checkout, and no way to sell coffee online with UAE shipping rules.",
    solution:
      "I converted the design into a custom WordPress theme and connected it to WooCommerce, with one shared cart across every page, cash-on-delivery checkout, UAE shipping rules and automatic coffee-to-product sync. I added a server-validated cart API, a newsletter signup stored in the admin, per-product order limits, standard pages and redirects, and wrote a developer hand-over guide for go-live.",
    results: [
      { value: "140+", label: "Automated browser checks" },
      { value: "1", label: "Shared cart across all pages" },
      { value: "UAE", label: "Shipping rules built in" },
    ],
    stack: ["WordPress", "WooCommerce", "PHP", "JavaScript", "WP-CLI", "Puppeteer"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
