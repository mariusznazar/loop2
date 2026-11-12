PASS 688a16be

# Review of the second reconciliation with the target branch (renumbering `6b20afea`, merge `688a16be`)

Reviewed: `9c65ad24..6b20afea` (renumbering) and the merge `688a16be60b2ae0556f68068b96ad33d36f8c7d0`, parents `6b20afea` (task branch) and `20bcc58d` (`origin/main`), merge base `4660e14a` (`git merge-base 6b20afea 20bcc58d`). `git rev-parse HEAD` of the worktree was `688a16be…` when I checked, with nothing after it. Everything was read from commits (`git show`, `git diff`, `git grep <rev>`, `git ls-tree`). The checks that need files ran in a separate clone of `688a16be` in the session scratchpad, with `.the-way` cloned at `55afa8e5`. The reviewed worktree, its index and its branch were not touched. Nothing in the vault or in `the local clone of the old game's repository` was opened.

Verdict: the renumbering is exactly the renumbering it claims to be, and the merge keeps everything of `main` and everything of the branch except the four decisions the handoff names. The pin is `main`'s, and the composed files hold `main`'s rules and values byte for byte. No blocking finding. Four Minor findings: two on the merge report (in range), and two on text the merge carried over unchanged from one side (out of scope, with routing).

## Findings

### Critical

none

### Important

none

### Minor

**M-1 (in range: the merge report) — `reports/merge-2-report.md`, "Decisions where I took main's *Rationale*/*Rejected* whole", D-315: the list of "sentences the branch had carried" holds `main`'s base text, not the branch's moved reasoning.**

The report lists for D-315: "*Rationale:* the night of the scene brightens with the streak and the solving of a map gives a full dawn, so the darkness changes while the background stays one picture, and the background in full light is that dawn." and "*Rejected:* a background darkened in its file — the night would have to replace the file." Both are the base text (`4660e14a`). `main` deliberately rewrote it when the night became the tint of the scene's light, and the branch never changed D-315's *Rejected* (`cmp_out.txt`: D-315 rejected `branch_changed=False main_changed=True`). The branch added only one sentence: "The night is a layer over the picture, and the scene has no night until that layer is built." That sentence is also superseded by `main`'s tint (D-315's new binding sentence: "the tint of the scene's light is a layer over that picture").

Why it matters: the handoff says the reasoning of D-132, D-271, D-315 and D-316 "is to be put back by a later slice". A slice that takes this list as its input would put back the "night/dawn" wording that `main` replaced, and the decision would then contradict its own binding sentence. For D-132, D-271 and D-316 the list does hold branch-added text (checked by `lost_sentences.py`). For D-315 nothing needs putting back.

Evidence: `cmp_out.txt` (D-315 block: base→main and base→branch diffs); `lost_out.txt` (D-315: 1 branch-added fragment, the "night is a layer" sentence).

**M-2 (in range: the merge report) — `reports/merge-2-report.md:118`, "**Unread material:** none (… `task.md` and the commit `ccc03bcf` not opened — the handoff's description was enough for a merge)".**

The section says `none` and then names three things not read: `task.md`, which the merge handoff told the agent to read ("Read `docs/task-cycles/martwe-odsylacze-origin/task.md` (the frozen task) and the Foundation-entries commit `ccc03bcf`"), the commit `ccc03bcf`, and `plan.md`, of which only the S1/S2 lines were read. A reader who scans for `none` takes the material as read. The skipped reading did not damage the tree, because every point I checked holds. Minor.

