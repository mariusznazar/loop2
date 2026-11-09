PASS 563510db37ad30ef0d00814dfcab97e8aeaffe07

# Review of slice 3 (the report route of the server and the line it writes)

Range `7a1c8ea30bae1f4d70ba151ee12e15e1a3d34793..563510d` (two commits: `daff36e` code and tests, `563510d` part map). `git rev-parse HEAD` is `563510db37ad30ef0d00814dfcab97e8aeaffe07`, equal to the head given; `.the-way` is at `294af7fde45323ac1851c014a03071a97fc38d96`. No tracked file of the reviewed worktree was changed; mutation runs were made in a scratch copy (see Checks).

Counts: blocking 0, Minor 3, out of scope 1.

## Findings

### Critical

none

### Important

none

### Minor

1. **A threshold is an option of `AccountPolicy`, and the guideline says thresholds are not.** `src/server/account-policy.ts` (`PolicyOptions.browserReportLimit`, constructor) against `guidelines/coding-account-policy.md`, Examples, "Zegar w testach": "Pojemność tablic też jest opcją … wartości progów i okien opcjami nie są." The spec binds here (B2: "held where the other limits are held so a test can build it with a small limit and a clock"; task row of the slice says the same), so the code is right to follow the spec and the departure is not a defect of the slice. The consequence is for later code: the guideline's example now says the opposite of the exemplar file, and a next agent reading it would refuse or remove the option. The window stays a constant, which keeps the guideline's second half. Not blocking (an Example sentence, no invariant; the slice may not edit guidelines). Suggest the orchestrator schedule a one-sentence change of that example through the-way-maintain-coding-guidelines ("... except the browser report limit, which a test lowers").
2. **The new constructor check `Invalid browser report limit` has no test.** `src/server/account-policy.ts:198-204`. The sibling check `Invalid sending deadline` has none either, so the slice matches the file's habit; the effect is only that a mutation of the check survives. Cost: none today (the only caller passes a number or nothing).
3. **"First refusal of a window" is read as "first refusal with no `LIMITED` line in the last 60 minutes" (`refusalNoticeAt`).** `src/server/account-policy.ts:`  `admitBrowserReport`. Consequence: a second burst that fills the limit and is refused within 60 minutes of the earlier notice leaves no line of its own (the rolling case in `tests/http.test.mjs` pins this: refusal at minute 60 after a notice at minute 31 writes nothing). The executor documented the choice and its rejected alternative (up to 30 extra lines an hour under a sustained flood). Spec B2 does not say which; both readings keep the file and the watcher bounded. I judge the choice sound and not a missed requirement; the orchestrator may want it written in the cycle's return step so the watcher slice (which counts the `LIMITED` line) does not assume one line per burst.

### Out of scope

- A body `{"kind":"ReasonedFailure","code":"LIMITED","place":"account-routes.browserFailure"}` (all within the patterns) writes a `browser` report line with the same three words as the server's own drop notice, except that a real notice has no `accountId` and a forged one may. Anyone can therefore imitate the notice, and it counts against the same limit. The spec and D-353 accept false reports ("false reports reach the log and the watcher"); the watcher slice counts both with the browser kind. Not a defect of this slice.

## Points the handoff asked to weigh

- **Invariant `browser-failure-report` and its tests.** Seven cases of `tests/http.test.mjs` carry `// invariant: browser-failure-report` (they use the file's `//` form of the tag, as the other tags of that file do): the exact line and no request text; real `errorWords` and real places; `accountId` from the session only (own, another account's session with a query and header naming the first, bodies naming an account, forged key, unsigned, unknown and expired cookies); exact three string fields; patterns and lengths at their edges; limit with a small limit; default limit from 31 addresses. The transport case carries `account-request-transport`, the guards case `account-mutation-request-guards`. Each would fail if the property broke: a body field naming an account is refused 400 (case 3, case 4), a free-text field likewise (case 4 with `message`, `stack`, `email`), a wrong-shaped word (case 5 lists spaces, quote, brace, `@`, CR/LF, tab, NUL, ESC, DEL, non-ASCII, emoji, digit and underscore starts, `.` `/` `-` in kind and code, bad forms of place, 64/96 edges and one over). The expected lines are literal strings or `JSON.stringify` of the sent words, not a value the code computes.
- **Crafted input at the route, with the real guards.** Verified in `tests/http.test.mjs` and `tests/transport.test.mjs` by reading and by running: foreign, null, absent, duplicate Origin (403); text and form media, gzip (415); no proxy metadata, plain protocol (403); over 16 KiB (413); non-object, array, broken and empty bodies (400); other methods and a query form (JSON 404); forged, unsigned, unknown, expired and absent cookies (204, no `accountId`); a flood from many addresses (30 accepted, 31st 429, one `LIMITED` line); a report exactly at the reset (59 minutes refused and silent, 60 minutes accepted, a new window with its own notice). What the limiter can be made to hold: one array of at most 30 numbers and one number, whoever sends and however many requests; what the log can be made to hold: at most 30 report lines and 1 notice per hour from accepted bodies, each line below 200 characters, built from three pattern-checked words and a server-set `accountId`; refused bodies and refused requests write nothing. Regex: `place` uses a lookahead bound of 96 and a deterministic alternation (a separator is required before each further segment), so no catastrophic backtracking; JavaScript `$` without the `m` flag matches only at the end, so a trailing newline is refused (tested with `"ab\n"`).
- **`accountId` read from `request.session` instead of `sessionAccount`.** Faithful to spec B1 ("when the stored session names an account, that `accountId` goes on the line") and to `app.ts` `sessionFields`, which reads the same way for its own failure lines. `sessionAccount` would add a database read and a failure mode to a route meant to work while the game fails, and would drop a blocked account; blocking deletes the account's sessions, so the window is the same one `app.ts` already accepts. Not a finding.
- **Part map edit (`563510d`).** One sentence of `account-server` gains "accepts the report of a failure that the browser sends and writes it as one line of its log". It says what the part answers for, in the file's style, with no paths (WAY-42); Files, Depends on and Trust boundary are unchanged and still right (`src/server/**`, `tests/http.test.mjs`, `tests/transport.test.mjs` are already claimed). It matches the code. `python -B .the-way/elements/common/foundation_check.py` gives "0 errors".
- **Trust boundary and irreversible operation.** The range touches only `src/server/**`, `tests/**` and `foundations/part_map.md`. It prepares nothing for a server, installs nothing and runs nothing against one; `deploy/**` is not touched.

