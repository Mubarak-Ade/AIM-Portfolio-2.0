import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { textLink } from "../../lib/ui";
import { Reveal } from "../Reveal";
import { SectionLabel } from "../SectionLabel";

const methodRows = [
  {
    layer: "Interface",
    tools: "React · TypeScript · TanStack Query · Tailwind",
    decision:
      "Which state belongs on the server, which belongs in the URL, and which is just UI.",
  },
  {
    layer: "API",
    tools: "Node · Express · Zod · typed request shapes",
    decision:
      "Where validation lives, what the client is allowed to assume, and how failures are shaped.",
  },
  {
    layer: "Data",
    tools: "PostgreSQL · Drizzle · MongoDB",
    decision:
      "When relational integrity is worth it — and when a document model earns its keep.",
  },
  {
    layer: "Verification",
    tools: "Vitest · system suites · keyboard and contrast checks",
    decision:
      "Whether the workflow actually holds at the edges, not just in the happy-path demo.",
  },
];

interface HowIWorkProps {
  sectionHeading: string;
  sectionTitle: string;
  sectionIntro: string;
}

export default function HowIWork({
  sectionHeading,
  sectionIntro,
  sectionTitle,
}: HowIWorkProps) {
  return (
    <Reveal as="section" className="border-b border-rule py-20" id="about">
      <div className="shell">
        <div className={sectionHeading}>
          <div className="lg:col-span-8">
            <SectionLabel number="02">How I work</SectionLabel>
            <h2 className={sectionTitle}>
              The stack is not the
              <br />
              point. The decisions are.
            </h2>
          </div>
          <p className={sectionIntro}>
            I choose tools for the constraint in front of me, not for the logo
            wall. This is the working stack I keep returning to.
          </p>
        </div>

        <div className="overflow-x-auto border-y border-rule">
          <div className="grid min-w-[650px] grid-cols-12 px-2 py-3 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
            <div className="col-span-3">Layer</div>
            <div className="col-span-4">What I reach for</div>
            <div className="col-span-5">What I&rsquo;m deciding</div>
          </div>
          <div className="divide-y divide-rule">
            {methodRows.map((row) => (
              <div
                className="hover-light-sweep group grid min-w-[650px] grid-cols-12 items-baseline px-2 py-5 transition-colors duration-200 hover:bg-ink/[0.03]"
                key={row.layer}
              >
                <div className="col-span-3 -ml-2 flex items-center gap-2 font-serif text-base text-ink transition-colors duration-200 group-hover:text-accent">
                  <span className="h-3.5 w-1 rounded-full bg-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  <span>{row.layer}</span>
                </div>
                <div className="col-span-4 font-mono text-xs leading-[1.6] text-ink-2 transition-colors duration-200 group-hover:text-ink">
                  {row.tools}
                </div>
                <div className="col-span-5 font-sans text-xs leading-[1.6] text-muted transition-colors duration-200 group-hover:text-ink-2">
                  {row.decision}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl leading-[1.7]">
            I care about the seams: request validation, permission edges, empty
            states, and what happens when a session expires. That is usually
            where a product feels trustworthy or doesn&rsquo;t.
          </p>
          <Link className={`${textLink} whitespace-nowrap`} to="/about">
            More about how I work
            <ArrowRight weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
