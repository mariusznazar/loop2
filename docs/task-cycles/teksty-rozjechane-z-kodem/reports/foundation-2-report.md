# Report — the foundation entries, group 2 (the rows that need web pages)

**Status:** done with concerns (no question blocks the entries; the concerns are listed at the end).

Worktree `the task's worktree`, branch `task/teksty-rozjechane-z-kodem`, started from HEAD `2f89dbb` (group 1). Files changed: `foundations/decisions.md` (+8/-8 over the three commits), `foundations/environment_facts.md` (+8/-2). No other file.

## Commits

| Commit | Entry |
|---|---|
| `146f5bd` | D-01, D-02, D-05 *Based on* (To do 21) |
| `e50b231` | `docker-build-cache-invalidation` and D-237 (To do 34) |
| `3fcf546` | new fact `browser-bare-import-resolution` and D-269 *Based on* (To do 38) |

## Entries (one sentence English, one Polish)

- **D-01, D-02, D-05 *Based on* — `row` (To do 21).** EN: each page the three decisions cite now carries a passage word for word, with its place and the date read (2026-11-10), in the template's form; no binding sentence, *Rationale* or *Rejected* changed. PL: przy każdej stronie, na której stoją trzy decyzje, stoi teraz fragment słowo w słowo z miejscem i datą odczytu (2026-11-10), w formie szablonu; zdania wiążące, uzasadnienia i *Rejected* bez zmian.
  - Pages and places: D-01 has five page citations (Node.js 24.21.0 TypeScript docs § Type stripping; State of JS 2025 § JavaScript Runtimes; Bun 1.4.2 `sqlite.mdx` front matter description; Deno docs § Long Term Support (LTS); Go wiki SQLDrivers § Drivers), the fact `node-24-support-schedule` untouched. D-02 has five (Express `express.json()` and `express.Router()` sections of the API page; static files; error handling § The default error handler; Node.js `http` introduction; Fastify § Validation and Serialization). D-05 has four (Express static files; `express.Router()`; Caddy `route` § Examples; Docker multi-service container introduction).
  - Search of the foundation (WAY-33): no other entry cites these addresses with a changed meaning; nothing follows.
- **`docker-build-cache-invalidation` — `row` (To do 34).** EN: the fact now also says Docker treats a build argument as a cause of cache invalidation, and quotes "Build arguments do result in cache invalidation." (§ Build secrets of the same file at the same commit); the earlier four passages were re-read and still stand, so the date read is 2026-11-10. PL: fakt mówi też, że argument budowania powoduje unieważnienie pamięci podręcznej, i cytuje „Build arguments do result in cache invalidation.”; cztery wcześniejsze fragmenty odczytano ponownie i dalej stoją, więc data odczytu to 2026-11-10.
- **D-237 — `row` (To do 34).** EN: *Rationale* says the build step reruns when the base image or the built code changes, and with each new commit through the build argument `LOOP2_COMMIT`, not through a change of code, so a step taken from the cache means the same release, code and commit passed before; the *complies* example speaks of a build of the same commit. PL: uzasadnienie mówi, że krok budowania wraca przy zmianie obrazu bazowego albo kodu oraz przy każdym nowym commicie przez argument budowania `LOOP2_COMMIT`, nie przez zmianę kodu; przykład *complies* mówi o budowaniu tego samego commita.
  - Dependants of the fact: D-237 *Based on* and the invariant `account-save-sqlite-upgrade` *Rests on*; its sentence ("A deployed Node.js release has passed a check ...") stays true under the extended fact, so it is unchanged. No other entry names the fact.
- **`browser-bare-import-resolution` (new fact) — `row` (To do 38).** EN: the HTML Standard has the resolution of a module specifier give a URL or throw an exception, and throw a TypeError for a bare specifier that no import map remaps; source: the WHATWG commit snapshot `a0442320781555c99544448e30134662bfc39190`, § 8.1.5.1, three passages, read 2026-11-10. PL: Standard HTML każe rozwiązywaniu specyfikatora modułu dać adres URL albo rzucić wyjątek i rzucić TypeError dla gołego specyfikatora, którego żadna mapa importów nie przekierowuje.
- **D-269 *Based on* — `row` (To do 38).** EN: *Based on* is `browser-bare-import-resolution` instead of `none`; the *Rationale* sentence "the browser resolves no bare import" stays. PL: *Based on* to `browser-bare-import-resolution` zamiast `none`; zdanie uzasadnienia „the browser resolves no bare import” zostaje.
  - Search: the repository has no import map (`grep -i importmap` over `scripts`, `src`, `tests` finds nothing), so the fact bears on the page as D-269 says.

