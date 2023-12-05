/**
 * @file src/types.ts
 * @description types
 * @author Tom Planche
 */

// Type(s)
export type T_Cursor = {
  isHover: boolean;
  scale: number;
  opacity: number;
  svg: string;
  innerHTML: string;
}

export type T_CursorOptions = {
  [key in keyof T_Cursor]?: T_Cursor[key];
}

export type T_OnEnter = (
  cursorOptions?: T_CursorOptions
) => void;

export type T_OnLeave = T_OnEnter;
/**
 * End of file src/types.ts
 */
