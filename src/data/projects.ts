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
// No public projects yet — add case studies here (and re-enable <Work /> in src/app/page.tsx).
export const projects: Project[] = [];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
