# Report — the plan's *Foundation entries* (luki-w-testach-z-przegladu)

**Status:** done with concerns

Concerns, each detailed below: (1) the fact of row 3 stands as three entries, not one, because the
element's template allows one source per entry, and the chain of the source runs through a third
package the plan does not name (random-bytes 1.0.0); (2) the author address of my commits is the
one git config gives (`the author's git address`), not the noreply address the handoff asks for; (3)
until Slice 2 withdraws `account-schema-lifecycle`, that invariant still names D-112 in *Derives
from* while D-112's *Verification* no longer names it — the foundation check reports nothing for
it.

Worktree `the repository's root`, branch
`task/luki-w-testach-z-przegladu`, base `0b23580bb4f643dfb52c66a7d6a27b1b8d60a5b1`. `.the-way` at
`bfb2e109735b5fff98802b8be0ff3c43c799262a`, equal to the gitlink (checked with
`git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way`).

## Commits

| Commit | Files (added / removed lines) | What |
|---|---|---|
| `8a4a9a76` | `foundations/decisions.md` (+17 / −2) | D-422 new; D-73 names it; D-112 *Verification* without `account-schema-lifecycle` |
| `29b7d0e0` | `foundations/environment_facts.md` (+18 / −0), `foundations/invariants.md` (+1 / −1) | facts `express-session-id-generator`, `uid-safe-sync-id`, `random-bytes-sync-source`; `player-opaque-session-cookie` *Rests on* gains them |
| `84d2d59a` | `foundations/invariants.md` (+7 / −7) | *Method* `review` → `test` for the seven invariants |
| `8b32706d` | `foundations/decisions.md` (+4 / −4) | D-29 alone (spec Decision 6) |

Total against the base: 3 files, +47 / −14. Author address of all four: `the author's git address`
(`git log --format='%h %ae'`).

## The entries, each with its meaning

D-422 is the new decision of the departure. Its section is *Testing discipline*, at its end after
D-89 (the log has topical sections; the template puts a new entry at the end of its topic's
section).

1. **D-422 (decision, new) — `row 1`.**
   - EN: The case of `tests/http.test.mjs` that checks the guard against destroying an ended answer
     asserts on the call of `destroy`, not on a cut answer, because the cut cannot be seen on
     Windows where the gate runs; this departs from D-73's template for that case alone.
   - PL: Przypadek w `tests/http.test.mjs` sprawdzający strażnika przed zniszczeniem zakończonej
     odpowiedzi sprawdza wywołanie `destroy`, a nie urwanie odpowiedzi, bo na Windowsie, na którym
     biegnie bramka, urwania nie widać; to odstępstwo od szablonu D-73 tylko dla tego przypadku.
   - Fields: *Scope* account-server; *Based on* `none`; *Relations* `narrows D-73`;
     *Verification* a pair of examples (no test changes, as the plan says); *Origin* `none`;
     *Rejected* the two ways not chosen of question 2, translated from the task: rewrite the test
     to check the effect, and change nothing, each with its reason as the task keeps it.
   - The template rule it departs from, quoted from `.the-way/product-guidelines/testing/template.md:238`:
     "an assertion on a call only for an effect visible outside the product".
2. **D-73 (decision, changed) — `row 1`.**
   - EN: The list of loop2's departures from the testing template now ends with D-422.
   - PL: Lista odstępstw loop2 od szablonu testowania kończy się teraz na D-422.
3. **express-session-id-generator (environment fact, new) — `row 3`.**
   - EN: Express-session 1.19.0, given no `genid` option, gives every session it makes, a
     regenerated one included, the identifier that uid-safe's synchronous function returns for
     the length 24.
   - PL: Express-session 1.19.0 bez opcji `genid` nadaje każdej tworzonej sesji, także
     odnowionej przez `regenerate`, identyfikator zwracany przez synchroniczną funkcję uid-safe dla
     długości 24.
4. **uid-safe-sync-id (environment fact, new) — `row 3`.**
   - EN: Uid-safe 2.1.5's synchronous function returns a text made from the bytes the synchronous
     function of random-bytes gives for the length asked.
   - PL: Synchroniczna funkcja uid-safe 2.1.5 zwraca tekst zrobiony z bajtów, które dla żądanej
     długości daje synchroniczna funkcja random-bytes.
