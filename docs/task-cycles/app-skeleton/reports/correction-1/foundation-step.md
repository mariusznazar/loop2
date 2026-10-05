# Foundation step — correction 1 (task/app-skeleton)

Worktree `C:\Storage\repos\loop2-skeleton`, branch `task/app-skeleton`. the-way pinned at
`96c52488752701ffa321ca69c0c2aa2dd3e46d2d`; `git -C .the-way rev-parse HEAD` equals the gitlink
`git ls-files --stage -- .the-way` records. Base (fork point) `91ee59e295b8e0b024c4af1d4d1318738ab8f29e`
= `origin/main` (local `main` is stale at `90d55b7`; not used). Nothing committed; no git state changed.

Read in full: `.the-way/elements/common/way_of_working.md`, `rules.md`; the decisions, invariants,
environment-facts and glossary skills and templates and examples (WAY-03; `log-entry-field-presence`,
`decision-guard-overdue-review`, `file-part-assignment`, `fingerprint-definition`,
`return-step-record`; the-way's `environment_facts.md` entries); WAY-126, WAY-114, WAY-19, WAY-17,
WAY-71, WAY-73, WAY-90; all of `foundations/`; the definition's Technology, Projected foundation
changes (the entries written and proposed, all projected invariants near them, the Glossary and
Environment facts sections) and Gate record; both glossaries.

## Entries written into `foundations/`

All copied verbatim from `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md`;
*Approved by* `Mariusz, 2026-10-04` transcribed from the gate record (line 2337). No translation
written into the foundation.

| Entry | File | Fingerprint (binding part) |
|---|---|---|
| `node-24-support-schedule/1` | `foundations/environment_facts.md` | `6096d00e` — equals the one D-01's *Based on* cites; the facts guard's merge run, which compares it, reports 0 errors |
| `D-01/1` — What runs the account and save server? | `foundations/decisions.md` | `e57a4766` |
| `D-02/1` — How does the account and save server handle HTTP requests? | `foundations/decisions.md` | `06e6d3d8` |
| `D-03/1` — How is the browser view built? | `foundations/decisions.md` | `fb5aa3b0` |
| `account-server-runtime/1` | `foundations/invariants.md` | `51d63162` |
| `account-server-typecheck/1` | `foundations/invariants.md` | `f576b8cc` |
| `account-server-express-http/1` | `foundations/invariants.md` | `6b29f5b5` |
| `browser-view-framework/1` | `foundations/invariants.md` | `bf7d386f` |
| `loop2-api-error-route/1` | `foundations/invariants.md` | `a6ff5b60` |
| glossary term `program` | `foundations/glossary.md` | (glossary entries carry no fingerprint) |

Fingerprints were computed with `.the-way/relation-model/fingerprint.py` (a fact: sentence + line
break + *Holds for*, as `entry_fingerprint` in the facts guard does); the merge runs of the guards,
which compare every carried fingerprint with the current binding part, reported no fingerprint error.

Mechanical check of the fact's source (skill step 4): `https://raw.githubusercontent.com/nodejs/release/72fdab20216c5f04e0a0fe72a225c2504e9f2b42/README.md`
opened (HTTP 200) on 2026-10-05; "## Release schedule" stands; the 24.x row reads End-of-life
`2028-04-30`; "Dates are subject to change." stands word for word.

## Fields the gate left `TODO` (or gave another value) and what was written

| Entry · field | Written | Source |
|---|---|---|
| D-01, D-02, D-03 · *Scope* | `TODO — the part map holds no part yet` | R2; `foundations/part_map.md` holds no part |
| D-01 · *Relations* | `TODO — derives from the projected decision "How is the work of the game split between the server and the browser?" of C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md` | R2; gate text with "this definition" replaced by the path, since the foundation has no "this" |
| D-02 · *Relations* | `derives from D-01@e57a4766` | R2; gate `TODO — derives from the projected decision "What runs the account and save server?"`; fingerprint read off |
| D-03 · *Relations* | `TODO — derives from the projected decision "What is the game built with?" of <definition path>` | R2 |
| 5 invariants · *Method* | `` `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl` `` | R2. The template allows the shared form: "One run may check many invariants", and a Python-interpreter command may name what is not yet written (WAY-105); `.runs/` is in `.gitignore`. Note for the check writers: `run_tests.py` runs `test_*.py` unittest files only, so the checks must be Python files even though the product's own tests are `node:test` `.mjs` |
| account-server-runtime, account-server-typecheck · *Derives from* | `D-01@e57a4766` | R2; read off |
| account-server-express-http · *Derives from* | `D-02@06e6d3d8` | R2; read off |
| browser-view-framework · *Derives from* | `D-03@fb5aa3b0` | R2; read off |
| loop2-api-error-route · *Derives from* | `TODO — "What serves the built game and account requests in the container?", projected in C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md` | gate wording kept verbatim (already the projected-mode TODO form; no backticks — the guard reads both alike) |
| 5 invariants · *Part* / *Rests on* / *Correction* | `every` / `none` / `none` | gate wording |
| node-24-support-schedule · *Method* | `TODO` | gate wording |

Every other field is the gate's text unchanged, including D-02's `level 1 — invariant: …` (Q1).

## Partial entries (not written)

Drafted, UNAPPROVED, in `docs\task-cycles\app-skeleton\reports\correction-1\partial-proposals.md`:
D-04/1 (proposed) "What is the game built with?" — first sentence only, fingerprint `b703ab2a`;
D-05/1 (proposed) "What serves the built game and account requests in the container?" — no container
and no account routes, fingerprint `e11aec4d`. Each with its Polish translation, a table of fields
that differ from the gate, and the follow-on change: D-03 *Relations* → `derives from D-04@b703ab2a`;
loop2-api-error-route *Derives from* → `D-05@e11aec4d`. Both were trial-run against the guards in
place and the files restored (verified: no `D-04`/`D-05` left in `foundations/`).

## Search of the whole foundation (step 2)

- **Product foundation before this change:** no decision, invariant, fact, term or part; no withdrawn
  identifiers. No collision, no duplicate question, no identifier clash: the six identifiers are new
  and distinct across the invariants and facts files (the part map has none).
- **Collisions between the new decisions:** none. D-02 derives from D-01. The projected serving
  decision narrows D-02 (handled in proposal (b)).
- **Missing links (stay `TODO`, block the merge):** D-01 → work-split decision; D-03 → "What is the
  game built with?" (resolved by proposal (a)); loop2-api-error-route → serving decision (resolved by
  proposal (b)); *Scope* of D-01..D-03 → no parts.
