/**
 * @file src/lib/utils.ts
 * @description utils
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS

// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Type(s)

// Other(s)
// END VARIABLES ======================================================================================= END VARIABLES

// FUNCTIONS ================================================================================================ FUNCTIONS
import type {TPoint} from "$lib/types";

/**
 * Converts long/lat to a vector3
 *
 * @param long {number} longitude
 * @param lat {number} latitude
 * @param radius {number} radius of the sphere
 */
export const lonLatToVector3 = (long: number, lat: number, radius: number) => {
  const phi = (lat * Math.PI) / 180;
  const theta = ((long - 180) * Math.PI) / 180;

  const x = -(radius * Math.cos(phi) * Math.cos(theta));
  const y = radius * Math.sin(phi);
  const z = radius * Math.cos(phi) * Math.sin(theta);

  return { x, y, z } as TPoint;
};
// END FUNCTIONS ======================================================================================== END FUNCTIONS

// CODE ========================================================================================================= CODE

// END CODE =======================================================================================  END COMPONENT

/**
 * End of file src/lib/utils.ts
 */
