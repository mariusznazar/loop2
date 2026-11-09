# Foundation step report — porzadki-z-uwag-pr

**Status:** done (with the notes under *Concerns*, none of which blocks).

Worktree `the root of the repository`, branch `task/porzadki-z-uwag-pr`, base `00aa818`, `.the-way` at `294af7f`.

## Commits (in order)

| Commit | Entry | Files |
|---|---|---|
| `c931b73` | D-254, form only | `foundations/decisions.md` (+4 −3) |
| `8e0e32a` | D-352 (Settlement 1) | `foundations/decisions.md` (+27) |
| `c3de2a6` | D-353 (Settlement 2) | `foundations/decisions.md` (+23) |
| `dabf0d8` | D-354 (Settlement 3) | `foundations/decisions.md` (+27) |
| `0277f8a` | rule "Recording a failure" | `guidelines/coding.md` (+5 −1) |

No other file was written. The commits are in the form of the earlier ones (`docs: :memo: …`), made with explicit paths.

## Entries

Each entry: one sentence in English, one in Polish, the mark, the identifier.

- **D-352 — row 1.** EN: when the fragment of an emailed link (`#confirm-email=…`, `#reset-password=…`) appears in the address of a tab whose game is open, the page reloads and does what a page opened by that link does. PL: gdy w adresie karty z otwartą grą pojawi się fragment linku z maila, strona przeładowuje się i robi to, co strona otwarta tym linkiem. Scope `browser-view`. Relations: derives from D-96 · D-156 · D-224 · D-281. Based on `none`. The cost the human accepted (a reload leans on the save at page hide, which D-207 does not guarantee, so up to 30 real seconds of a manual map run can be lost) stands in *Rationale* as "Accepted with it", the form D-225 uses. *Rejected* holds B and C of the row's *Not chosen* with their costs, word for word in meaning.
- **D-353 — row 2.** EN: a browser that breaks off sending a request's body, and a session write refused because the account was blocked during a registration, are an expected course and leave no failure line; a session write failing for another reason stays a failure. PL: zerwanie wysyłania treści żądania przez przeglądarkę i odmowa zapisu sesji z powodu blokady konta w trakcie rejestracji to spodziewany przebieg bez wiersza awarii; inna przyczyna nieudanego zapisu sesji zostaje awarią. Scope `account-server`. Relations: derives from D-137 · D-252. Based on `none`.
- **D-354 — row 3.** EN: the sentence by which `account-block` or `account-backup` answers the operator is no log line; the JSON line of D-252 alone is the log line, and the sentence stays beside it. PL: zdanie, którym `account-block` albo `account-backup` odpowiada operatorowi, nie jest wierszem logu; wierszem logu jest tylko wiersz JSON z D-252, a zdanie zostaje obok niego. Scope `account-server`. Relations: derives from D-137 · D-252. Based on `none`. *Rejected* holds 3b and 3c with their costs (against D-137, against D-252).
- **D-254 wrap — the cycle's.** EN: the *Rejected* paragraph of D-254, whose line at `foundations/decisions.md:5226` ran to 138 bytes, is wrapped at 100 columns as its neighbours are, no word changed. PL: akapit *Rejected* decyzji D-254, którego linia `:5226` miała 138 bajtów, jest zawinięty na 100 kolumnach jak sąsiednie, bez zmiany słów.
- **Rule "Recording a failure" — the cycle's.** EN: the sentence by which a service command answers the operator is no log line (D-354), so the JSON failure line and the sentence after it are one record of the failure; keep both and do not count the sentence as a second record. PL: zdanie, którym polecenie serwisowe odpowiada operatorowi, nie jest wierszem logu (D-354); wiersz JSON awarii i zdanie po nim to jeden zapis awarii, oba zostają. The rule's *Decision* field now reads `D-252 · D-253 · D-354`; every other sentence of the rule is unchanged.

The three decisions got the identifiers D-352, D-353, D-354 (next free numbers after D-351; the decision log holds no withdrawn list, and no file of the repository referred to D-352 to D-359 before).

## Search of the whole foundation (WAY-33)

No entry already states any of the three rows, so each became a new entry; none was tied to an older one. What I searched, in `foundations/decisions.md`, `invariants.md`, `glossary.md`, `guidelines/*.md`: `hashchange`, "already open", "open game", `reload` with `fragment`/`link`; `abort`, `aborted`, `disconnect`, "expected refusal", "session write", `ReasonedFailure`, "false alarm"; "operator" with "sentence"/"terminal", `account-backup`, "No backup was made". Hits that touched the subject without stating the row: D-96/D-156/D-224/D-225/D-281 (what the page does when opened by the link, not when already open), D-104 (which bodies are refused, nothing on a body broken off), D-252/D-253 (what a failure line is, nothing on these cases), D-137 (what the blocking command reports), D-233 (how the owner learns of a failed backup; says nothing on the sentence), D-207 (the save at page hide). No term for the glossary: the entries use the words the glossary already holds ("blocked account" and the like); no invariant is called for.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after D-254 wrap, once with all three decisions, once after the guideline edit) | 0 | `0 errors` each time |
| `git diff --word-diff=plain foundations/decisions.md` on the wrap, counting `[-` / `{+` | 0 (count 0) | no word changed |
| whole-file token comparison of `HEAD:foundations/decisions.md` and the wrapped file (`tr -s ' \n'` into one token per line, then `diff`) | 0 | `TOKENS_IDENTICAL` |
| `git diff --check` | 0 | no whitespace error |

