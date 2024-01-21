/**
 * @file src/types.ts
 * @description types
 * @author Tom Planche
 */
import type {T_Tag} from '$lib/appStore';

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

  image?: string;
  imageAlt?: string;

  paragraph?: string;
};

export type T_ProjectsData = {
  data: {
    repositories: T_Project[];
  };
};

export type TShader = {
  vertexShader: string;
  fragmentShader: string;
};

export type TPoint = {
  x: number;
  y: number;
  z: number;
};
/**
 * End of file src/types.ts
 */
