PASS d09512b4cb3d25599cc02b33a7da2c4fdb006a3d

# Review of the fix — poprawki-brzmienia-fundamentu

- Fix range: `bcc35f33f571f890626affedb9d430d5cc6a7a39..d09512b4cb3d25599cc02b33a7da2c4fdb006a3d` (one commit, 14 files, +70 / -34). `git rev-parse HEAD` = `d09512b4…`, the head given; clean tree.
- Bounded by `reports/whole-review-findings.md`; the fix report `reports/fix-report.md` read whole.
- Counts: blocking 0 · Minor remaining or new 2 · out of scope 0 new.

## Each finding

| Finding | State | Evidence |
|---|---|---|
| B1 — `sprite-credits` clause not checked | **fixed** | `tests/view/icons.test.mjs:422-468`: the case carrying `// invariant: sprite-credits` now calls `packOfSpriteInReadme()`, which reads point 2 of `README.md`, splits it into one sentence per pack, requires each sentence to name exactly one pack of `SPRITE_PACKS`, and maps every `` `assets/sprites/<file>.png` `` of the sentence to that pack; `assert.deepEqual(packOfSpriteInReadme(), PACK_OF_SPRITE)` fails on a file the README puts under another pack, forgets or adds. The invariant's sentence ("the pack of each file being the one the list of the sprite files in `README.md` names") is now what its test checks. The fix report shows the case failing on a README with a renamed file and with a sentence naming two packs. `foundation_check.py` no longer lists `sprite-credits`. D-271's clause ("which does not judge whether the assignment is right") stays true: the test compares two hand-written lists, it does not judge the art. |
| B2 — "camp" for the picture band in English files | **fixed** within the finding's list | `README.md:34`, `src/browser/view/camp-picture.ts`, `src/browser/sim/data/scene.ts`, `src/browser/headquarters.css`, `src/browser/styles.css`, `src/browser/run-screen.css` and the heading `guidelines/styleguide-browser-view.md:930` (now "### The picture band of Siedziba") say "the picture band"; `src/browser/view/headquarters.tsx:3`, `:276` too. A case-sensitive `git grep -i -w camp` over `README.md src guidelines .claude .agents foundations tests` at the head leaves only identifiers, class names, file names and "at the camp" / "out of the camp" for a character's place — and the two skill files below. |
| Minor 3 — D-322 cites D-319 only | **fixed** | `foundations/decisions.md:11237` now ends "(D-317, D-319)." |
| Minor 5 — D-232 line claims the leftover clause | **fixed in part, accepted** | `tests/invariants/test_account_save_backup_encrypted.py:130` quotes "Outside the container's writable layer of D-231, the plain database exists on the host only in that pipe" — the claim of the uncovered leftover clause is gone, which was the defect. My recommended second line "and the backup is not compressed" cannot stand: `foundation_check.py` holds a quotation to begin a sentence of the decision. I withdraw that part of the recommendation; the test's `age_input == PLAIN_DATABASE` still checks the uncompressed stream, and D-232's *Verification* names it ("so uncompressed"). |
| Minor 6 — stale docstrings | **fixed** | `tests/invariants/test_account_server_runtime.py:1-2` and `tests/invariants/test_terrain_drawing_numbers.py:1-2` open with the invariants' present sentences; `foundation_check.py` no longer lists the two invariants. |
| Minor 7 — D-355 exception | **fixed** | D-355 *Rationale*: "…except the file and its owner, which a human creates, and two things read once on the server on 2026-11-14, …". |
| Minor 8 — D-218 *Verification* | **fixed** | "tests: „pokolenie {n}” beside the name of a character on Siedziba and on the screen Postać from generation number 2 up, and no label at generation 1." The case stands at `tests/view/character-screen.test.mjs:108-111`. |
| Minor 9 — `docker-compose-down-volumes` sentence | **fixed** | "…removes the containers of the Compose file's services, the networks it defines and the default network, and no volume, …"; its *Source* already quotes "The default network, if one is used."; the one dependant (`invariants.md:693`) concerns volumes. |
| Minor 1, 2, 4 | not changed, by the orchestrator's decision | not judged as findings of the fix. |

The three decision edits (D-322, D-355, D-218), made without the decisions skill, were compared with `.the-way/elements/decisions/template.md` as I read it in the first review: a citation inside a binding sentence, a sentence of *Rationale* and a *Verification* `tests:` item, each in the form its field already has; nothing binds anything new, and the foundation check passes.

## Findings of this review

1. **Minor, remaining (B2 outside the fix diff):** `.claude/skills/loop2-scene-art/SKILL.md:9` and its twin `.agents/skills/loop2-scene-art/SKILL.md:9` say "the camp at the top of Siedziba" for the picture band — English text of tracked files, the same two-meaning use B2 named, missed by my first search. The orchestrator knows of it; the twin pair has to change together. Not blocking (outside the fix diff).
2. **Minor, new:** `tests/view/icons.test.mjs:428-447` — `packOfSpriteInReadme()` splits point 2 on the literal openings "The second pack is " and "The third is "; a reworded README (a fourth pack, or "The third pack is") makes the case fail with "packs named in: …" rather than pass wrongly, so the risk is a false failure, not a missed one. Polish only.

No new Critical or Important finding in the fix diff.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors`; 3 `listed:` lines left (`player-opaque-session-cookie`, `trip-plan-progress`, `loop-run-knowledge`), all from the reviewed change and judged in the first review |
| `npm test -- tests/view/icons.test.mjs` | 0 | 36 pass |
| `npm test -- tests/invariants/test_account_save_backup_encrypted.py` | 0 | OK |
| `npx prettier --check` on `icons.test.mjs`, `scene.ts`, `camp-picture.ts`, `headquarters.tsx`, `headquarters.css`, `styles.css`, `run-screen.css` | 0 | formatted |
| `npx eslint tests/view/icons.test.mjs` | 0 | no report |
| `git grep -n -i -w camp` (case-sensitive filter of identifiers and the character's place) | — | only the two skill files remain (Minor 1) |

Not run: the full gate (the cycle runs it); ruff (`.runs/quality-venv` missing; the Python changes are docstrings and one comment line); `test_account_server_runtime.py` and `test_terrain_drawing_numbers.py` (docstring only; they need Docker or a full build); a failing run of the new README check of my own — I rely on the fix report's two failing runs and on reading the code (`deepEqual` both ways over the whole map).

## Unread material

- The whole files the fix touched were read only at the changed lines and the code of the new helper (`tests/view/icons.test.mjs:419-468`); the fix's handoff `reports/fix-handoff.md` was not read. No decision was read whole in this review; the three edited decisions were read at their changed lines against what I read of them in the first review.

## Searches not found or unclear

- My first `git grep … | Select-String -NotMatch` filter was case-insensitive and hid every line (its `CAMP\b` matched "camp"); rerun case-sensitive with a positive control on the skill files.
- A sentence-starting quotation for "not compressed" in D-232: none exists (Minor 5).

## Working copies

- `.runs/review-whole/` (check outputs only): removed before returning. No worktree made.
