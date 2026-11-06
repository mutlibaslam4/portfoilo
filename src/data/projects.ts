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
};

// Gallery photos live in /public/projects. Titles describe what each image shows —
// swap in real project screenshots (and names) as they become available.
export const projects: Project[] = [
  { id: 1, slug: "nova-store", title: "Food Blog on Laptop", category: "E-commerce", tags: ["Web Design"], image: "/projects/nova-store.jpg", span: "col-span-2 row-span-2" },
  { id: 2, slug: "pulse-agency", title: "Portfolio Homepage", category: "Brand Website", tags: ["Web Design"], image: "/projects/pulse-agency.jpg", span: "" },
  { id: 3, slug: "orbit-saas", title: "Laptop in the Dark", category: "Landing Page", tags: ["Workspace"], image: "/projects/orbit-saas.jpg", span: "row-span-2" },
  { id: 4, slug: "atlas-dashboard", title: "Photoshop Web Layouts", category: "Custom Website", tags: ["Design"], image: "/projects/atlas-dashboard.jpg", span: "" },
  { id: 5, slug: "lumen-studio", title: "Dual Monitor Dev Desk", category: "Brand Website", tags: ["Frontend", "Code"], image: "/projects/lumen-studio.jpg", span: "row-span-2" },
  { id: 6, slug: "cartly", title: "Node.js Code on Laptop", category: "E-commerce", tags: ["Node.js", "Backend"], image: "/projects/cartly.jpg", span: "col-span-2" },
  { id: 7, slug: "launchpad", title: "Triple Monitor Workstation", category: "Landing Page", tags: ["Workspace"], image: "/projects/launchpad.jpg", span: "row-span-2" },
  { id: 8, slug: "verde-crm", title: "Clean Developer Desk", category: "Custom Website", tags: ["Frontend", "Code"], image: "/projects/verde-crm.jpg", span: "col-span-2" },
  { id: 9, slug: "kinetic-studio", title: "Website Wireframe Sketches", category: "Brand Website", tags: ["Wireframes", "Design"], image: "/projects/kinetic-studio.jpg", span: "col-span-2 row-span-2" },
  { id: 10, slug: "pixel-forge", title: "PhpStorm Code Editor", category: "Custom Website", tags: ["PHP", "HTML"], image: "/projects/pixel-forge.jpg", span: "row-span-2" },
  { id: 11, slug: "brightly", title: "UX Wireframing", category: "Landing Page", tags: ["UX", "Wireframes"], image: "/projects/brightly.jpg", span: "row-span-2" },
];
