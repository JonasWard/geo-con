import { τ, ε } from '../1d-base';
import { V2, V2Transform } from './types/v2-type';

/**
 * 2D Origin of coordinate space
 * @returns `V2`
 */
export const origin = (): V2 => ({ x: 0, y: 0 });

/**
 * 2D X Axis of coordinate space
 * @param s - (optional, default 1) the x coordinate size of the vector
 * @returns `V2`
 */
export const xAxis = (s: number = 1): V2 => ({ x: s, y: 0 });

/**
 * 2D Y Axis of coordinate space
 * @param s - (optional, default 1) the y coordinate size of the vector
 * @returns `V2`
 */
export const yAxis = (s: number = 1): V2 => ({ x: 0, y: s });

/**
 * 2D Addition of of vectors
 * @param a - first `V2`
 * @param b - ellipsis `V2[]` -> as many vectors as you want
 * @returns `V2`
 */
export const add = (...vs: V2[]): V2 => vs.reduce((v, vN) => ({ x: v.x + vN.x, y: v.y + vN.y }), origin());

/**
 * 2D Subtract of two vectors
 * @param a - `V2` vector to subtract from
 * @param b - `V2` vector to subtract with
 * @returns `V2`
 */
export const subtract = (a: V2, b: V2): V2 => ({ x: a.x - b.x, y: a.y - b.y });

/**
 * 2D Scaling of a vector with a value
 * @param v - `V2` vector to be scaled
 * @param s - `number` scale factor
 * @returns - `V2`
 */
export const scale = (v: V2, s: number): V2 => ({ x: v.x * s, y: v.y * s });

/**
 * 2D Dot product between two vectors
 * @param a - first `V2`
 * @param b - second `V2`
 * @returns `number`
 */
export const dot = (a: V2, b: V2): number => a.x * b.x + a.y * b.y;

/**
 * 2D Cross product between two vectors (the z value of a 3D cross product)
 * @param a - first `V2`
 * @param b - second `V2`
 * @returns `number`
 */
export const cross = (a: V2, b: V2): number => a.x * b.y - a.y * b.x;

/**
 * 2D Square length of vector
 * @param v - `V2`
 * @returns `number`
 */
export const squareLength = (v: V2): number => dot(v, v);

/**
 * 2D Length of vector
 * @param v - `V2`
 * @returns `number`
 */
export const length = (v: V2): number => squareLength(v) ** 0.5;

/**
 * 2D Unit vector of vector, will throw error if length of v is smaller than ε
 * @param v - `V2`
 * @returns number
 */
export const unit = (v: V2): V2 => {
  const l = length(v);
  if (l < ε) throw new Error(`could not compute unit vector, length ${l} is smaller than ε ${ε}`);
  return scale(v, 1 / l);
};

/**
 * 2D Distance between two vectors
 * @param a - `V2`
 * @param b - `V2`
 * @returns `number`
 */
export const distance = (a: V2, b: V2): number => length(subtract(a, b));

/**
 * 2D Positive angle between two vectors
 * @param a - first `V2`
 * @param b - second `V2`
 * @returns `number` - [0, τ]
 */
export const vectorAngle = (a: V2, b: V2): number => (Math.atan2(a.y, a.x) - Math.atan2(b.y, b.x) + τ) % τ;

/**
 * 2D Positive angle between three vectors
 * @param o - corner point `V2`
 * @param a - starting vector `V2`
 * @param b - end vector `V2`
 * @returns `number` - [0, τ]
 */
export const threePointAngle = (o: V2, a: V2, b: V2): number => vectorAngle(subtract(a, o), subtract(b, o));

/**
 * 2D Base find t-parameter on Ray in function of Vector
 * When you don't provide a unit d vector, your might end up with weird results
 * @param o - `V2` - vector on ray
 * @param d - `V2` - direction vector of ray
 * @param v - `V2` - vector to evaluate ray for
 * @returns `number`
 */
export const tParameterOnRay = (o: V2, d: V2, v: V2): number => dot(subtract(v, o), d);

/**
 * 2D Normal for given Vector
 * @param v - `V2`
 * @returns `V2`
 */
export const normal = (v: V2): V2 => ({ x: v.y, y: -v.x });

