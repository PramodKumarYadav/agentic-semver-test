import { UNITS } from './units.js';

/**
 * Format a millisecond duration as a compact human-readable string.
 *
 * @example
 * format(5400000)          // => '1h 30m'
 * format(-45000)           // => '-45s'
 * format(0)                // => '0ms'
 * format(90061000, { long: true }) // => '1 day 1 hour 1 minute 1 second'
 * format(90061000, { units: 2 })   // => '1d 1h'
 *
 * @param {number} ms duration in milliseconds
 * @param {{ long?: boolean, separator?: string, units?: number }} [options]
 *   `units` caps the output at the N most significant non-zero units;
 *   the remainder is dropped, not rounded. Defaults to every unit.
 * @returns {string}
 * @throws {TypeError} when ms is not a finite number
 * @throws {RangeError} when units is not a positive integer
 */
export function format(ms, options = {}) {
  if (typeof ms !== 'number' || !Number.isFinite(ms)) {
    throw new TypeError('format() expects a finite number of milliseconds');
  }

  const { long = false, separator = ' ', units = Infinity } = options;

  if (units !== Infinity && (!Number.isInteger(units) || units < 1)) {
    throw new RangeError('format() expects units to be a positive integer');
  }

  const sign = ms < 0 ? '-' : '';
  let remaining = Math.round(Math.abs(ms));

  if (remaining === 0) return long ? '0 milliseconds' : '0ms';

  const parts = [];
  for (const unit of UNITS) {
    if (parts.length === units) break;
    const value = Math.floor(remaining / unit.ms);
    if (value === 0) continue;
    remaining -= value * unit.ms;
    parts.push(long ? `${value} ${unit.long}${value === 1 ? '' : 's'}` : `${value}${unit.key}`);
  }

  return sign + parts.join(separator);
}
