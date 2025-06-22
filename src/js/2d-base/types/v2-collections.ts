import { V2 } from './v2-type';

export type Line = { a: V2; b: V2 };
export type Ray = { o: V2; d: V2 };
export type PolylineV2 = { vs: V2[]; closed: false };
export type PolygonV2 = { vs: V2[]; closed: true };
