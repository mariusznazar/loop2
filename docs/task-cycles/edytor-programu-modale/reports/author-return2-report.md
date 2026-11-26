# Report of the repeated return step — task `edytor-programu-modale`

**Status:** done

## Commit

- `31e36f7f` — docs: `window-frame` is held at 3:1 against every background it touches; D-40's *Rejected* names the frames and the shadow weighed; the frame's source gives its place; stale comments corrected. The foundation check reports „0 errors” at this commit.

| File | + | − |
|---|---|---|
| `foundations/decisions.md` | 3 | 3 |
| `foundations/invariants.md` | 1 | 1 |
| `guidelines/styleguide-browser-view.md` | 5 | 5 |
| `src/browser/program-panel.css` | 2 | 1 |
| `src/browser/tokens.css` | 3 | 3 |
| `tests/invariants/test_design_token_contrast.py` | 22 | 23 |

No code behaviour changed: the frame's value, the window's rule and every view test stand as at `83f6bf6a`.

## Foundation compared with the code at `83f6bf6a`

| Entry | Compared with | Result |
|---|---|---|
| D-40 (paragraph of `window-frame`, *Rationale*, *Verification*) | `tokens.css`, the window's rule in `program-panel.css`, `tests/view/rule-window.test.mjs` | The binding sentence named 3:1 against `panel` and `highlight` only, while the frame also touches rows on `rule-winning` and `rule-running` under its lower edge and, at 1600, `page` beside the column (Minor 2). Corrected to „against the colours it touches (D-42)”. *Rejected* gained the weighed ways (Minor 4). *Verification* („framed in `window-frame` and casting no shadow”) matches the test. |
| D-42 | the same | Named the frame for the window of a rule only, apart from the other frames (Minor 3). `window-frame` now stands with `control-border`, `focus` and `character` „against the colours they touch”, named as „the frame of the window of a rule or of a rule group”. |
| D-166 | the code | „gains it no width” matches. Nothing changed. |
| Invariant `design-token-contrast` | `tokens.css` and its test | Held the frame against `panel` and `highlight` only. Now `control-border`, `focus` and `window-frame` „have at least 3:1 against each of those five”. The test's pairs, its docstring (rewrapped to 100 columns, Minor 6) and its flagged cases follow. The value keeps every pair: 3.67 (`panel`), 3.09 (`highlight`), 3.13 (`rule-winning`), 3.07 (`rule-running`) and 4.12:1 (`page`). |
| Invariant `design-token-sources` | `tokens.css` | Matches: one `Source:` comment after each declaration; `--window-shadow` is gone with its comment. |
| Styleguide: the Roles table, "Contrast of every pair", "Every value with its source", "The window of a rule and of a rule group" | the code | The row of `window-frame` and the contrast bullet now say what D-42 says. The separate bullet of the frame is merged into the bullet of `control-border` and `focus`, with the colours the window touches named. The rest matches: no shadow, the frame alone. |
| Kitchen-sink page | `role-samples.tsx` | `window-frame` among the roles, in the table's order. Matches. |

**Search by the names and words the range adds** (`window-frame`, `window-shadow`, „shadow”/„cień” at the window): `foundations/`, `guidelines/`, `src/`, `tests/`.
- `window-shadow` stands nowhere.
- The shadow is named only where its absence is said: D-40 *Rationale* and *Rejected*, the styleguide's look bullet and Bad example, the window's CSS comment, and the window test.
- Two stale comments found (Minor 5):
  - the header of `tokens.css`, which defined „the agent's choice” by a task's text alone, now names the human's remark too;
  - the comment of the base rule `.rule-panel` in `program-panel.css`, which said „a frame in `divider`”, now says the frame is in `window-frame` where the rule panel stands as the window.

## Entries written

| Kind | Result |
|---|---|
| Decisions | none new; corrected D-40 and D-42 (above). The added *Rejected* of D-40 and its wider threshold are mine (the cycle's), from what I weighed and measured. |
| Invariants | none new; corrected `design-token-contrast` (above). Read for it: `elements/invariants/skill/decide_entry.md` and `draft.md`. The rule widens within D-42's own sentence, *Part* `browser-view` and *Rests on* unchanged. |
| Environment facts | none — no new source outside the product |
| Glossary terms | none |
| Part-map changes | none |
| Projected entries | none |
| Rows of *Settlements to record* | none — none in this range |

## The Minor findings of `review-remarks-report.md`

- **2 — the colours the frame touches held in part.** A mismatch with D-42's own rule, „against the colours they touch”. Corrected in D-40, D-42, the invariant, its test (pairs on all five backgrounds; a flagged case on `rule-winning`) and the styleguide. The value passes every pair.
- **3 — D-42 named one window only.** Corrected: „the frame of the window of a rule or of a rule group”.
- **4 — D-40's *Rejected* named no choice weighed.** Corrected. It now holds three ways:
  - loop's frame `#3f3f46` (1.70:1 and 1.43:1, below 3:1);
  - the lighter `#9f9fa9`, compared by its ratios alone (6.75:1), farther from loop's darker frame;
  - a shadow under the window, with or without the frame — measured in the game, it darkened the labels of the rows under the lower edge to about 2.5:1 and their descriptions to about 3:1.

  I did not weigh the frame kept in `divider` with a shadow alone as a way of its own. Its cost is the shadow's, so the third way covers it.
- **5 — the frame's source gives no place for its value; two stale comments.** Corrected:
  - the source comment of `--window-frame` now gives loop's address and the date the grey was read (as `--control-border` gives it), with the five ratios;
  - the file's header and the base rule's comment are corrected (above).
- **6 — formatting.**
  - The row of the table Roles is padded to the table's columns as the rows around it are. Its last cell, „D-40 · D-42”, is as wide as that of `chill-zone`. The table was not Prettier-clean at `dc058bbc` either: Prettier there rewrites every row of it. So I did not reformat the whole table.
  - The docstring is rewrapped to 100 columns. The one line over 100 left in the file, a line `decision:`, stood so at the base.
  - The flagged case that set every text role to white is replaced by one that fails the frame alone, on `rule-winning`.
- **7 — `3c748e42` alone fails the foundation check.** A judgement on the history, not a mismatch of an entry, so left. Rewriting the reviewed commits would change the SHAs the reviews name. Every commit of this step keeps the check green.

## Checks (command — exit code)

- `python -B .the-way/elements/common/foundation_check.py` — 0 („0 errors”)
- `python -B .the-way/instruction-files/check_instructions.py` — 0 („0 error, 0 warn”)
- `npm test -- tests/invariants/test_design_token_contrast.py` — 0
- `npm test -- tests/invariants/test_design_token_sources.py` — 0
- `npm test -- tests/invariants/test_browser_view_token_values.py` — 0
- `npm test -- tests/view/rule-window.test.mjs` — 0 (10 pass)
- `ruff format --check` and `ruff check` (`--config ruff.toml`) on `tests/invariants/test_design_token_contrast.py` — 0 and 0 (Ruff 0.17.1 of the main checkout's `.runs/quality-venv`)
- `npx prettier --check src/browser/tokens.css src/browser/program-panel.css` — 0
- Not run: the product's gate — the orchestrator's or CI's. No browser, as the handoff gives.

## Unread material

`reports/review-fix2-report.md` was not read. The handoff names it, but the Minor findings to judge stand in `review-remarks-report.md`, which I read for findings 2–7.

## Searches not found or unclear

none

## Working copies

`.runs/author-return2/` held a copy of the styleguide used to compare Prettier's rewrite, the base styleguide and test outputs. It is removed. No browser and no local start were used.
