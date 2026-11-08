# Report 01 — designer of the spec

- Status: **done**
- Spec: `docs/task-cycles/kronika-z-filtrami/spec.md`
- Base checked: `git rev-parse HEAD` in the worktree gave `6f36c7ab998ceaf996afb617ca95881b3f007b2d`;
  the worktree was clean; `.runs/` is ignored (`.gitignore:1`). No tracked file was changed; no plan,
  no code, no foundation entry written; no test or check of the product run.
- Trust boundary: unchanged answer — **no**. The design neither reads nor changes
  `src/browser/sim/saved-game.ts` or `assets/icons/**`, `assets/fonts/**`, `assets/sprites/**`.
- Reserved choice: none. The design needs no language, framework, library, store of data, way of
  logging in or place to run beyond what the product has; the list's windowing is written in the
  product, and a library of virtual lists was weighed and left out (spec D7).

## Questions sent and their answers

None. Every choice the four carried questions open, and the others the handoff listed, is settled
in the spec from the task, the foundation and the code. Five places where the task's wording reads
two ways do not change the design, so, following check 4 of `design.md`, the spec picks one reading
for each and writes it down (spec D5); the orchestrator or a reviewer may overturn any of them
without touching the design:

1. An edit of the copy's own saved program gives no entry, read with To do 5's first sentence
   („Każda zmiana kopii programu daje wpis”) and the reason of question 4 („bo przejścia nie
   zmienia”).
2. „Zmieniono regułę 2.1: … → …” is the whole sentence before, „ → ”, the whole sentence after,
   each sentence holding its own „→” — literal to the task, at the cost of a line such as
   „Zmieniono regułę 2.1: Zawsze → Eksploruj → Zawsze → Wędruj”. This is product text the task
   fixed; if it reads badly in the browser check, it is a remark for the human, not a choice for the
   cycle.
3. Group entries give the verb and the name only („Dodano grupę „…””, „Usunięto grupę „…””,
   „Zmieniono grupę „…””, „Przesunięto grupę „…””), as „wpis o grupie jej nazwę” says; a rename
   reads with the new name, a removed group with its old one.
4. „Ognisko wygasło” for every campfire that goes out; the task speaks of one campfire, the map may
   hold several.
5. „Nic tu jeszcze nie ma.” in `text-secondary` (the task gives no role), and „Cała kronika … w Geist
   Mono … na tle `panel`” covering the list and its empty sentence, the filter buttons keeping the
   shared button's font as the pace buttons whose look To do 9 gives them.

Also written down as readings, not questions: the filter is kept like the tab (through leaving the
screen and „Restart”, „Wszystko” at a send), since the task says „na starcie „Wszystko”” and uses
„start” of the tab the same way; and the minute of an act after the end is the end's minute.

## Ways weighed and why the rejected lost

- **Source of the facts (carried question 1, with 2).** A — compare readings only: at 16× a reading
  (every 200 ms) spans about three minutes and a throttled or returning tab hundreds, so the minute
  and the cause of a loss and a campfire going out and relit within one reading are lost; breaks To
  do 1 and 4. B — every fact as a simulation event, changes of the copy included: the simulation
  cannot tell which of two swapped rules the player moved, so it needs the view's hint passed into
  `setProgram` or misdescribes swaps, and it changes five functions for facts the view already holds
  exactly. C, chosen — two new events (loss of the streak with cause, from the body step, an edit of
  the copy, a discard and a switch; a campfire going out, from the world step) plus the copy read
  before and after each act.
- **Where the chronicle lives (carried question 3).** In the run screen's React state — the screen
  survives Siedziba, but gets no previous state and no act, and the reset at a send against
  „Restart” would need an Effect transforming data (D-267). In the game state — refused by the task.
  Chosen: a page-memory unit owned by the game view, recorded in `store.apply`, the one place every
  result passes with the state before it; it lives as long as one game built from one load, so a
  reload, sign-in or conflict start it from the loaded state as To do 1 asks.
- **Fluidity (carried question 4).** Drawing every entry — each draw grows with the chronicle. A
  limit of entries — refused by the task (question 1, B1). A virtual-list library — reserved choice,
  and rows of varying height make exact virtualization the costliest. Chosen: text composed once at
  recording, per-kind lists, a bounded window grown by scrolling, no redraw of unchanged rows.
- **Describing a change of the copy.** Every editor site describes its edit — exact but many sites.
  Comparison alone with a fixed tie-break — a swap reads as the other rule moving in half the cases.
  Chosen: comparison by identities, with a hint of the moved rule or group from the three move sites.
- **The paragraph of the last encounter.** Recording it from the encounter's events would need the
  turns recomputed at the resolving and would be gone after a load. Chosen: the chronicle keeps only
  its place (position and attack minute); its text is composed at draw time from `lastCombat`, as
  the world area does today — the same mechanism serves the load path of question 1.

