/**
 * @file src/routes/api/repositories/+server.ts
 * @description +server
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import { json } from '@sveltejs/kit';
import { GITHUB_TOKEN } from '$lib/secrets';
import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Type(s)
type T_Data = {
	user: {
		pinnedItems: {
			edges: {
				node: {
					name: string;
					description: string;
					url: string;
					languages: {
						nodes: {
							name: string;
						}[];
					};
				};
			}[];
		};
	};
};

export type T_Repository = {
	name: string;
	description: string;
	url: string;
	languages: string[];
};

// Other(s)
const httpLink = createHttpLink({
	uri: 'https://api.github.com/graphql'
});

const authLink = setContext((_, { headers }) => {
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: `Bearer ${GITHUB_TOKEN}`
		}
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});
// END VARIABLES ======================================================================================= END VARIABLES

// FUNCTIONS ================================================================================================ FUNCTIONS

// END FUNCTIONS ======================================================================================== END FUNCTIONS

// CODE ========================================================================================================= CODE
/**
 * @description Get all of my pinned repositories on GitHub
 * @constructor
 */
export const GET = async () => {
	const { data } = await client.query({
		query: gql`
			query {
				user(login: "tomPlanche") {
					pinnedItems(first: 10, types: [REPOSITORY]) {
						totalCount
						edges {
							node {
								... on Repository {
									name
									description
									url

									languages(first: 2, orderBy: { field: SIZE, direction: DESC }) {
										nodes {
											name
										}
									}
								}
							}
						}
					}
				}
			}
		`
	});

	/*
  {"user":{"__typename":"User","pinnedItems":{"__typename":"PinnableItemConnection","totalCount":6,"edges":[{"__typename":"PinnableItemEdge","node":{"__typename":"Repository","name":"my-website","description":"Personal website","url":"https://github.com/TomPlanche/my-website"}},{"__typename":"PinnableItemEdge","node":{"__typename":"Repository","name":"LastFM-API-middleware","description":"LastFM API middleware using Typescript.","url":"https://github.com/TomPlanche/LastFM-API-middleware"}},{"__typename":"PinnableItemEdge","node":{"__typename":"Repository","name":"custom-commit","description":"Custom Git commit for generating a commit message.","url":"https://github.com/TomPlanche/custom-commit"}},{"__typename":"PinnableItemEdge","node":{"__typename":"Repository","name":"gpx-coords-tools","description":"Rust programs that will help us to use markers in our app.","url":"https://github.com/projetDansLaMontagne/gpx-coords-tools"}},{"__typename":"PinnableItemEdge","node":{"__typename":"Repository","name":"custom-cursor","description":"Custom cursor for my React apps.","url":"https://github.com/TomPlanche/custom-cursor"}},{"__typename":"PinnableItemEdge","node":{"__typename":"Repository","name":"blender_anim_maths","description":"Little python blender 3d animation","url":"https://github.com/TomPlanche/blender_anim_maths"}}]}}}
   */

	return json({
		projects: (data as T_Data).user.pinnedItems.edges.map((edge) => {
			return {
				name: edge.node.name,
				description: edge.node.description,
				url: edge.node.url,
				languages: edge.node.languages.nodes.map((node) => node.name)
			} as T_Repository;
		})
	});
};
// END CODE =======================================================================================  END COMPONENT

/**
 * End of file src/routes/api/repositories/+server.ts
 */
