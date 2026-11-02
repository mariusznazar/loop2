# Handoff — Slice 12, task `logowanie-w-react`

**Delegation.** Mariusz, who requested this cycle, delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator, never to him.

**Worktree.** `C:\Storage\repos\loop2-wt\logowanie-w-react`, branch `task/logowanie-w-react`, this slice's base 98bb2a89fd5678239d4f7f20fdffcac375a6b12e. Work from its root.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole, and a file it names only when the step or variant that names it comes. Your variant is „a slice, or the retry of a slice”. Boundary: this slice alone; return before any other.

**Addresses.** Frozen task `.runs/task-cycles/logowanie-w-react/task.md`, spec `.runs/task-cycles/logowanie-w-react/spec.md`, plan `.runs/task-cycles/logowanie-w-react/plan.md`, all ignored files. You open neither the whole plan nor the whole task; what binds you stands below.

**Answers of step 4.** Trust boundary: yes, `package-lock.json` of `build-tools`, partner npm registry; `scripts/kitchen-sink.mjs` does not change. Irreversible operation: no.

**Fixed for this cycle.** Read every file and range of your *Read* before you write code, one per call; a read cut short is read again, and your report says what you read. Docker Desktop now runs on this machine, so a test that needs a Docker daemon runs. Run no product gate: that run is the orchestrator's. A file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation; `spec.md` decisions 9 to 11 give why, and no comparison on a rendered element runs by Node's `assert`. Commit with explicit paths, in English, in the style `git log` shows; never `git add -A`.

**Report.** Write `.runs/task-cycles/logowanie-w-react/reports/slice-12.md` as your method gives, each check with its command and exit code. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path; questions, reaches and **Searches not found or unclear** stand in the report.

## From Slice 11's report, carried here because it binds this slice

- `src/browser/styles.css:252-258` holds `.account-screen`, which no element carries now; it goes with the rules of the two forms side by side.
- Slice 11's browser walk did not go through the reset link, the confirmation link or an expired session. Your walk takes the reset link as your *Goal* gives; an expired session or a refused confirmation link you reach it where you can, and say which you did not.
- `.claude/skills/loop2-play/SKILL.md:58` still says „Under „Załóż konto”, fill…”; that now takes a press of the switch first. Slice 13 changes the skill, not you.
- Its one screenshot showed the card alone, as wide as the window and at its top, as expected before your rules. `reports/slice-11.md` holds its route for a screenshot.

## Your section of the plan, word for word

### Slice 12 — The look of the card, walked in a real browser

- **Goal:** `src/browser/styles.css` holds the rules of the card's screen and the card, on existing tokens: the card stands in the middle of the window, about 400 px wide as a layout dimension, on `panel` with its text; nothing stands beside it; the rules of the two forms side by side go. A value the token file does not hold is named in the report, never chosen, as `src/browser/AGENTS.md` gives. Then, as `.claude/skills/loop2-play/SKILL.md` gives, the agent starts the game with `npm run local` and goes through the card in a real browser with Playwright CLI: the four states, the switch, a form sent with Enter, a click on a label, the lock while waiting, focus and the keyboard through the card and the folded credits, the waiting screens with their header and footer, a sign-up, a logout back to the card, and a page opened with `#reset-password=` showing the form and the refusal of the link. It opens the kitchen-sink page in the same browser and sees all its form samples and no error but a missing favicon. Mail reaches nowhere locally, so confirming an address and a successful new password stay with the human's check. A fault this walk finds in the card or the page is fixed here. Evidence goes into the report and nothing of the walk stays in the repository. Safety rule of this cycle: a failing comparison on a rendered element can take down the human's machine (spec decisions 1, 9, 11). A file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation.
- **Change:** `src/browser/styles.css` · `src/browser/view/account-card.tsx` · `src/browser/view/app.ts` · `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:36-37` To do 8 ·
  `.runs/task-cycles/logowanie-w-react/task.md:59-63` Acceptance criteria ·
  `.runs/task-cycles/logowanie-w-react/task.md:85-90` Pytanie 4 ·
  `.runs/task-cycles/logowanie-w-react/task.md:122-126` Pytanie 11 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:99-99` Decision 3 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:183-187` Decision 8 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `src/browser/tokens.css` ·
  `src/browser/kitchen-sink/kitchen-sink.ts:226-345` ·
  `foundations/decisions.md:883-912` D-42, D-43 · `foundations/decisions.md:928-942` D-45 ·
  `foundations/decisions.md:958-972` D-47 · `foundations/decisions.md:1436-1448` D-75 ·
  `foundations/decisions.md:5162-5190` D-254 · `foundations/decisions.md:5240-5280` D-257, D-258 ·
  `foundations/invariants.md:458-477` browser-view-token-values, browser-view-focus-outline ·
  rows F15, S3, S4
