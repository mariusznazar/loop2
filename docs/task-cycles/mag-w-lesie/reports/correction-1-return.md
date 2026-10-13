# Return step — correction 1 (mag-w-lesie)

- Range read: Slice 11 `e3a6ac6..1390634` (Dockerfile, .dockerignore, tests/deploy/test_loop2_image_icons.py)
  and the correction's foundation commits (1e57e30 conflict resolution, c785a69, 2906669, 6354c12, e3a6ac6);
  choice log Q60–Q75; plan-correction-1.md; slice-11 report and review; correction-1-uses-review.md.
- Skills used: the-way-record-invariant, the-way-record-decision, the-way-update-part-map,
  the-way-record-glossary-term (pinned `.the-way` d04c3feb1a47e0ffc9a3b2354c23aacafe25c74b, gitlink and
  checkout agree). No other skill or tool beyond reading, editing, git and the guards.
- Parts compared with the code: `deployment`, `browser-view`, `build-tools` (and `account-server` for the
  static serving in `src/server/app.ts`).

## Candidates

### (a) The image carries `assets/icons/` and serves what the build puts into `dist/public/`

Verdict: **one new invariant, `loop2-container-icons/1`, derived from D-27/1.**

- The general half — "the container serves every file the build puts into `dist/public/`" — is already
  stated: D-05/3 "serves both the built game's static files and the `/api/` account and save routes in the
  loop2 container", and `loop2-one-serving-process/2` "serves both the built game and `/api/` …". That its
  container check reads only `/` is a reading of an existing check (as the planner said), not a missing
  entry. D-14/1 (a Docker container from a Dockerfile) and D-06/3 (building compiles both configurations) say
  nothing of the icons.
