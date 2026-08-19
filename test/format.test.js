import test from 'node:test';
import assert from 'node:assert/strict';
import { format, normalize } from '../src/index.js';

test('formats compact durations', () => {
  assert.equal(format(5400000), '1h 30m');
  assert.equal(format(1000), '1s');
  assert.equal(format(0), '0ms');
});

test('formats negative durations', () => {
  assert.equal(format(-45000), '-45s');
});

test('formats long durations with pluralized unit names', () => {
  assert.equal(format(90061000, { long: true }), '1 day 1 hour 1 minute 1 second');
  assert.equal(format(120000, { long: true }), '2 minutes');
});

test('honours a custom separator', () => {
  assert.equal(format(5400000, { separator: ', ' }), '1h, 30m');
});

test('rejects non-finite input', () => {
  assert.throws(() => format(Infinity), TypeError);
  assert.throws(() => format('1h'), TypeError);
});

test('normalize round-trips through parse and format', () => {
  assert.equal(normalize('90 minutes'), '1h 30m');
  assert.equal(normalize('3600 s'), '1h');
});