- **Model:** same — the look of the card is what the human asked for most, and the walk may fix the exemplar and the page.
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_browser_view_focus_outline.py`; `npm test -- tests/invariants/test_design_token_contrast.py`; `npm test -- tests/view/account-screen.test.mjs`; `npm run local` with `playwright-cli` as `.claude/skills/loop2-play/SKILL.md` gives, ended by `npm run local:stop`; `npm run kitchen-sink` as a background command, its printed address opened with `playwright-cli`, then stopped; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 11 · S3 · S4

## Current ranges

Where a range differs from the plan's, this one holds. The foundation step moved the log after the plan was written.

- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `src/browser/AGENTS.md`
- `.claude/skills/loop2-play/SKILL.md`
- `src/browser/tokens.css`
- `src/browser/kitchen-sink/kitchen-sink.ts:226-345`
- `foundations/decisions.md:882-896` D-42
- `foundations/decisions.md:897-911` D-43
- `foundations/decisions.md:927-941` D-45
- `foundations/decisions.md:957-971` D-47
- `foundations/decisions.md:1435-1447` D-75
- `foundations/decisions.md:5161-5189` D-254
- `foundations/decisions.md:5239-5260` D-257
- `foundations/decisions.md:5261-5280` D-258
- `foundations/invariants.md:459-468` browser-view-token-values
- `foundations/invariants.md:469-478` browser-view-focus-outline
- `foundations/decisions.md:1606-1618` D-88
- `foundations/decisions.md:5329-5352` D-261
- `foundations/decisions.md:5353-5375` D-262

## Passages of the task, the spec and the plan your *Read* names, word for word

### `.runs/task-cycles/logowanie-w-react/task.md:36-37` To do 8

8. Karta stoi na środku okna (pytanie 11), a na jej ekranie nie ma nic poza nią, ani nagłówka, ani stopki (pytanie 4).
   - Ekrany oczekiwania zostają jak dziś, z nagłówkiem i stopką: „Sprawdzanie logowania…”, „Potwierdzanie adresu…”, ostrzeżenie ze „Spróbuj ponownie” i chwila po udanym logowaniu (`src/browser/view/app.ts:276`).

### `.runs/task-cycles/logowanie-w-react/task.md:59-63` Acceptance criteria

### Acceptance criteria

- Lokalnie agent przechodzi kartę i wszystkie jej stany w prawdziwej przeglądarce, w grze uruchomionej poleceniem z zadania 1, a pod adresem `https://loop2.mariusznazar.com/` przechodzi je człowiek (H1).
- Lokalnie poczta nigdzie nie dochodzi (pytanie 8), więc potwierdzenie adresu i udane ustawienie hasła przechodzą do końca tylko na serwerze testowym, w H1.
- Lokalnie formularz „Ustaw nowe hasło” otwiera się adresem z `#reset-password=` (`src/browser/view/password-reset.ts:7`) i pokazuje odmowę odnośnika.

### `.runs/task-cycles/logowanie-w-react/task.md:85-90` Pytanie 4

- Pytanie 4. Co widać poza kartą na jej ekranie i co widać, zanim karta się pojawi?
  - Answer: Na ekranie karty nie ma nic poza kartą, ani nagłówka, ani stopki. Ekrany oczekiwania zostają jak dziś, z nagłówkiem i stopką, także po zalogowaniu.
  - Not chosen:
    - oczekiwanie w karcie — zalogowany gracz przy każdym odświeżeniu widzi kartę logowania, jakby go wylogowało
    - nagłówek i stopka także przy karcie — wyklucza to cytat niżej
  - Source: dla ekranu karty cytat, którego człowiek nie skreślił: „A signed-out visitor sees one card on a picture of the game” (D-96, `definicja_mvp2_loop2.md:600`) oraz „A section of credits, folded and opened with one click, stands on Siedziba and on the login card” i *Rejected*: „the credits open in a footer of every screen — dozens of rows standing below the game” (D-27, `:465`, `:474`), odcisk 8de9ffff. Dla oczekiwania: human, 2026-11-01, „zgadzam się na komplet rekomendacji”, pozycja 10 pakietu; pytanie nazwało koszt tej drogi: przy każdym wejściu niezalogowany gość przez chwilę widzi nagłówek i stopkę, zanim wskoczy karta. Fakt z kodu (tak jest dziś, to nie wymaganie): `root.append(header, main, createFooter());` (`src/browser/view/app.ts:401`) i ekran oczekiwania po logowaniu (`:276`), loop2 48544f0.

### `.runs/task-cycles/logowanie-w-react/task.md:122-126` Pytanie 11

- Pytanie 11. Gdzie w oknie stoi karta?
  - Answer: Karta stoi na środku okna, a ognisko i mag obok niej, z warunkiem „Przy oknie o szerokości od 1280 px ognisko i mag widać obok karty; na węższym wolno im zniknąć pod kartą.”. Warunek obrazu należy do zadania 3, a to zadanie stawia kartę na środku okna.
  - Not chosen:
    - nic nie zapisywać — dziś nic nie kosztuje, ale gdy mag będzie schowany, plik obrazu powstaje drugi raz
  - Source: human, 2026-11-01, odpowiedź na drugi pakiet: „wszystko według rekomendacji”, pytanie P4, droga A; pytanie wspólne z zadaniem 3, gdzie stoi jako jego pytanie o ognisko i maga. Szerokość 1280 px zaproponował project orchestrator, nie pochodzi ze źródła, a człowiek ją przyjął.

### `.runs/task-cycles/logowanie-w-react/spec.md:99-99` Decision 3

- The card element stands in `root` beside `header`, `main` and the footer, never inside `main`. While it stands those three are `hidden` (`[hidden]` in `styles.css` is `display: none !important`, so the header's `display: flex` cannot override it). The footer is kept in a constant.

### `.runs/task-cycles/logowanie-w-react/spec.md:183-187` Decision 8

- **The folded credits** are a native `<details>` with `<summary>` „Autorzy grafiki”: one click, the keyboard, and the one focus rule of D-47, with no state and no script. They stand last in the card in all four states, and stay open or closed across a change of state, since they are not remounted.
- **The order in the card:** the name (`h1`), the sentence, the page's sentence, then the switch or the state's heading (`h2`), the form with its message under it, the exit button, the credits. The header being hidden, there is one `h1`.
- **The fields keep everything they have today:** `autocomplete` tokens, hints, `inputmode="email"` and `spellcheck` off on the address, `noValidate` on the form, no trimming of a password.
- **Controlled fields.** The card's state holds what is typed, so that clearing is a change of state and the request reads the state.
- **The width** is a layout dimension of about 400 px, within the sketch's 380–420 px; the sketch is material, and the value stands in `styles.css`.
