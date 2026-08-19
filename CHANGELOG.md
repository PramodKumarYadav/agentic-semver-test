# Changelog

## 1.2.0 - 2026-08-19

- Summary: Added year unit aliases (y/yr/yrs/year/years) to parse() function. Each year is treated as 365 days for input parsing only. This is a backward-compatible enhancement that adds new functionality without breaking existing behavior.
- Added year unit aliases (y, yr, yrs, year, years) to parse() function, treating each year as 365 days
- Year units are input-only; format() and normalize() continue using weeks as the largest unit
- Updated workflow to mint GitHub App token for bump commits to re-trigger CI checks
- Added pre-bump test execution gate in semver workflow to prevent versioning PRs with failing tests

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
