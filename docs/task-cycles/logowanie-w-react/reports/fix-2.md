# Fix 2 — the blocking findings of the review of the return step, task `logowanie-w-react`

**Status:** `done`. I1, I2 and I4 are fixed. I3 takes no change of mine, as the dispatch gives. None is contested.

## Files and commits

Commit `2bfd6b6ee3a7fed8cd99cf544c41d07b031ee5d2` on `task/logowanie-w-react`, `test: :white_check_mark: refuse a library on React imported as a development dependency, check the lock's peer field, and bring the docstring of icon-credits and the fact on npm's lock to the entries`, on c033758.

| File | Added | Removed |
|---|---:|---:|
| `foundations/decisions.md` | 1 | 1 |
| `foundations/environment_facts.md` | 6 | 0 |
| `tests/invariants/test_browser_view_framework.py` | 19 | 7 |
| `tests/invariants/test_icon_credits.py` | 5 | 3 |

Invariant tests altered, for the request: `tests/invariants/test_browser_view_framework.py` (`browser-view-framework`, by code) and `tests/invariants/test_icon_credits.py` (`icon-credits`, its docstring alone).

## Findings

### I1 — fixed

`tests/invariants/test_icon_credits.py:1-4` now gives the sentence as `foundations/invariants.md` reads it, „the game's section of credits”. `:19-20` says that the login card draws the section is held by D-27 and by `tests/view/account-screen.test.mjs`, not by this check. A docstring only, so no failing run applies; `:53`, *Does NOT cover*, stays true and now agrees with the rest. Shown by `npm test -- tests/invariants/test_icon_credits.py`, exit 0, and by reading.

### I2 — fixed, the first way the finding names

- `react_libraries` at `tests/invariants/test_browser_view_framework.py:138` no longer reads the `dev` mark, so the class is the one D-270 states. The runtime check keeps its own reading in `runtime_names`, so an entry marked `dev` is still no runtime dependency.
- `:17-21` of the docstring says so, and names the new control on the real lock.
- A new assertion in `test_control_the_dependency_check_reads_what_an_entry_really_is`: an import of a library on React marked `dev` is refused.
- Seen failing with the condition in place: the unittest command below, exit 1, `Items in the second set but not the first: '@mui/material'`, an assertion failing for the expected reason. Passing with it gone: exit 0.
- **The tree passes with the condition gone.** Read from the real lock: `node_modules/react-dom` is the one entry of any mark whose `peerDependencies` name `react`, and it is excepted. The whole file passes, 9 tests, exit 0.

The control runs on the guard's functions and a crafted lock. I did not repeat the finding's tree with `src/browser/zz-temp.tsx`; the review ran that route with the condition dropped, and `test_browser_source_imports_no_ui_framework` reads `refused_names` with no `dev` reading of its own.

D-270 needs no word changed for this: its sentence and its second violating example now agree with the test.

### I3 — no change, by the dispatch

D-270 stays on the branch as what the guard does, and the orchestrator holds it under *Questions* of the request, with both ways. `reports/return.md:149`, which sends it to *What this request settles*, no longer stands; this report replaces it. So does `reports/return.md:46`, „The test needs no change”, by I2, and its concern 3, which I2 closes.

The two ways as the request will show them:

> **Czy biblioteki zbudowane na React, które same nic nie rysują, mają być zablokowane tak jak inne biblioteki widoku?**
>
> Dziś test niezmiennika `browser-view-framework` oblewa każdy pakiet, który w pliku blokady deklaruje, że współpracuje z zainstalowanym obok Reactem (pole `peerDependencies`). Łapie to biblioteki komponentów, ale też pomocnicze: do przeciągania, do przełączania ekranów, do trzymania stanu. D-03 i zadanie mówią tylko o „innej bibliotece widoku”, więc wpis D-270 sięga dalej niż to, co zatwierdziłeś.
>
> **Droga 1: zostawić tak, jak jest.** Każda taka biblioteka oblewa test, dopóki zadanie nie wymieni jej w D-270 i nie przepuści przez test w tej samej zmianie. Nie trzeba utrzymywać żadnej listy nazw, a nowa biblioteka widoku oparta na React nie wejdzie po cichu. Koszt: przy pierwszej potrzebnej bibliotece pomocniczej, najpewniej do przeciągania reguł w edytorze programu, zadanie dostaje głośną porażkę i musi dopisać wyjątek. Biblioteka, która nie deklaruje współpracy z Reactem, przechodzi. Gdyby npm przestał zapisywać to pole, test na `react-dom` to wykryje.
>
> **Droga 2: zawęzić do bibliotek, które rysują.** Plik blokady nie odróżnia biblioteki rysującej od pomocniczej, więc test wraca do listy nazw, a D-270 zmienia się albo znika. Biblioteki pomocnicze wchodzą bez wyjątku. Koszt: listę trzeba utrzymywać, a biblioteka komponentów spoza listy przechodzi po cichu, właśnie teraz, gdy kolejne ekrany przechodzą na React i tędy najłatwiej ją wprowadzić.
>
> **Rekomendacja: droga 1.** Pomyłka drogi 1 kosztuje jeden wyjątek dopisany w chwili, gdy ktoś go potrzebuje, a pomyłka drogi 2 to niezauważona druga biblioteka widoku w kodzie gracza, którą trudno potem wyjąć.

