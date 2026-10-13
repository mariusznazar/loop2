# Settlement code report — correction 1, icon titles in the footer

Worktree `C:\Storage\repos\loop2-mag-w-lesie`, branch `task/mag-w-lesie`, from HEAD 5384399. Not pushed.
Skill used: `superpowers:test-driven-development` only.

## Commits

- `fc809ac` feat(view): name each icon's game-icons.net title in the footer credit
  - `src/browser/view/credits.ts`: `IconCredit` gains `title`; the four credits carry
    "Wood stick icon", "Berry bush icon", "Fern icon", "Flax icon" (untrimmed, as the facts
    game-icons-*-title/1 quote them).
  - `src/browser/view/footer.ts`: `FooterCredit` gains `title` (taken from the credits data);
    each line now reads `{resource}: „{title}”, {author}, game-icons.net, CC BY 3.0, zmienione (bez tła, ciemny kolor)`,
    links unchanged (game-icons.net → icon page, CC BY 3.0 → licence, new tab, noopener noreferrer).
  - `tests/view/icons.test.mjs`: the footer-line test now expects the title, from a literal
    `TITLES` map keyed by icon file name (hand-derived from the facts, not from `credits.ts`).
  - `README.md` line 23: the quoted footer format gains `„{tytuł ikony}”`.
- `30c77eb` docs(sim): cite D-22 for the layout draw order instead of the spec
  - `src/browser/sim/layout.ts`: comment `(spec 4.4)` → `(D-22)`. Comment only.

Line endings kept (all touched files LF in index; README CRLF in working tree, LF in index — unchanged).

## TDD evidence

RED (after the test change, before the code change), `node --test tests/view/icons.test.mjs`:

```
actual: 'patyk: Delapouite, game-icons.net, CC BY 3.0, zmienione (bez tła, ciemny kolor)',
expected: 'patyk: „Wood stick icon”, Delapouite, game-icons.net, CC BY 3.0, zmienione (bez tła, ciemny kolor)',
```

Failed for the expected reason (title missing). GREEN after the change (below).

## Checks

- `npm run typecheck` — exit 0.
- `npm test` — exit 0: `tests 172, pass 172, fail 0, cancelled 0, skipped 0, todo 0`; includes
  `✔ each footer line names the icon by its title on game-icons.net and says after the licence that it was changed`.
- `python -B .the-way/gate/run_tests.py tests/view` — exit 1, `Ran 0 tests … NO TESTS RAN`: the gate
  runs Python tests only and `tests/view` holds `.mjs` files. The view tests are covered by `npm test` above.
  (`.the-way` pin verified: HEAD d04c3feb… equals the recorded gitlink.)
- Icon-credits invariant check alone: copied `tests/invariants/test_icon_credits.py` and
  `tests/invariants/loop2_invariant_support.py` into `.runs/icon-credits-only/` (ignored; two levels
  below the root, so the support module's `ROOT` still resolves to the worktree) and ran
  `python -B .the-way/gate/run_tests.py .runs/icon-credits-only` — exit 0, `Ran 3 tests … OK`.
  **Caveat:** the check at this commit does not yet test the title — its docstring still words the
  sentence without the title and `violations()` checks author, page, licence and change only. So this
  pass says the footer still meets the old reading; it says nothing about the title. Not fixed (read-only).
- Full `tests/invariants` gate — not run (not required; includes the container check). Unchecked.
- Format guards of foundation files — not run; no foundation file changed.

## Questions / notes for the orchestrator

1. Placement and quoting of the title: chosen as `{resource}: „{title}”, {author}, …` (title first,
   in Polish quotation marks, as plain text — not a link). If the invariant check's rewrite expects
   another form (e.g. the title as the page link's text), the footer would need adjusting.
2. README line 29 — settled by the orchestrator (yes): `1098bae` docs(readme): say credits.ts also
   holds the icons' titles — now reads "Tytuły ikon, ich autorów i commit źródła trzyma
   `src/browser/view/credits.ts`". Wording only, one line changed.
3. The test names the icons' titles by icon file name; a new icon without an entry in `TITLES` fails
   the test (`assert.ok(title, icon)`), which is intended.

## Titles into data

Ruling Q89: the icons' titles are game content (D-18/1), so they move into `src/browser/sim/data/`. Base HEAD 1b62937.

Commit `cf5fe99` fix(view): read each icon's title from the resource data, not the view
- `src/browser/sim/data/resources.ts`: `ResourceDef` gains `iconTitle`; each resource carries its
  icon's title beside `icon` ("Wood stick icon", "Berry bush icon", "Fern icon", "Flax icon").
- `src/browser/view/credits.ts`: `title` removed; author, source page, change, source commit and
  licence stay there.
- `src/browser/view/footer.ts`: `footerCredits()` takes `title` from `resource.iconTitle`. The
  footer's text is unchanged.
- `tests/sim/data.test.mjs`: new test, each resource's data gives its icon's title (literal
  expected values from the facts game-icons-*-title/1).
- `README.md:29`: "Tytuły ikon trzymają dane zasobów w `src/browser/sim/data/resources.ts`, obok
  nazwy pliku ikony; autorów ikon i commit źródła trzyma `src/browser/view/credits.ts`, …".

Tripwire: `test_content_identifiers.py` reads only each entry's key and `name` from `MAPS`,
`RESOURCES` and `ARCHETYPES`. A new `iconTitle` field changes neither, so it does not trip. It
passed (below).

RED, before the change:
- `node --test tests/sim/data.test.mjs` — new test failed: `actual: [ [ 'wood-stick', undefined ], … ]`.
- content-identifiers/1 check alone (copy in `.runs/content-only/`) — `FAIL:
  test_browser_files_outside_the_data_name_no_content`: `"src/browser/view/credits.ts names the
  resource stick by its identifier 'stick'"`.

GREEN, after the change:
- `npm run typecheck` — exit 0.
- `npm test` — exit 0: tests 173, pass 173, fail 0.
- `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl` —
  exit 0, `Ran 141 tests in 321.215s OK`. The run recorded 138 verdicts, all `pass`, among them all 4
  content-identifiers/1 checks, all 3 icon-credits/1 checks (now testing the title) and
  loop2-container-icons/1. Port 3000 was free; no rerun was needed.
