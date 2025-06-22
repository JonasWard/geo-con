import { test, expect } from 'bun:test';
import { clamp, lerp } from '../d1-math';

test('clamp in range test', () => expect(clamp(0, -1, 1)).toBe(0));
test('clamp smaller than range test', () => expect(clamp(0, 1, 2)).toBe(1));
test('clamp larger than range test', () => expect(clamp(0, -2, -1)).toBe(-1));

test('lerp standard', () => expect(lerp(0.5, [0, 1], [1, 2])).toBe(1.5));
test('lerp standard', () => expect(lerp(0.25, [0, 1], [1, 2])).toBe(1.25));
test('lerp inverse ranges', () => expect(lerp(0.5, [1, 0], [2, 1])).toBe(1.5));
test('lerp inverse ranges', () => expect(lerp(0.25, [1, 0], [2, 1])).toBe(1.25));
test('lerp inverse ranges', () => expect(lerp(0.25, [1, 0], [1, 2])).toBe(1.75));
test('lerp from zero length', () => expect(lerp(0.25, [0, 0], [1, 2])).toBe(Infinity));
test('lerp to zero length', () => expect(lerp(0.25, [1, 2], [2, 2])).toBe(2));
