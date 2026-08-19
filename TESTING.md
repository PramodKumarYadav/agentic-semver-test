# Test plan for `agentic-semver`

The repository ships with four prepared branches. Each one is a self-contained,
plausible change to the `humanms` library whose correct semver classification is
unambiguous. Open each as a PR into `main` and check what the action does.

Baseline version on `main`: **1.0.0**

| # | Branch | Change | Expected bump | Expected version | Expected label |
| --- | --- | --- | --- | --- | --- |
| 1 | `fix/parse-leading-plus` | Bug fix: `parse('+1h')` threw instead of parsing | `patch` | `1.0.1` | `patch` |
| 2 | `feat/max-units-option` | New backward-compatible `maxUnits` option on `format()` | `minor` | `1.1.0` | `minor` |
| 3 | `feat/strict-empty-input` | Breaking: `parse('')` now throws; deprecated `toMs` removed | `major` | `2.0.0` | `major` |
| 4 | `docs/readme-examples` | Documentation only, no source change | `patch` or skipped | `1.0.1` or unchanged | `patch` or none |

> Run them **one at a time** against a fresh `main`. Each merge moves the baseline,
> so opening all four at once means #2, #3 and #4 are being judged against a version
> that has already shifted. If you want to run them independently instead, reset
> `main` back to the `v1.0.0` tag between rounds.

---

## What to check on each run

1. **The PR comment.** `comment-summary: true` is enabled, so the action posts its
   recommendation, reasoning and the generated changelog entry.
2. **The label.** `major` / `minor` / `patch` should be applied to the PR.
3. **The auto-commit.** A `[skip ci]` commit should appear on the PR branch touching
   `package.json` and `CHANGELOG.md` — and nothing else.
4. **The changelog entry.** Should describe the *actual* change, under the right
   heading (`Added` / `Changed` / `Fixed` / `Removed`).
5. **The run summary.** `agentic-semver.yml` writes the raw action outputs to the job
   summary, which is the quickest place to see `bump` / `current-version` /
   `next-version` without opening the diff.
6. **After merge:** `release.yml` should create tag `vX.Y.Z` and a GitHub Release whose
   body is the matching `CHANGELOG.md` section. Re-running it must be a no-op
   (`released: 'false'`).

---

## Detail on each scenario

### 1. `fix/parse-leading-plus` → `patch`

The tokenizer regex only accepts an optional leading `-`, so `parse('+1h')` fell
through to the "could not parse" branch. The fix widens the sign group to `[-+]?`
and adds regression tests. No API surface changes, no behaviour changes for any
input that previously worked.

**Why patch:** a bug fix that is strictly backward compatible.

### 2. `feat/max-units-option` → `minor`

Adds a `maxUnits` option to `format()`, capping how many unit components are emitted
(`format(90061000, { maxUnits: 2 })` → `'1d 1h'`). The option defaults to `Infinity`,
so every existing call site is byte-for-byte unchanged.

**Why minor:** new functionality, added in a backward-compatible way.

### 3. `feat/strict-empty-input` → `major`

Two breaking changes in one PR:

- `parse('')` and `parse('   ')` now throw `SyntaxError` instead of returning `0`.
  Callers relying on the empty-string-is-zero behaviour will break.
- The deprecated `toMs` alias is removed from the public exports.

**Why major:** incompatible API changes.

### 4. `docs/readme-examples` → `patch` or skipped

Adds a usage-recipes section to the README. Nothing under `src/` or `test/` changes.

**Why ambiguous on purpose:** this one probes the action's judgement. A defensible
tool either classifies it as `patch` or skips it entirely as "no relevant files".
Both are fine — the point of the scenario is to see *which* it does, and whether it
says so clearly.

---

## Resetting between rounds

```bash
# put main back to the pristine 1.0.0 state
git checkout main
git reset --hard v1.0.0
git push --force origin main

# and delete the release/tag if you want a clean create-release run
gh release delete v1.0.1 --yes --cleanup-tag
```
