import { τ } from './constants';

/**
 * Method that returns a value constrained between a given min and max value
 * @param v - `number` - value to constrain
 * @param minValue - `number` - minimum value the value can take
 * @param maxValue - `number` - maximum value the value can be
 * @returns `number` ∈ [minValue, maxValue]
 */
export const clamp = (v: number, minValue: number, maxValue: number) => Math.max(Math.min(v, maxValue), minValue);

/**
 * Method to linearly interpolate a value as being a member of one range to an anther
 * @param v - `number` value to map
 * @param from - `[number, number]` - range to map from
 * @param to - `[number, number]` - range to map to
 * @returns `number`
 */
export const lerp = (v: number, from: [number, number], to: [number, number]): number =>
  to[0] + ((v - from[0]) * (to[1] - to[0])) / (from[1] - from[0]);

/**
 * Method that converts a degree angle into radians
 * @param a - `number` - angle in degrees
 * @returns `number` (radians)
 */
export const radians = (a: number) => (a * τ) / 360;

/**
 * Method that converts a degree angle into degrees
 * @param a - `number` - angle in radians
 * @returns `number` (degrees)
 */
export const degrees = (a: number) => (a * 360) / τ;
