import { Reveal } from "../Reveal";
import { SectionLabel } from "../SectionLabel";
import { ProjectRegister } from "../ProjectRegister";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import { textLink } from "../../lib/ui";

export interface SelectedWorkProps {
    sectionHeading: string
    sectionTitle: string    
    sectionIntro: string
}


export const SelectedWork = ({sectionHeading, sectionIntro, sectionTitle} : SelectedWorkProps) => {

    return (
        <Reveal as="section" className="border-b border-rule py-20" id="work">
            <div className="shell">
                <div className={sectionHeading}>
                    <div className="lg:col-span-8">
                        <SectionLabel number="01">Selected work</SectionLabel>
                        <h2 className={sectionTitle}>
                            Five builds, in the
                            <br />
                            order I&rsquo;d explain them.
                        </h2>
                    </div>
                    <p className={sectionIntro}>
                        Four annotated case studies and one code-only build. Real
                        screenshots, real constraints, no invented metrics.
                    </p>
                </div>

                <ProjectRegister />

                <div className="mt-8 flex flex-col gap-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-2xl leading-[1.7]">
                        Each case study covers the problem, the decisions and the part that
                        was actually hard. The source is on GitHub where the project is
                        public.
                    </p>
                    <Link className={`${textLink} whitespace-nowrap`} to="/work">
                        Open the full work index
                        <ArrowRight weight="bold" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </Reveal>
    );
};