- **Glossary — projected terms in the written entries:** searched all 19 projected terms (and plural
  forms) in the written entries: only **`program`**, in D-03's *Rationale* ("the updates of the
  program editor"). The rules count a rationale (rules.md "Terms of the glossary"; WAY-126 "with the
  projected terms … it uses"), so `program` was written whole from the definition's line 2120
  (R5). No other projected term occurs. No the-way term is used in another meaning.
- **`program` has a second meaning in the files its uses are searched in:** `format_guard.py --uses
  program` lists 10 uses: 1 in D-03, 9 in the-way's invariants and environment-facts templates, all
  "the program a command runs". See Q4.
- **`program`'s definition uses two more projected terms** — "program rules" and "trip plan" — which
  are not written. See Q3.
- **WAY-90 (citation or fact entry):** D-02's *Based on* quotes the Express 5 documentation while its
  *Review when* waits for "Express 5 no longer supports the server's required request handling";
  D-01's quoted "no type checking is performed" is the reason for its second sentence. Each could be
  read as a citation that, if it stopped being true, would send the decision to review, which WAY-90
  makes a fact entry. The quoted citations also do not follow WAY-80's `§ place — "passage"; read`
  form. The decisions guard flags neither. The gate wording was kept unchanged. A finding for the
  human, not a question that blocks this step.
- **What the code shows:** the written entries match the skeleton: TypeScript server on Node
  (`engines.node` `24.x`, `typescript` 6.0.3, `npm run typecheck`), Express `5.2.1`, a browser
  `main.ts` using the DOM only, `/api` → JSON 404 before `express.static`. Note: no deployment exists
  yet, so "before deployment" (D-01, account-server-typecheck) and "deployment use Node.js major
  version 24" (account-server-runtime) can be checked only against what the repository declares.
  That is the check writers' concern; nothing to change in the entries.
- **Seen during the step:** an untracked `tests/invariants/` appeared in the worktree. It is another
  agent's work (WAY-69), and I did not touch it.

## Guard runs (from the repository root)

