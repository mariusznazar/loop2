> SUPERSEDED working draft. The one current version of every proposal is return/UNAPPROVED-proposed-foundation-against-ab34d90.patch with return/proposal-pl.md (after critique O1-O10).

# UNAPPROVED — proposals for parts of projected entries (WAY-126)

**Status: UNAPPROVED. Nothing in this file is written into `foundations/`.** Each entry below is
the part of a projected decision of the approved MVP definition that the skeleton's code makes
true now. Its shortened binding sentences are wording no human has approved in that form, so each
entry waits for the human's acceptance (WAY-126, WAY-114). The Polish translation stands beside
each entry and never enters the foundation.

Source of the full projected entries: `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md`
— "What is the game built with?" at line 463, "What serves the built game and account requests in
the container?" at line 738. Gate record: approved by Mariusz, 2026-10-04.

Numbers: D-04 and D-05 are the next free numbers after D-01..D-03, given in the order (a), (b).
Both are **proposed**; if either is rejected, its number stays free for the next decision written.

Fingerprints below are computed with `.the-way/relation-model/fingerprint.py` on the proposed
binding sentences.

---

## (a) D-04/1 (proposed) — What is the game built with?

### What the code makes true, and what it does not

- True: "The game is written in TypeScript and runs in the browser." — `src/browser/main.ts` is
  TypeScript compiled by `scripts/build.mjs` and loaded by `src/browser/index.html`.
- Not true yet, so dropped from the binding part: "Its simulation is a set of pure functions that
  take a game state and a span of game minutes and return the next game state together with the
  events it produced, and real time enters the simulation only as an argument." and "The view draws
  only from the game state and changes nothing in it." — the skeleton has no simulation and no game
  state. These stay projected in the definition; the task that brings the simulation writes them as
  a change of D-04 (an edit in place before the main branch holds D-04, a version `D-04/2` of the
  kind *new wording* after it).

### Entry as it would read if accepted now

```markdown
### D-04/1 — What is the game built with?

The game is written in TypeScript and runs in the browser.

- **Change:** new decision
- **Scope:** TODO — the part map holds no part yet
- **Based on:** none
- **Relations:** none
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: a game screen written as a TypeScript module that the build compiles for the browser
  - violates: a part of the game written as a Godot scene or as a plain JavaScript source file
- **Review when:** movement and collisions become the core of the game's fun · check by: 2027-04-03
- **Origin:** koncepcja_projektowa.md in the vault (Notes/Projects/(P) Loop), D10, §7 and §9 "Wskrzeszenie a doliczanie nieobecności"
- **Approved by:** on acceptance

*Rationale:* text code and tests give the most leverage in work with AI agents.
*Rejected:* Godot — slower to work on with AI agents.
```

Fingerprint of the proposed binding part: `b703ab2a`.

### Tłumaczenie (pl) całego wpisu

> **D-04/1 (proponowana) — Z czego gra jest zbudowana?**
>
> Gra jest napisana w TypeScripcie i działa w przeglądarce.
>
> - **Zmiana:** nowa decyzja
> - **Zakres:** TODO — mapa części nie ma jeszcze żadnej części
> - **Oparta na:** brak
> - **Relacje:** brak
> - **Weryfikacja:** poziom 2 — agent porównuje zmianę z decyzją:
>   - zgodne: ekran gry napisany jako moduł TypeScriptu, który budowanie kompiluje dla przeglądarki
>   - naruszające: część gry napisana jako scena Godota albo jako plik źródłowy w zwykłym JavaScripcie
> - **Przegląd, gdy:** ruch i kolizje staną się sednem frajdy z gry · sprawdzić do: 2027-04-03
> - **Pochodzenie:** koncepcja_projektowa.md w vaulcie (Notes/Projects/(P) Loop), D10, §7 i §9 „Wskrzeszenie a doliczanie nieobecności"
> - **Zatwierdził:** przy akceptacji
>
> *Uzasadnienie:* kod tekstowy i testy dają największą dźwignię w pracy z agentami AI.
> *Odrzucone:* Godot — wolniej się nad nim pracuje z agentami AI.

### Fields that differ from the gate entry

