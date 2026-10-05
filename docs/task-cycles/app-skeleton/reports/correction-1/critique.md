# Critique — return-step proposal set, correction 1, task/app-skeleton

Critic: fresh agent following `.the-way/elements/common/critique/SKILL.md` (the-way pinned at
96c52488752701ffa321ca69c0c2aa2dd3e46d2d, the commit the gitlink records — checked). This
critique gives advice only. It approves nothing, and the verdicts belong to the author.

## What was read

- The set: `return/UNAPPROVED-proposed-foundation-against-ab34d90.patch` (all 262 lines) and
  `return/proposal-pl.md` (all 966 lines).
- Written entries: `foundations/*.md` at 2544a6a.
- Sources: in `definicja_mvp_loop2.md`, the Technology section, every projected decision this
  set touches, projected invariants lines 1886–2012, the environment facts and the Gate
  record. I also searched all the projected entries for build, package, lockfile, static,
  listen, exit and working-directory topics. Also read: `task.md`, `review-comment.md`, the
  product code (`src/`, `scripts/build.mjs`, `package.json`, `tsconfig.*.json`, `.gitignore`,
  `README.md`, `tests/*.mjs`), the citation lines and the parts named in T7 of the invariant
  tests, `git ls-files` (50 files), the spec at 3383663 (§ Budowa, § Obsługa żądań), and the
  diff of de3ceb3.
- Rules: `rules.md`, `way_of_working.md`, the templates for decisions, invariants and the part
  map, and WAY-01, 03, 11, 13, 17, 19, 32, 36, 46, 62, 69, 114 and 126.
- Not read, as instructed: `return-step.md`, `choices.md`, `foundation-step.md`,
  `partial-proposals.md` and the rest of `.runs/`.

## Guard runs

I applied the patch in a throwaway detached worktree at 2544a6a (it applied cleanly), ran the
guards from the pinned `.the-way` with `--base 91ee59e…`, and then removed the worktree.

| Guard | `--base` only | `--base` + `--merge-onto 91ee59e…` |
|---|---|---|
| decisions | 3 errors (*Approved by* `on acceptance` in D-04, D-05, D-06), 2 warnings (`TODO` *Relations* in D-01 and D-05) | 5 errors: the 3 above, plus `TODO` *Relations* in D-01 and D-05; no fingerprint errors |
| invariants | 0 / 0 / 0 | 0 / 0 / 0, so every carried fingerprint matches |
| part map | 15 errors, all of them `TODO` in *Depends on* and *Failure modes*; no unclaimed or doubly claimed file; 1 unchecked (no command reports the dependency graph) | — (no `--merge-onto`) |
| part map, every `TODO` set to `none` | 0 errors, 1 unchecked. This confirms the "Wariant pośredni" claim in T1 | — |
| part map, the dependencies drafted in O3 | 0 errors, 1 unchecked | — |

---

## Observations

### O1 — T4 recommends an option that contradicts two pinned decisions, and leaves out the option the set uses everywhere else (blocks merge)

**Checked:** T4's options against WAY-01, WAY-126 and the way the set handles D-04 and D-05.

**Evidence:**
- WAY-01 lists as *violates*: "a planned feature is written into the foundation before it is
  built".
- WAY-126 says a projected entry enters "in the foundation step of the first task whose code
  makes it true" and that "where the code makes only part of it true, that part enters as a
  proposal a human accepts".
- Option A writes the whole work-split decision now, although T4 itself says "Kod szkieletu
  tej decyzji nie spełnia". The Polish calls this "odstępstwo od zasady", which understates
  it: the deviation is from two decisions of the pinned process, and it stays on main once
  merged.
- For "What is the game built with?" and "What serves the built game…" the set takes the
  WAY-126 route: a partial entry the human accepts. For the work-split decision T4 never
  offers that route. Yet one sentence of it is true of the skeleton today: `src/server/app.ts`
  only answers `/api` with a 404 and serves `dist/public`, so the server computes nothing of
  the game. That truth is as vacuous as D-04's ("the game … runs in the browser" for an empty
  `<main>`), so applying the same standard gives the same route.

**What would have to change:** Add an option E to T4 and recommend it over A, or say why the
standard used for D-04 does not apply here. Option E is the partial entry below, with D-01's
*Relations* becoming `derives from D-07@<fingerprint the guard computes>`.