## Result of the four checks

1. Placeholder, `TBD` or empty section: none. The braces in the spec are the task's own templates
   of product text („Passa {passa} przerwana: {przyczyna}”, {numer}, {zdanie}, {nazwa}).
2. Contradictions: one found and fixed — D9 said the filter buttons keep the shared button's font,
   which reads against To do 9's „Cała kronika stoi w Geist Mono”; the reading now stands in D5 with
   its reason. One wording error fixed in D1 ("no other function changes what it returns" contradicted
   the four functions it changes) and one in D10 (the callers of `withCopyProgram`). No decision of
   the spec found against the task or the foundation.
3. Several independent changes: no. The two simulation events serve only the chronicle and the
   chronicle needs them; they can be a first slice of a plan (spec, *Left to the maker*), but they are
   one change.
4. Requirements readable two ways: the seven readings above, each written down in D5 or D9.

## Reaches beyond the handoff

- `.the-way/task-cycle/spec/design.md` — named by the method for this step; read whole.
- `foundations/decisions.md`, beyond the listed entries, read by reading ranges that ran past an
  entry: D-40 (used: `text-label` means "a date", the minute column), D-41 to D-47 (incidental; D-44
  and D-46 informed the controls and fonts), D-148, D-172, D-186, the start of D-284, the heading of
  D-293, D-310 (all incidental, not relied on). D-185 read whole on purpose — it names the paragraph
  in the world area; the spec flags it for the foundation step. D-331 is cited through the styleguide's
  text („Wybierz mapę z listy.” in `text-secondary`), not read as an entry.
- `foundations/glossary.md` lines 1–180 (not the whole file): `game minute`, `map run`,
  `map run restart`, `extinguished campfire`, `manual map run`, `streak`, `copy` relied on.
- `guidelines/testing.md`, whole — to name the tests by kind (unit test; React screens on
  `tests/view/page-document.mjs`; "Changing an existing test" for the event lists that change).
- Code at the base, read to see the ways open: `src/browser/sim/run.ts` (whole), `game.ts` (whole),
  `programs.ts` (1–80, 500–745), `body.ts` (50–130), `types.ts` (120–320), `world.ts` (whole),
  `understanding.ts` (230–350, 461–482), `loop.ts` (255–345, 380–580), `data/balance.ts` (grep);
  `src/browser/view/game-view.ts`, `clock.ts`, `run-screen.tsx`, `world-area.tsx`, `combat-line.ts`,
  `status-row.ts`, `now-lines.ts`, `discovery-band.tsx`, `discovery-rule.ts`, `run-header.tsx`,
  `tokens.css` (each whole); `program-editor.ts` (1–150, 230–330, 785–855), `program-panel.tsx`
  (699–838), `rule-list.tsx` (100–135, 350–419), `account-card.tsx` (grep at 621–638); greps over
  `src/browser` for consumers of event kinds and over `tests/` for whole-list comparisons of events
  (85 `deepEqual` calls naming events in 14 files — some will change, as D11 says).
- Not read, on purpose: `.the-way/project-level/technology/reserved_choices.md` (the design needs
  nothing it covers); the old Loop's `EventLog.tsx` and `policy.ts` (the task's own quotations were
  enough to see the ways); `guidelines/coding.md` (no code written in this step).

## Searches not found or unclear

- The task's citations of `b97fdd0` moved at the base: `setProgram` from `game.ts:296-302` to
  `:369-389`; the switch from `programs.ts:712-742` to `:714-745` (`streak: 0` at `:739`, not `:737`);
  the copy's zeroing from `programs.ts:578-586` to `:570-590`; the body's streak from
  `run.ts:413-416` to `:449-452` with `:485-501`; the encounter's streak from `run.ts:432-442` to
  `:467-477`; the paragraph from `world-area.tsx:80-81` to `:90-92`; the right area from
  `run-screen.tsx:97-151` to `:171-176`. The wait's words and the causes of death the task cites in
  `src/browser/view/status-row.ts:20` and `:23-27` are no longer there: task 14 moved them to
  `src/browser/view/now-lines.ts:16` and `:19-23`. `types.ts:143-150` and `:263`, and
  `program-editor.ts:812`, are unchanged.
- No glossary entry `chronicle` and no decision "How does an agent learn what went wrong in the
  running game?" at the base — expected; this task writes both.
- Unclear in the task's wording: the seven readings listed under *Questions sent and their answers*.
- Whether a browser's scroll anchoring keeps the reader's place when entries arrive above a list
  scrolled down: not checked; the spec makes it a non-goal rather than a requirement.