- The icon half is stated only by D-27/1's clause "kept in `assets/icons/` outside the directory the account
  and save server serves and copied into that directory when the application is built", and that clause stood
  at level 2. Remark 3 showed a commit on which it is false where it matters to a player (the image built
  without `assets/icons/`), so a sentence a commit can make false is derivable, and WAY-12 ("level 2 or 3
  only while no invariant can be derived") moves it to level 1. It binds after the merge (WAY-36): a later
  Dockerfile, `.dockerignore`, build-script or serving change can drop the icons again.
- Why the sentence is about the container and not about `npm run build` alone: the container's build runs the
  same `scripts/build.mjs`, so one sentence covers the build script, the Dockerfile, `.dockerignore` and the
  static serving; a sentence about `npm run build` would not have caught remark 3. Where no Docker daemon
  answers the entry stays unchecked, never passed.
- Derives from D-27 only: the sentence does not rest on who serves (D-05) or on the container runtime (D-14),
  so their versions and verifications stay as they are (see (b)).
- *Part*, with the change in each that can make it false: `browser-view` (an icon whose name ends in `.SVG`,
  which the build does not copy; a file the build skips), `build-tools` (`scripts/build.mjs` copying elsewhere
  or not at all), `account-server` (`express.static` path or a route shadowing `/icons/`), `deployment`
  (Dockerfile COPY, `.dockerignore`, the runtime stage's `COPY --from`).
- *Rests on* none: D-27's *Based on* (game-icons-licence, cc-by-3-adaptation-credit, CC BY 3.0 § 4(a)) holds
  no condition of this sentence; the path `/icons/<file name>` is a condition no entry holds, so it stands in
  the sentence (WAY-60).

### (b) New versions or Verification changes of D-27/1, D-05/3, D-14/1, D-06/3

- **D-27/1** — *Verification* edited in place (new on this branch, not on main, WAY-07): level 1 gains
  `loop2-container-icons`; level 2 now reads "for where the icons come from and where their source files
  stand". Binding sentences unchanged, fingerprint stays 69da55dd, *Approved by* unchanged
  (`Mariusz, merge of https://github.com/mariusznazar/loop2/pull/12`), no reference flagged.
- **D-05/3** — no change: its sentence already covers serving every built file; the new invariant does not
  derive from it, so its level 1 list needs nothing. A new version on main would be a cost with no gain.
- **D-14/1** — no change: "complies: a Compose file and a Dockerfile from which Docker builds and runs the
  loop2 container" still holds; what the image must hold is D-27's, not D-14's.
- **D-06/3** — no change: copying `assets/icons/` into the build stage does not touch the shared package, the
  two configurations or their outputs.

### (c) Q71 — the `program rule` definition

Reworded through the-way-record-glossary-term, meaning unchanged (entry new on this branch, edited in place):

- before: "A program rule is a pair of a condition and an action of a character that a program holds."
- after: "A program rule is a pair held by a program: a condition and an action of a character."

"held by a program" now attaches to the pair only; the genus stays "pair", the difference "held by a program",
the colon names the pair's two members. Uses (`--uses "program rule"`): 15, the same list the uses review read
(decisions.md 485, 574, 575, 589, 590, 648, 705, 740, 747; invariants.md 180, 236, 237, 248, 270;
glossary.md 30, the `program` entry on main). No use moves: every use already read the clause as the pair's
(the uses review's own reading, Q71). WAY-97 asks a changed definition to go through a review of uses in the
same change — see question 3.

### (d) Parts: *Files*, *Trust boundary*, failure modes, criticality

- **Files** — no change for Slice 11: `Dockerfile`, `.dockerignore` and `tests/deploy/**` are `deployment`'s
  already. The check file of `loop2-container-icons` will need a line in `deployment`'s *Files* once it exists
  (question 1); the part-map guard rejects a pattern that claims no tracked file, so it cannot be written before.
- **Trust boundary** — no change. `assets/icons/**` stays `browser-view`'s boundary (the files that take in
  untrusted data); `deployment` copying them into the image does not make its own files take in untrusted
  data. `deployment`'s boundary stays `deploy/**`.
- **Failure modes** — none proposed: an image without the icons stops at `npm run build`, which is
  `deployment`'s recorded mode "… the type check or the build fails — the push is not deployed … — low —
  detected by loop2-deploy-keeps-running". Failure modes are the human's (WAY-46); a mode "the image serves no
  icons — detected by loop2-container-icons" would need the human's word and only arises if the build stopped
  failing on a missing directory.
- **Criticality** — unchanged; part-map guard reports the same 2 warnings and 1 unchecked as on d2b4687.
- **Depends on** — `deployment` → `browser-view` (e3a6ac6) agrees with the code; nothing else differs.

### Other findings of the comparison

- Environment facts: none new. Nothing in the slice rests on an outside fact a commit cannot change.
- Glossary: no new word in a binding sentence beyond the new invariant's ("loop2 container", "SVG file",
  "path"), none of them a the-way term or carrying a meaning a reader would not give it.
- `tests/deploy/test_loop2_image_icons.py` checks what `loop2-container-icons/1` says, but its author wrote the
  Dockerfile change, so it cannot become the invariant's check (WAY-69) — question 2.

## Entries written

| Entry | Fingerprint | Meaning (PL) |
|---|---|---|
| invariant `loop2-container-icons/1` (new) | ba7a7752 | Kontener loop2 zbudowany z repozytorium podaje każdy plik SVG z `assets/icons/` pod ścieżką `/icons/<nazwa pliku>`, bajt w bajt taki jak plik. |
| decision D-27/1 *Verification* (edit in place, binding sentences unchanged) | 69da55dd (unchanged) | Klauzula „ikony są kopiowane do katalogu serwowanego przy budowaniu aplikacji” przechodzi z porównania przez agenta na sprawdzenie niezmiennikiem `loop2-container-icons`. |
| glossary term `program rule` (reworded, meaning unchanged) | none — glossary entries carry no fingerprint | Reguła programu to para, którą trzyma program: warunek i czynność postaci (to „trzyma program” odnosi się do pary, nie do postaci). |

## Commits

- 2b609ba `docs(foundation): derive loop2-container-icons from D-27/1's build clause` — foundations/invariants.md,
  foundations/decisions.md
- 11844c6 `docs(glossary): attach 'held by a program' to the program rule, not the character` — foundations/glossary.md

Author the owner's private address; only foundation files; no push; line endings kept (diff touches only the changed lines).

## Format guards (worktree root, at 11844c6)

| Guard | Arguments | Exit | Report |
|---|---|---|---|
| decisions | `--base d2b4687… --merge-onto d2b4687…` | 0 | 0 errors, 0 warnings, 0 unchecked |
| invariants | same | 0 | 0 errors, 0 warnings, 0 unchecked |
| glossary | same | 0 | 0 errors, 0 warnings, 0 unchecked |
| environment facts | same | 0 | 0 errors, 0 warnings, 0 unchecked |
| part map | `--base d2b4687…` | 0 | 0 errors, 2 warnings (build-tools and deployment depend on account-server with no separation — as on d2b4687), 1 unchecked (dependency graph — no command reports it) |

The gate is not run by this step. Until the check below exists, a gate run records no verdict for
`loop2-container-icons/1`, which is never a pass.

## For the check author (an agent that wrote neither the sentence nor the Dockerfile change)

- **Entry:** `loop2-container-icons/1` — "The loop2 container built from the repository serves each SVG file in
  `assets/icons/` at the path `/icons/<file name>`, with the same bytes as the file."
- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Write:** one new file under `tests/invariants/` (proposed `tests/invariants/test_loop2_container_icons.py`),
  citing `invariant: loop2-container-icons/1`. No existing check cites an identifier this change retires or a
  version it raises; no existing invariant test changes.
- **Reading to state in the docstring** (the author may refine it and must report each choice):
  - "the loop2 container built from the repository": the image built with `docker build` from the working
    tree's `Dockerfile` (the tree only read), run as a container, as the container check of
    `loop2-one-serving-process/2` does; container and image removed afterwards, cleanups registered before the
    commands they undo;
  - "each SVG file in `assets/icons/`": the top-level files git tracks or would track whose name ends in `.svg`
    in any letter case — the same set `test_icon_file_content.py` reads — so an icon the build skips fails the
    check; the set must not be empty;
  - "serves … at `/icons/<file name>`, with the same bytes": a GET of `/icons/<file name>` on the container's
    listening port answers 200 and a body equal byte for byte to the working-tree file; requested from inside
    the container or through a published port (author's choice);
  - expected values written out (WAY-69): the file bytes come from the working tree; nothing expected is
    computed by `scripts/build.mjs` or the server;
  - where no Docker daemon answers, the test is skipped with a reason, so the run gives no `pass`.
- **Deliberate break** (by the reviewer of Slice 11's code, not by the check author): e.g. drop
  `COPY assets/icons/` from the Dockerfile (build fails), add an icon named `*.SVG`, or change
  `express.static` to a path that leaves `/icons/` unserved; each must make the check fail.

## Choice-log lines (for the orchestrator to enter)

| ID | Question and source | Answer or choice | Evidence | Alternative rejected | Cost if wrong | Used by |
|---|---|---|---|---|---|---|
| Q76 | Return (a): is "the image carries and serves the icons" a rule the foundation lacks? | the serving of every built file is D-05/3 and loop2-one-serving-process/2; the icon copy is D-27/1's level-2 clause, now derivable → new invariant `loop2-container-icons/1` derived from D-27 only, D-27/1 level 1 gains it | WAY-12, WAY-36; remark 3 shows a commit making the clause false | no entry (clause stays level 2 against WAY-12); a sentence about `npm run build` only (misses remark 3); widening loop2-one-serving-process/2 (changes a read-only check) | a third image build per gate run where Docker answers | invariants, D-27/1, check author |
| Q77 | Return (a): Derives from of the new invariant | D-27 only, not D-05 or D-14 | the sentence names no serving process and no runtime | deriving from D-05 too (a D-05/4 on main for a verification list) | a later D-05 change does not flag the invariant | invariants |
| Q78 | Return (b): D-05/3, D-14/1, D-06/3 | no new version, no Verification change | their sentences hold unchanged after Slice 11 | an `unchanged sentences` version of D-05 | none | decisions |
| Q79 | Return (c): wording of Q71 | "A program rule is a pair held by a program: a condition and an action of a character." | uses review Q71; 15 uses, none moves | "… a pair that a program holds, of a condition and …" (clumsier) | wording fix | glossary |
| Q80 | Return (d): part fields | no change to Files, Trust boundary, failure modes or criticality for Slice 11; failure modes stay the human's (WAY-46) | part-map guard unchanged from base; build failure already a recorded low mode | an agent-written failure mode | none | part map |

## Questions

1. **Part map line for the new check file.** Once the check author commits `tests/invariants/test_loop2_container_icons.py`
   (or another name), `deployment`'s *Files* needs that path, as it holds
   `test_loop2_one_serving_process_container.py` (tests belong to the part they test; the check builds and runs
   the container). Proposed: resume me (or a foundation agent) with the-way-update-part-map after the check
   commit. Without it the part-map guard reports the file claimed by no part (an error that blocks the merge).
2. **Two tests of one thing.** `tests/deploy/test_loop2_image_icons.py` (Slice 11) and the new invariant check
   will both build the image and fetch every icon. Ways: (a) keep both — cost: one more image build per
   `tests/deploy` run, about two minutes; the deploy test stays the slice's reviewed proof; (b) remove the deploy
   test once the invariant check passes — cost: a code change after the slice review, and the proof of remark 3
   then lives only in the invariant check. Recommendation: (a) in this request; (b) may come with any later
   change to the deploy tests.
3. **Review of uses for the reworded `program rule`.** WAY-97 sends a changed definition through a review of uses
   in the same change. The reword only fixes the attachment the uses review itself named as the intended
   reading, and the 15 uses are those it read. Ways: (a) dispatch a short uses review of the new definition over
   the 15 uses (cheap, keeps WAY-97 literal); (b) record that the review of Q71 covers it. Recommendation: (a).
