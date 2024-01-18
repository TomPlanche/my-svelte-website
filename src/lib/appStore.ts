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
  Programming: 'Programming',
  Mobile: 'Mobile',
};

export const TAGS = {
  Python: 'Python',
  TypeScript: 'TypeScript',
  JavaScript: 'JavaScript',
  Rust: 'Rust',
  SCSS: 'SCSS',
  Svelte: 'Svelte',

  ...filters,
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
  API: '#2b748980',
  Backend: '#F3273580',
  Frontend: '#087ea480',
  JavaScript: '#f1e05a80',
  Other: 'rgba(129,140,248,.8)',
  Programming: 'rgba(235,255,66,.8)',
  Python: '#3572A580',
  Rust: '#dea58480',
  SCSS: '#c6538c80',
  TypeScript: '#007acc80',
  Svelte: '#f0534050',
  Mobile: '#61dafb80',
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
  },
} as T_state);
// END CODE =======================================================================================  END COMPONENT

/**
 * End of file src/appStore.ts
 */
