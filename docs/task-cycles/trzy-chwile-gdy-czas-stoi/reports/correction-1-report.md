# Correction 1 report — task trzy-chwile-gdy-czas-stoi

**Status: done.** Commit `23e22246` (base `67bc237b`). Nothing pushed. No colour, timing, code path or test changed.

## What I changed

- `src/browser/tokens.css:91-94`: the `Source:` comments of `--scene-chill`, `--scene-chill-opacity`, `--scene-speck-ember` and `--scene-speck-bronze` now read "Mariusz's choice at the request of the task trzy-chwile-gdy-czas-stoi, 2026-11-12, accepting the cycle's proposal as it stood (question 9 of that task)", in the form of line 82/40 ("Mariusz's choice … (question N of that task)"). The description of each colour and the pixel addresses of the two specks (and their measured ratios, which are facts) are kept.
- `src/browser/styles.css:2225-2226` (comment of the cold layer): "which the cycle proposes and the human chooses at its request" → "which the human chose at the request of the task, accepting the cycle's proposal".
- `guidelines/styleguide-browser-view.md:357-361` (rule "Every value with its source", the bullet for these values): now says the cycle proposed them on screenshots, Mariusz chose them at the request accepting the proposal unchanged, the `Source:` comment carries his choice with the task name and 2026-11-12, and for the specks the pixel of the named picture. `:747-748` (closing paragraph of the scene rule): "cykl je proponuje, a wybiera je Mariusz" → the cycle proposed them and Mariusz chose them, accepting the proposal.

## Hits left, and why

- `foundations/decisions.md` D-271 *Verification* "violates: … a cold layer whose colour no choice of the human gave": a general rule that stays true (the choice now exists).
- `foundations/decisions.md` D-322 *Rationale* "the colours of the cold layer and of the specks and the lengths of the effects come from a choice of the human made on screenshots": states how they come about, true now; the lengths of the effects were let through with the rest. No foundation file changed, so no skill was needed.
- `src/browser/styles.css` and tests: other "waits for"/"czeka" hits are about the window waiting for the effect, the server or "Czeka" (the action); not about these colours. Tests pin no such wording.
- `src/browser/sim/data/scene.ts`, `README.md`: no hit about the colours.
- The earlier report files (`author-report.md` etc.) are the cycle's record, not touched.

## Checks (command, exit code)

- `npm test -- tests/invariants/test_design_token_sources.py` — OK, 0; `test_design_token_contrast.py` — OK, 0; `test_browser_view_token_values.py` — OK, 0.
- `python -B .the-way/elements/common/foundation_check.py` — 0 errors (no foundation file touched; run because the styleguide is read by it).
- `npx prettier --check` on `tokens.css`, `styles.css`, `guidelines/styleguide-browser-view.md` — clean.

## Own-work check

Searched `foundations/`, the styleguide, `styles.css`, `tokens.css`, `scene.ts`, `README.md` and `tests/` for "pending", "propos*", "propon*", "propozycj*", "wybier*", "do wyboru", "waits for", "czeka", "no choice of the human", "human's choice"; the remaining hits are listed above. After the edit the four token lines carry no "proposed" or "pending".

## Unread material

none (the handoff read whole; the variant's file `.the-way/task-cycle/change/SKILL.md` section on a correction read earlier as part of the method).

## Searches not found or unclear

none
