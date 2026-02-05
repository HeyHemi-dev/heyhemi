export function initHeroSkillsParallax(): void {
	const START_OFFSET_RATIO = 0.75;
	const PARALLAX_SPEED = 0.40;

	const hero = document.querySelector<HTMLElement>("#hero");
	const viewport = document.querySelector<HTMLElement>("[data-hero-skills-viewport]");
	const track = document.querySelector<HTMLElement>("[data-hero-skills-track]");

	if (!hero || !viewport || !track) return;

	let maxShift = 0;
	let ticking = false;

	const recalc = (): void => {
		maxShift = Math.max(0, track.scrollHeight - viewport.clientHeight);
	};

	const update = (): void => {
		const rect = hero.getBoundingClientRect();
		const totalRange = Math.max(1, rect.height);
		const progress = Math.min(1, Math.max(0, -rect.top / totalRange));
		const startOffset = viewport.clientHeight * START_OFFSET_RATIO;
		const shiftY = startOffset - progress * (maxShift + startOffset) * PARALLAX_SPEED;
		track.style.transform = `translate3d(0, ${shiftY}px, 0)`;
	};

	const queueUpdate = (): void => {
		if (ticking) return;
		ticking = true;
		window.requestAnimationFrame(() => {
			update();
			ticking = false;
		});
	};

	recalc();
	update();

	window.addEventListener("scroll", queueUpdate, { passive: true });
	window.addEventListener("resize", () => {
		recalc();
		queueUpdate();
	});
}
