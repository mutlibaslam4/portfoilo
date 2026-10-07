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
  // ---- case study (dummy copy) ----
  client: string;
  role: string;
  year: string;
  summary: string;
  problem: string;
  solution: string;
  results: { value: string; label: string }[];
  stack: string[];
  live: string;
};

// Photos live in /public/projects — swap each `image` for your own screenshot.
export const projects: Project[] = [
  {
    id: 1, slug: "nova-store", title: "Nova Store", category: "E-commerce", tags: ["Next.js", "Stripe"],
    image: "/projects/nova-store.jpg", span: "col-span-2 row-span-2",
    client: "Nova Foods", role: "Design & Full-Stack Development", year: "2025",
    summary: "A fast, conversion-focused online store for a fresh-food brand.",
    problem: "The old store took six seconds to load on mobile and checkout had a 78% abandonment rate.",
    solution: "Rebuilt on Next.js with server-rendered product pages, a one-page Stripe checkout and image optimisation across the catalogue.",
    results: [{ value: "0.9s", label: "Mobile load time" }, { value: "+42%", label: "Conversion rate" }, { value: "-31%", label: "Cart abandonment" }],
    stack: ["Next.js", "Stripe", "Prisma", "PostgreSQL", "Tailwind"], live: "https://example.com",
  },
  {
    id: 2, slug: "pulse-agency", title: "Pulse Agency", category: "Brand Website", tags: ["Framer Motion"],
    image: "/projects/pulse-agency.jpg", span: "",
    client: "Pulse Creative", role: "Frontend Development", year: "2025",
    summary: "An award-style agency site where motion tells the brand story.",
    problem: "The agency's portfolio looked like every other template and did not reflect their creative standard.",
    solution: "Custom scroll-driven storytelling with Framer Motion, page transitions and a case-study system the team can update.",
    results: [{ value: "3.2x", label: "Time on site" }, { value: "+58%", label: "Inbound leads" }, { value: "100", label: "Lighthouse a11y" }],
    stack: ["Next.js", "Framer Motion", "Sanity CMS"], live: "https://example.com",
  },
  {
    id: 3, slug: "orbit-saas", title: "Orbit SaaS", category: "Landing Page", tags: ["Tailwind", "GSAP"],
    image: "/projects/orbit-saas.jpg", span: "row-span-2",
    client: "Orbit Labs", role: "Design & Development", year: "2024",
    summary: "A product-launch landing page that explains a complex tool in 30 seconds.",
    problem: "Visitors didn't understand the product quickly enough and bounced before signing up.",
    solution: "A story-first layout with an animated product walkthrough, social proof above the fold and a single focused call to action.",
    results: [{ value: "+64%", label: "Sign-ups" }, { value: "1.1s", label: "LCP" }, { value: "-27%", label: "Bounce rate" }],
    stack: ["Next.js", "Tailwind", "GSAP"], live: "https://example.com",
  },
  {
    id: 4, slug: "atlas-dashboard", title: "Atlas Dashboard", category: "Custom Website", tags: ["React", "Node"],
    image: "/projects/atlas-dashboard.jpg", span: "",
    client: "Atlas Logistics", role: "Full-Stack Development", year: "2024",
    summary: "A real-time operations dashboard for a logistics company.",
    problem: "Dispatchers tracked shipments in spreadsheets and lost hours reconciling data every day.",
    solution: "A live dashboard with WebSocket updates, role-based access and exportable reports backed by a Node API.",
    results: [{ value: "-12h", label: "Weekly manual work" }, { value: "99.9%", label: "Uptime" }, { value: "4", label: "Teams onboarded" }],
    stack: ["React", "Node.js", "WebSockets", "PostgreSQL"], live: "https://example.com",
  },
  {
    id: 5, slug: "lumen-studio", title: "Lumen Studio", category: "Brand Website", tags: ["Next.js"],
    image: "/projects/lumen-studio.jpg", span: "row-span-2",
    client: "Lumen Design Studio", role: "Design & Development", year: "2024",
    summary: "A calm, editorial portfolio for an interior design studio.",
    problem: "The studio's work was beautiful but their website was slow and hard to browse on phones.",
    solution: "An image-first layout with optimised galleries, a clean case-study template and a simple enquiry flow.",
    results: [{ value: "96", label: "Mobile performance" }, { value: "+35%", label: "Enquiries" }, { value: "12", label: "Projects published" }],
    stack: ["Next.js", "Tailwind", "Sanity CMS"], live: "https://example.com",
  },
  {
    id: 6, slug: "cartly", title: "Cartly", category: "E-commerce", tags: ["Shopify", "Headless"],
    image: "/projects/cartly.jpg", span: "col-span-2",
    client: "Cartly", role: "Headless Storefront", year: "2025",
    summary: "A headless Shopify storefront with instant page loads.",
    problem: "The theme-based store was heavy, hard to customise and slow during sales.",
    solution: "A Next.js storefront on Shopify's Storefront API with edge caching and a custom product configurator.",
    results: [{ value: "+51%", label: "Revenue per visit" }, { value: "0.7s", label: "Page transitions" }, { value: "10x", label: "Traffic handled" }],
    stack: ["Next.js", "Shopify", "GraphQL", "Vercel"], live: "https://example.com",
  },
  {
    id: 7, slug: "launchpad", title: "Launchpad", category: "Landing Page", tags: ["Tailwind"],
    image: "/projects/launchpad.jpg", span: "row-span-2",
    client: "Launchpad Academy", role: "Landing Page Development", year: "2024",
    summary: "A high-converting landing page for an online coding bootcamp.",
    problem: "Ad traffic was landing on a generic page, so cost per enrolment kept climbing.",
    solution: "A fast, SEO-ready page with an interactive curriculum section, testimonials and an embedded application form.",
    results: [{ value: "-38%", label: "Cost per enrolment" }, { value: "+2.4x", label: "Form completions" }, { value: "98", label: "Lighthouse SEO" }],
    stack: ["Next.js", "Tailwind", "Resend"], live: "https://example.com",
  },
  {
    id: 8, slug: "verde-crm", title: "Verde CRM", category: "Custom Website", tags: ["Postgres", "tRPC"],
    image: "/projects/verde-crm.jpg", span: "col-span-2",
    client: "Verde Realty", role: "Product Engineering", year: "2025",
    summary: "A lightweight CRM built around how a real-estate team actually works.",
    problem: "Generic CRMs were too complex, so agents stopped logging leads and follow-ups slipped.",
    solution: "A focused CRM with a kanban pipeline, automated reminders and one-click WhatsApp follow-ups, fully type-safe end to end.",
    results: [{ value: "+45%", label: "Follow-up rate" }, { value: "30", label: "Active agents" }, { value: "0", label: "Lost leads / month" }],
    stack: ["Next.js", "tRPC", "PostgreSQL", "Prisma"], live: "https://example.com",
  },
  {
    id: 9, slug: "kinetic-studio", title: "Kinetic Studio", category: "Brand Website", tags: ["Design", "Next.js"],
    image: "/projects/kinetic-studio.jpg", span: "col-span-2 row-span-2",
    client: "Kinetic", role: "UX Design & Development", year: "2025",
    summary: "From paper wireframes to a living brand website.",
    problem: "The team had strong ideas on paper but no clear structure for turning them into a website.",
    solution: "Workshop-led wireframing, a component-based design system and a production Next.js build delivered in four weeks.",
    results: [{ value: "4 wks", label: "Idea to launch" }, { value: "40+", label: "Reusable components" }, { value: "+70%", label: "Brand engagement" }],
    stack: ["Figma", "Next.js", "Tailwind", "Framer Motion"], live: "https://example.com",
  },
  {
    id: 10, slug: "pixel-forge", title: "Pixel Forge", category: "Custom Website", tags: ["TypeScript"],
    image: "/projects/pixel-forge.jpg", span: "row-span-2",
    client: "Pixel Forge Tools", role: "Developer Experience", year: "2024",
    summary: "A documentation and playground site for a developer tool.",
    problem: "Docs were scattered across wikis, so new users struggled to get started.",
    solution: "A searchable MDX docs site with live code playgrounds, versioned pages and a fast global search.",
    results: [{ value: "-60%", label: "Support tickets" }, { value: "<100ms", label: "Search latency" }, { value: "5k", label: "Monthly readers" }],
    stack: ["Next.js", "MDX", "TypeScript", "Algolia"], live: "https://example.com",
  },
  {
    id: 11, slug: "brightly", title: "Brightly", category: "Landing Page", tags: ["Tailwind", "SEO"],
    image: "/projects/brightly.jpg", span: "row-span-2",
    client: "Brightly Apps", role: "Design & Development", year: "2025",
    summary: "A bright, friendly launch page for a mobile app.",
    problem: "The app had great reviews but no web presence to capture organic search traffic.",
    solution: "An SEO-first landing page with structured data, app store badges and a fast, accessible layout.",
    results: [{ value: "#1", label: "Brand keyword rank" }, { value: "+120%", label: "Organic traffic" }, { value: "2.1x", label: "Store installs" }],
    stack: ["Next.js", "Tailwind", "Vercel Analytics"], live: "https://example.com",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
