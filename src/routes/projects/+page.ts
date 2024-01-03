/**
 * @file src/routes/projects/+page.ts
 * @description +page
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import type { T_Repository } from '../api/repositories/+server';
import type { T_Project } from '$lib/types';
import { TAGS } from '$lib/appStore';
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Type(s)

// Other(s)
// END VARIABLES ======================================================================================= END VARIABLES

// FUNCTIONS ================================================================================================ FUNCTIONS

// END FUNCTIONS ======================================================================================== END FUNCTIONS

// CODE ========================================================================================================= CODE
export const load = async ({ url, fetch }) => {
	const repositories = await fetch(`${url.origin}/api/repositories`)
		.then((res) => res.json())
		.then(
			(data) =>
				(data.projects as T_Repository[]).map((project) => {
					const category = project.languages.includes('TypeScript')
						? project.languages.includes('JavaScript')
							? TAGS.API
							: TAGS.Frontend
						: project.languages.includes('Python')
						  ? TAGS.Other
						  : TAGS.Programming;

					return {
						title: project.name,
						paragraph: project.description,
						link: project.url,
						tags: project.languages,
						category
					} as T_Project;
				}) as T_Project[]
		);

	return {
		repositories
	};
};
// END CODE =======================================================================================  END COMPONENT

/**
 * End of file src/routes/projects/+page.ts
 */