### I4 — fixed

- New fact `npm-lock-peer-dependencies`, written through `the-way-record-environment-fact`, at the tag of the npm that `package.json` pins, named in D-270's *Based on*. It holds the finding's two passages and three of `metaFromNode`, since the keys alone do not show that they reach an entry. All 5 found word for word in the file downloaded from its address; the installed `node_modules/npm` holds the same `'peerDependencies',` line.
- `*Rests on*` of `browser-view-framework` stays `none`: the fact is a reason for D-270, and the template sends such a fact to the decision's *Based on*.
- Control on the real lock: `test_control_the_lock_holds_the_field_the_library_check_reads`. Seen failing on a lock with the entry's peer taken out, by replacing `load_json` for one run and touching no file: exit 1, `'react' not found in {}`. Passing on the real lock: exit 0.

Znaczenie, for the request: npm przepisuje `peerDependencies` z `package.json` pakietu do jego wpisu w `package-lock.json`.

## Checks

| Command | Exit | Result |
|---|---:|---|
| `python -B -m unittest test_browser_view_framework.NoUiFramework.test_control_the_dependency_check_reads_what_an_entry_really_is`, from `tests/invariants`, condition in place | 1 | the new assertion failed, the failing run of I2 |
| `python -B <scratchpad>/real_lock_control.py`, the real-lock control on a lock with the peer taken out | 1 | the failing run of I4's control |
| `python -B -m unittest` on four cases of `NoUiFramework` from `tests/invariants`, condition gone: the two controls and the two checks of the tree | 0 | 4 tests OK |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 | 9 tests OK |
| `npm test -- tests/invariants/test_icon_credits.py` | 0 | 5 tests OK |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests OK |
| `python -B .the-way/elements/common/foundation_check.py`, before the commit and on it | 0 | `0 errors` both times |
| Each of the 5 passages of the fact searched with `grep -F` in the downloaded file | 0 | 5 of 5 found |

**Not run:** the product's gate, as the dispatch says. Nothing loaded jsdom or happy-dom.

## Own-work check

- **Requirement most likely unmet:** that dropping the condition refuses something the tree needs, a development package with a peer on `react`.
- **Check:** every lock entry with `react` in `peerDependencies` listed from the real `package-lock.json`, of any mark.
- **Result:** `node_modules/react-dom` alone, not marked `dev`. Nothing the tree holds is newly refused, and the whole file passes.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| `.the-way/task-cycle/change/fix.md` | whole | the variant the dispatch names |
| `workspaces/arborist/lib/shrinkwrap.js` and `docs/lib/content/configuring-npm/package-lock-json.md` | `raw.githubusercontent.com/npm/cli/v12.2.1/`, read 2026-11-02 | the fact's source and the finding's claim on the page |
| `node_modules/npm/package.json`, `node_modules/npm/node_modules/@npmcli/arborist/lib/shrinkwrap.js` | the installed npm | that the installed copy matches the pin |

## Searches not found or unclear

- **The review's reading of `technologia_budowanie_ekranow.md:161`,** that the trial of dragging used the browser's `draggable` with no library: taken from the finding, not read by me. The request's text above says only „najpewniej”, so it does not lean on it.
- **The form of *Source* for code that is no page of text:** the template's passage speaks of a reader's text; the fact follows `node-assert-failure-inspect`, which quotes source lines at a tag.
- **`reports/return.md` still holds the claims this report replaces.** I left it as written; the three places are named under I3.

## Choices, each with the way rejected and its cost if wrong

1. **The real-lock control fails on a replaced `load_json`, not on an edited lock.** Rejected: changing `package-lock.json` for a moment, a trust boundary file. Cost: the failing run shows the test's reading, and the replacement stands in the scratchpad, not the tree.
2. **The fact carries `metaFromNode`'s passages beside the finding's two.** Rejected: the two alone, which show a list of keys and not that a key reaches an entry. Cost: one line longer.

## Problems

None observed.
