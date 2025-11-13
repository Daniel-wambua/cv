import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

// Get initial theme from localStorage or system preference
function getInitialTheme(): Theme {
	if (!browser) return 'dark';
	
	const stored = localStorage.getItem('theme') as Theme | null;
	if (stored) return stored;
	
	// Check system preference
	if (window.matchMedia('(prefers-color-scheme: light)').matches) {
		return 'light';
	}
	
	return 'dark';
}

// Create theme store
export const theme = writable<Theme>(getInitialTheme());

// Subscribe to theme changes and update DOM
if (browser) {
	theme.subscribe((value) => {
		localStorage.setItem('theme', value);
		document.documentElement.setAttribute('data-theme', value);
	});
	
	// Apply initial theme
	document.documentElement.setAttribute('data-theme', getInitialTheme());
}

// Theme toggle function
export function toggleTheme() {
	theme.update((current) => (current === 'light' ? 'dark' : 'light'));
}
