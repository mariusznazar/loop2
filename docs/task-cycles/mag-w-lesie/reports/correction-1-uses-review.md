# Correction 1 — review of uses for the changed glossary definitions (WAY-97)

Tree: `task/mag-w-lesie` at fe57eae (working tree clean). No file was edited. Method: `.the-way/elements/glossary/template.md` § "Uses and a changed definition" and `.the-way/elements/glossary/skill/SKILL.md` step 4. Searched: every file of `foundations/`, using the guard's `--uses` and a separate search over text joined across line breaks for "run", "rule", "restart", "map", "action", "choice", "choose", "chosen" and "choosing".

## Definitions compared

| Term | Before | Now (`foundations/glossary.md`) |
|---|---|---|
| `map run` | c785a69~1: "A map run is one attempt of one character at one map, from entering it until a completion, the character's death or the player stopping it." | `:22` "… at one game map, from entering it …" |
| `program rule` | c785a69~1: "A program rule is a pair of a condition and an action that a program holds." | `:62` "… a condition and an action of a character that a program holds." |
| `map run restart` | 2906669~1, under `## restart`: "A restart is a map run of the same character on the same game map, which the player starts in place of the map run in progress." | `:69` the same sentence, with "A map run restart is" in place of "A restart is" |

## Guard lists against the foundation report

Guard: `python -B .the-way/elements/glossary/format_guard.py foundations/glossary.md --uses "<term>"` at HEAD.
- `map run`: 34 uses. `program rule`: 15. `map run restart`: 5. All three show 0 errors, 0 warnings and 0 unchecked.
- Each list matches the one in `correction-1-foundation.md` § "Uses of the changed definitions (WAY-97)" line for line. The line numbers given there on 2906669 still hold at HEAD.

## (a) Uses whose meaning moves under the new definition

**None.** I read every listed use with the new definition in place of the term, and none changes what it says:

- **`map run`.** Every use means an attempt at the game's map: D-20/1, D-21/1, D-22/1, D-24/1, D-26/1, the invariants `map-run-repeatability`, `simulation-randomness`, `player-map-run-pace`, `program-rule-pick`, `map-run-tiles` and `restart-seed`, part `simulation` (`foundations/part_map.md:21`) and the definition of `map run restart`.
  - Under WAY-104, the bare "map" of the old definition read in the process meaning ("part map"). So the change brings the definition into line with its uses; it does not move them.
  - The guard leaves out "map run" inside "map run restart" (`foundations/decisions.md:494`, `:593`, `:622`, `:629`, `foundations/invariants.md:295`). Read with the new definition, those are unchanged too.
- **`program rule`.** In every use the action is the character's: explore (`foundations/invariants.md:248`), go to a resource (`:270`), a move (`foundations/decisions.md:704-705`), and "naming 'tile 7'" (`:740`). No use has a program rule whose action belongs to anything other than the character, so adding "of a character" moves nothing. The same holds for the old bare "action", which under WAY-104 read as the process word ("human action").
- **`map run restart`.** The definition is unchanged. The five uses were rewritten from "a restart" / "A restart of a map run" with the same meaning: D-04/3 `:494`, D-20/1 `:593`, D-22/1 `:622`, `:629`, `restart-seed/1` `foundations/invariants.md:295`.

**A main-branch entry among the uses.** The guard lists the definition of the `program` entry (`foundations/glossary.md:30`, "made of ordered program rules"), and that entry is on `main` (d2b4687). It wrote "program rules" before the term existed. Both the old and the new definition are a narrowing that this use accepts ("ordered" pairs of a condition and an action), so its meaning does not move. Skill step 4 sends a draft back to step 3 only when a use in a main-branch entry moves, so nothing is sent back. I name it here because the brief said `main` holds none of the three.

**Things to look at, but not moved meanings:**
1. `foundations/glossary.md:62`: "a pair of a condition and an action of a character that a program holds". The clause "that a program holds" can now be read as attached to "a character" ("a character that a program holds"). Before, it could only attach to "action" or "pair". The intended reading is clear from the `program` entry, so this is a matter of wording, not of the uses.
2. "Carry out a program rule" (`foundations/invariants.md:236-237`; "carry it out" at `:249`, `:272`) means carrying out the rule's action. The new definition reads the same way here as the old one did.
3. Other forms the guard does not see, all keeping the meaning of the term:
   - "resume it" for the map run (`foundations/decisions.md:599`)
   - "its first map run" (`:695`)
   - the identifiers `map-run-repeatability`, `player-map-run-pace`, `map-run-tiles`, `program-rule-pick` and `restart-seed` (headings in `foundations/invariants.md` and the *Verification* lines `foundations/decisions.md:582`, `:605`, `:628-629`, `:657`, `:684`)
   - the quoted program-rule label "Go — stick" (`:714`, `:739`)
