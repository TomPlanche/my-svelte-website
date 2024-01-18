/**
 * @file src/lib/globals.ts
 * @description globals
 * @author Tom Planche
 */
import { elasticOut } from 'svelte/easing';
import type { SvelteComponent } from 'svelte';

// IMPORTS ===================================================================================================  IMPORTS

// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Type(s)

// Other(s)
const headerHeight = '6vmin';
const padding = '2rem';
const songPlayer = {
	small: {
		height: '4rem'
	},
	large: {
		height: '6rem'
	}
};



export const style_vars = {
	main_padding: padding,
	header_height: headerHeight,
	padding_top: `calc(2 * ${padding} + ${headerHeight})`,
	songPlayer
};
// END VARIABLES ======================================================================================= END VARIABLES

// FUNCTIONS ================================================================================================ FUNCTIONS

// END FUNCTIONS ======================================================================================== END FUNCTIONS

// CODE ========================================================================================================= CODE

// END CODE =======================================================================================  END COMPONENT

/**
 * End of file src/lib/globals.ts
 */