5. **random-bytes-sync-source (environment fact, new) — `row 3`.**
   - EN: Random-bytes 1.0.0's synchronous function returns the bytes of `randomBytes` of the
     module `crypto` for the size asked, and throws when every try of that function throws.
   - PL: Synchroniczna funkcja random-bytes 1.0.0 zwraca bajty z `randomBytes` modułu `crypto` dla
     żądanego rozmiaru, a gdy każda próba tej funkcji kończy się błędem, rzuca błąd.
6. **player-opaque-session-cookie (invariant, *Rests on* only) — `row 3`.**
   - EN: The invariant that the browser carries a random session identifier now names, beside its
     three earlier facts, the three facts of how that identifier is made.
   - PL: Niezmiennik o losowym identyfikatorze sesji w ciasteczku wskazuje teraz, obok trzech
     dotychczasowych faktów, trzy fakty o tym, jak ten identyfikator powstaje.
7. **sprite-credits (invariant, *Method* → `test`) — `row 2`.**
   - EN: That the credits hold a line for every pack whose licence asks for one is now checked by
     a test, which Slice 4 writes.
   - PL: To, że zasługi gry mają linię dla każdej paczki, której licencja jej wymaga, sprawdza
     teraz test, który pisze Slice 4.
8. **player-express-session-sqlite-store, player-self-registration, player-password-login,
   email-verification-nonblocking, account-save-durable-storage, loop2-shared-public-origin
   (invariants, *Method* → `test`) — `the cycle's`** (To do 11 of the task, named by the plan; no
   row of *Settlements to record* carries them).
   - EN: Each of these six rules is now kept by the tests that cite it, which Slices 1, 3 and 4
     write; `player-express-session-sqlite-store` is cited already by two cases of
     `tests/transport.test.mjs`.
   - PL: Każdej z tych sześciu reguł pilnują teraz testy, które się na nią powołują; piszą je
     Slice 1, 3 i 4, a na `player-express-session-sqlite-store` powołują się już dwa przypadki
     `tests/transport.test.mjs`.
9. **D-112 (decision, *Verification* changed) — `the cycle's`** (To do 12).
   - EN: D-112 no longer names `account-schema-lifecycle` among its invariants, since that
     invariant repeats `account-database-schema` and Slice 2 withdraws it.
   - PL: D-112 nie wymienia już `account-schema-lifecycle` wśród swoich niezmienników, bo ten
     powtarza `account-database-schema`, a Slice 2 go wycofuje.