`B=91ee59e295b8e0b024c4af1d4d1318738ab8f29e`

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/decisions/format_guard.py foundations/decisions.md --base $B` | 0 | 0 errors, 5 warnings: `:9` *Scope* is `TODO`; `:11` *Relations* is `TODO`; `:26` *Scope* is `TODO`; `:50` *Scope* is `TODO`; `:52` *Relations* is `TODO` |
| same `--base $B --merge-onto $B` | 1 | 5 errors, the same five as errors: D-01 *Scope* `:9`, D-01 *Relations* `:11`, D-02 *Scope* `:26`, D-03 *Scope* `:50`, D-03 *Relations* `:52` — "`TODO`, which a merge onto the main branch does not take" (+ the 5 warnings) |
| `python -B .the-way/elements/invariants/format_guard.py foundations/invariants.md --base $B` | 1 | 1 error: `foundations/invariants.md:0: error: decisions.md:29: the level 1 verification of D-02/1 names no invariants as `level 1 — invariants: <identifier> · <identifier>.`` (Q1); 1 warning: `:49` loop2-api-error-route *Derives from* holds `TODO` |
| same `--base $B --merge-onto $B` | 1 | 2 errors: the D-02 error above; `:49` loop2-api-error-route *Derives from* holds `TODO` (+ the warning) |
| `python -B .the-way/elements/environment-facts/format_guard.py foundations/environment_facts.md --base $B` | 0 | 0 errors, 0 warnings |
| same `--base $B --merge-onto $B` | 0 | 0 errors, 0 warnings (fingerprint D-01 carries checked; the fact is named) |
| `python -B .the-way/elements/glossary/format_guard.py foundations/glossary.md --base $B` | 0 | 0 errors, 0 warnings |
| same `--base $B --merge-onto $B` | 0 | 0 errors, 0 warnings (the term has a use outside the glossary) |
| `python -B .the-way/elements/part-map/format_guard.py foundations/part_map.md --base $B` | 1 | 44 errors, 0 warnings, 1 unchecked. All 44 errors are "no part claims `<file>`", one per tracked file (44 tracked). The map is empty, so this is expected and **not a pass** |

`unchecked:` lines: none from the four element guards. The part map guard: 1 —
"the dependencies between parts, and new or stale violations — no command of the product reports
the dependency graph". No `unchecked` was caused by an option given `none`.

The only error the written entries cause on the branch run (no `--merge-onto`) is the D-02 one. I left
it unfixed because fixing it would change the gate's wording (Q1).

## Questions (each with a proposed answer)

**Q1. D-02 *Verification* reads `level 1 — invariant: account-server-express-http` (singular).**
The invariants guard requires `invariants:`, and fails on every run, branch run included. A rule of
the-way (the template's form) conflicts with R1 (verbatim).
*Proposed:* change `invariant:` to `invariants:`. *Verification* is outside the binding part, so the
fingerprint `06e6d3d8` does not change, and neither does the meaning.
*If we leave it:* the invariants guard keeps failing and blocks the merge.
*If we change it and the gate reading is stricter:* one field differs from the approved text by one
letter. That cannot change what any check reads.

**Q2. account-server-runtime *Rests on* (R2).** The Links rule says an invariant naming a declared
version names the fact in *Rests on*.
*Proposed:* keep `none`, as the gate approved. `node-24-support-schedule` states an end-of-life date.
Read either way, it does not change whether a commit "uses Node.js major version 24" (WAY-73), and
its *Holds for* is a schedule, not a range of Node releases.
*Cost if wrong:* a change to the schedule would not flag the invariant. It would still flag D-01
through the fingerprint in D-01's *Based on*, so the review still happens.

**Q3. Glossary terms that `program` uses ("program rule", "trip plan").**
*Proposed:* do not write them now.
*If we write them:* neither has a use outside the glossary, so the glossary guard's merge check
(`glossary-term-use`) fails. "trip plan" would also pull in "map run" and "completion".
*Cost if wrong:* `program`'s definition leans on two words the product glossary does not yet define.
They are defined in the definition, and the task that writes their uses brings them in.

**Q4. `program` carries two meanings across the searched files.** The game meaning is the one in
D-03 and the glossary. The everyday "program a command runs" appears 9 times in the-way's templates,
which the product cannot edit. WAY-99 asks for a rename where one meaning is one a reader of the
field would not give it. The guard reports nothing.
*Proposed:* keep `program`. In a game where players write programs that characters follow, a reader
of the field gives the word this meaning. The everyday meaning is also one any reader gives, and two
meanings a reader gives need no rename.
*Cost if wrong:* a later rename (for example "character program") touches the glossary entry, D-03's
*Rationale* (a new version once on the main branch) and the definition's projected entries. Today
that is one use, so deciding now is cheapest.

**Q5. New wording in the proposals is not gate-approved:**
- D-04's level 2 pair;
- D-05's level 2 pair;
- D-05's *Relations* as a whole-field `TODO`, because the mixed form fails the guard.

*Proposed:* the human accepts or rewrites them together with (a) and (b). For D-05, there is an
alternative to its level 2 pair: also propose a shortened `loop2-one-serving-process`.

**Q6. Merge readiness.** Even with Q1 fixed and (a) and (b) accepted, the merge run still fails on
`TODO` in *Scope* of every decision and in D-01's *Relations*. These wait for the first parts of the
map and for the work-split decision, and nothing in this step can clear them.
*Proposed:* the orchestrator tells the human that the merge depends on the part map and the
work-split decision.

## After orchestrator answers

Orchestrator answers (provisional, under delegation; not human approval): Q1 yes; Q2 keep `none`;
Q3 leave "program rule" and "trip plan" unwritten; Q4 keep `program`; Q5 and Q6 go to the request
under To decide.

Applied Q1: in `foundations/decisions.md`, D-02/1 *Verification* changed from
`level 1 — invariant: account-server-express-http` to `level 1 — invariants: account-server-express-http`.
This is an autonomous form correction of a field outside the binding sentences, not a
human-approved change of the gate wording.

D-02/1's fingerprint, recomputed from the file with `.the-way/relation-model/fingerprint.py`:
`06e6d3d8`, unchanged. The `D-01@e57a4766` that D-02 carries and the `D-02@06e6d3d8` that
account-server-express-http carries are unaffected.

`B=91ee59e295b8e0b024c4af1d4d1318738ab8f29e`

| Command | Exit | Result |
|---|---|---|
| decisions guard `--base $B` | 0 | 0 errors, 5 warnings (`TODO` in *Scope* `:9` `:26` `:50`, in *Relations* `:11` `:52`) |
| decisions guard `--base $B --merge-onto $B` | 1 | 5 errors, the same five `TODO` fields: D-01 *Scope* and *Relations*, D-02 *Scope*, D-03 *Scope* and *Relations* |
| invariants guard `--base $B` | 0 | 0 errors, 1 warning (`:49` loop2-api-error-route *Derives from* holds `TODO`) |
| invariants guard `--base $B --merge-onto $B` | 1 | 1 error, `:49` loop2-api-error-route *Derives from* holds `TODO`; no fingerprint error |

The D-02 error is gone in both invariants runs. Every remaining error is a deferred `TODO`
(R2; Q5 and Q6). No `unchecked:` lines.

## Back from the return step

Trigger: `return/return-step.md` §1.2 sent the task back. The code makes part of the projected
invariant `loop2-one-serving-process/1` true, and nothing had proposed that part. This step drafts
it as a proposal only, and nothing new is written into `foundations/` of the real worktree. Its
check, its deliberate break and the redo of the code wait for the human's acceptance
(WAY-03, WAY-69).

- **Proposed entry:** `loop2-one-serving-process/1` — "One Express 5 process serves both the built
  game and `/api/` requests." (fingerprint `1e0b09c2`). Fields: Method = the shared
  `run_tests.py tests/invariants` command (or `TODO` if no check exists at merge); Rests on `none`;
  Derives from `D-05@e11aec4d`; Part `every`; Correction `none`.
- **Identifier:** the projected identifier is kept at `/1`. It names what is constrained (the serving
  process), not the wording. The full gate wording becomes `/2` later. A new identifier would leave
  two entries on one process. Full text, translation and reasons: `partial-proposals.md` (c).
- **D-05 variant if accepted:** *Verification* reads `level 1 — invariants: loop2-one-serving-process ·
  loop2-api-error-route`. That is the gate's wording, and the unapproved level 2 pair is dropped.
  Binding sentences and fingerprint `e11aec4d` are unchanged. *Relations* is not changed: the T3 fix
  stays a question.
- **Integrated into** the one current proposal version:
  - `return/UNAPPROVED-proposed-foundation-against-ab34d90.patch` (same name, regenerated as
    `git diff ab34d90 -- foundations/`);
  - `return/proposal-pl.md` (Część B D-05, Część C new entry + translation, T5 rewritten);
  - `partial-proposals.md` (c).

**Validation** (throwaway `git worktree add --detach` at `ab34d90` in the scratchpad, patch
applied, guards from the pinned `.the-way` of the real worktree, `--base 91ee59e…`; worktree
removed and its temporary stash dropped afterwards):

| Check | Exit | Result |
|---|---|---|
| `git apply --check` at `ab34d90` | 0 | applies |
| `git apply --check` at `2544a6a` (clean copy, and the real worktree HEAD) | 0 | applies |
| invariants guard `--base` | 0 | 0 errors, 0 warnings, 0 unchecked |
| invariants guard `--base --merge-onto` | 0 | 0 errors, 0 warnings, 0 unchecked; D-05 ↔ invariant link, fingerprints and level 1 pairing accepted |
| decisions guard `--base` | 1 | 3 errors (*Approved by* `on acceptance` in D-04, D-05, D-06), 2 warnings (`TODO` *Relations* of D-01, D-05) |
| decisions guard `--base --merge-onto` | 1 | 5 errors: those 3, plus D-01 *Relations* `TODO` (T4), plus D-05 *Relations* `TODO` (T3) |

Same counts as the previous patch version on decisions. The invariants count is unchanged at 0. D-05's
fingerprint, recomputed on the patched file, is `e11aec4d`.
