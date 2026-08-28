/**
 * Scroll-reveal action.
 *
 * Marks the element with `data-reveal` immediately (so CSS hides it before it
 * enters the viewport) and flips it to `data-revealed` once it intersects.
 * Stagger siblings by setting a `--reveal-delay` inline style.
 *
 * Usage: <div use:reveal style="--reveal-delay: 120ms">...</div>
 */
export function reveal(node: HTMLElement, options?: { threshold?: number; rootMargin?: string }) {
	const threshold = options?.threshold ?? 0.12;
	const rootMargin = options?.rootMargin ?? '0px 0px -8% 0px';

	node.setAttribute('data-reveal', '');

	if (typeof IntersectionObserver === 'undefined') {
		node.setAttribute('data-revealed', 'true');
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.setAttribute('data-revealed', 'true');
					observer.unobserve(node);
				}
			}
		},
		{ threshold, rootMargin }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
