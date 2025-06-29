import { test, expect } from 'bun:test';
import {
  add,
  center,
  cross,
  distance,
  dot,
  origin,
  tParameterOnRay,
  translating,
  xAxis,
  yAxis,
  transform,
  rotation,
  scaling,
  skewing,
  mirroring,
  transformationCombining,
  scale,
  normal,
  getBoundingBox
} from '../v2-logic';
import { τ } from '../../1d-base';

test('origin', () => expect(origin()).toStrictEqual({ x: 0, y: 0 }));
test('xAxis', () => expect(xAxis()).toStrictEqual({ x: 1, y: 0 }));
test('xAxis 2', () => expect(xAxis(2)).toStrictEqual({ x: 2, y: 0 }));
test('yAxis', () => expect(yAxis()).toStrictEqual({ x: 0, y: 1 }));
test('yAxis 2', () => expect(yAxis(2)).toStrictEqual({ x: 0, y: 2 }));
test('scale', () => expect(scale(yAxis(), 2)).toStrictEqual({ x: 0, y: 2 }));
test('normal', () => expect(normal(yAxis())).toStrictEqual({ x: 1, y: -0 }));

test('add', () => expect(add(origin(), xAxis(), yAxis())).toStrictEqual({ x: 1, y: 1 }));
test('center', () => expect(distance(center([origin(), xAxis(), yAxis()]), { x: 0.333, y: 0.333 })).toBeCloseTo(0, 3));
test('dot', () => expect(dot(xAxis(1), xAxis(1))).toEqual(1));
test('dot 0', () => expect(dot(xAxis(10), yAxis(10))).toEqual(0));
test('cross 0', () => expect(cross(xAxis(1), xAxis(1))).toEqual(0));
test('cross', () => expect(cross(xAxis(1), yAxis(1))).toEqual(1));

test('evaluate t parameter', () => expect(tParameterOnRay(origin(), xAxis(), yAxis())).toBe(0));
test('evaluate t parameter', () => expect(tParameterOnRay(origin(), xAxis(), xAxis(3))).toBe(3));
test('evaluate t parameter', () => expect(tParameterOnRay(origin(), xAxis(2), xAxis(3))).toBe(6));
test('evaluate t parameter', () => expect(tParameterOnRay({ x: 5, y: 5 }, xAxis(), xAxis(10))).toBe(5));
test('evaluate t parameter', () => expect(tParameterOnRay(origin(), xAxis(2), add(xAxis(3), yAxis()))).toBe(6));

test('translation', () => expect(transform(origin(), translating({ x: 1, y: 1 }))).toStrictEqual({ x: 1, y: 1 }));
test('rotation τ / 4', () => expect(transform(xAxis(), rotation(τ / 4)).y).toBeCloseTo(1));
test('rotation τ / 8', () => expect(transform(xAxis(), rotation(τ / 8)).y).toBeCloseTo(1 / 2 ** 0.5));
test('scaling', () => expect(transform({ x: 1, y: 1 }, scaling(2))).toStrictEqual({ x: 2, y: 2 }));
test('scaling', () => expect(transform({ x: 1, y: 1 }, scaling(2, 3))).toStrictEqual({ x: 2, y: 3 }));
test('skewing', () => expect(transform({ x: 1, y: 1 }, skewing(τ / 10)).x).toBeCloseTo(1.726542528005424));
test('skewing', () => expect(transform({ x: 1, y: 1 }, skewing(τ / 10)).y).toBeCloseTo(1.726542528005424));
test('skewing', () => expect(transform({ x: 1, y: 1 }, skewing(τ / 10, 0)).x).toBeCloseTo(1.726542528005424));
test('skewing', () => expect(transform({ x: 1, y: 1 }, skewing(τ / 10, 0)).y).toStrictEqual(1));
test('mirror x', () => expect(transform({ x: 1, y: 1 }, mirroring(true))).toStrictEqual({ x: -1, y: 1 }));
test('mirror y', () => expect(transform({ x: 1, y: 1 }, mirroring(false, true))).toStrictEqual({ x: 1, y: -1 }));
test('mirror xy', () => expect(transform({ x: 1, y: 1 }, mirroring(true, true))).toStrictEqual({ x: -1, y: -1 }));

test('rotate around point', () =>
  expect(
    transform(
      { x: 1, y: 1 },
      transformationCombining(translating(scale({ x: 2, y: 2 }, -1)), rotation(τ / 4), translating({ x: 2, y: 2 }))
    ).x
  ).toBeCloseTo(3));
test('rotate around point', () =>
  expect(
    transform(
      { x: 1, y: 1 },
      transformationCombining(translating(scale({ x: 2, y: 2 }, -1)), rotation(τ / 4), translating({ x: 2, y: 2 }))
    ).y
  ).toBeCloseTo(1));

test('getBoundingBox', () =>
  expect(
    getBoundingBox([
      { x: -1, y: 2 },
      { x: 3, y: -4 },
      { x: -2, y: 6 },
      { x: -4, y: 2 },
      { x: 0, y: 0 }
    ])
  ).toStrictEqual({ min: { x: -4, y: -4 }, max: { x: 3, y: 6 } }));