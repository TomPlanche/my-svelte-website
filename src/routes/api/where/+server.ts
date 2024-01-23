/**
 * @file src/routes/api/where/+server.ts
 * @description +server
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {json, type RequestHandler} from "@sveltejs/kit";
import {IPINFO_TOKEN} from "$lib/secrets";
import type {TUserLocation} from "$lib/types";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Type(s)

// Other(s)
// END VARIABLES ======================================================================================= END VARIABLES

// FUNCTIONS ================================================================================================ FUNCTIONS
const getIp = (req: Request) => {
  return req.headers.get('x-forwarded-for')?.split(/\s*,\s*/);
}
// END FUNCTIONS ======================================================================================== END FUNCTIONS

// CODE ========================================================================================================= CODE
export const GET: RequestHandler = async ({request}) => {
  const clientIp = getIp(request) || [''];

  const res = await fetch(
    `https://ipinfo.io/${clientIp[0]}/json?token=${IPINFO_TOKEN}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  if (res.ok) {
    const {
      city,
      country,
      loc,
      ip,
    } = await res.json();

    return json({
      location: `${city}, ${country}`,
      coords: {
        lat: parseFloat(loc.split(',')[0]),
        lon: parseFloat(loc.split(',')[1]),
      },
      ip,
    });
  }

  return json({
    location: 'Anglet, France TEST',
    coords: {
      lat: 43.3112,
      lon: -0.3558,
    },
    ip: '194.167.154.34',
  } as TUserLocation);
};
// END CODE =======================================================================================  END COMPONENT

/**
 * End of file src/routes/api/where/+server.ts
 */
