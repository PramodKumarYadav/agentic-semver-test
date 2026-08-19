# Changelog

## 1.1.1 - 2026-08-19

- Summary: Documentation-only change adding six practical recipe examples to the README. No source code, API, or test modifications. This is a maintenance update that improves developer experience without affecting functionality or compatibility.
- Added Recipes section to README with six worked examples covering common use cases
- Documented `units` option usage introduced in 1.1.0
- Included examples for config TTLs, relative timestamps, precision trimming, input canonicalization, duration summing, and sorting

## 1.1.0 - 2026-08-19

- Summary: Adds a new backwards-compatible `units` option to the `format()` function that caps output at N most significant non-zero units, enabling concise duration rendering for UI constraints.
- Add `units` option to `format()` to limit output to N most significant units
- Add validation for `units` option with RangeError for invalid values
- Update documentation in README and JSDoc to describe the new `units` parameter
- Update CI workflow to test on Node 22 and 24 instead of 20 and 22
## [1.0.0] - 2026-08-19

### Added

- `parse(input)` — parses human-readable durations (`'1h 30m'`, `'2.5 days'`, `'-45s'`)
  into milliseconds, with support for short and long unit names.
- `format(ms, options)` — renders milliseconds back into a compact or long-form
  duration string, with a configurable separator.
- `normalize(input)` — round-trips a duration string through `parse` and `format`.
- `UNITS` and `ALIASES` unit tables exported for introspection.
- `toMs` as a deprecated alias of `parse` for consumers migrating from 0.x.
