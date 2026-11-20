import { useRef, type PointerEvent } from "react";

/**
 * Adds the reference design's ±7° pointer tilt and 1.02 scale to a card.
 * The transform is written directly to the node so React does not re-render
 * on every pointer move. Coarse pointers and reduced-motion visitors keep the
 * card flat.
 */
export function TiltCard() {
	const outerRef = useRef<HTMLDivElement>(null);
	const innerRef = useRef<HTMLDivElement>(null);

	function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
		if (event.pointerType !== "mouse") return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const outer = outerRef.current;
		const inner = innerRef.current;
		if (!outer || !inner) return;

		const rect = outer.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -7;
		const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 7;

		inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
	}

	function reset() {
		if (innerRef.current) {
			innerRef.current.style.transform =
				"rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
		}
	}

	return (
		<div
			ref={outerRef}
			className="perspective-card"
			onPointerMove={handlePointerMove}
			onPointerLeave={reset}
		>
			<div
				ref={innerRef}
				className={`perspective-card-inner group relative rounded-lg border border-rule bg-surface/70 p-2.5 shadow-[0_24px_70px_-38px_var(--shadow-color)] transition-colors duration-300 hover:border-accent/50 hover:shadow-[0_10px_35px_-5px_var(--glow)]`.trim()}
			>
				<span
					className="pointer-events-none absolute -left-1 -top-1 h-2 w-2 border-l-2 border-t-2 border-accent transition-all duration-300 group-hover:h-3 group-hover:w-3"
					aria-hidden="true"
				/>
				<span
					className="pointer-events-none absolute -right-1 -top-1 h-2 w-2 border-r-2 border-t-2 border-accent transition-all duration-300 group-hover:h-3 group-hover:w-3"
					aria-hidden="true"
				/>
				<span
					className="pointer-events-none absolute -bottom-1 -left-1 h-2 w-2 border-b-2 border-l-2 border-accent transition-all duration-300 group-hover:h-3 group-hover:w-3"
					aria-hidden="true"
				/>
				<span
					className="pointer-events-none absolute -bottom-1 -right-1 h-2 w-2 border-b-2 border-r-2 border-accent transition-all duration-300 group-hover:h-3 group-hover:w-3"
					aria-hidden="true"
				/>

				<div className="relative flex aspect-4/4.5 flex-col justify-end overflow-hidden border border-rule bg-surface-2 p-4">
					<div
						aria-hidden="true"
						className="absolute inset-0 select-none overflow-hidden p-3 font-mono text-[9px] leading-tight text-accent/25 transition-colors duration-300 group-hover:text-accent/35"
					>
						<pre className="whitespace-pre-wrap">
							{`const engineer = {
  id: "aim_01",
  name: "Mubaraq Ibrahim",
  role: "Full-Stack",
  status: "deployed",
`}
							<span className="terminal-cursor ml-0.5" />
							{`
};`}
						</pre>
					</div>

					<div className="relative z-10 mx-auto mb-2 h-44 w-44 overflow-hidden rounded-full border-2 border-rule-strong bg-surface-3 shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]">
						<img
							className="h-full w-full object-cover object-[center_18%]"
							src="/images/aim-portrait.webp"
							alt="Illustrated portrait of Mubaraq Ibrahim (AIM), wearing glasses and a dark hoodie."
							width="900"
							height="1125"
							fetchPriority="high"
							decoding="async"
						/>
					</div>

					<div className="relative z-10 self-end rounded border border-accent/40 bg-accent/10 px-2 py-0.5 text-center font-mono text-[9px] uppercase leading-[1.4] tracking-[0.16em] text-accent transition-colors duration-300 group-hover:border-accent group-hover:bg-accent/15">
						<span className="block">Portfolio</span>
						<span className="block">2026</span>
					</div>
				</div>

				<p className="mt-3 px-1 font-mono text-[11px] leading-snug text-muted">
					Fig. 01 — AIM / Mubaraq Ibrahim. Illustrated portrait, not a
					photograph.
				</p>

				<div className="mt-4 grid grid-cols-3 gap-2 border-t border-rule pt-3 font-mono text-[10px] text-muted">
					<div>
						<span className="block uppercase">Role</span>
						<span className="text-ink-2">Full-stack developer</span>
					</div>
					<div>
						<span className="block uppercase">Stack</span>
						<span className="text-ink-2">React / TS / Node / SQL</span>
					</div>
					<div>
						<span className="block uppercase">Building since</span>
						<span className="text-ink-2">2023</span>
					</div>
				</div>
			</div>
		</div>
	);
}