4. Short forms. Nothing in `foundations/` writes "the run" / "a run" for a map run, bare "rule" for a program rule, or "a restart" for a map run restart.
   - The bare noun "run" appears only in #11's D-15/1 (`foundations/decisions.md:383` "a human's run of the installed deploy script", `:399` "A human's run"). That is the run of a script, not a map run, and it does not stand for the term.
   - The bare "rules" in D-18/1 *Rationale* (`foundations/decisions.md:542`, "lets the content grow by rules rather than by code") is a new-branch use in another meaning (the simulation's rules, not program rules). It does not stand for the term, so WAY-99 is not triggered, but a reader could take it for "program rules".

## (b) Every bare "restart" in `foundations/`

| Place | Entry (branch) | Meaning |
|---|---|---|
| `foundations/decisions.md:323` | D-12/1 *Verification* (#11, main) | a container — "restarts a container through the `mikrus` MCP server" |
| `foundations/decisions.md:393` | D-15/1 *Verification* (#11, main) | a container from a kept image — "a rollback that restarts a kept image of an earlier commit" |
| `foundations/part_map.md:127` | part `deployment`, failure mode (#11, main) | the host — "gone after the host restarts" |
| `foundations/invariants.md:293` | heading `restart-seed/1` (this branch), identifier | a map run restart |
| `foundations/decisions.md:629` | D-22/1 *Verification* (this branch), identifier `restart-seed` | a map run restart |
| `foundations/part_map.md:37` | part `simulation`, file `tests/invariants/test_restart_seed.py` (this branch), path | a map run restart |

- No bare "restart" in running text carries the map-run meaning. The three in running text are #11's and mean a container or the host.
- The identifier `restart-seed` and its test file keep the old short word. The foundation agent kept `restart-seed/1` on purpose: renaming it would change the citations. The identifier now reads like #11's meaning of the bare word. This is low risk: an identifier is not a sentence, and the sentence it names says "map run restart".

## (c) Plain "map", "action" or "choice(s)" in this branch's entries (WAY-104)

| Place | Entry, field | Text | Reading |
|---|---|---|---|
| `foundations/decisions.md:690` | D-24/1 *Origin* | `"What is a map made of?"` | bare "map" in a domain meaning; a quoted section title of the source, kept on purpose by the foundation agent (changing it breaks the pointer). It remains bare. |
| `foundations/decisions.md:650` | D-23/1 binding part | "Conditions are chosen from a closed list" | verb form of "choice", domain meaning (the player picks a condition); unqualified. Whether WAY-104's "any of its forms" covers choose/chosen is open; the foundation agent did not treat the verb. |
| `foundations/decisions.md:715` | D-25/1 *Verification* | "then the program choosing again" | verb form, domain meaning (the program picks a program rule); unqualified. D-25/1's binding part says the same with "picks a program rule anew", which would remove the word. |
| `foundations/decisions.md:582`; `foundations/invariants.md:177` | D-20/1 *Verification*; invariant heading | identifier `action-in-progress` | bare "action" inside an identifier; the invariant's sentence says "The character's action in progress". Identifiers were not treated as sentences; the guard (`glossary-process-terms`) reports nothing. |
| `foundations/decisions.md:473` | D-04/3 binding part | "the player's choices" | qualified by the possessive phrase, as ruling 4 restored it and as "the character's action" is elsewhere; not a gap under "a phrase holding the word". |
| `foundations/decisions.md:799` | D-27/1 *Rationale* | "it is the product's own choice" | process meaning (a choice of the product's makers), as the foundation agent read it; not a domain use. |

Every other "map" and "action" in this branch's entries is qualified: "game map", "the character's action", "action of the character" (`foundations/decisions.md:649`, `:704`, `:705`, `foundations/glossary.md:62`), or stands inside the product term "map run".

## Unchecked

- The elements' templates and the shared Markdown files of the-way were not searched. None of the three terms is a word of the-way, and their uses are in the product's `foundations/` alone.
- Code, tests and the interface were not searched; the template excludes code.

## Review of uses after 11844c6

Tree: `task/mag-w-lesie` at 11844c6. Read-only. Term: `program rule`.

- **Before** (11844c6~1, `foundations/glossary.md:62`): "A program rule is a pair of a condition and an action of a character that a program holds."
- **Now** (`foundations/glossary.md:62`): "A program rule is a pair held by a program: a condition and an action of a character."

**Changes since the first review.** `git diff fe57eae HEAD -- foundations` adds and removes no "rule" or "action" except in the definition itself. The guard still lists 15 uses at the same lines:
- `foundations/decisions.md:485`, `:574`, `:575`, `:589`, `:590`, `:648`, `:705`, `:740`, `:747`
- `foundations/invariants.md:180`, `:236`, `:237`, `:248`, `:270`
- `foundations/glossary.md:30`

The guard reported 0 errors, 0 warnings and 0 unchecked.

**(a) Uses whose meaning moves: none.**
- The new wording keeps both parts of the pair: a condition, and an action of a character. It also attaches "held by a program" to the pair. That resolves the reading noted in the first review, where "that a program holds" could attach to "a character".
- Every use already speaks of a rule within a program:
  - "another program rule" of the same program (`:574`, `foundations/invariants.md:180`)
  - "the program picks a program rule" (`:575`, `:589`, `:705`)
  - "the first program rule" a character carries out by its program (`:648`, `foundations/invariants.md:236-237`)
  - `program`'s own "ordered program rules" (`foundations/glossary.md:30`)
- D-04/3 `:485`, "a screen of the browser view that writes a program rule straight into the game state", still reads as before: the rule written there is held by the program in that game state.
- D-26/1 `:740` and `:747`, and the invariants at `:248` and `:270`, are unaffected by where "held by a program" attaches.
- The main-branch use (`foundations/glossary.md:30`, entry `program` on d2b4687) does not move: "made of ordered program rules" is exactly a program holding its rules.

**Other forms.** I found nothing new:
- "carry it out" (`foundations/invariants.md:249`, `:272`) still means carrying out the rule's action.
- No bare "rule" stands for the term. "rules" in D-18/1 `:542` keeps its other meaning, as noted above.
- (c) is unchanged: the new definition writes "an action of a character", qualified.