Not run, by the handoff: the product's gate (`npm test`) and any test.

## Own-work check (section 3 of `make-change`)

The requirement I most likely fail: **a changed word in the wrap of D-254**, with a second candidate, **a *Scope* that does not match the part map**. Checks: the token comparison and the word-diff above (identical, 0 changes); for *Scope*, the part map's files — a decision about what `src/server/**` commands write is `account-server`, about the page's reaction to an address change `browser-view` (`src/browser/view/**`) — and `foundation_check.py`, which reports a part the map does not hold (0 errors). Both held.

## Reaches beyond the handoff

- `.the-way/elements/common/way_of_working.md`, `elements/common/rules.md`, `elements/decisions/template.md`, `examples.md`, `skill/{SKILL,read,decide_entry}.md`, `product-guidelines/template.md`, `product-guidelines/coding/{SKILL,template}.md`: the reading the two skills name. The handoff names the skills, not these.
- `foundations/decisions.md`: D-104, D-112, D-231, D-233 (read to settle *Relations*), `foundations/part_map.md` entries of browser-view, account-server, build-tools, agent-workflow (for *Scope*). Selective, to find collisions; no other part of the log read.
- `.runs/task-cycles/porzadki-z-uwag-pr/plan.md` Slices 2, 3, 4, 10 and `task.md`, to see what each entry has to carry for its slice.
- `the author's private rules note on scripts` and `git.md`, the user's own rules for scripts and commits.

## Choices (way rejected, cost if wrong)

1. **Wrap of D-254 reflows three lines, not one.** I wrapped from line 5226 to the end of the paragraph (5226–5228 became four lines of 97, 89, 100 and 44 characters) so that no short line stands in the middle. Rejected: breaking only line 5226 in two, which leaves a 40-odd character line before a 98-character one. Cost if wrong: two more lines than needed in the diff; no word differs.
2. **Wrap width 100.** The neighbouring lines run 93–101 characters. Rejected: 101, which one neighbour has. Cost if wrong: none for meaning.
3. **D-354 carries the "one record" sentence** ("a failure of the command written as that line and followed by that sentence is one failure recorded once"). Row 3 says only that the sentence is no log line; the "one record" wording comes from To do 32 and Slice 2's goal. I took it because the guideline rule has to say it and has to cite the decision, so the decision has to hold what the rule cites. Rejected: leaving it out of the decision and in the rule alone, which would give the rule a sentence without a decision behind it. Cost if wrong: the human reads the extra sentence at the merge and strikes it; the meaning of row 3 stays.
4. **D-352 has no sentence "any other change of the address goes on as today"**, which Slice 10 states. It is not in row 1; D-281 already gives the other addresses. Cost if wrong: Slice 10's reader finds that sentence in D-281, not in D-352.
5. **D-352 *Relations* includes D-96**, because the reloaded page shows the form for a signed-in player (D-96) and builds no game while it stands. Rejected: only D-156/D-224/D-281. Cost if wrong: one relation too many, harmless.
6. **Verification pairs (complies/violates) added to all three decisions**, drawn from the row's own *Answer* and *Not chosen*, because the template makes them optional and the rows' ways not chosen give the violating side. No invariant exists for any of the three; none is named.
7. **Origin cites the task's question by its title**, since the task's questions carry no number (earlier entries quote "question N"). Cost if wrong: a reader searches by the quoted title.
8. **D-353 and D-354 *Scope* is `account-server` only.** The code of both lies in `src/server/**`. D-137 also names `deployment` and `agent-workflow` for the skill that describes the blocking command; the skill's table of exit codes is not changed by these rows. Cost if wrong: a change to the `loop2-deploy` skill's wording of these sentences would not find D-353/D-354 by *Scope*.
9. **The guideline rule's new paragraph stands after the rule's first paragraph**, in Polish as the file is. The `**Decision:**` field gained `D-354`. Rejected: a sentence in the first paragraph, which would run it to nine lines.

## Concerns

- The handoff and the plan say the line of D-254 is "138 characters". It is 136 characters and 138 bytes (the dash is three bytes). The intent is the same line.
- D-353's first part says "like a body that is too large or broken". D-104 refuses such bodies but never calls them an "expected refusal"; the phrase comes from the coding rule's definition of a failure, which excludes an expected refusal. I judged it consistent and did not edit D-104.
- None of the statements of the task failed my reckoning; no value was fitted.

## Searches not found or unclear

- No entry already stating rows 1, 2 or 3 (searched as above) — not found, as expected.
- Whether the repository's foundation-wide test or `check_instructions` treats the added paragraph of `guidelines/coding.md` as an instruction file: I did not run `instruction-files/check_instructions.py` on it (the file is named by `AGENTS.md`); the paragraph holds no path-like text in backticks and no `@` import. The cycle's gate will show it if it does.
- The question-numbers in the task document for the *Origin* field: not present; titles quoted.

## Questions

none
