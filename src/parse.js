import { ALIASES } from './units.js';

// Matches one "<number><unit>" pair, e.g. "1.5h" or "30 m".
const TOKEN = /(-?\d+(?:\.\d+)?)\s*([a-z]+)/g;

/**
 * Parse a human-readable duration into milliseconds.
 *
 * @example
 * parse('1h 30m')  // => 5400000
 * parse('-45s')    // => -45000
 * parse('2.5 days')// => 216000000
 * parse('1y')     // => 31536000000 (a year is 365 days, input only)
 *
 * @param {string} input duration string
 * @returns {number} duration in milliseconds; 0 for an empty string
 * @throws {TypeError} when input is not a string
 * @throws {SyntaxError} when a token cannot be understood
 */
export function parse(input) {
  if (typeof input !== 'string') {
    throw new TypeError(`parse() expects a string, received ${typeof input}`);
  }

  const normalized = input.trim().toLowerCase();
  if (normalized === '') return 0;

  TOKEN.lastIndex = 0;
  let total = 0;
  let matched = 0;
  let consumed = 0;
  let match;

  while ((match = TOKEN.exec(normalized)) !== null) {
    const [token, amount, unit] = match;
    const factor = ALIASES.get(unit);
    if (factor === undefined) {
      throw new SyntaxError(`Unknown duration unit "${unit}" in "${input}"`);
    }
    total += Number(amount) * factor;
    matched += 1;
    consumed += token.length;
  }

  if (matched === 0) {
    throw new SyntaxError(`Could not parse duration from "${input}"`);
  }

  // Guard against silently ignoring garbage between tokens.
  const stripped = normalized.replace(/[\s,]+/g, '');
  if (consumed < stripped.replace(/\s/g, '').length) {
    throw new SyntaxError(`Unexpected trailing input in "${input}"`);
  }

  return total;
}

/**
 * @deprecated since 1.0.0 — use {@link parse} instead. Kept as an alias for
 * consumers migrating from the 0.x API.
 */
export const toMs = parse;
