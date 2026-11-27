# Report — repair 1, eight stale quotation lines (task rana-i-opatrunek)

Status: done

Commit: `5731b59213c317bdfb76e0ed27ca0768c2dbdbcb` (on `task/rana-i-opatrunek`, on top of `6955a494`; two files, by path, no push). Only the quotation after the decision number changed on each of the eight lines; no assertion, test body or other line changed.

## Lines

Each new quotation begins a binding sentence of the decision as it stands in `foundations/decisions.md` and runs through the words the test holds. Every test holds what its new quotation says.

1. `tests/view/character-skills.test.mjs:171`, D-199
   - old: `a numerical branch also gives „teraz {wartość} → po kupnie {wartość} · cena {cena}”, while „Obchód”, „Czysty płomień” and „Zwiad” give the price and omit numerical before-and-after values, as does „Ucisk”`
   - new: `Below an open tree each branch gives its name, rank and maximum rank, description from data and a „Kup” button disabled when points are insufficient or all ranks are bought; a numerical branch also gives „teraz {wartość} → po kupnie {wartość} · cena {cena}”, while „Obchód”, „Czysty płomień” and „Zwiad” give the price and omit numerical before-and-after values, as does „Ucisk”`
2. `tests/view/character-skills.test.mjs:234`, D-199
   - old: `a numerical branch also gives „teraz {wartość} → po kupnie {wartość} · cena {cena}”`
   - new: `Below an open tree each branch gives its name, rank and maximum rank, description from data and a „Kup” button disabled when points are insufficient or all ranks are bought; a numerical branch also gives „teraz {wartość} → po kupnie {wartość} · cena {cena}”`
3. `tests/view/pressure-pick.test.mjs:68`, D-290
   - old: `The pick of the rule panel sets the actions in five named groups: … Żywność i walka — „Zjedz — jagoda”, „Opatrz”, „Uderz — patyk”, „Kopnij”, „Odskocz”, „Ucisk”, „Załóż”`
   - new: the same with the ellipsis written out: `… five named groups: Ruch — „Eksploruj”, „Wędruj”, „Idź”, „Idź — ognisko”; Zbieranie — „Zbierz”, „Obchód”; Ogień — „Wytwórz — ognisko”, „Zapal — ognisko”, „Zapal — patyk”, „Zasil — ognisko”; Żywność i walka — „Zjedz — jagoda”, „Opatrz”, „Uderz — patyk”, „Kopnij”, „Odskocz”, „Ucisk”, „Załóż”`
4. `tests/view/pressure-pick.test.mjs:81`, D-363
   - old: `An action whose price its target gives, „Wytwórz” and „Opatrz” with an item as the target, shows no price at its cell of the pick of actions … „Ucisk” with an item as the target is such an action too, its cell showing no price`
   - new: `„Ucisk” with an item as the target is such an action too, its cell showing no price` (the opening of the second sentence of the second paragraph)
5. `tests/view/pressure-pick.test.mjs:93`, D-363
   - old: `the pick of its target shows at each target the price of the action with that target, in brackets after the target's name`
   - new: `An action whose price its target gives, „Wytwórz” and „Opatrz” with an item as the target, shows no price at its cell of the pick of actions; the pick of its target shows at each target the price of the action with that target, in brackets after the target's name`
6. `tests/view/pressure-pick.test.mjs:104`, D-363
   - old: `„Ucisk” with an item as the target is such an action too … and the action chosen in the panel showing it, such as „Ucisk — Opatrunek (1 opatrunek)”`
   - new: `„Ucisk” with an item as the target is such an action too, its cell showing no price and its target and the action chosen showing it, such as „Ucisk — Opatrunek (1 opatrunek)”`
7. `tests/view/pressure-pick.test.mjs:112`, D-293
   - old: `„tura” for an action of combat`
   - new: `Beside a program rule's action, in its row and in the rule panel, stands the time one carrying out of the action takes, such as „10 min”, „tura” for an action of combat`
8. `tests/view/pressure-pick.test.mjs:121`, D-289
   - old: `a branch action the character of the map run has not bought, „gałąź niewykupiona”; such an action while the game holds no map run, „wybierzesz w przejściu postaci, która ją kupiła”`
   - new: `The pick of the rule panel holds nothing undiscovered, and what is discovered but may not be picked stands greyed with its reason: a branch action the character of the map run has not bought, „gałąź niewykupiona”; such an action while the game holds no map run, „wybierzesz w przejściu postaci, która ją kupiła”`

No decision's sentence says something other than what its test holds; nothing to contest.

## Checks (run from the worktree root)

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — exit 0 (before the change: 8 errors, exactly the eight lines above; after: `0 errors`).
- `npm test -- tests/view/character-skills.test.mjs` — exit 0.
- `npm test -- tests/view/pressure-pick.test.mjs` — exit 0.
- `python -B .the-way/instruction-files/check_instructions.py` — exit 0.
- The whole suite was not run, as the handoff says. The check without `--skip-test-citations` was not run.

## Unread material

none

## Searches not found or unclear

none

## Working copies

None made; `.runs/repair-1/` was never created, so nothing to remove.