```markdown
### D-07/1 — How is the work of the game split between the server and the browser?

The server computes nothing of the game.

- **Change:** new decision
- **Scope:** account-server
- **Based on:** none
- **Relations:** none
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: a server route that stores data the browser sends and returns it unchanged
  - violates: a server module that computes the outcome of a character's actions or of the time the game was closed
- **Review when:** saved progress starts affecting other players, rankings, shared exchange or rewards outside a player's own game · check by: 2027-04-04
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D23
- **Approved by:** on acceptance

*Rationale:* computing the game in the browser keeps it computed as loop computes it, so the
server adds only accounts and a save that follows the player from browser to browser.
*Rejected:* the server computing the game itself — a second home for the simulation and many
times the work.
```

The examples and the rationale avoid "map run", "earning loop" and "catch-up". Using those
words would bring in their projected glossary terms (rules.md, WAY-126). What E costs: one
more partial entry; the accounts task later writes it as D-07/2 in the gate's full wording,
and D-01's reference is flagged then, as it should be. The Polish must show E whole, with its
translation (WAY-114). Whether "computes nothing" counts as code making the sentence true is
the human's call; T4 should say so in those words.

### O2 — T3 recommends `narrows D-02`, which misuses the relation type (blocks merge)

**Checked:** T3's recommended *Relations* for D-05 against WAY-32 and the decision template.

**Evidence:**
- WAY-32 defines `narrows` as "a decision this one deliberately goes against in a narrower
  area". Its *violates* example is "`narrows` for a decision that only mentions another".
- D-05 does not go against D-02. D-02's own rationale foresees it: "It can also serve the
  built game if the serving-process choice keeps one Node process."
- The template adds that the narrowing decision "states the area where it prevails"; D-05
  states no such area.
- The gate text approved "narrows" for both relations. That is the human's settled wording,
  so it goes back to the human rather than being changed silently.

**What would have to change:**
- Recommend `- **Relations:** derives from D-02@06e6d3d8`. In T3, quote the gate's
  "narrows the projected decisions … " beside it, with one sentence on why `derives from`
  fits and what `narrows` would tell later agents (that D-05 overrides D-02 somewhere).
- Put the recommended value into the patch instead of `TODO`, so that the guard result shown
  to the human matches what they are asked to accept. The alternative stays in the question.

### O3 — T1 cannot be answered by a non-specialist in its current form (blocks merge)

**Checked:** T1 against the part-map template, WAY-46 and `way_of_working.md` § How a skill
asks.

**Evidence:**
- One question asks for three different things: whether to accept five parts and the
  assignment of 50 files (a batch decision), the allowed dependencies (a judgment an agent can
  draft), and failure modes with their severity and detection (an assessment WAY-46 reserves
  to the human).
- A severity must be "a degree from the criticality scale", and the scale is empty. T1 asks
  for "stopnie skali krytyczności" without saying that the scale has to be written first. The
  template itself leaves its size undecided (`TODO — decision pending`).
