import { Line } from './types/v2-collections';
import { V2 } from './types/v2-type';
import { dot, length, scale, subtract } from './v2-logic';

/**
 * 2D line get Direction method
 * @param l - `Line`
 * @returns `V2`
 */
export const getDirection = (l: Line): V2 => subtract(l.b, l.a);

/**
 * 2D line get Length method
 * @param l - `Line`
 * @returns `number`
 */
export const getLength = (l: Line): number => length(getDirection(l));

/**
 * 2D line get Normal method (not unitized!)
 * @param l - `Line`
 * @returns `V2`
 */
export const getNormal = (l: Line): V2 => {
  const d = getDirection(l);
  return { x: d.y, y: -d.x };
};