/**
 * 2D Center for point collection
 * @param vs - `V2`
 * @returns - `V2`
 */
export const center = (vs: V2[]): V2 => scale(add(...vs), 1 / vs.length);

/**
 * 2D Rotation creation
 * @param a - `number` - angle in radians
 * @returns - `V2Transform`
 */
// prettier-ignore
export const rotation = (a: number): V2Transform => [
  Math.cos(a), -Math.sin(a), 0,
  Math.sin(a), Math.cos(a), 0,
  0, 0, 1
];

/**
 * 2D Scaling creation
 * @param s - `number` - scaling of x direction (and y if no yS given)
 * @param yS - `number` - optional, if left open scaling is homogeneous
 * @returns - `V2Transform`
 */
// prettier-ignore
export const scaling = (s: number, yS?: number): V2Transform => [
  s, 0, 0,
  0, yS === undefined ? s : yS, 0,
  0, 0, 1
];

/**
 * 2D Skewing creation
 * @param s - `number` - angle in radians, scaling of x direction (and y if no yS given)
 * @param yS - `number` - angle in radians, optional, if left open scaling is homogeneous
 * @returns - `V2Transform`
 */
// prettier-ignore
export const skewing = (s: number, yS?: number): V2Transform => [
  1, Math.tan(s), 0,
  Math.tan( yS === undefined ? s : yS),1, 0,
  0, 0, 1
];

/**
 * 2D Mirror creation
 * @param x - `boolean` default = true - angle in radians, scaling of x direction (and y if no yS given)
 * @param y - `boolean` default = false - angle in radians, optional, if left open scaling is homogeneous
 * @returns - `V2Transform`
 */
// prettier-ignore
export const mirroring = (x: boolean = true, y: boolean = false): V2Transform => [
  x ? -1 : 1, 0, 0,
  0, y ? -1 : 1, 0,
  0, 0, 1
];

/**
 * 2D Translation creation
 * @param v - `V2` - vector to translate with
 * @returns - `V2Transform`
 */
// prettier-ignore
export const translating = (v: V2): V2Transform => [
  1, 0, v.x,
  0, 1, v.y,
  0, 0, 1
];

/**
 * 2D Identitity Transformation creation
 * @returns - `V2Transform`
 */
// prettier-ignore
export const identitity = (): V2Transform => [
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
];

/**
 * Helper method that multiplies two 3x3 matrices represented as flat arrays (row-major order).
 * @param a - `V2Transform`
 * @param b - `V2Transform`
 * @returns Resulting matrix after multiplication
 */
// prettier-ignore
const multiplyMatrix3x3 = (a: V2Transform, b: V2Transform): V2Transform => [
  a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
  a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
  a[0] * b[2] + a[1] * b[5] + a[2] * b[8],

  a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
  a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
  a[3] * b[2] + a[4] * b[5] + a[5] * b[8],

  a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
  a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
  a[6] * b[2] + a[7] * b[5] + a[8] * b[8],
];

/**
 * 2D Transformation combining, first one is first executed
 * It achieves this by creating a copy of the given array and inversing that array
 * @param ts - `V2Transform[]` - transformations to combine
 * @returns - `V2Transform`
 */
// prettier-ignore
export const transformationCombining = (...ts: V2Transform[]): V2Transform => [...ts].reverse().reduce((tA, tB) => multiplyMatrix3x3(tA, tB), identitity())

/**
 * 2D Transform of V2
 * @param v - `V2`
 * @param t - `V2Transform`
 * @returns `V2`
 */
export const transform = (v: V2, t: V2Transform): V2 => ({
  x: t[0] * v.x + t[1] * v.y + t[2],
  y: t[3] * v.x + t[4] * v.y + t[5]
});

/**
 * 2D Bounding Box Method
 * @param vs - `V2[]`
 * @returns `V2`
 */
export const getBoundingBox = (vs: V2[]): { min: V2; max: V2 } => ({
  min: { x: vs.reduce((a, b) => (a < b.x ? a : b.x), Infinity), y: vs.reduce((a, b) => (a < b.y ? a : b.y), Infinity) },
  max: { x: vs.reduce((a, b) => (a > b.x ? a : b.x), -Infinity), y: vs.reduce((a, b) => (a > b.y ? a : b.y), -Infinity) }
});