| Field | Gate wording | Proposed | Why |
|---|---|---|---|
| binding sentences | three sentences (TypeScript in the browser; pure-function simulation; view draws only from the game state) | first sentence only | only the first is true of the skeleton |
| Verification | level 2 — complies: "the renewal of a resurrection computed from a real time the caller passes in"; violates: "a simulation function that reads the system time or the page; a view that keeps a game state of its own" | a new level 2 pair about TypeScript in the browser (**new wording, not gate-approved**) | the gate pair checks only the dropped sentences, so it would verify nothing the shortened entry says |
| Rationale | four clauses, three of them about the pure-function simulation, the save as JSON and real time as an argument | the first clause only | the other clauses justify the dropped sentences; they also use the projected terms *earning loop* and *catch-up*, which would then have to enter the glossary |
| Approved by | Mariusz, 2026-10-04 | on acceptance | a shortened entry is not the wording the gate approved (WAY-126) |

All other fields are copied from the gate entry unchanged. *Origin* is kept whole although §9 of the
concept note is about the dropped sentences: *Origin* points to where the reasoning lives, and that
place has not changed.

### What changes elsewhere if (a) is accepted

- **D-03/1 *Relations*:** `TODO — derives from the projected decision "What is the game built with?" of C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md`
  becomes `derives from D-04@b703ab2a`. *Relations* is outside D-03's binding part, so D-03's
  fingerprint does not change, and before the main branch this is an edit in place.
- When the simulation sentences later join D-04, its fingerprint changes and D-03's relation is
  rechecked and carries the new fingerprint in the same change (WAY-31).

---

## (b) D-05/1 (proposed) — What serves the built game and account requests in the container?

### What the code makes true, and what it does not

- True: one Node.js process (`src/server/main.ts`) runs one Express 5 application
  (`src/server/app.ts`) that serves the built game's static files (`express.static` on the build
  output) and answers the `/api/` paths; an unmatched `/api/` request gets a JSON 404 error
  (`{"error":"Not found"}`), never the game's HTML page.
- Not true yet, so dropped from the binding part: "in the loop2 container" (no container exists)
  and "account and save routes" (no account or save route exists). These stay projected; the tasks
  that bring the container and the account routes write them as a change of D-05.

### Entry as it would read if accepted now

```markdown
### D-05/1 — What serves the built game and account requests in the container?

One Node.js process running Express 5 serves both the built game's static files and the `/api/`
paths. An unmatched `/api/` request receives an API error, not the game's HTML page.

- **Change:** new decision
- **Scope:** TODO — the part map holds no part yet
- **Based on:** Express 5 static file serving (https://expressjs.com/en/5x/starter/static-files/, read 2026-10-04) · Express 5 request routing and response API (https://expressjs.com/en/5x/api/express/, read 2026-10-04) · Caddy 2 route, file_server and reverse_proxy (https://caddyserver.com/docs/caddyfile/directives/route, read 2026-10-04) · Docker multiple processes in one container (https://docs.docker.com/engine/containers/multi-service_container/, read 2026-10-04)
- **Relations:** TODO — narrows D-02@06e6d3d8 and the projected decision "What public address do the game and account server share?" of C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md
- **Verification:** level 1 — invariants: loop2-api-error-route. Level 2 for one process serving both — an agent compares the change with the decision:
  - complies: one Express 5 application that serves the built game's static files and answers the `/api/` paths, started as one Node.js process
  - violates: a second server process, such as Caddy or another Node.js process, that serves the built game's static files beside the Express 5 process
- **Review when:** serving built files through Express becomes difficult to operate or the account API needs a separate process · check by: 2027-04-04
- **Origin:** none
- **Approved by:** on acceptance

*Rationale:* Express already handles the API and can serve the built files in the same process, so
this choice adds no second server process or proxy configuration to the container. The application
must set static-file and fallback rules carefully, including cache policy and a distinct error
response for unmatched `/api/` requests. A later proxy can retain the public paths.
*Rejected:* Caddy in front of Express within the same container — provides a separate file server
and proxy routing but adds another process to start, monitor and update, plus its configuration.
```

Fingerprint of the proposed binding part: `e11aec4d`.

### Tłumaczenie (pl) całego wpisu

