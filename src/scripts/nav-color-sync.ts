export function initNavColorSync(): void {
	const nav = document.querySelector<HTMLElement>(".site-nav");
	if (!nav) return;

	const sections = Array.from(
		document.querySelectorAll<HTMLElement>('[data-project-section="true"]'),
	);
	if (!sections.length) return;

	const defaultNavColor =
		getComputedStyle(document.documentElement).getPropertyValue("--nav-bg").trim() ||
		"#f1c65d";

	const sectionColors = new Map<HTMLElement, string>();
	let ticking = false;

	const setNavColor = (color: string): void => {
		nav.style.setProperty("--nav-bg-active", color || defaultNavColor);
	};

	const computeSectionColors = (): void => {
		sections.forEach((section) => {
			const imageColor = getComputedStyle(section).getPropertyValue("--image-bg").trim();
			sectionColors.set(section, imageColor || defaultNavColor);
		});
	};

	const refreshNavColor = (): void => {
		const navBottom = nav.getBoundingClientRect().bottom;
		const activeSection = sections.find((section) => {
			const rect = section.getBoundingClientRect();
			return rect.top <= navBottom && rect.bottom > navBottom;
		});

		if (!activeSection) {
			setNavColor(defaultNavColor);
			return;
		}

		setNavColor(sectionColors.get(activeSection) || defaultNavColor);
	};

	const queueRefresh = (): void => {
		if (ticking) return;
		ticking = true;
		window.requestAnimationFrame(() => {
			refreshNavColor();
			ticking = false;
		});
	};

	computeSectionColors();
	setNavColor(defaultNavColor);
	refreshNavColor();
	window.addEventListener("scroll", queueRefresh, { passive: true });
	window.addEventListener("resize", () => {
		computeSectionColors();
		queueRefresh();
	});
}
