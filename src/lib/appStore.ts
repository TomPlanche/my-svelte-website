/**
 * @file src/lib/appStore.ts
 * @description appStore
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import type { SvelteComponent } from 'svelte';
import { writable } from 'svelte/store';
import LastFM_handler from '$lib/LastFM_handler';
import { style_vars } from '$lib/globals';
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
const filters = {
	API: 'API',
	Backend: 'Backend',
	Frontend: 'Frontend',
	Other: 'Other',
	Programming: 'Programming'
};

export const TAGS = {
	Python: 'Python',
	TypeScript: 'TypeScript',
	JavaScript: 'JavaScript',
	Rust: 'Rust',
	SCSS: 'SCSS',

	...filters
};
// Type(s)
export type T_THEME = 'dark' | 'light';

export type T_Tag = keyof typeof TAGS;

export type T_state = {
	theme: T_THEME;
	lastFMHandlerInstance: LastFM_handler;
	paddingTopStart: string;
	paddingTopEnd: string;
	pageMinHeight: string;
	projectTags: readonly T_Tag[];
	projectColors: Record<T_Tag, string>;

	// refs
	cursor: SvelteComponent | null;

	loadingAnimationIsDone: boolean;

	toggleTheme: () => void;
};

// Other(s)
const headerHeight = style_vars.header_height;
const padding = style_vars.main_padding;

const padding_top_start = `calc(2 * ${padding} + ${headerHeight})`;
const padding_top_end = `calc(${padding} + ${headerHeight})`;
const page_size_with_padding = `calc(100vh - (2 * ${padding} + ${headerHeight}))`;

const projects_tags = Object.keys(filters) as readonly T_Tag[];
const projects_colors = {
	API: '#2b748950',
	Backend: '#F3273550',
	Frontend: '#087ea450',
	JavaScript: '#f1e05a50',
	Other: 'rgba(129,140,248,.4)',
	Programming: 'rgba(235,255,66,0.31)',
	Python: '#3572A550',
	Rust: '#dea58450',
	SCSS: '#c6538c50',
	TypeScript: '#007acc50'
} as Record<T_Tag, string>;
// END VARIABLES ======================================================================================= END VARIABLES

// FUNCTIONS ================================================================================================ FUNCTIONS

// END FUNCTIONS ======================================================================================== END FUNCTIONS

// CODE ========================================================================================================= CODE
export const store = writable<T_state>({
	theme: 'dark', // Set your default theme here,
	lastFMHandlerInstance: LastFM_handler.getInstance('Tom_planche'),
	paddingTopStart: padding_top_start,
	paddingTopEnd: padding_top_end,
	pageMinHeight: page_size_with_padding,

	projectTags: projects_tags,
	projectColors: projects_colors,

	loadingAnimationIsDone: false,

	toggleTheme() {
		console.log(`[appStore] toggleTheme() - this.theme: ${this.theme}`);
		this.theme = this.theme === 'dark' ? 'light' : 'dark';
		console.log(`[appStore] toggleTheme() - this.theme: ${this.theme}`);
	}
} as T_state);
// END CODE =======================================================================================  END COMPONENT

/**
 * End of file src/appStore.ts
 */
