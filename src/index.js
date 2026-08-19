import { parse } from './parse.js';
import { format } from './format.js';

export { parse, toMs } from './parse.js';
export { format } from './format.js';
export { UNITS, ALIASES } from './units.js';

/**
 * Round-trip helper: normalize any duration string into canonical form.
 *
 * @example
 * normalize('90 minutes') // => '1h 30m'
 *
 * @param {string} input
 * @returns {string}
 */
export function normalize(input) {
  return format(parse(input));
}
