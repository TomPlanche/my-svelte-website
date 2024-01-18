/**
 * @file src/routes/tests/+page.ts
 * @description +page
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
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
    .then((res) => res.json())
    .catch((e) => {
      console.log(`[ERROR] ${e}`);

      return {
        status: 500,
        error: 'Hey, you are not supposed to be here!',
      }
    });

  return {
    userLocation,
  };
};
// END CODE =======================================================================================  END COMPONENT

/**
 * End of file src/routes/tests/+page.ts
 */
