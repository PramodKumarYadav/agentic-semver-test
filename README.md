# agentic-semver-test

A deliberately small, deliberately boring library that exists for one reason: to give
[`PramodKumarYadav/agentic-semver`](https://github.com/PramodKumarYadav/agentic-semver)
something real to version.

The library itself is **humanms** — a zero-dependency duration parser and formatter.
It is real enough that a diff against it looks like a diff against a real package
(public API, JSDoc, tests, semver contract), and small enough that you can read the
whole thing in two minutes and know exactly what bump a given change *should* produce.

See [TESTING.md](./TESTING.md) for the test scenarios and their expected bumps.

---

## The library

```js
import { parse, format, normalize } from 'humanms';

parse('1h 30m');                    // => 5400000
parse('2.5 days');                  // => 216000000
parse('-45s');                      // => -45000

format(5400000);                    // => '1h 30m'
format(90061000, { long: true });   // => '1 day 1 hour 1 minute 1 second'
format(5400000, { separator: ', ' });// => '1h, 30m'
format(90061000, { units: 2 });     // => '1d 1h'

normalize('90 minutes');            // => '1h 30m'
```

### API

| Export | Description |
| --- | --- |
| `parse(input)` | Duration string → milliseconds. Throws `TypeError` on non-strings, `SyntaxError` on unparseable input. Returns `0` for an empty string. |
| `format(ms, options?)` | Milliseconds → duration string. Options: `long` (spelled-out units), `separator`, `units` (cap at the N most significant units). |
| `normalize(input)` | `format(parse(input))` — canonicalizes a duration string. |
| `toMs` | Deprecated alias of `parse`, kept for 0.x consumers. |
| `UNITS`, `ALIASES` | The unit tables, exported for introspection. |

Supported units: `ms`, `s`, `m`, `h`, `d`, `w` plus their long forms
(`second(s)`, `minute(s)`, `hour(s)`, `day(s)`, `week(s)`, …), case-insensitive.

### Run the tests

```bash
npm test   # node --test, no install step required
```

---

## The versioning setup

Three workflows live in `.github/workflows`:

| Workflow | Trigger | What it does |
| --- | --- | --- |
| `ci.yml` | PR + push to `main` | Runs `npm test` on Node 20 and 22 |
| `agentic-semver.yml` | PR into `main` | Runs `npm test`, then the action: classifies the diff, bumps `package.json`, updates `CHANGELOG.md`, labels the PR, comments the summary |
| `release.yml` | push to `main` | Runs `create-release`: tags `vX.Y.Z` and cuts a GitHub Release from the changelog section |

`package.json` is the version file (it is first in the action's auto-detection order,
so no `version-file-path` input is needed). Starting version: **1.0.0** — chosen so that
a major bump lands on a clean `2.0.0` and is impossible to misread.

### One-time setup

1. Add a repository secret `ANTHROPIC_API_KEY` (Settings → Secrets and variables → Actions).
2. Settings → Actions → General → Workflow permissions → **Read and write permissions**,
   and tick **Allow GitHub Actions to create and approve pull requests**.
3. Optional: create the labels `major`, `minor`, `patch` so `apply-label` has something
   to attach. The action creates them on demand if they are missing.
4. Required only because `main` gates merges on the **Recommend and apply version bump**
   status check: create a GitHub App with repository permissions `contents: write`,
   `pull requests: write`, `issues: write`, install it on this repository, and store its
   credentials as `SEMVER_APP_ID` and `SEMVER_APP_PRIVATE_KEY`
   (`gh secret set SEMVER_APP_PRIVATE_KEY < your-app.private-key.pem`).

   Pushes made with `GITHUB_TOKEN` do not start workflow runs, so the bump commit the
   action pushes would land on the PR head with no check results and hold the merge.
   `agentic-semver.yml` mints an App token and hands it to **both** `actions/checkout`
   and the action — the `token:` on the checkout step is what sets the push identity.
   Without the two secrets the workflow falls back to `GITHUB_TOKEN` and still works;
   only the re-trigger is lost.

## License

MIT
