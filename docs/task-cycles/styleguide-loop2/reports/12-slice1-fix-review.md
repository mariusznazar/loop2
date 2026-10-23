PASS d190e10dbe46b0fb1c7df83325c79665e4e4bf59

# Review 12 — fix of slice 1 (finding I1 with M4)

- **Reviewed:** the fix of the blocking finding of `09-slice1-review.md`, section 4 of
  `.the-way/task-cycle/review/SKILL.md` (pin `f0b2130`).
- **Range:** `5ef77fcae7a368de96ca9a73fb4d20fe46ef84a2..d190e10dbe46b0fb1c7df83325c79665e4e4bf59`,
  one commit `d190e10`; `git rev-parse HEAD` is `d190e10…`, the head given. Worktree clean; nothing
  written but this report.
- **Read:** `reports/10-slice1-findings.md` (settlement S1-I1, I1 and M4), `reports/11-slice1-fix-report.md`,
  row S1-I1 of `cycle.md`'s questions table, the fix diff, D-40 whole at the head, every foundation
  line naming `highlight` (D-39, D-40, D-42, D-43's rationale, `design-token-contrast`), D-19 and
  D-47 for a collision with the widened meaning.

## The findings file

**I1 — fixed.** The defect no longer exists at `d190e10`:

- `foundations/decisions.md:801` (D-40): `highlight` means "that this row or track is marked or that
  this control is under the pointer", as S1-I1 settles; Q12 joins *Origin*; *Verification* gains the
  complying example of a hovered button on `highlight` with frame and text role unchanged; the
  violating example (a selected button shown by `highlight` alone) stays and stays true, selection
  being `selected`.
- `guidelines/styleguide-browser-view.md:18`: the Roles row translates the new meaning faithfully
  („… albo ta kontrolka jest pod kursorem.”).
- `guidelines/styleguide-browser-view.md:170`: hover — „tło `highlight` (D-40), ramka i rola tekstu
  bez zmiany”. Rule 1, the Roles table, D-40 and rule 6 now agree; Slices 6 and 7 can build the hover
  state and pass a review under rule 1.

**M4 (fixed with I1, as the findings file asks) — fixed.** `guidelines/styleguide-browser-view.md:65-73`:
an element given `page`, `panel` or `highlight` takes `text` unless it already has another text role,
and keeps that role on each of the three backgrounds, with the destructive button keeping `danger`
and the selected one `text-strong` under the pointer — consistent with D-39 and D-40 ("Each of the
five stands as text on `page`, `panel` and `highlight`").

Nothing contested.

## What the fix itself could have broken

None found:

- No collision with D-19 or D-47: a tile of the terrain drawing is a picture, not a control (D-19),
  and its hover keeps `link-highlight`; the widened meaning names "this control", and a control is
  what the keyboard reaches (D-47), so neither a tile nor a row of the list of revealed tiles takes
  `highlight` by it.
- `design-token-contrast` needs no change: a hovered control's pairs — each text role and
  `control-border` on `highlight` — are already among its pairs.
- D-40 stays within one to three binding sentences, holds no forbidden word, and its *Rationale* and
  *Rejected* still describe the decision; no reason for the hover use is invented (fix report's
  concern) — the decisions template does not require one.
- Form of the styleguide unchanged: same rules, fields and order; no value written.

## Out of the fix (not reopened)

- The Minor findings M1–M3 and M5–M7 of `09-slice1-review.md` stand as written there; the fix did
  not touch them, and they do not block.

## Declined to judge

- That `selected` has no contrast pair of its own in `design-token-contrast` — older than the fix and
  outside the findings file; the pairs are Q22's list.

## Checks

| Command or manual check | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` at `d190e10` | 1 | `12 errors`, the plan's pattern table, as at `5ef77fc`; no other error |
| `python -B .the-way/instruction-files/check_instructions.py .` | 0 | `0 error, 14 warn, 3 info`, as at the base |
| `python -B .the-way/instruction-files/check_instructions.py . --file guidelines/styleguide-browser-view.md` | 0 | `0 error, 25 warn, 4 info`, as before (the 11 dead paths of later slices) |
| Manual: the fix diff against I1, M4, S1-I1, D-19, D-39, D-42, D-47 and `design-token-contrast` | — | as above |

Not run: `npm test` — the cycle's own run before the request; the fix changes Markdown only.