> **D-05/1 (proponowana) — Co podaje pliki gry i obsługuje żądania kont w kontenerze?**
>
> Jeden proces Node.js z Express 5 podaje zarówno pliki statyczne zbudowanej gry, jak i ścieżki
> `/api/`. Nieznane żądanie `/api/` dostaje błąd API, nie stronę HTML gry.
>
> - **Zmiana:** nowa decyzja
> - **Zakres:** TODO — mapa części nie ma jeszcze żadnej części
> - **Oparta na:** dokumentacja Express 5 o podawaniu plików statycznych · dokumentacja Express 5 o trasach żądań i API odpowiedzi · dokumentacja Caddy 2 o route, file_server i reverse_proxy · dokumentacja Dockera o wielu procesach w jednym kontenerze (adresy i daty odczytu jak w wersji angielskiej)
> - **Relacje:** TODO — zawęża D-02@06e6d3d8 oraz zaprojektowaną decyzję „Jaki publiczny adres wspólnie wykorzystują gra i serwer kont?" z definicji MVP
> - **Weryfikacja:** poziom 1 — niezmienniki: loop2-api-error-route. Poziom 2 dla jednego procesu podającego oba rodzaje treści — agent porównuje zmianę z decyzją:
>   - zgodne: jedna aplikacja Express 5, która podaje pliki statyczne zbudowanej gry i odpowiada na ścieżki `/api/`, uruchomiona jako jeden proces Node.js
>   - naruszające: drugi proces serwera, np. Caddy albo inny proces Node.js, który podaje pliki statyczne zbudowanej gry obok procesu Express 5
> - **Przegląd, gdy:** podawanie zbudowanych plików przez Express stanie się trudne w utrzymaniu albo API kont będzie wymagać osobnego procesu · sprawdzić do: 2027-04-04
> - **Pochodzenie:** brak
> - **Zatwierdził:** przy akceptacji
>
> *Uzasadnienie:* Express już obsługuje API i może podawać zbudowane pliki w tym samym procesie,
> więc ten wybór nie dokłada do kontenera drugiego procesu serwera ani konfiguracji pośrednika.
> Aplikacja musi starannie ustawić reguły plików statycznych i odpowiedzi zastępczej, w tym
> pamięć podręczną i osobną odpowiedź błędu dla nieznanych żądań `/api/`. Późniejszy pośrednik
> może zachować publiczne ścieżki.
> *Odrzucone:* Caddy przed Express w tym samym kontenerze — daje osobny serwer plików i kierowanie
> żądań, ale dokłada kolejny proces do uruchamiania, pilnowania i aktualizowania oraz jego
> konfigurację.

### Fields that differ from the gate entry

| Field | Gate wording | Proposed | Why |
|---|---|---|---|
| binding sentences | "One Node.js process running Express 5 serves both the built game's static files and the `/api/` account and save routes in the loop2 container. An unmatched `/api/` request receives an API error, not the game's HTML page." | first sentence ends "… and the `/api/` paths."; second sentence unchanged | no container and no account or save route exist |
| Relations | `TODO — narrows the projected decisions "How does the account and save server handle HTTP requests?" and "What public address do the game and account server share?" of this definition` | `TODO — narrows D-02@06e6d3d8 and the projected decision "What public address …" of <definition path>` | the first target is now D-02; the second is not written. A field mixing a relation and a `TODO` (`narrows D-02@06e6d3d8 · TODO — …`) was tried against the decisions guard and fails: "relation `TODO — …` is not of a known type" |
| Verification | level 1 — invariants: loop2-one-serving-process · loop2-api-error-route | level 1 — invariants: loop2-api-error-route, plus a level 2 pair for the one-process sentence (**new wording, not gate-approved**) | `loop2-one-serving-process/1` names "the loop2 container" and is not written (R4); a level 1 naming an invariant the file does not hold fails the invariants guard |
| Approved by | Mariusz, 2026-10-04 | on acceptance | a shortened entry is not the wording the gate approved (WAY-126) |

All other fields — *Change*, *Scope* (TODO, as in R2), *Based on*, *Review when*, *Origin*,
*Rationale*, *Rejected* — are copied from the gate entry unchanged. The *Rationale* still speaks of
"the container": it gives the reason for the choice, which holds whether or not the container exists
yet.

### What changes elsewhere if (b) is accepted

- **loop2-api-error-route/1 *Derives from*:** `TODO — "What serves the built game and account requests in the container?", projected in C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md`
  becomes `D-05@e11aec4d`. *Derives from* is outside the invariant's sentence, so its fingerprint
  (`a6ff5b60`) and its version stay; this removes the invariants guard's merge error on that line.
- When the container and the account routes later join D-05, its fingerprint changes, and
  loop2-api-error-route is rechecked against the new binding part and carries the new fingerprint
  in the same change (WAY-31).
- Superseded by (c) below: the part of `loop2-one-serving-process` the code makes true is now
  proposed. If it is accepted, D-05's *Verification* is the variant given in (c).

### Trial run of the guards with (a) and (b) applied

