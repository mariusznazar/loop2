# Findings of the review of the whole change (range 7ff7c729..e717ec0f), in the reviewer's words

Source: `reports/review-1-report.md`, first line `FAIL e717ec0f20dba485f648b0c7602c2ccdf5513061`. The blocking finding comes first, then the Minor findings within the task that the same report lists (to be fixed in the same round).

### Important

**I-1 — The wolf does not run in when the reading of the attack also carries the end of a gathering.**
`src/browser/view/scene.tsx:616-625` (commit `2f144fdb`): the effect of a reading is
`sceneEffect(...) ?? creatureEffect(...)`, and the scene keeps one effect at a time. By D-71 a minute
lets the action that ends in it take effect and then tries the attack before the pick, so the events of
one minute can carry `activityFinished` of a gathering and `attacked` together; then `sceneEffect`
returns the flight of the icon or the dust, `creatureEffect` is never asked, and the wolf appears at
once beside the mage, with no run in, though nothing is overdue, no load happened and no stop holds the
scene. To do 1 asks that at an attack the wolf runs in, with exactly three exceptions (an overdue run,
a load in the combat minutes, reduced motion) and Q5's first-attack stop; D-316 says "it runs in from
the right edge of the frame", D-317's *Verification* says "the wolf running in from the right edge in
300 ms at 1× and at 16×". The two effects do not compete for one place: the run in is an attribute on
the wolf element the state already draws, so the flight or dust and the run in could both play.
Evidence: a script of mine (`attack_with_gather.mjs`, run on the built head) played 300 seeds of a
manual map run of Las — głębiej with the program „Zbierz — Patyk / Zbierz — Jagoda / Eksploruj” and,
for each reading that carried an attack, asked both functions: at one game minute per reading (1× to
4×) 6 of 97 attacks had a non-null gathering effect together with a non-null run in, so the run in was
lost; at three minutes per reading (about 16×, the clock reading every 200 ms) 11 of 97. No test covers
a reading with both events (`tests/view/scene.test.mjs` and `tests/view/scene-picture.test.mjs` only
pair `attacked` with nothing or with `combatEnded`). Graded Important: a missed requirement in a
reproducible fraction of attacks — roughly one in ten at 16× — that no test protects. Slice: none (one
author without a plan).

### Minor (all within the task)

**M-1 — The credit of the dust says „obłók”, not „obłok”.** `src/browser/view/credits.ts:54` reads
`name: "Kurz i obłók walki"` (bytes `ob c5 82 c3 b3 k`: „ó” where Polish has „o”), and
`tests/view/icons.test.mjs:211` expects the same misspelt line, so the test protects the typo. The task
(To do 6) gives „Kurz i obłok walki”, the author's report says „Kurz i obłok walki”, and the styleguide
writes „obłok” throughout (`guidelines/styleguide-browser-view.md:614`, `:639`, `:707`). Every player
who opens „Autorzy grafiki” on the login card or at the bottom of Siedziba reads a misspelt word; nothing
breaks. Fix both lines together. Every other changed file is valid UTF-8 with no U+FFFD, no BOM and no
CRLF, and every other Polish word added in `src/`, `tests/` and `guidelines/` reads correctly (checked
by a script over all non-ASCII words of the added lines).

**M-2 — D-316 does not carry the approved projected words "the moment of the map run".**
`foundations/decisions.md:7628` (commit `ab8c1606`) reads "what attacks it and how the map run stands",
where the projected entry the task carries reads "what attacks it and the moment of the map run". The
author's reason (gap 2(a)) — that "moment" is the word of D-322's three moments — is exactly why the
projected words fit: the scene draws the moment (`SceneMoment`, `momentBegins` in
`src/browser/view/scene-picture.ts`) from its previous reading and the events, which is what that clause
of the sentence states. "How the map run stands" is broader (it takes in `SceneStanding`: going, paused)
and still true of the code, so a reader is not misled, which keeps this Minor; but it alters a source the
human approved without a decision. Restore the projected words.

**M-3 — Test comments point to the task document's questions.** `tests/view/scene-picture.test.mjs:1309`,
`:1340`, `:1366`, `:1415` and `tests/view/scene.test.mjs:2256`, `:2334`, `:2365`, `:2409` open with
"D-316, Q2.", "D-322, Q5." and the like; Q2–Q5 are the numbers of the questions of this task's document.
`guidelines/testing.md`, *Where the expected value comes from*: „Komentarz testu nie wskazuje dokumentu
spoza fundamentu.” No test on the base cites a Q number (`git grep '\bQ[0-9]\b' 7ff7c729 -- tests src`
finds none). After the merge nobody can resolve "Q4"; the D-numbers already carry the requirement. Drop
the Q references.

**M-4 — The test of the wolf's side checks a hand-written list of places, not the data's.**
`tests/view/scene-picture.test.mjs:1358` loops over `[32, 42, 80, 144, 224]`, the mage's places copied
as numbers, to assert that the wolf stands on the right "at every place the mage stands at but the right
edge". The author's own choice 5 says a change of `SCENE_FIGHT.gap` or of a place can flip a side; a
new or moved place in `src/browser/sim/data/scene.ts` would not be checked, since the list does not come
from `SCENE_PROPS`, `SCENE_FIRE` and `SCENE`. The same test also pins `SCENE_FIGHT.gap === 2`
(`:1345`), a value the handoff calls the author's proposal, which no foundation entry holds
(`guidelines/testing.md`: a value the test needs and the foundation does not carry goes to the
foundation first). Reading the places from the data would let the test catch the regression it names.

**M-5 — D-317's *Rejected* names the process's tasks.** `foundations/decisions.md` D-317 *Rejected*:
"each task its own classification — the classifications could exclude one another" (commit
`ab8c1606`). The decision is to state the product's reasoning; "each task" is a word of the cycle, not
of the scene. Something like "a classification made anew for each kind of effect" says the same without
it. A reader is not misled, so Minor.
