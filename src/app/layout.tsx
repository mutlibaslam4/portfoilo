import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import {
  Bricolage_Grotesque,
  JetBrains_Mono,
  Noto_Sans_Arabic,
  Plus_Jakarta_Sans,
} from "next/font/google";
import AnchorScroll from "@/components/AnchorScroll";
import CustomCursor from "@/components/CustomCursor";
import CursorGlow from "@/components/CursorGlow";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Protect from "@/components/Protect";
import SmoothScroll from "@/components/SmoothScroll";
import StoreSync from "@/components/StoreSync";
import WhatsAppFab from "@/components/WhatsAppFab";
import { profile } from "@/data/site";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"] });
const sans = Plus_Jakarta_Sans({ variable: "--font-sans-body", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono-code", subsets: ["latin"] });
const urdu = Noto_Sans_Arabic({ variable: "--font-ur", subsets: ["arabic"] });

const title = `${profile.name} — ${profile.role}`;
const description =
  "Portfolio of a full-stack developer building fast, scalable web applications with Next.js, Node and modern tooling.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s — ${profile.name}` },
  description,
  authors: [{ name: profile.name }],
  other: { copyright: `© ${new Date().getFullYear()} ${profile.name}. All rights reserved.` },
  openGraph: { title, description, type: "website", siteName: profile.name },
  twitter: { card: "summary_large_image", title, description },
};

// runs before paint so the saved theme never flashes
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} ${urdu.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <StoreSync />
        <Protect />
        <SmoothScroll />
        <AnchorScroll />
        <CursorGlow />
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFab />
        {/* the insights script only exists on Vercel deployments */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
