/**
 * @file src/routes/api/lastfm/+server.ts
 * @description seerver
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import axios from 'axios';
import { json, type RequestHandler } from '@sveltejs/kit';
import { LASTFM_API_KEY } from '$lib/secrets';
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Type(s)

// Other(s)
const URL = {
  end: `&api_key=${LASTFM_API_KEY}&format=json`,
};
// END VARIABLES ======================================================================================= END VARIABLES

// FUNCTIONS ================================================================================================ FUNCTIONS

// END FUNCTIONS ======================================================================================== END FUNCTIONS

// CODE ========================================================================================================= CODE
export const POST: RequestHandler = async ({ request }) => {
  const { url } = await request.json();

  const finalURL = url + URL.end;

  return axios
    .get(finalURL)
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;

        return json({
          status: 200,
          body: {
            data,
          },
        });
      }
    })
    .catch((error) => {
      return json({
        status: 500,
        body: {
          error: error.message,
        },
      });
    });
};
// END CODE ============================================================================================= END COMPONENT

/**
 * End of file src/routes/api/lastfm/+server.ts
 */
