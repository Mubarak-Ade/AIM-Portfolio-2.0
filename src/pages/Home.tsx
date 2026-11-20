import { Link } from "react-router-dom";
import FieldNote from "../components/sections/FieldNote";
import Flagship from "../components/sections/Flagship";
import HowIWork from "../components/sections/HowIWork";
import { SelectedWork } from "../components/sections/SelectedWork";
import { TiltCard } from "../components/TiltCard";
import { caseStudies } from "../data/projects";
import { site } from "../data/site";
import { btnGhost, btnPrimary } from "../lib/ui";
import { usePageMeta } from "../lib/usePageMeta";


export function Home() {
  usePageMeta(
    "AIM — Full-stack developer",
    "Mubaraq Ibrahim (AIM) builds full-stack web products from schema to shipped interface. Selected work in React, Node, PostgreSQL and MongoDB.",
  );

  const sectionHeading =
    "mb-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8";

  const sectionTitle =
    "font-serif text-[clamp(2rem,4.2vw,3.2rem)] font-medium leading-[1.1] text-ink";
  const sectionIntro =
    "max-w-[52ch] text-sm leading-[1.7] text-ink-2 lg:col-span-4 lg:pt-8";

  const thesisTrack = caseStudies[0];

  return (
    <>
      <section
        className="border-b border-rule py-12 md:py-20"
        data-purpose="hero-section"
      >
        <div className="shell">
          <div className="mb-8 flex items-center justify-between font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">
            <div className="flex items-center gap-2">
              <span>00</span>
              <span>Portfolio / 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col justify-between lg:col-span-8">
              <div>
                <h1 className="mb-8 font-serif text-[clamp(2.5rem,6.4vw,4.2rem)] font-medium leading-[1.08] tracking-tight text-ink">
                  I build full-stack products that{" "}
                  <em className="cursor-default pr-1 font-light italic text-accent-ink transition-colors duration-300 hover:text-accent">
                    hold up
                  </em>{" "}
                  after launch.
                </h1>
                <p className="mb-10 max-w-2xl text-base font-light leading-relaxed text-ink-2 sm:text-lg">
                  I&rsquo;m Mubaraq Ibrahim &mdash; AIM &mdash; a full-stack
                  developer. I take products from data model to shipped
                  interface: React on the front, typed Node APIs on the back,
                  and the unglamorous parts in between.
                </p>

                <div className="mb-16 flex flex-wrap items-center gap-4 font-mono text-xs tracking-wider">
                  <Link className={btnPrimary} to="/work">
                    See the case studies
                    <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                      →
                    </span>
                  </Link>
                  <a className={btnGhost} href={`mailto:${site.email}`}>
                    Email AIM
                    <span className="transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1">
                      ↗
                    </span>
                  </a>
                </div>
              </div>

              <dl className="grid grid-cols-1 gap-6 border-t border-rule pt-8 font-mono text-xs sm:grid-cols-3">
                <div>
                  <dt className="mb-1 block text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                    Focus
                  </dt>
                  <dd className="text-ink-2">Full-stack product engineering</dd>
                </div>
                <div>
                  <dt className="mb-1 block text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                    Status
                  </dt>
                  <dd className="flex items-center gap-2 text-ink-2">
                    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                      <span className="radar-ring" />
                      <span className="radar-ring radar-ring-delayed" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-status" />
                    </span>
                    <span>{site.availability}</span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-4">
              <TiltCard />
            </div>
          </div>
        </div>
      </section>

      <SelectedWork sectionHeading={sectionHeading} sectionIntro={sectionIntro} sectionTitle={sectionTitle} />
      <Flagship thesisTrack={thesisTrack} />
      <HowIWork sectionHeading={sectionHeading} sectionIntro={sectionIntro} sectionTitle={sectionTitle} />
      <FieldNote sectionHeading={sectionHeading} sectionIntro={sectionIntro} sectionTitle={sectionTitle} />
    </>
  );
}