10. **D-29 (decision, changed) — `the cycle's`** (spec, To do 16; the task's *Decisions in play*
    do not name D-29, so the human accepts it at the merge).
    - EN: ESLint's rules also reach every JavaScript file of agent-workflow under `.claude/hooks/`,
      `.claude/skills/loop2-play/` and `.agents/skills/loop2-play/`, a later file there included,
      and the test keeps the patterns to that wider scope.
    - PL: Reguły ESLinta obejmują też każdy plik JavaScript części agent-workflow w
      `.claude/hooks/`, `.claude/skills/loop2-play/` i `.agents/skills/loop2-play/`, także
      dodany tam później, a test pilnuje wzorców w tym szerszym zakresie.
    - What changed: the binding sentence's subject; *Scope* gains `agent-workflow`; *Rationale*
      gains why these directories and why a later file there is covered; *Rejected*: "the whole
      repository" no longer rests on the play skill's scripts and joins "the whole of
      agent-workflow" (the scene-art scripts come with it), and two ways are added — the files
      named one by one, and the formatter widened with the linter. *Verification*, *Based on*,
      *Relations* and the sentence "Changing the rule set takes a human-accepted change of this
      decision." are unchanged. For the request: this reverses an option D-29's *Rejected* held
      for the linter, so the description puts it before the human as a changed decision.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` (base, before any edit) | 0 | 0 errors |
| same, after each of the four commits' edits | 0 | 0 errors each time |
| same, on the last commit `8b32706d` | 0 | 0 errors |
| `python -B .the-way/elements/common/foundation_check.py` (no switch), on `84d2d59a` and on `8b32706d` | 1 | 6 errors, exactly the expected ones: `player-self-registration`, `player-password-login`, `email-verification-nonblocking`, `account-save-durable-storage`, `loop2-shared-public-origin`, `sprite-credits` — each "reads `test` and no test cites it". `player-express-session-sqlite-store` is not reported, since `tests/transport.test.mjs:778` and `:830` cite it already. |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | 0 errors, 147 warnings, 7 info; every warning is a `dead-path` in a file this change does not touch |

Not run, by the handoff's boundary: `npm test` and every product test (the full suite is the
cycle's run before the request); no test was written, so there was no failing run to record.

Mechanical check of the facts' sources (the element's `write.md`): I downloaded the three
tarballs at the addresses the facts cite, from `registry.npmjs.org`: each answered HTTP 200; the
SHA-512 of each equals the `integrity` of `package-lock.json` (lines 3702, 7701, 7015); its
`package/` equals the installed `node_modules/<name>` (`diff -r --strip-trailing-cr`, nested
`node_modules` left out); and each of the 12 quoted passages stands in the cited file once, after
runs of whitespace are collapsed (`grep -cF` gave 1 for each).

## Own-work check

- Requirement my work most likely misses: that the new facts are actually tied to
  `player-opaque-session-cookie` and that the check reads those links, not only that it passes.
- The check: an exploratory edit renaming `random-bytes-sync-source` in that invariant's
  *Rests on* to `random-bytes-sync-sourcex`, then `foundation_check.py --skip-test-citations`.
- What it showed: exit 1, `foundations/invariants.md:673: random-bytes-sync-sourcex names no
  fact`; after `git checkout -- foundations/invariants.md` the run exits 0 with 0 errors.
- Also checked: D-29 stands alone in `8b32706d` (`git show --name-only`: only
  `foundations/decisions.md`, and the diff of that commit holds only D-29's lines).

## Choices, with the way rejected and the cost if wrong

1. **Three facts, not one.** The plan's row says "An environment fact". The template says one entry
   holds one edition of one source: "Several addresses stand in one entry only as pages of one
   edition", because two sources in one entry would send a new edition of one to every entry that
   rests on the other. The code that makes the identifier is in three packages: express-session calls
   `require('uid-safe').sync` with `24`; uid-safe calls `require('random-bytes')`'s `sync`; and
   random-bytes calls `crypto.randomBytes(size)`. So I wrote three entries, all named in the
   invariant's *Rests on*.
   - Rejected: one entry quoting three tarballs. It breaks the template's rule, and the product
     has one precedent of that form (`playwright-cli-session-separation`).
   - Cost if wrong: three entries to merge into one. Nothing else depends on them.
2. **random-bytes 1.0.0, a package the plan does not name.** The plan says the randomness comes
   "through uid-safe 2.1.5". In fact uid-safe calls no random function itself; random-bytes 1.0.0
   does, as the lockfile pins it (`node_modules/random-bytes`, `package-lock.json:7012`). Without
   this third fact, the source does not show where the randomness comes from.
   - The source shows the call of `randomBytes` of the module `crypto`. It does not show that
     this module is Node.js's built-in one, so the sentence names only "the module `crypto`".
   - I wrote no fact that this function is cryptographically strong. The invariant says
     "random", not "cryptographically strong", and that claim would need Node.js's documentation
     as a further source.
3. **Citation address: the npm tarball** (`https://registry.npmjs.org/<name>/-/<name>-<v>.tgz §
   package/<file>, <symbol>`).
   - Why: it is the address `resolved` in the lockfile gives, its bytes are the installed ones
     (integrity matched), and the product already uses this form for `nodemailer-require-tls`.
   - Rejected: the GitHub address at the commit `c10b2a38` that four older express-session facts
     use. uid-safe and random-bytes would need commits of their own tags, which I did not look
     up, and the handoff asks for the installed package.
   - Cost if wrong: the addresses get rewritten. The meaning stays.
4. **D-422's question and binding sentence.**
   - The question is "How is the guard that keeps a failed renewal from destroying an answer that
     has ended tested?", in the form of D-163 and D-235.
   - The binding sentence gives the reason ("because the cut of an answer cannot be seen on
     Windows, where the gate runs"), since the row's sentence carries it. It also says that this
     departs from the rule of the template D-73 adopts, for that case alone.
   - *Scope* is `account-server` alone, the part of `tests/http.test.mjs`. Like D-163, it does not
     name agent-workflow for the guidelines file.
5. **D-422 *Based on* `none`.** Nothing open to a reader shows that the cut cannot be seen on
   Windows. The test's own comment in `tests/http.test.mjs:5962-5963` says "on this host the
   socket is already detached when the callback runs". Following the template on the product's
   own measurements, *Rationale* says the observation is the product's own and its record is not
   open to a reader.
   - Rejected: `TODO — …` in *Based on*. It would put a missing outside source before the human,
     where the template says a measurement of this kind gets no source.
6. **Where D-422 stands.** At the end of the section *Testing discipline*.
   - Rejected: the section *Account server: access, security and blocked accounts*. The decision
     is a testing departure, and five of the ten earlier departures stand in *Testing discipline*.

## Reaches beyond the handoff

- `.the-way/product-guidelines/testing/template.md:228-247` — to quote the exact rule D-422
  departs from (*Doubles*, "an assertion on a call only for an effect visible outside the product").
- D-413 (`foundations/decisions.md:1427-1431`, binding sentences only) — to check where the gate
  runs. CI runs the one command on Linux. The row's "Windows, where the gate runs" stays as the
  row says it, since the full gate before a request runs on the author's Windows machine and the
  task's question 2 rests on that.
- The rest of the section *Testing discipline* (`foundations/decisions.md:809-1037`: D-81, D-83 to
  D-89 whole, read as part of the section I inserted into) and the tail of D-412.
- `tests/http.test.mjs:5954-5987` (the case D-422 names), `src/server/app.ts:30-59` (to confirm the
  product passes no `genid`, which the first fact's condition depends on), `package-lock.json`
  entries of the three packages, `node_modules/{express-session,uid-safe,random-bytes}` sources.
- `foundations/environment_facts.md:350-489` and its end (`930-952`), for the form the product's
  facts of npm packages take and where new entries go.
- WAY-03 of the-way (`.the-way/foundations/decisions.md:1629-1673`), the decision example; the
  invariant examples `script-imports`, `fingerprint-definition`, `gate-exit-code`,
  `instruction-file-imports`; the-way's environment facts by search.
- The network: three downloads from `registry.npmjs.org` for the mechanical check (no data of the
  user or project sent).

## Working copies

- `.runs/foundation/` in the worktree held `sections.md` and `index.md` (output of
  `decision_index.py`) and `tarballs/` (the three `.tgz` files and their extracted `package/`
  directories). The whole `.runs/foundation/` directory was removed; `Test-Path` gives `False`.

## Notes for the orchestrator and later slices

- `guidelines/testing.md:10-11` still says "dziesięć odstępstw" and lists ten. D-73 now lists
  eleven, so Slice 5 has to change both the count and the list.
- `eslint-source-rules` still names the five parts while D-29 now names the three directories too;
  Slice 15 aligns it with its test. The foundation check reports nothing for the gap.
- `account-schema-lifecycle` still says *Derives from* D-112 until Slice 2 withdraws it.

**Unread material:**

- `guidelines/testing.md`: lines 1-20 (*When to read* and the departures) and 366-375 (the
  `integration test` recipe), plus the hits of a search for `D-73`/departures. This is as the
  handoff limits it.
- D-75, D-76, D-77, D-78, D-79 and D-82 were read whole, beyond the binding sentence and *Scope*
  the handoff asks for. D-273 was read through *Verification*; its *Origin*, *Rationale* and
  *Rejected* were not read.
- D-101 was read through *Verification* (`foundations/decisions.md:2513-2526`); its *Origin*,
  *Rationale* and *Rejected* were not read. Its link to the work is only through
  `player-opaque-session-cookie`'s *Derives from*, which did not change.
- Of the facts the seven invariants rest on, these were read by sentence only, not by *Source*:
  `docker-compose-down-volumes`, `docker-volume-prune-scope`, `docker-system-prune-volumes`,
  `pixel-crawler-terms`, `lpc-wolf-licence`, `smoke-fire-particle-licence`,
  `cc-by-3-adaptation-credit`, `cc-by-3-licence-copy`. A change of *Method* does not reach them.

**Searches not found or unclear:**

- The plan's "through uid-safe 2.1.5": the randomness does not come from uid-safe but from
  random-bytes 1.0.0, which the plan does not name (choice 2).
- Whether `crypto` in random-bytes is Node.js's built-in module: the source does not say, so the
  fact says only "the module `crypto`".
- The handoff says the author address "must be the account's noreply address". The repository's
  git config gives `the author's git address`, as do the five non-merge commits before the base; only
  the merge commit `0b23580b` carries `34870084+mariusznazar@users.noreply.github.com`. I did not
  change any git configuration. Settle this before the request if the noreply address is required.
- No source open to a reader of the repository for "the cut of an answer cannot be seen on
  Windows" (choice 5).
