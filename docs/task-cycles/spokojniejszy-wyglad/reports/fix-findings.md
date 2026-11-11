# Findings of the review of the whole change — Minor, within the task, for one fix

In the reviewer's words, from `whole-review-report.md` (first line `PASS c7f2aa7b931e3aa1931b86b964e68c2cd08c19cb`). No blocking finding.

**M1. The colour of the map's icons has no test, though one is cheap — and the author's reason for
leaving it is wrong.**
Place: `src/browser/styles.css:1896` (`.terrain-drawing .icon { color: var(--text-strong) }`),
`tests/view/world-area.test.mjs:719`.
What is wrong: settlement row 1, D-40 and D-43 put the icons of the drawing of the map in
`text-strong`; only this one stylesheet rule makes that true. Removing it makes the icons inherit the
colour of the panel around the drawing, `text` — exactly the variant D-40's *Verification* lists under
*violates* ("an icon of the drawing of the map written in `text`") — and no test fails (the author's
own mutation list says so). The author says it cannot be tested because "jsdom applies no
stylesheet"; that is not so here: `tests/view/scene.test.mjs:330` (`computed`) already lays the real
`src/browser/styles.css` on the jsdom page and reads computed values from it.
Evidence: a scratch script (outside the repository, with `startMemoryLimit` first, as
`guidelines/testing.md` "Tests on a document imitation" asks) built the drawing's markup on jsdom with
the real stylesheet and read `color: "var(--text-strong)"` on the `foreignObject` and on its
`.icon-mask`, and `opacity: "var(--depleted)"` on the dimmed one. A case in `world-area.test.mjs`
using the same helper would fail when the rule goes.
Why it matters: a later stylesheet edit can darken the map's icons, against a settled decision, with
no signal. Grade Minor: the effect on the player would be icons at 3.27:1 instead of 4.39:1, still
legible (D-40's own words), and D-88 keeps rendering under manual checks.

**M2. D-27's *Rationale* gives no reason for the place chosen on Siedziba.**
Place: `foundations/decisions.md:683-689` (D-27 *Rationale*).
What is wrong: row 3 of *Settlements to record* and the answer to question 3 put the section "na samym
dole Siedziby, jako ostatnia część ekranu, … tak jak w starej Loop". The entry carries the place in its
binding sentence and the two rejected placements, and as accepted cost the scroll down Siedziba, but
nowhere says why the bottom — as in the predecessor game, loop, which the definition takes as the
starting point and minimum of the views.
Why it matters: a reader weighing a move of the section (task 21 brings the camp to the top of
Siedziba) sees what was rejected but not the reason the bottom won. Source fidelity: a reason the
source gives is dropped, nothing invented.

**M3. D-27 *Rejected* keeps half of the reason the source gives for "under the heading".**
Place: `foundations/decisions.md:693-694`.
What is wrong: the entry reads "the section on Siedziba under its heading — the first thing on the main
screen of the game would be the credits". The task's question 3, *Not chosen* B, reads: "pierwszą
rzeczą na głównym ekranie gry staje się podpis wzmianek, a ekran odchodzi od starej Loop bez zysku dla
gracza." The second half is dropped. The decision template asks that each way not chosen keep "the
cost or the reason kept beside it" (`.the-way/elements/decisions/template.md:69-74`). Goes with M2: the
same missing reason (the predecessor game).

**M4. D-262's first sentence changed beyond row 2 — name it in the request.**
Place: `foundations/decisions.md:5428`.
What is wrong: row 2 and *Decisions in play* change "with the header and the footer" to "with the
header" and take the footer out of the rationale, the rejection and the *Verification* example. The
change also rewrites the first binding sentence, "neither header nor footer" → "not even the header".
The meaning is the same (nothing but the card stands), and the footer no longer exists, so the edit is
sound; but it is not carried whole by an accepted row, so the human accepts it at the merge (template:
"A human accepts the changed meaning by merging the request …, unless the change was written whole from
an accepted row"). Fix: the request's description names this sentence as the cycle's edit beyond row 2
(the author's report, choice 6, already does).

**M5. The kitchen-sink page puts a `div` inside a `span`.**
Place: `src/browser/kitchen-sink/kitchen-sink.ts:582` (`iconMask` creates a `div`) and `:612`, appended
into the `span` of `roleSample` (`:590`).
What is wrong: a block element inside a phrasing element; the game itself draws a mask beside text as a
`span` (`maps-screen.tsx`, `tile-table.tsx`, `trip-plan.tsx`) and as a `div` only inside the
`foreignObject` of the drawing. Browsers render it (the author saw the page), so this is polish: a
`span` here, or the helper taking the tag, matches the game.
