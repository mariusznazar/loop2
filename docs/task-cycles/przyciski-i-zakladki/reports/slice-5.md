# Report — slice 5 of `przyciski-i-zakladki`

**Status:** done

## Commits

- `66120c8` docs: :memo: mark the 17 modules that build elements through the DOM APIs as `do not copy` in the coding guidelines of the browser module and add the rule on a new screen and the modules in DOM

## Files changed

- `/home/user/loop2/guidelines/coding-browser-module.md` (+51 −26)

## What changed

- Table *Files of this kind*: `do not copy` for the 17 files of the task's *Context* (`app`, `away-report`, `body-row`, `character-skills`, `combat-line`, `email-confirmation`, `email-status`, `footer`, `game-view`, `headquarters`, `program-editor`, `program-panel`, `status-row`, `terrain-panel`, `tile-list`, `trip-editor`, `trip-lines`). `copy` kept at `account-rules.ts`, `clock.ts`, `credits.ts`, `password-reset.ts`, `terrain-picture.ts`, `credits-section.tsx` and all of `controls/`. `game-saver.ts` was `do not copy` already. The Decision column stays `—` on every row except the exemplar's, as `coding/template.md` gives.
- No file was added under `src/browser/view/` in slices 1-3, so no new row.
- New rule `### Nowy ekran i moduły w DOM` (Decision D-265, Invariant none, Good/Bad): a new screen is not built on the pattern of a `do not copy` file; the status does not forbid importing their pure functions; the rule covers only new screens, so a new section of a screen still in DOM may be built in DOM (pytanie 5b); `copy` at `controls/` means a new control is written in both forms.
- Rule `### Wspólna kontrolka w dwóch postaciach` (D-265): one phrase added, "także jego nowa sekcja" (D-265 now says a new section of a DOM screen may be built in DOM).
- Examples: a lead sentence in `### Kontrolki w DOM i ich aktualizacja` and in `### Gra na stronie i odpowiedzi serwera` says they are about maintaining a screen that stays in DOM, not about building a new one (the third note of pytanie 5; `status-row.ts`, `app.ts`, `game-view.ts`).
- The control example: `kind` (with `secondary` and `tab`) added to the list of the props/options in both forms, the only place slice 1 made it incomplete. Nothing else of it touched.
- Rule `### TypeScript i DOM` left as is (its Decision is D-03; its text already cites D-265 and "zostaje przy API DOM" already covers a new section).

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors" (ran after the edit and again after the final reflow).
- `python -B .the-way/instruction-files/check_instructions.py --file guidelines/coding-browser-module.md .` — exit 0; 0 warnings for this file, same as before the change (the file's INFO lines about bare names such as `clock.ts` were there before). Not in the slice's *Checks*; run as a guard of the guidelines-as-instruction-file note.
- Not run: the product's gate `npm test` (handoff forbids it). The tool run of `coding-guidelines` audit and trial run were not made, by pytanie 5a.

## Own-work check (section 3)

- Requirement most likely missed: the template's rule "a rule carries no rationale and no rejected options" and "what names no decision is an example" — the three notes could have leaked reasons or stood as rules without a decision.
- Check: read the new rule against `coding/template.md` and `product-guidelines/template.md`: it has the four fields in order, cites D-265, carries no "why", the note about examples stands under `## Examples` with no decision field except an inline (D-265) pointer; `foundation_check.py` passes (it reads decision numbers and fields). Showed: conforms.

## Choices made

- Notes 1, 2 and 5b are one new rule rather than additions to three existing rules. Rejected: spreading them in `TypeScript i DOM` (Decision D-03, wrong decision) and the controls rule (wrong subject). Cost if wrong: one heading to merge.
- The sentence "Plik budujący elementy przez API DOM, dodany po ostatnim audycie tabeli, nie ma w niej wiersza i też nie jest wzorem" is my application of D-265 ("never after the pattern of a module that builds its elements through the DOM APIs") to a file the table does not list (the template says a file added after the audit takes no row). Not in pytanie 5. If the orchestrator thinks it goes beyond the task, delete that sentence; cost: a new DOM file not in the table is then unmentioned.
- "Nowy ekran powstaje po wzorze pliku ze statusem `exemplar`" ties the new rule to D-36's exemplar (`account-card.tsx`); a plain consequence, not a new meaning.
- Commit trailer: the handoff names `Co-Authored-By: Claude Opus 5.5`; the harness's attribution reminder for this session names `Claude Sonnet 5.5`, which is the model that made the commit, so I used that line with the same `Claude-Session` line. Change by `git commit --amend` if the Opus line is wanted.

## Reaches beyond the handoff

- `.the-way/task-cycle/change/slice.md` (named by the method skill's section 1 for a slice) — read, as the handoff's method requires.
- `.the-way/instruction-files/check_instructions.py` — run, to guard the note "a file of guidelines read as an instruction file" of `product-guidelines/template.md`.
- `git diff 707738f~1 707738f -- foundations/decisions.md` — to see what the change of D-265 added, so the rules that name it came into line (`product-guidelines/template.md`, "A changed entry brings its rules along").
- `grep -rn D-265` over tracked `.md/.py/.mjs` — to find rules naming D-265: only `guidelines/coding-browser-module.md`, `guidelines/coding.md` (mentions the file in the kinds table only, no change needed) and the decision log.

## Searches not found or unclear

none (the handoff's "Foundation entries row 7 and the change of D-265" was explained in the handoff: row 7 is tied to the changed D-265, read whole).

## Questions to the orchestrator

none.
