import test from 'node:test';
import assert from 'node:assert/strict';
import { parse, toMs } from '../src/index.js';

test('parses a single unit', () => {
  assert.equal(parse('1h'), 3600000);
  assert.equal(parse('45s'), 45000);
  assert.equal(parse('250ms'), 250);
});

test('parses compound durations', () => {
  assert.equal(parse('1h 30m'), 5400000);
  assert.equal(parse('1d 2h 3m 4s'), 93784000);
});

test('accepts long unit names and mixed case', () => {
  assert.equal(parse('2 Days'), 172800000);
  assert.equal(parse('3 WEEKS'), 1814400000);
});

test('accepts fractional and negative amounts', () => {
  assert.equal(parse('2.5h'), 9000000);
  assert.equal(parse('-45s'), -45000);
});

test('tolerates commas and extra whitespace', () => {
  assert.equal(parse('  1h,  30m '), 5400000);
});

test('returns 0 for an empty string', () => {
  assert.equal(parse(''), 0);
  assert.equal(parse('   '), 0);
});

test('rejects non-string input', () => {
  assert.throws(() => parse(42), TypeError);
  assert.throws(() => parse(null), TypeError);
});

test('rejects unknown units and garbage', () => {
  assert.throws(() => parse('5 fortnights'), SyntaxError);
  assert.throws(() => parse('soon'), SyntaxError);
});

test('toMs is a deprecated alias of parse', () => {
  assert.equal(toMs('1h'), parse('1h'));
});
