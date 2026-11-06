import About from "@/components/About";
import BlogTeaser from "@/components/BlogTeaser";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import Services from "@/components/Services";
// import Testimonials from "@/components/Testimonials"; // hidden until real client reviews are added
import Work from "@/components/Work";
import { profile } from "@/data/site";
import { siteUrl } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: profile.email,
  url: siteUrl,
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Loader />
      <main className="relative z-10">
        <Hero />
        <About />
        {/* <GithubStats /> — hidden: only 1 public repo so far */}
        <Services />
        <Work />
        {/* <Testimonials /> */}
        {/* <Pricing /> <Calculator /> — hidden until real packages and prices are decided */}
        <BlogTeaser />
        <Contact />
      </main>
    </>
  );
}
