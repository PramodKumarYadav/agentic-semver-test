# Changelog

## 1.1.0 - 2026-08-19

- Summary: Adds a new optional `units` parameter to the `format()` function that limits output to the N most significant non-zero duration units, improving display flexibility for space-constrained UIs while maintaining full backward compatibility.
- Add `units` option to `format()` to cap output at N most significant units
- Add validation to throw `RangeError` when `units` is not a positive integer
- Update README and JSDoc with `units` parameter documentation and examples
- Add 7 new test assertions covering units capping, edge cases, and validation

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-08-19

### Added

- `parse(input)` — parses human-readable durations (`'1h 30m'`, `'2.5 days'`, `'-45s'`)
  into milliseconds, with support for short and long unit names.
- `format(ms, options)` — renders milliseconds back into a compact or long-form
  duration string, with a configurable separator.
- `normalize(input)` — round-trips a duration string through `parse` and `format`.
- `UNITS` and `ALIASES` unit tables exported for introspection.
- `toMs` as a deprecated alias of `parse` for consumers migrating from 0.x.