- The patch writes "TODO — question for the human" into *Depends on*, but the template does
  not reserve *Depends on* to the human ("A human writes the failure modes and the
  separations"). The Polish already lists the code facts a draft would follow from.

**What would have to change:** Split T1 into three questions.

- **T1a.** Accept the five parts and the file assignment as a table. The guard shows
  0 unclaimed files.
- **T1b.** Accept or edit drafted dependencies. A draft derived from the code facts T1 already
  states, which passes the guard:

  | Part | Depends on |
  |---|---|
  | browser-view | `none` |
  | account-server | `browser-view · build-tools` — it serves browser-view's built files; its tests and its start need the build's output |
  | build-tools | `browser-view · account-server` — it compiles both and copies `src/browser/index.html` |
  | agent-workflow | `product-foundation` — it writes the foundation |
  | product-foundation | `none` |

  account-server and build-tools then depend on each other. The guard accepts that; I found
  no the-way rule on it either way.
- **T1c.** Failure modes: record them now (which first needs a criticality scale, with what
  that requires), or write `none` for now. With `none`, every part counts as the highest
  criticality (WAY-46), which is the safe direction. The cost is that every change is checked
  at the sharpest level until a later task records failure modes, and the human accepts that
  lowering then. Under T1c, say plainly what "sharpest level" costs in this repository.

### O4 — D-06 and `application-build-output/1` bind a build mechanism, not a rule

**Checked:** purpose, frequency, over-wide application and cost. Claims checked against
`package.json`, `tsconfig.browser.json`, `tsconfig.server.json` and `scripts/build.mjs`; all
the claims hold.

**Evidence:**
- "copies the browser HTML into the public output" describes how `scripts/build.mjs:19-21`
  works today. The first browser asset other than `index.html` (a stylesheet, an image), or
  HTML that the build generates, needs D-06/2 and a new version of the invariant, although
  nothing anyone wants to protect has changed.
- No recorded case shows the build layout drifting. Past frequency is 0, and I found no
  concrete future example in the material.
- *Origin* points to the spec at 3383663 § Budowa. That spec says "Nie potrzeba bundlera ani
  monorepo z osobnymi pakietami" with no reasons, so the entry already holds more reasoning
  than its *Origin*. The spec is a draft ("Status: proposed for request review") that the
  branch deleted (77a3754). The template says *Origin* is "never … anything deleted when its
  task closes". The review comment moves spec and plan into a new `docs/task-cycles/`
  record.

**What would have to change (rewrite):**

- D-06 binding sentences: "The browser and server share one npm package and lockfile, and
  have separate TypeScript compilation configurations and output directories. Building the
  application compiles both configurations."
- D-06 *Origin*: `none`, since the whole reasoning is in the entry. Alternatively, the commit
  that adds the new cycle record, once it exists.
- `application-build-output/1` sentence: "Building the application compiles both the browser
  and the server TypeScript configurations."

The fingerprint of D-06 changes, and the guard reports the new one for both invariants.

### O5 — `public-file-boundary/1` binds how the directory is found, not what is protected

**Checked:** the sentence against `src/server/app.ts:9-10`; the claim holds. Also checked how
widely it would apply, and whether something cheaper already covers it.

**Evidence:**
- "located relative to its own module" forbids, for example, a public directory set by an
  environment variable in the container. Yet what the spec and the README protect is
  different: files are served only from `dist/public` ("Serwer podaje wyłącznie
  `dist/public`"), whatever the working directory.
- `tests/http.test.mjs` already checks exactly this: the server is started from a temporary
  working directory, and a traversal list is tried.
- *Derives from* reads `none`, yet the sentence is about how D-05's "built game's static
  files" are served.

**What would have to change (rewrite):** "The server serves static files only from the built
public directory, whatever working directory its process starts in." Then ask the human
whether it derives from D-05@e11aec4d. If it does, D-05's *Verification* lists it too, and a
change to D-05 then reaches it.

### O6 — `account-server-occupied-address/1`: one recorded case, an undefined term

**Checked:** de3ceb3, `src/server/main.ts` and `tests/startup.test.mjs`.

**Evidence:**
- One real case is recorded. Before de3ceb3 the listen callback ignored its error and printed
  "Loop: http://127.0.0.1:3000" even when startup failed.
- An ordinary test covers it today.
- "does not report that it is ready" names no observable signal, so whoever writes the test
  has to guess what "ready" means. The only signal in the code is the line `Loop: <address>`.

**What would have to change (rewrite):** "When the account and save server's listening address
is already in use, the server process exits with a non-zero code without printing the address
it listens on."

### O7 — Four invariants with `TODO` method and no owner

**Checked:** T6's cost line against the template's rules on `Method`.

**Evidence:**
- `application-build-layout`, `application-build-output`, `public-file-boundary` and
  `account-server-occupied-address` stay unchecked "dopóki ktoś nie napisze ich testów". No
  task or moment is named.
- Until then, the ordinary tests are the only guard, and an implementer may edit them. The
  invariants add only a sentence that later agents read.

**What would have to change:** In T6, name when the tests get written: in this correction
round, like `loop2-one-serving-process`, or in a named later task. Or say plainly that nothing
schedules them, so the human can weigh accepting them against leaving the behaviour with the
ordinary tests alone.

### O8 — T6's reason for withdrawing missing-page-response is an interpretation, and the code contradicts it

**Checked:** T6's claim against the gate rationale, the code, the spec, the README and the
ordinary tests.

**Evidence:**
- T6 says the rationale of D-05 "zakłada … podawanie strony gry dla nieznanych ścieżek". The
  gate text says only "must set static-file and fallback rules carefully"; it does not say
  what the fallback is.
- The code does the opposite (`src/server/app.ts:11-13` returns a plain 404), and so does the
  spec at 3383663 ("Nie ma przekierowania dowolnej ścieżki na stronę główną"). The README
  ("Pozostałe brakujące ścieżki otrzymują zwykłe 404") and `tests/http.test.mjs` ("ordinary
  missing routes … do not become the home page") hold it too.

**What would have to change:** Show the human that the code currently answers 404 for unknown
non-API paths, and that the withdrawal rests on one reading of the word "fallback". Then ask
the product question directly: bind the 404 now, or leave room for serving the game page on
unknown paths later? Withdrawing is still cheaper. What has to change is the stated reason,
not necessarily the outcome.

### O9 — D-04's verification

**Checked:** D-04/1 against the template's § Verification.

**Evidence:**
- The template allows "Level 2 or 3 only while no invariant can be derived today". The
  *violates* example "a plain JavaScript source file" can be checked on a commit, which shows
  that an invariant could be derived.
- The same example also catches `scripts/build.mjs` and `tests/*.mjs`. T2 notices this and
  hands the fix to the human ("jeśli chcesz, doprecyzuj").

**What would have to change:** Propose the fixed pair instead of asking the human to write it:

```markdown
  - complies: a game screen written as a TypeScript module that the build compiles for the browser
  - violates: a part of the game written as a Godot scene, or a script the browser loads written directly in JavaScript instead of compiled from TypeScript
```

Also tell the human that the template would take level 1. Keeping level 2 for this partial
sentence (as the gate did for the whole decision) is a conscious choice with one less test
round.

### O10 — Minor points

- **Asymmetric *Part* values.** `loop2-one-serving-process/1` names `every`, while
  `loop2-api-error-route/1` names three parts. A future deployment file (a proxy in front of
  Express, for example) can break both equally. Give both `every` (WAY-62: "a writer in doubt
  names more"), or give the reason in the Polish. No reason is given today for either
  `every` or for `browser-view` in api-error-route.
- **Expected guard errors not explained.** The guard reports the 3 errors from `on acceptance`
  in *Approved by*, but the Polish never says so. Add a line saying that acceptance writes
  "Mariusz, <date>" there and the errors disappear.
- **Polish wording.** "bramka" means both the readiness gate of the definition and the test
  gate ("bramka zgłasza je jako niesprawdzone"), and "strażnik" is never introduced. Add
  both to the glossary at the top of `proposal-pl.md`.
- **T8 cannot be fully answered.** It states that the cost of moving to TypeScript 7 now is
  unknown, so the human weighs a known option against an unknown one. Either find out the
  cost, or rephrase T8 to "should a separate small task try 7.x before game code grows?",
  which is what its recommendation already means.

## Checks that found no concern

- **Source fidelity of the written entries.** D-01, D-02 and D-03 binding sentences are
  identical to the gate text. The field changes (Scope, Relations, D-02's "invariants:") are
  shown to the human, in T2, T4 and T10.
- **Partial sentences.** The sentences of D-04/1, D-05/1 and `loop2-one-serving-process/1` are
  true subsets of the gate wording. Their *Approved by* is not transcribed from the gate,
  which WAY-126 requires for a shortened entry. Their *Origin*, *Review when* and *Rejected*
  match the gate.
- **Code fidelity.** D-06 and the build-layout and build-output invariants match the build
  files. `public-file-boundary` matches `app.ts:9-10`. `occupied-address` matches `main.ts`.
  The one-process and `/api` claims match `app.ts:6-13`.
- **Restating a projected rule (WAY-126).** No new entry restates a rule a projected entry
  states. I searched the definition's projected entries for build, package, lockfile,
  bundler, static, working directory, listen and exit topics.
- **Missing settlements.** No other projected entry is made true by the skeleton.
  `loop2-shared-public-origin`, `saved-state-http-exchange`, the public-address decision and
  the deployment decisions all need code that does not exist. The one missing partial is the
  work-split sentence of O1.
- **Glossary and environment facts.** The new entries need no glossary term and no
  environment fact.
- **Recovered list.** The recovered-invariant list is not needed: the behaviours were written
  in this task.
- **Plan test (WAY-36).** Every new decision still binds after the merge.
- **WAY-19.** Numbering is in the order written, and D-03 and D-04 answer different
  questions.
- **Fingerprints.** All cited fingerprints match (guard with `--merge-onto`).
- **Translations.** Every Polish translation matches its English entry. The T1, T3 and T5
  claims about guard results are confirmed by my runs. The T7 line references are correct to
  within a line.
- **Frequency.**

  | Proposal | Frequency |
  |---|---|
  | D-04, D-05, `loop2-one-serving-process` | required by WAY-126; frequency does not apply |
  | `occupied-address` | 1 recorded case (de3ceb3) |
  | build layout and output, `public-file-boundary` | 0 recorded cases in the material I was allowed to read; run logs not read |

## Not verified

- The fingerprint `1e0b09c2` quoted for `loop2-one-serving-process/1`. No guard prints it.
- That D-05's sentences and fingerprint are unchanged from the earlier proposal. That would
  need `foundation-step.md`, which I was told not to read.
- What the gate reports for `loop2-one-serving-process/1` with the gate command as its method
  and no citing test. I did not run the gate.
- Whether the-way allows parts that depend on each other (O3). The guard accepts it.
- Any fact about TypeScript 7.x (T8).

## Questions for the author

1. Is there a reason the partial-entry route of WAY-126 does not fit the work-split decision
   (O1)? If there is, T4 has to state it to the human.
2. Will the four `TODO`-method invariants get tests in this round (O7)?
3. Should `public-file-boundary` derive from D-05 (O5)?
