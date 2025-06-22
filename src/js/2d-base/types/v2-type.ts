/**
 * Base type for all 2D geometry objects
 */
export type V2 = {
  x: number;
  y: number;
};

/**
 * Transformation matrix for 2D space
 */
// prettier-ignore
export type V2Transform = [
  number, number, number,
  number, number, number,
  number, number, number,
];