**M-3 (out of scope: the branch's text at `6b20afea`, kept unchanged by the merge under rule 2) — `foundations/decisions.md`, D-132 *Rejected* (merged log, D-132): "no „Teraz” after the end of a map run — while the end had no place of its own, the player would read nowhere why the map run ended".**

The reason describes a past state. The end now has its own place, the end-of-run window, in D-132's own binding sentence ("the end-of-run window (D-368) opens of itself over the screen"). The template forbids telling the history: "*Rationale* and *Rejected* describe the decision as it then stands, never the change" (`.the-way/elements/decisions/template.md:139-140` at `55afa8e5`), and *Rationale*/*Rejected* "does not tell how the decision was reached" (`:65`). After the merge, the matching *Rationale* sentence ("„Teraz” gives the outcome of a map run that has ended …") is gone, because `main`'s *Rationale* was taken whole. So the *Rejected* item now stands without the reasoning it answers. Routing: the slice that puts back D-132's reasoning should rewrite this item against the window. Its text was added by the branch (`git diff 4660e14a 6b20afea -- foundations/decisions.md`, D-132), not by the merge.

**M-4 (out of scope: `main`'s text, carried over by the merge) — `guidelines/styleguide-browser-view.md:333-334` at `688a16be`: "Źródło wartości ustalone z Mariuszem dla loop2, z jednym rodzajem dołożonym później:".**

The list below it now holds two kinds added after the first styleguide: the `--bar-width` kind (from the 2026-11-02 card preview) and `main`'s new kind for the values chosen in the preview of `swit-rosnacy-z-passa` (lines 349-353). `main`'s own intro already counted one ("z jednym rodzajem dołożonym w zadaniu „przyciski-i-zakladki”") next to its new bullet. The branch's removal of the task name, re-applied by the merge, kept the count. Routing: slice 40, which rewrites the `swit-rosnacy-z-passa` bullet into the list's kinds, should fix the count or drop it.

## What the review checked, by the handoff's points

1. **Renumbering (`6b20afea`).** `renum_check.py` read each of the 25 files `git diff --name-only 9c65ad24 6b20afea` lists. It applied the whole-token replacement `(?<![A-Za-z0-9-])D-(37[2-9]|38[0-4])(?![0-9])` → +2 to the old blob and compared the result with the new blob byte for byte: 25/25 equal, 98 replacements. That means nothing else changed in those files: no other token, no line ending, no tail of a longer number. No file without such a token was touched. No file outside the 25 held a D-372…D-384 token at `9c65ad24` (outside `.the-way`, `.runs`). No longer-number lookalike (`xD-37n`, `D-37nn`) existed in the changed files. The D-370/D-371 tokens in the log were left alone. At `4660e14a` (the base, `main`'s side) no D-372…D-389 token exists, so all 98 were the branch's own. At `688a16be` the log has 386 headings, unique, covering 1…386 with no gap. The order is `main`'s order plus D-374…D-386 appended; the only non-monotonic run, 111, 113, 112, 114, is `main`'s own. References: inside `foundations/`, all of them: `invariants.md:954` `action-duration-minimum` *Derives from* D-374 (the floor of one minute; the invariant's sentence equals D-374's binding sentence), and D-379 *Rationale* "The floor of one minute … is D-374's". No glossary, part-map or environment-fact entry names one. `main`'s D-372/D-373 references in the styleguide (lines 603, 646, 651, 653) are `main`'s frost and flame, untouched. Outside `foundations/` I read the context of all 81 hits in `src/` and `tests/` against the target decisions, well over the 15 asked, for example: `styles.css:322` and `right-area.tsx:13,56,102` (D-382 window of the chronicle), `chronicle.ts:2` and `right-area.tsx:16` (D-383 filter), `program-panel.tsx:201` and `program-panel.test.mjs:625` (D-384 panel after a deletion), `tile-list.ts:32` and `tile-table.tsx:2` (D-385 burning item), `acceptance.test.mjs:16` (D-378 Las), `actions.test.mjs:182,259` (D-375 Wędruj), `body.test.mjs:316` and `encounters.test.mjs:214` (D-377 nature energy), `conditions.test.mjs:21,298` and `program-editor.test.mjs:168` and `rule-editor.test.mjs:1109` (D-376 ranges), `death.test.mjs:333` and `saved-game.test.mjs:1667` (D-386 moments), `skills.test.mjs:193` (D-374 floor) and `:107,501` (D-379 thresholds and branches), `rule-signs.test.mjs:89` (D-380 refusals), `account-screen.test.mjs:557,5573` (D-381 login card). Each points to the decision it meant. `scripts/` and `guidelines/` hold no reference to the renumbered decisions.
2. **Nothing of `main` lost.** `cmp_decisions.py` splits each log into entries, and each entry into head (before *Rationale*, *Origin* lines excluded, multi-line *Origin* included), *Origin*, and tail. For every decision the head equals `main`'s except D-82 and D-362, and D-374…D-386, which `main` does not have. D-372 and D-373 are byte-identical to `main`'s whole entries. The text before the first entry is identical. Three-way by decision: 65 unchanged, 302 changed by the branch only (all equal to the branch), 0 changed by `main` only, 4 by both (D-132, D-271, D-315, D-316), 2 new from `main`, 13 new from the branch (equal to the branch), problems: none. In all four both-changed decisions the head is `main`'s. `threeway.py` over every tracked path: 314 same, 134 changed by the branch only and equal to it, 5 changed by `main` only and equal to it (`.the-way`, `assets/sprites/fire-small.png`, `src/browser/sim/data/scene.ts`, `src/browser/view/scene-picture.ts`, `tests/view/scene-frost-contrast.test.mjs`), 7 composed, 0 bad. For the six composed files other than the log, the changed lines of `git diff -U0 20bcc58d 688a16be` equal those of `git diff -U0 4660e14a 6b20afea` (same md5 for each file). So the merge is `main` plus exactly the branch's own edits. In `scene.tsx`, `scene-picture.test.mjs` and `scene.test.mjs` every such line is a comment.
3. **Nothing of the branch lost.** Only the four named decisions lost branch text. D-132: *Rationale* is `main`'s whole and *Rejected* the branch's (`main` did not touch it). D-271: *Rationale* and *Rejected* are `main`'s whole. D-315 and D-316: *Rationale* is `main`'s whole, and *Rejected* is `main`'s, which the branch had not changed. All four have *Origin* `none`. Fragments the branch had added and the merge lacks (`lost_out.txt`): D-132 5, D-271 8, D-315 1 (superseded, see M-1), D-316 3. This matches the merge report apart from M-1. D-82 is byte-identical to `9c65ad24`. D-362 is byte-identical to `9c65ad24` and coherent. First sentence: places are named through the `projects`, `tasks`, `task-rules` entries, never by an absolute path. Second sentence: no tracked file names a note, its folder or a file of a private repository. The *Verification* examples agree with both sentences. The only *Origin* other than `none` in the merged log is D-48's repository spec at `b0c4d44`.
4. **The pin.** `git ls-tree 688a16be .the-way` → `160000 commit 55afa8e57aa1b83c77108576a36642722e0dda15`, equal to `20bcc58d`'s. The branch's pin equalled the base's, so this is a change `main` alone made. `main` changed no installer-owned file: `threeway.py` lists no `.claude/`, `.agents/` or `AGENTS.md` among the files `main` changed. Installer preview in the scratch clone: 51 `KEEP` lines, no other action, "Preview only", exit 0.
5. **Other conflicts.** `styles.css` and `tokens.css` with comments stripped (`css_check.py`) are identical to `main`'s, so rules, values and token values are byte-identical. No conflict marker. Comments are balanced. `tokens.css` keeps `main`'s new block "Tint of the scene's light and frost on its edges" as written, after the branch's reworded "Lines" sources. Every declaration of `tokens.css` (70 by my parser) has a non-empty `Source:` comment after its `;`, and `test_design_token_sources.py` passes. In the styleguide, the branch's two rewordings (the intro and the `--bar-width` kind, plus "ustalenie zadania" → "wybór Mariusza z 2026-10-20") stand in place, and `main`'s new `swit-rosnacy-z-passa` bullet is kept as written (see M-4).
6. **Foundation check** on the scratch clone of `688a16be` with `.the-way` at `55afa8e5`: exit 0, "0 errors".

## Declined to judge

- The pointers `main` brought in: the task `swit-rosnacy-z-passa` named in `styles.css`, `tokens.css`, the styleguide and the scene tests, "To do N" and "question N" in those tests, and "as the reconnaissance wanted" in D-372. They conflict with the branch's D-82 and with `tracked-file-private-names` (*Violated:* no). The merge handoff's rule 4 said to list them, not rewrite them. The merge report lists them, and the slice-40 handoff already targets exactly them, so I did not grade them.
- D-132, D-271, D-315 and D-316 read *Origin* `none` while part of their notes' reasoning is missing at this head. The dispatch says a later slice puts it back. Not a matter for the merge.
- The quality of `main`'s own content (D-372, D-373, the tint, the frost and the smaller flame, with their code and tests). It was merged on `main`, and this review only checks that it arrived intact.
- M-1 of the first merge review (D-362 *Rejected*, "leaving this decision unchanged …") is still present. It is not this merge's work.

## Checks run

Scratch directory: `the session scratchpad\review-merge-2\`.

- `git merge-base 6b20afea 20bcc58d` → exit 0, `4660e14a…`; `git show -s --format='%H %P' 688a16be 6b20afea` → the parents as given.
- `python -X utf8 -I renum_check.py renum_out.txt` → exit 0: `bad 0 repl 98 missed 0 tails 0`.
- `git grep -cE 'D-(37[2-9]|38[0-9])([^0-9]|$)' 4660e14a -- . ':(exclude).the-way'` → exit 1 (none); the same on `20bcc58d` → decisions.md 2, styleguide 4.
- Heading list of `git show 688a16be:foundations/decisions.md` (grep/awk) → 386 headings, no duplicate, no gap, last 16 = 371…386.
- `git grep -nE 'D-(37[2-9]|38[0-9])\b' 688a16be -- foundations guidelines AGENTS.md` and `… -- src tests scripts` → read whole (manual check of each target, point 1).
- `python -X utf8 -I cmp_decisions.py cmp_out.txt` → exit 0: heads differ only in D-82, D-362; both-changed D-132, D-271, D-315, D-316; problems none. (The first run, before multi-line *Origin* was handled, also listed D-271/D-272/D-273; inspecting them showed only their multi-line *Origin* differed, and the parser was corrected.)
- `python -X utf8 -I lost_sentences.py cmp_decisions.py lost_out.txt` → exit 0 (point 3).
- `python -X utf8 -I threeway.py threeway_out.txt` → exit 0: `{'same': 314, 'branch_only_ok': 134, 'main_only_ok': 5, 'both': 7, 'bad': 0}`.
- md5 comparison of the `-U0` changed lines, `main`→merge against base→branch, for the six composed non-log files → SAME for all six; non-comment changed lines in `scene.tsx`, `scene-picture.test.mjs`, `scene.test.mjs` → none.
- `python -X utf8 -I css_check.py css_out.txt` → exit 0: stripped `styles.css`/`tokens.css` equal to `main`'s; 0 markers; 0 declarations without `Source:`.
- Scratch clone (`co`, `688a16be`, `.the-way` at `55afa8e5`): `python -B .the-way/elements/common/foundation_check.py` → exit 0, "0 errors".
- Same clone: `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` → exit 0, "checked: 444 files, 0 listed, 15 binary files not read".
- Same clone: `git grep -nE '^(<<<<<<<|>>>>>>>)( |$)|^=======$' -- . ':(exclude).the-way'` → exit 1 (nothing).
- Same clone: `python -B .the-way/installation/install.py . --url https://github.com/mariusznazar/the-way.git` (preview; the `--url` is the `.gitmodules` URL, needed because the scratch submodule's `origin` is a local path) → exit 0, 51 `KEEP`, no change. The first run without `--url` → exit 1 "Existing .the-way has a different URL in .gitmodules", an artefact of the scratch clone.
- Same clone, from `tests/invariants/`: `python -B -m unittest test_design_token_sources` → exit 0 (2 tests); `test_browser_view_token_values` → exit 0 (4); `test_design_token_contrast` → exit 0 (3); `test_browser_view_focus_outline` → exit 0 (3); `test_cross_part_imports` → exit 0 (10). (Run first from the clone root as `tests.invariants.<name>`, they failed to import their support module, exit 1, an artefact of how I called them.)
- Not run: the JS tests of the scene files and `npm run typecheck` (no `node_modules` in the scratch clone). Their code lines are byte-identical to `main`'s, since only comment lines differ (checked above), so I left them unverified on purpose. The merge report gives them as exit 0. Not run: the whole gate (`npm test`), which is the cycle's own run. Not run: S1/S2 of the plan.

## Reaches beyond the dispatch

- `the author's notes\.ai\rules\scripts.md` (the user's rule for scripts), before writing the scratch scripts.
- `reports/review-merge-1-report.md` (whole): the method and the open M-1 on D-362.
- `reports/slice-40-handoff.md`, its head and its *Goal* line: to see whether `main`'s pointers are already routed (they are), for Declined to judge.
- `.the-way/installation/install.py` lines 327-362 and 490-570 at `55afa8e5`: to run the preview in the scratch clone without writing.
- `.the-way/elements/decisions/template.md` lines 60-70 and 136-142 at `55afa8e5`: the rule cited in M-3.
- `foundations/invariants.md` `action-duration-minimum` (whole) and D-132, D-362, D-371…D-386 (whole) in the merged log.

## Unread material

- The 302 decisions only the branch changed and the 65 unchanged ones: not read, their equality checked by script.
- D-271, D-315, D-316: read through their base→main, base→branch and main→merge diffs, not as whole entries.
- `guidelines/styleguide-browser-view.md`: read at lines 326-362 and through the diffs `main`→merge and base→branch, not whole.
- `src/browser/styles.css` and `tokens.css`: read through the `main`→merge diff (tokens.css whole in that diff) and checked by script, not read whole.
- The plan (`plan.md`) and commit `ccc03bcf`: not read; the dispatch did not need them.
- `reports/merge-2-handoff.md`: read whole; `merge-2-report.md`: read whole; `task.md`: read whole; `task-cycle/review/SKILL.md` at `55afa8e5`: read whole.

## Searches not found or unclear

- `reports/merge-2-report.md` concern 3 says the handoff's "new decision … numbered D-368" is `main`'s D-368. That is right: the branch's former D-368 became D-372 in the first merge and D-374 here (`review-merge-1-report.md`, point 4; `invariants.md:954` now D-374). Nothing is unclear in the tree, only the old handoff wording.
- The dispatch's "spot-check at least 15 references" and "check all references inside `foundations/`": inside `foundations/` only two references to the renumbered decisions exist apart from the headings (`invariants.md:954`, D-379 *Rationale*). Both were checked.
