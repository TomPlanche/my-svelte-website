/**
 * @file src/routes/api/+server.ts
 * @description +server
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import { json } from '@sveltejs/kit';
// END IMPORTS ==========================================================================================   END IMPORTS
export const GET = async () => {
	return json({
		error: 'Hey, you are not supposed to be here!'
	});
};

// END CODE =======================================================================================  END COMPONENT

/**
 * End of file src/routes/api/+server.ts
 */
