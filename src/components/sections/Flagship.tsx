import { Link } from "react-router-dom";
import { type CaseStudy } from "../../data/projects";
import { btnPrimary } from "../../lib/ui";
import { MetricCounter } from "../MetricCounter";
import { Reveal } from "../Reveal";
import { ScreenshotFrame } from "../ScreenshotFrame";

interface FlagshipProps {
    thesisTrack: CaseStudy
}

export default function Flagship({thesisTrack} : FlagshipProps) {

    return (
        <>
            <Reveal as="section" className="border-b border-rule py-20" id="flagship">
                <div className="shell">
                    <div className="mb-6 flex items-center justify-between font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">
                        <span>Sheet 01 / Flagship</span>
                        <span className="text-accent">Case study</span>
                    </div>

                    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
                        <div className="lg:col-span-5">
                            <h2 className="mb-3 font-serif text-[clamp(2.4rem,5vw,3.2rem)] font-medium leading-[1.05] text-ink">
                                {thesisTrack.name}
                            </h2>
                            <h3 className="mb-6 text-lg font-light leading-snug text-ink-2">
                                {thesisTrack.tagline}
                            </h3>
                            <p className="mb-6 text-sm leading-[1.7] text-ink-2">
                                {thesisTrack.deck}
                            </p>

                            <blockquote className="my-8 rounded-r border-l-2 border-accent bg-ink/[0.02] p-5 font-serif text-base italic leading-relaxed text-ink-2 transition-colors duration-200 hover:bg-ink/[0.04]">
                                &ldquo;The hard part was not the dashboard. It was agreeing what{" "}
                                <span className="font-normal text-ink underline decoration-accent/50">
                                    submitted
                                </span>{" "}
                                meant for three different roles.&rdquo;
                            </blockquote>

                            <dl className="mb-8 grid grid-cols-3 gap-4 border-t border-rule pt-6 font-mono text-[11px]">
                                <div>
                                    <dt className="mb-1 text-muted">Role</dt>
                                    <dd className="leading-[1.55] text-ink-2">
                                        {thesisTrack.role}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="mb-1 text-muted">Scope</dt>
                                    <dd className="leading-[1.55] text-ink-2">
                                        {thesisTrack.scope}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="mb-1 text-muted">Stack</dt>
                                    <dd className="leading-[1.55] text-ink-2">
                                        {thesisTrack.stack}
                                    </dd>
                                </div>
                            </dl>

                            <Link className={btnPrimary} to={`/work/${thesisTrack.slug}`}>
                                Read the ThesisTrack case study
                                <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                                    →
                                </span>
                            </Link>
                        </div>

                        <div className="lg:col-span-7">
                            <ScreenshotFrame
                                src={thesisTrack.image}
                                alt={thesisTrack.imageAlt}
                                caption={thesisTrack.imageCaption}
                                width={1500}
                                height={1875}
                                priority
                                className="[&_img]:max-h-[45rem] [&_img]:object-cover [&_img]:object-top"
                            />

                            <div className="mt-4 grid grid-cols-3 divide-x divide-rule overflow-hidden rounded border border-rule bg-surface">
                                <div className="p-3">
                                    <span className="block font-mono text-[0.54rem] uppercase tracking-[0.1em] text-muted">
                                        Total students
                                    </span>
                                    <span className="font-serif text-2xl text-ink">
                                        <MetricCounter value={14} />
                                    </span>
                                </div>
                                <div className="p-3">
                                    <span className="block font-mono text-[0.54rem] uppercase tracking-[0.1em] text-muted">
                                        Assigned / total
                                    </span>
                                    <span className="font-serif text-2xl text-ink">
                                        <MetricCounter value={6} />
                                    </span>
                                </div>
                                <div className="p-3">
                                    <span className="block font-mono text-[0.54rem] uppercase tracking-[0.1em] text-muted">
                                        Awaiting review
                                    </span>
                                    <span className="font-serif text-2xl text-accent">
                                        <MetricCounter value={3} />
                                    </span>
                                </div>
                            </div>
                            <p className="mt-2 font-mono text-[0.58rem] leading-[1.6] text-muted">
                                Demo dataset from the coordinator dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </Reveal>
        </>
    );
}
