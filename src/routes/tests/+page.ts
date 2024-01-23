/**
 * @file src/routes/tests/+page.ts
 * @description +page
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import type {TUserLocation} from "../api/where/+server";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Type(s)

// Other(s)
// END VARIABLES ======================================================================================= END VARIABLES

// FUNCTIONS ================================================================================================ FUNCTIONS

// END FUNCTIONS ======================================================================================== END FUNCTIONS

// CODE ========================================================================================================= CODE
export const load = async ({ url, fetch }) => {
  const userLocation = await fetch(`${url.origin}/api/where`)
    .then((res) => res.json() as Promise<TUserLocation>)
    .catch((e) => {
      console.log(`[ERROR] ${e}`);

      return {
        status: 500,
        error: 'Hey, you are not supposed to be here!',
      }
    });

  // const userLocation: TUserLocation = {
  //   location: 'Paris, France',
  //   coords: {
  //     lat: 48.864716,
  //     lon: 2.349014,
  //   },
  //   ip: '123.456.789.11',
  // }

  return {
    userLocation,
  };
};
// END CODE =======================================================================================  END COMPONENT

/**
 * End of file src/routes/tests/+page.ts
 */
