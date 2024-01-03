/**
 * @file src/types.ts
 * @description types
 * @author Tom Planche
 */
import type { T_Tag } from '$lib/appStore';

// Type(s)
export type T_Cursor = {
	isHover: boolean;
	scale: number;
	opacity: number;
	svg: string;
	innerText: string;
	backgroundColor: string;
	blur: number;
};

export type T_CursorOptions = {
	[key in keyof T_Cursor]?: T_Cursor[key];
};

export type T_OnEnter = (cursorOptions?: T_CursorOptions) => void;

export type T_OnLeave = T_OnEnter;

export type T_Project = {
	title: string;
	category?: string;

	tags?: T_Tag[];
	tagsColors?: Record<T_Tag, string>;

	link?: string;

	img?: string;
	imgAlt?: string;

	paragraph?: string;
};

/**
 * End of file src/types.ts
 */
