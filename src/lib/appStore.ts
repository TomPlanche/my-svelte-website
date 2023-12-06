/**
 * @file src/lib/appStore.ts
 * @description appStore
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import { writable } from 'svelte/store';
import type {T_CursorOptions} from "./types";
import LastFM_handler from "$lib/LastFM_handler";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Type(s)
type T_THEME = 'dark' | 'light'
type T_state = {
  theme: T_THEME,
  lastFMHandlerInstance: LastFM_handler

  toggleTheme: () => void
  getTheme: () => T_THEME
}
// Other(s)
// END VARIABLES ======================================================================================= END VARIABLES

// FUNCTIONS ================================================================================================ FUNCTIONS

// END FUNCTIONS ======================================================================================== END FUNCTIONS

// CODE ========================================================================================================= CODE
export const store = writable<T_state>({
  theme: 'dark', // Set your default theme here,
  lastFMHandlerInstance: LastFM_handler.getInstance("Tom_planche"),

  toggleTheme()  {
    this.theme = this.theme === 'dark' ? 'light' : 'dark'
  },

  getTheme() {
    return this.theme;
  }
} as T_state);
export const cursorStore = writable<T_CursorOptions>({
  isHover: false
});
// END CODE =======================================================================================  END COMPONENT

/**
 * End of file src/appStore.ts
 */
