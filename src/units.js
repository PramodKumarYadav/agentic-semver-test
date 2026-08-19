/**
 * Canonical unit table. Every value is expressed in milliseconds.
 * Ordered largest-first so formatters can walk it directly.
 */
export const UNITS = [
  { key: 'w', ms: 604800000, long: 'week' },
  { key: 'd', ms: 86400000, long: 'day' },
  { key: 'h', ms: 3600000, long: 'hour' },
  { key: 'm', ms: 60000, long: 'minute' },
  { key: 's', ms: 1000, long: 'second' },
  { key: 'ms', ms: 1, long: 'millisecond' },
];

/** Every spelling we accept on input, mapped to its millisecond value. */
export const ALIASES = new Map([
  ['ms', 1],
  ['msec', 1],
  ['msecs', 1],
  ['millisecond', 1],
  ['milliseconds', 1],
  ['s', 1000],
  ['sec', 1000],
  ['secs', 1000],
  ['second', 1000],
  ['seconds', 1000],
  ['m', 60000],
  ['min', 60000],
  ['mins', 60000],
  ['minute', 60000],
  ['minutes', 60000],
  ['h', 3600000],
  ['hr', 3600000],
  ['hrs', 3600000],
  ['hour', 3600000],
  ['hours', 3600000],
  ['d', 86400000],
  ['day', 86400000],
  ['days', 86400000],
  ['w', 604800000],
  ['wk', 604800000],
  ['wks', 604800000],
  ['week', 604800000],
  ['weeks', 604800000],
]);
