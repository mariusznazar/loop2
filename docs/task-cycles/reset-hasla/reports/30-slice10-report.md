# Slice 10 report — task reset-hasla

**Status:** done

## Files and commits
- src/browser/kitchen-sink/kitchen-sink.ts (formSample now takes kind login|register|request|reset and state waiting|warning|note; 5 new samples; imports createFormNote and RESET_REQUESTED_SENTENCE)
- src/browser/view/account-screen.ts (1 line: RESET_REQUESTED_SENTENCE now exported, so the page does not keep a copy that could drift)
- guidelines/styleguide-browser-view.md (+13/-7): rule "States of shared controls" (Decision line adds D-214, Good, loading texts "Wysyłanie…"/"Ustawianie…", the sentence in text-secondary and no refusal, form sentence line) and rule "The kitchen-sink page" (lists the new forms and the sentence).
- Commits: see git log of the branch (a feat commit for the page and export, a docs commit for the styleguide).

## Checks (command, exit code)
- node scripts/kitchen-sink.mjs --build-only: 0
- npm test -- tests/invariants/test_application_build_kitchen_sink.py: 0 (3 tests)
- npm test -- tests/invariants/test_browser_view_token_values.py: 0 (4)
- npm test -- tests/invariants/test_browser_view_focus_outline.py: 0 (3)
- npm test -- tests/quality/test_quality_invariants.py: 0 (5)
- python -B .the-way/elements/common/foundation_check.py: 0 ("0 errors")
- npm run typecheck: 0
- Not run: npm test with no argument (orchestrator's gate). No invariant test written or changed, so no failing run.

## How the slice shows its states (seen in Playwright, page served by a temporary python http.server on 127.0.0.1:8765, stopped after)
Read from computed styles of the built page:
- Nie pamiętam hasła, waiting: button "Wysyłanie…" disabled, colour #52525c (text-disabled), field disabled.
- Nie pamiętam hasła, refusal ("Za dużo prób. ..."): form-warning, colour #fe9a00 (warning).
- Nie pamiętam hasła, answer: .form-note with the sentence, colour #9f9fa9 (text-secondary), visible.
- Ustaw nowe hasło, waiting: "Ustawianie…" disabled #52525c, both fields disabled.
- Ustaw nowe hasło, "Brak połączenia ..." in warning colour.
- Existing four samples unchanged. Only console error: favicon 404 of the plain server. A screenshot was not taken (selector matched two containers); layout was not looked at, only text roles.

## Own-work check
Requirement most likely missed: the sentence must not stand in warning. Check: computed colour of the note sample = text-secondary (#9f9fa9), class form-note, not form-warning. Passed on first run.

## Choices
- Exported the sentence from account-screen.ts rather than copying it (cost if wrong: one added export of a game module).
- Refusal sentences for the new samples reuse existing client sentences: the tooManyAttempts text (copied as a page constant TOO_MANY_ATTEMPTS, as the page already copies REFUSAL and NO_CONNECTION) for the request form and NO_CONNECTION for the reset form. No new meaning.
- Cosmetic: the page shows the reset form's refusal as a kept failure, not an invalid-link refusal, since that ends the screen.

## Reaches beyond the dispatch
- src/browser/account-api.ts:139-141 (client sentences), foundations/decisions.md D-214 mention in D-44 (already read via dispatch), styleguide lines 155-287. No gap.

## Searches not found or unclear
none (the template's "Writing the file" asks for values from the task's To do; no value was added, only texts and role names).