All entries are `row <n>` rows of the plan's *Foundation entries* (To do 21, 34, 38). None is `projected` or `the cycle's`.

## Foundation checks run

- `python -B .the-way/elements/common/foundation_check.py` after the D-01/D-02/D-05 edit: exit 0, `0 errors`.
- After the D-237 and fact edits (twice, before and after rewording the *Rationale*): exit 0, `0 errors` each.
- After the new fact and the D-269 edit: exit 0, `0 errors`.
- The product's gate was not run (the handoff forbids it).

## Own-work check

- Requirement most likely not met: every quotation word for word from its page. Check: fetched each page, extracted its text to files in the scratchpad (`a scratch folder outside the repository`), collapsed whitespace, and tested every quoted string of the three commits by script (`verify2.py`, same directory). Result: 28 quoted strings, 27 found in the page text; the one not found is the earlier passage of the Docker fact, "For the ADD and COPY instructions, ...", whose source file writes `ADD`, `COPY`, `RUN` in backticks (markup dropped by the template's rule), so it matches as a reader sees it (checked in `inval.md` lines 24-25).
- Second check: the State of JS, Bun, Node.js TypeScript and Go passages were also read with WebFetch; the answers agree with the script. The State of JS figures are read as rendered ("Node.js" row "10,062"; total "11,141").
- Third check: the Dockerfile in the worktree: `ARG LOOP2_COMMIT` (line 16) comes before the check step (`RUN node dist/server/account-database-check.js`, line 30), and `deploy/loop2-deploy:319` and `:367` pass `LOOP2_COMMIT=$REQUESTED`; this is why D-237's *Rationale* states the rerun with each new commit.

## Reaches beyond the handoff

- `curl` through Bash for the page bodies (text extraction to the scratchpad), besides WebFetch: WebFetch answers through a model that paraphrases, so exact strings came from the raw HTML; WebFetch was used to confirm four pages.
- `Dockerfile`, `compose.yaml`, `deploy/loop2-deploy` (read, not changed): to check that the build argument stands before the check step.
- `foundations/invariants.md` `account-save-sqlite-upgrade` (read whole): dependant of the Docker fact.
- GitHub API `repos/whatwg/html/commits` to take the sha of the newest commit snapshot of the HTML Standard (`a0442320...`, 2026-11-09).
- `the file of the review remarks of the foundation in the author's notes` lines 151, 171, 177 (remarks 018-2, 046-39, 052-18): for what the three rows meant.

## Concerns

- The Node.js address in D-02 is `https://nodejs.org/docs/latest-v24.x/api/http.html`, a path the publisher moves to newer text (today it serves v24.22.2); I kept the address as D-02 had it and named the served version in the place. A frozen address (`https://nodejs.org/download/release/v24.22.2/docs/api/http.html`) would fit the template better but changes the source; left for the human or the review of the foundation.
- The State of JS citation quotes three separate text runs ("Node.js", "10,062", "11,141") because the chart draws the row as separate elements; the page does not label "11,141" as the total of respondents (inferred, as the existing label in D-01 already says).
- The Bun page is a `.mdx` file shown by GitHub as a source file; I quoted its front matter description, which is the same text in the source and in any rendering.
- D-05's second page is labelled "Express 5 request routing and response API"; the quoted passages are about the router only (the page holds no passage on responses that the decision uses).
- D-237: the *complies* example changed from "a build that takes the step from its cache" to "a build of the same commit that takes the step from its cache", because with `LOOP2_COMMIT` a build of a new commit never takes the step from the cache. This edit is beyond the row's text; it follows from the row's meaning.

## Unread material

- The decisions' `examples.md` and the-way's own `foundations/` entries named there were not opened; the template, `rules.md`, `way_of_working.md`, the decision and environment-fact skills with their `read.md`, `decide_entry.md`, `draft.md`, `write.md` were read whole. `change/SKILL.md` and `foundation_step.md` read whole.
- `plan.md`: only the section *Foundation entries* (and a grep of it). The pages' full text was not read end to end; I read the passages around each quote and the sections named.
- The task `task.md` read whole. The group 1 report read to line 80.

## Searches not found or unclear

- none