With both proposals appended to `foundations/decisions.md`, D-03's *Relations* set to
`derives from D-04@b703ab2a` and loop2-api-error-route's *Derives from* set to `D-05@e11aec4d`, both
guards were run with `--base 91ee59e… --merge-onto 91ee59e…` and the files were then restored. The
fingerprints `b703ab2a` and `e11aec4d` raised no fingerprint error. Remaining errors were only the
ones expected: `TODO` in *Scope* (D-01..D-05) and in D-01's *Relations*, *Approved by* reading
`on acceptance` in D-04 and D-05, the mixed *Relations* form (since replaced by the whole-field
`TODO` above), and D-02's `invariant:` (see the foundation-step report, Q1). A second trial with
the whole-field `TODO` in D-05's *Relations* (run with `--base` only) gave it a warning, not an
error; the only errors were the two *Approved by* reading `on acceptance`, which acceptance fills.

---

## (c) loop2-one-serving-process/1 (proposed) — part of the projected invariant

Added after the return step sent the task back to the foundation step
(`return/return-step.md` §1.2). It is a proposal only: under WAY-03 and WAY-69, its check, its
deliberate break and the redo of the code against the check all wait for the human's acceptance of
the sentence.

### What the code makes true, and what it does not

- Projected sentence (definition line 1927): "One Express 5 process in the loop2 container serves
  both the built game and `/api/` account and save requests."
- True: one process (`node dist/server/main.js`, `src/server/main.ts`) runs one Express 5 app
  (`src/server/app.ts`) that serves the built game's files and answers `/api/` requests.
- Not true yet, so dropped: "in the loop2 container" (no container exists) and "account and save"
  (no such route exists).

### Identifier

The proposal keeps `loop2-one-serving-process` at version 1. The template says an identifier names
what the sentence constrains, never its wording, and keeps it when the wording changes. This
identifier names the serving process, which the shortened sentence still constrains. The entry never
reached the main branch, so it starts at `/1`. When the container and account routes arrive, the
gate's full wording becomes `/2`, a raise, since the meaning grows. A new identifier would leave the
projected one for the full wording, and two entries would then constrain the same process; one of
them would later have to be merged or withdrawn.

### Entry as it would read if accepted now

```markdown
## loop2-one-serving-process/1

One Express 5 process serves both the built game and `/api/` requests.

- **Method:** `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
- **Rests on:** none
- **Derives from:** D-05@e11aec4d
- **Part:** every
- **Correction:** none
```

Fingerprint of the sentence: `1e0b09c2`.

- *Method*: the same command as the five written invariants, since one run checks them all. The
  script exists, and the check that will cite `loop2-one-serving-process/1` comes after acceptance.
  If the merge comes before that check exists, a run records no verdict for the entry and the gate
  never gives it a pass. In that case the Method is `TODO` instead.
- *Part*: `every`, as ruled. The return step's map lists invariant check files by name, so the new
  check file needs a part when it is written.
- *Rests on*: `none`. No fact holds a condition of the sentence.
- *Derives from*: `D-05@e11aec4d`. This works only if D-05 is accepted. Without D-05 the field
  reads `TODO — "What serves the built game and account requests in the container?", projected in
  C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md`.

### Tłumaczenie (pl)

> **loop2-one-serving-process/1 (proponowany)**
>
> Jeden proces Express 5 podaje zarówno zbudowaną grę, jak i żądania `/api/`.
>
> - **Metoda:** polecenie bramki `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
> - **Opiera się na:** brak
> - **Wywodzi się z:** D-05@e11aec4d
> - **Część:** every
> - **Korekta:** brak
>
> Test, celowe złamanie i ponowne napisanie kodu pod test czekają na akceptację tego zdania.

### What changes in D-05 if (c) is accepted (variant applied in the patch)

D-05's *Verification* returns to the gate's wording, and the unapproved level 2 pair goes:

```markdown
- **Verification:** level 1 — invariants: loop2-one-serving-process · loop2-api-error-route
```

Polish: „Weryfikacja: poziom 1 — niezmienniki: loop2-one-serving-process · loop2-api-error-route".

D-05's binding sentences and fingerprint `e11aec4d` stay unchanged. Before the main branch, this is
an edit of a proposed entry. *Relations* is not touched: the T3 fix (`narrows D-02@06e6d3d8` alone)
remains a question for the human. With (b) and (c) both accepted, D-05 is the gate entry with these
differences: shortened first sentence, *Scope*, *Relations*, *Approved by*.

### Where it is integrated

`return/UNAPPROVED-proposed-foundation-against-ab34d90.patch` (same name). It holds the invariant
after `loop2-api-error-route`, and D-05's *Verification* as above. `return/proposal-pl.md` has
Część B (D-05), Część C (the invariant and its translation) and T5.
