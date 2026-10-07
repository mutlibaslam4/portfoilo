import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "text-center" : ""}>
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
        / {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}