## Against the task, spec, foundation and guidelines

- B1: path added to `paths` (so the `router.all` gate covers every method: 503 without accounts, 403 without proxy metadata, JSON 404 for other methods) and to the `router.post` list with `mutationGuards(..., accountBodyLimit)`; no session required; `accountId` from the stored session only; exact three string fields via `stringFields`; patterns as B1 words them; 400 `invalid-request` and nothing written; 204 without body. Matches.
- B2: 30 per rolling 60 minutes, server-wide, in `AccountPolicy` with the clock the policy already takes; counted after the patterns pass; 429 `too-many-attempts`; one `LIMITED` line through `writeFailure("browser", "account-routes.browserFailure", new ReasonedFailure("LIMITED"))`, which begins `{"failure":"browser"`. Matches (see Minor 3 for the reading of "window").
- B3: `writeBrowserFailure` in `log-line.ts` writes `failure`, `kind`, `code`, `place`, `accountId` (omitted when undefined by `JSON.stringify`) and nothing else. Matches.
- D-104 / `account-mutation-request-guards`, D-110 / `account-request-transport`, `loop2-api-error-route`: kept, and each is exercised for the new route. D-252: one JSON line through `console`, no message, no stack, no request text. D-353 *violates* list: no body field other than the three words, origin guards in place. `guidelines/coding.md` (recording and identifiers in log lines, secrets and personal data): the report line is the spec-mandated closed-form line; `accountId` is the one identifier of the list. `guidelines/coding-http-application.md`: Express route, no new structure. `guidelines/testing.md`: the trust-boundary row asks a direct refusal test marked by the invariant and seen failing once; the executor's report shows the failing run first (10 of 83 and 3 of 11 failed before the code). The stale rows of that file ("siedmiu tras", "ósmej", "dziewięciu trasach") are the ones spec S2 schedules; not edited here, correctly.
- No reserved choice taken (no new library, store, login or place to run).
- Own-work check: the requirement named as most likely unmet (count after the pattern, one notice, rolling window) is the right weak spot; its three mutations are what I also found caught (below).
- No invariant test was changed by the range (`tests/invariants/**` untouched).

## Declined to judge

- Cost of a session lookup and cookie renewal per request for a public route with a valid cookie (the session middleware of `app.ts` runs for every account route alike): outside this slice.
- The wording of the stale rows of `guidelines/testing.md`: scheduled separately (S2).
- Browser side of B4 and the watcher's counting: other slices.

## Checks I ran (command and exit code)

In the reviewed worktree (`the root of the repository`):
- `npm test -- tests/http.test.mjs`: exit 0 (83 tests, 0 failed)
- `npm test -- tests/transport.test.mjs`: exit 0 (11)
- `npm test -- tests/invariants/test_loop2_api_error_route.py`: exit 0 (2)
- `npm test -- tests/startup.test.mjs`: exit 0 (18)
- `npm run typecheck`: exit 0
- `python -B .the-way/elements/common/foundation_check.py`: exit 0 ("0 errors")
- `node_modules/.bin/eslint src/server tests/http.test.mjs tests/transport.test.mjs`: exit 0
- `node_modules/.bin/prettier --check src/server tests/http.test.mjs tests/transport.test.mjs`: clean (it also flagged `foundations/part_map.md`, which I added to the command by my own choice; that file is not a prettier file of the repository, so not a finding)

Mutations, run in a scratch copy of the worktree (`a scratch directory of the orchestrator's session`, `node_modules` joined), each one `npm test -- tests/http.test.mjs`, each exit 1 with failing cases, so each mutation is caught:
- default limit 30 changed to 31: exit 1 (3 failing lines)
- `kind`/`code` word pattern allowing `.`: exit 1 (3)
- `paths.browserFailure` removed from the guarded `router.post` list: exit 1 (19)
- window 60 minutes changed to 30 minutes: exit 1 (5)

Not run: the whole gate (the cycle's own); `tests/quality/test_quality_invariants.py`.

## Reaches beyond the dispatch

- `.the-way/foundations/decisions.md` WAY-42 (grep for "responsibility", read the entry): to judge the part-map sentence against the rule of what is binding in a part-map entry.
- `src/server/app.ts` lines 15-120 and `src/server/account-routes.ts` lines 75-175 (`sessionFields`, `sessionAccount`, `stringFields`, `refuse`, the session middleware): to compare the direct session read and the helpers the route reuses. Both are on the handoff's Read list (`src/server/app.ts`); the line ranges of `account-routes.ts` are the file I was asked to review.
- `guidelines/coding.md` sections "Recording a failure" to "Logging scope" and `guidelines/testing.md` "Trust boundaries": both on the Read list; named here because I read them by section.

## Searches not found or unclear

- The handoff says the invariant tag is written `# invariant: <name>`; the JavaScript tests use `// invariant: <name>`, as the rest of the test files do. Not a defect; named so the orchestrator does not look for the `#` form.
- No other: the Read list was found, and the ranges of the foundation entries matched the files.
