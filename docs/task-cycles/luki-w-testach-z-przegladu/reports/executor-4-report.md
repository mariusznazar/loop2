# Report of executor 4 — slice 4: browser-view: the packs' credits complete, and the shared origin cited

**Status:** done

## Commits (range `f2a723faa7ab46051657330cc251cd6af16bd347..HEAD`)

- `51618a45` test: add the completeness test of the picture packs' credits … — `tests/view/icons.test.mjs` (+84, -0)
- `98195ef4` test: cite loop2-shared-public-origin in the nine cases of the account client tests … — `tests/account-api.test.mjs` (+9, -0)

No product file and no file of `assets/` is in either commit (`git diff f2a723fa..HEAD --stat` lists the two test files only).

## What was made

- `tests/view/icons.test.mjs`: two cases, each marked `// invariant: sprite-credits`.
  - A table `PACK_OF_SPRITE` assigns each of the 18 PNG files directly in `assets/sprites/` to a pack; a table `SPRITE_PACKS` says which of the three packs asks for a credit (Pixel Crawler: no, per `pixel-crawler-terms`; `[LPC] Wolf Animation` and `Smoke & Fire Animated Particle [16x16]`: yes, per `lpc-wolf-licence` and `smoke-fire-particle-licence`). The first case reads the directory and fails naming each file with no assignment.
  - The second case takes the packs that have a file in the directory, and for each one whose licence asks for a credit fails naming it when no `<li>` of the rendered credits section (`CreditsSection`, read as markup the way the file's other cases read it) holds the pack's title in `„…”`. Pack titles are literals taken from the environment facts, not read from `credits.ts`.
- `tests/account-api.test.mjs`: `// invariant: loop2-shared-public-origin` added under each of the nine `// invariant: account-client-requests` lines (lines 139, 212, 668, 703, 962, 986, 1213, 1418, 1540 before the edit).

## Checks (command and exit code)

| Check | Command | Exit |
|---|---|---|
| icons test, passing, before any break | `npm.cmd test -- tests/view/icons.test.mjs` | 0 (36 pass, log `.runs/executor-4/icons-pass-1.txt`) |
| icons test, passing, after all restores | `npm.cmd test -- tests/view/icons.test.mjs` | 0 (36 pass, `icons-pass-2.txt`) |
| **seen failing 1:** PNG added for a moment (`assets/sprites/zz-added-for-check.png`, a copy of `moss.png`) | `npm.cmd test -- tests/view/icons.test.mjs` | 1; the case "each PNG file directly in assets/sprites is assigned …" failed with `actual: [ 'zz-added-for-check.png' ]` (`icons-fail-file.txt`); file removed afterwards |
| **seen failing 2:** the "Wilk" entry (`[LPC] Wolf Animation`) taken out of `PACK_CREDITS` in `src/browser/view/credits.ts` for a moment | `npm.cmd test -- tests/view/icons.test.mjs` | 1; the case "each pack with a file in assets/sprites whose licence asks for a credit …" failed with `actual: [ '[LPC] Wolf Animation' ]` (`icons-fail-credit.txt`); three older cases of the file failed too, as they count the credit lines; `git checkout -- src/browser/view/credits.ts` afterwards |
| account-api test, passing, before any break | `npm.cmd test -- tests/account-api.test.mjs` | 0 (39 pass; run in the same tool call as the break edit, so it is not clean evidence — rerun below) |
| **seen failing 3:** client's path made absolute for a moment in `src/browser/account-api.ts` (`fetch(\`https://loop2.invalid${path}\`, …)`) | `npm.cmd test -- tests/account-api.test.mjs` | 1 (4 pass, 35 fail; among the failures the nine cited cases, e.g. "each call sends its documented method, relative path and JSON body", the three redirect cases and the owner-panel path cases; `account-api-fail.txt`); `git checkout -- src/browser/account-api.ts` afterwards |
| account-api test, passing, after the restore | `npm.cmd test -- tests/account-api.test.mjs` | 0 (39 pass, `account-api-pass2.txt`) |
| product and assets untouched | `git status --short -- assets src` | shows nothing (checked after each restore and at the end); `git diff --quiet -- src assets` exit 0 would follow from this and the empty range diff |
| foundation check before the slice | `python -B .the-way/elements/common/foundation_check.py` | 1, "2 errors": `loop2-shared-public-origin` and `sprite-credits` read `test` and no test cites them (`foundation-check-before.txt`) |
| foundation check after the slice | `python -B .the-way/elements/common/foundation_check.py` | 0, "0 errors" (`foundation-check-after.txt`) |
| format and lint of the two test files | `npx prettier --check tests/view/icons.test.mjs tests/account-api.test.mjs` (run per file) · `npx eslint` (per file) | 0 · 0 |

The two restorations were done with `git checkout -- <file>` (the `credits.ts` break by an edit, the `account-api.ts` break by an edit); `git status --short` after each showed only the test files as changed and `git diff --stat -- src assets` was empty, so the files are as they were byte for byte. The added PNG was removed with `rm`; `git status --short` showed no untracked file afterwards.

The full gate was not run (the orchestrator's alone); none of the slice's checks names it.

## Own-work check (section 3)

- **Requirement most likely not met:** the credits check must name a pack that has no line, not merely fail, and the file check must name the file; and the assignment table must be right for the files (a wrong assignment of a wolf file to Pixel Crawler would let a missing credit pass).
- **Check:** the two failing runs above show the failure naming the file and the pack. For the assignments I read `src/browser/sim/data/scene.ts` (the files its data names: `wolf-*` for the wolf, `dust.png` for the dust, `sticks`/`berry-bush`/`moss`/`fire*`/`mage-*`/`camp-clearing`/`chest`/`forest-scene`), the commit `873f9f9c` ("the pack's mage in one frame size and its fire and props unchanged") and viewed `login-backdrop.png` and `forest-scene.png`; the backdrop shows trees, the campfire and the mage, no wolf.
- **What it showed:** the table follows D-271 (dust: Smoke & Fire; wolf: LPC Wolf; the rest: Pixel Crawler). One observation: D-271's first sentence says the login picture is "sprites of the packs Pixel Crawler and LPC Wolf", but the picture I viewed holds nothing of the wolf, so I assigned it to Pixel Crawler only. If the human knows a wolf frame is in it, the file would need both packs (the table holds one pack per file); I did not settle that and flag it as a concern.

## Choices made

- Two cases instead of one, so that a missing assignment does not hide a missing credit; both carry the marker. Rejected: one case with two assertions. Cost if wrong: none.
- A pack is asked for a credit only when a file of it stands in the directory (`packsInUse`), with a precondition that the two credited packs have files. Rejected: asking for every pack of the table whatever the directory holds. Cost if wrong: a pack whose last file is removed needs a test edit with the credit line.
- All nine cases that cite `account-client-requests` now cite `loop2-shared-public-origin`, the redirect cases and the owner-panel path cases included (the plan says "the cases that check a relative `/api/` path and no followed redirect (they cite `account-client-requests`)"). Rejected: only the two or three first cases. Cost if wrong: a citation too wide on a case that checks the relative path but not the origin as such; the break in "seen failing 3" fails all nine, so each does hold the relative path.
- I kept the `// decision: D-271 "…"` line of the two new cases with the same quoted text the file's existing case at the credits already uses; `foundation_check.py` passes with it.
- No changed invariant test.

## Mutation in the head

- A file added with no assignment: caught (seen). A file removed from the directory: the table keeps a stale entry, which no case catches; harmless, as the entry assigns nothing that is read. A pack's line removed: caught (seen). A pack's line present but of another pack's title: caught by title match. A credit line reduced to a pack's name without its author or licence: not caught by the new case, caught by the file's existing case on the pack lines' text. A new pack added with files and a table entry `asksForCredit: false` by mistake: not caught (the table is the human's statement of the licence).
- A credited pack's file assigned to Pixel Crawler by mistake: not caught; the assignment is by hand from D-271.

## Reaches beyond the handoff

- `src/browser/sim/data/scene.ts` (grep for `.png` names and a view of lines 40-50, 280-302, 130-145), to check which pack each file belongs to.
- `git log` / `git show --stat` of commits `873f9f9c`, `688e133a` for the origin of the props and the login backdrop; the two image files read as pictures (`assets/sprites/login-backdrop.png`, `assets/sprites/forest-scene.png`).
- `tests/account-api.test.mjs` lines 1348-1651 (grep of markers) to see the owner-panel cases; `tests/invariants/test_icon_credits.py` was only listed, not read.
- `the author's global rule file git.md` (commit rules, by the global instructions).

## Plan and code

- The ranges of the handoff held. A small mismatch: the plan's wording "the cases that check a relative `/api/` path and no followed redirect" does not say whether the owner-panel cases count; I took all nine cases of the marker (see choices).
- The testing guidelines' table of trust boundaries still says `assets/sprites/` is checked by review with a temporary exception (D-273); that stands in `guidelines/testing.md` and is not this slice's file. The one sentence about `sprite-credits` is not in that table. Noted, not touched.

## Working copies

- `.runs/executor-4/` under the worktree (ignored by git) holds only logs of the runs named above and the two foundation-check outputs; no worktree, clone or script copy was made. The directory stays for the orchestrator to read the logs.

**Unread material:** none (guidelines `testing.md`, `coding.md` and `styleguide-browser-view.md` read whole, in pages; the foundation entries and files the handoff names read whole except `tests/account-api.test.mjs` lines 1348-1651, which I only grepped for markers — that part holds cases the slice does not change except by the nine marker lines, whose positions I took from the grep; `foundations/environment_facts.md` entries `cc-by-3-adaptation-credit` and `fetch-same-origin-credentials` read whole, `cc-by-3-licence-copy` not named and not read).

**Searches not found or unclear:** the slice names `foundations/part_map.md:3-31` browser-view and `.claude`-level references; I did not open the part map, as no file of the slice's change needed its membership checked (`tests/view/` and `tests/account-api.test.mjs` are listed in the testing guidelines' "Where in code"). Unclear: whether `login-backdrop.png` holds frames of LPC Wolf, see the own-work check.
