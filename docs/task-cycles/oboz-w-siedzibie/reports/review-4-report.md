PASS df68213feebe035642a555d187db6027e872ac3d

# Review 4 — the nine decisions read by title only in the review of the whole change (correction), task oboz-w-siedzibie

Reviewer: fresh, made none of the change and wrote none of reviews 1–3. Method `review-change`
(`.the-way/task-cycle/review/SKILL.md` and `fix.md`, read whole). `git rev-parse HEAD` =
`df68213feebe035642a555d187db6027e872ac3d`, the head given; `.the-way` at
`55afa8e57aa1b83c77108576a36642722e0dda15`, the pin given. Range reviewed:
`2b4d760c517a8b399b2d9b80f77531455e32d11c..be0e0babb9d5ff1baa366ac149f7a977af4fd1a5` (7 commits, 17 files),
diff and log computed myself; `be0e0bab..HEAD` changes no file of the product.

Counts: blocking 0 · Minor 0 · out of scope 0.

## The remark

- Item 4 of `reports/correction-remarks.md` ("a fresh reviewer reads these nine decisions in full and checks
  the camp against them") — **made** by this review: each of the nine read whole below, each with its verdict.
  Items 1–3 are not this review's (1 and 3 change nothing; 2 is the orchestrator's container check).

## The nine decisions

| Decision | Read whole | Verdict |
|---|---|---|
| D-03 — How is the browser view built? | yes (`foundations/decisions.md:39-50`) | complies |
| D-04 — What is the game built with? | yes (`:52-134`, statement, Verification, Rationale, Rejected) | complies |
| D-217 — What does the game show of a character's resurrection? | yes (`:4362-4373`) | does not touch (kept) |
| D-218 — How does the headquarters show a character's generation number? | yes (`:4375-4390`) | does not touch (kept) |
| D-311 — How is the screen of a map run laid out? | yes (`:7361-7400` and its Rationale/Rejected) | complies (one refactor, same values) |
| D-319 — How does the mage walk to its place? | yes (`:7867-7895`) | complies |
| D-320 — What stands over the mage's head? | yes (`:7897-7937`) | complies |
| D-330 — What is the first of the three clicks from Siedziba to the first map run? | yes (`:8127-8140`) | complies |
| D-372 — What does the frost on the edges of the scene's frame show? | yes (`:9199-9232`) | does not touch |

Evidence per decision:

- **D-03** (React `.tsx` components drawing from the game state, no other UI framework). The camp is a React
  component, `src/browser/view/camp.tsx:71-112`, drawn from `GameState`; its data module
  `src/browser/view/camp-picture.ts` is plain TypeScript. `package.json` and `package-lock.json` are not in
  the range (`git diff --stat` on them is empty), so no package joins. Its Verification invariant
  `browser-view-framework` passes (checks below).
- **D-04** (the view draws only from the game state, content data, the clock's moment and, for the scene and
  chronicle, the previous reading and events; changes the state only through the simulation). `campDrawing`
  (`src/browser/view/camp-picture.ts:69-86`) reads only `state.team.characters`, `state.run` and
  `state.loops` (`:64-66`) and content data (`CAMP`, `SCENE_FIRE`, `SCENE_MAGES` of
  `src/browser/sim/data/scene.ts:179-187, 307-336`); the camp reads no clock and writes nothing — its motion
  is CSS alone (`src/browser/styles.css:2431-2440`), its fire "always burning" is a constant of the data, not
  a field of the state. No field is added to the game state or the save (the D-04 "violates" example of a
  field for the scene's motion): `src/browser/sim/types.ts` and `saved-game.ts` are not in the range. The
  screen's redraw key gains `runCharacter`, derived from the state (`src/browser/view/headquarters.tsx:316,
  326, 341`). Invariants `simulation-isolation` and `simulation-inputs` pass. Considered and not a finding:
  `PICTURE_PIXEL` and `CAMP` stand in `src/browser/sim/data/scene.ts` (part `simulation`); that module
  already held the scene's picture geometry (`SCENE`, `SCENE_FIRE`, `SCENE_MAGES`) before the range, it holds
  constants and no function, and the isolation invariant passes, so D-04's "the simulation ... with no scene
  in it" is not breached by data the view reads to picture the state.
- **D-217** (the resurrection line at the card and screen of a character and in „Kto idzie”). The change
  only re-indents the panel of Siedziba (`headquarters.tsx:262-308` in the diff); `TeamMember` with
  `resurrectionLine` (`:145-170`) is untouched, and the redraw on the clock's moment still compares
  `resurrection` (`:330-345`). The camp writes no text (`camp.tsx:76-77`, `aria-hidden`; test "adds no text",
  `tests/view/headquarters-screen.test.mjs` camp section). A dead character does not lie in the camp as dead:
  death takes progress, not the character ("śmierć bez wskrzeszenia: postać straciła wprawę … Teraz to
  pokolenie 2", `tests/view/headquarters-screen.test.mjs:341`), so an idle mage at the fire says nothing
  false about the resurrection. The existing D-217 cases pass.
- **D-218** („pokolenie {n}” beside the name from 2 up, `text-secondary`). Untouched in `TeamMember`; the
  camp draws the archetype's idle sheet only (`camp-picture.ts:73-76`), no generation, no text. The existing
  case (`headquarters-screen.test.mjs:202`) passes.
- **D-311** (layout of the map-run screen). The camp is used only by Siedziba (`headquarters.tsx:263`; grep of
  `Camp` in `src/` finds no other use). The one edit in the map-run screen,
  `src/browser/view/world-area.tsx:31-32`, replaces the literals 672 and 304 with
  `SCENE.background.width * PICTURE_PIXEL` and `SCENE.background.height * PICTURE_PIXEL` = 336 × 2 and
  152 × 2 (`scene.ts:47`), the same values; `Sheet` in `src/browser/view/scene.tsx:157` is only exported.
  The added motion selectors (`.camp-member img`, `.camp-fire img`, `styles.css:2434-2435`) match nothing in
  the scene. The scene's tests pass unchanged.
- **D-319** (walk 640 ms, frames every 160 ms at every pace, frames still under reduced motion). The scene's
  walk rules are untouched (`styles.css:2442-2464`). The camp has no walk; its fire and idle sheets join the
  same frame rule — `calc(var(--frames) * 160ms)`, `steps(var(--frames))` — inside
  `@media (prefers-reduced-motion: no-preference)` (`styles.css:2431-2440`), so they change every 160 ms and
  stand on the first frame under the setting, as D-319 has the scene's frames. `Sheet` sets `--frames`
  (`scene.tsx:175`). The camp lies outside `.scene`, so the scene's pause rule (`styles.css:2609-2612`) does
  not stop it, which D-389 wants (the camp's fire always burns).
- **D-320** (a badge over the mage's head with the action's icon and bar; none while waiting). The camp draws
  no badge: `Member` holds only the sheet (`camp.tsx:41-69`), and the camp holds no text, sign or `icon-mask`.
  Its characters act in nothing, so D-320's "the mage waiting with nothing over its head" is what stands.
- **D-330** (no button at a character in Siedziba leads to Mapy). The camp holds no link, button, field,
  `tabindex` or `role`, takes no click and is `aria-hidden` (`camp.tsx:74-111`); asserted by "the camp is a
  picture: nothing in it takes the keyboard or a click …" (camp section of
  `tests/view/headquarters-screen.test.mjs`) and by the D-330 case "nothing on the screen sends a character or
  leads to the screen Mapy" (`:637-657`), whose button list covers the whole page root and still reads
  `["Zamknij", "Zatrzymaj: Ola", "Załóż"]`. Its link check reads `.headquarters > :not(details) a`, which no
  longer covers the camp (a sibling of `.headquarters`), but the camp case checks `a` inside `.camp`, so a
  link there is still caught.
- **D-372** (frost on the edges of the scene's frame following the body temperature). The frost's code and
  rules are not in the range; the camp draws no frost and reads no body temperature, and D-389 gives its
  clearing full light with no tint. D-372 derives from D-271, which the change amends: the added sentences
  of D-271 (`decisions.md:6159-6163, 6177-6179, 6199, 6229-6236`) touch the camp's pictures alone and leave
  the frost's clauses (colours from the packs' palettes, 3:1 against the snow) as they were.

## Findings

Critical: none. Important: none. Minor: none. The open Minor findings M2 (D-271's title) and N2
(`tests/view/scene-picture.test.mjs:1539-1543`) of earlier reviews: no disagreement, not repeated.

## Declined to judge

- Whether the built container serves `chest.png` and `camp-clearing.png` with the same bytes — remark item 2,
  the orchestrator's check.
- The trust boundary of the two new PNG files — none of the nine bears on it; checked by reviews 1–3.

## Checks run

| Command (from the worktree root) | Exit | Result |
|---|---|---|
| `git rev-parse HEAD`; `git log` and `git diff --stat` of the range; `git diff --stat be0e0bab..HEAD` | 0 | head as given; 7 commits, 17 files; the head adds no product file |
| `node --test tests/view/camp-picture.test.mjs tests/view/headquarters-screen.test.mjs tests/view/scene-picture.test.mjs` | 0 | 99 pass, 0 fail (against the existing `dist/`, built 17:50 after the last code commit; not rebuilt, to leave the worktree unchanged) |
| `python -B -m pytest -q -p no:cacheprovider tests/invariants/test_browser_view_framework.py tests/invariants/test_simulation_inputs.py tests/invariants/test_simulation_isolation.py` | 0 | 16 passed, 57 subtests passed |
| `npm run typecheck` (`node scripts/build.mjs --check`, no emission) | 0 | clean |
| `git status --short` after the checks | 0 | empty: the worktree unchanged |

Not run: the full suite and the foundation check — the cycle's gate, the orchestrator's; the container check —
remark item 2.

## Reaches beyond the dispatch

- `foundations/part_map.md:30-60` (part `simulation`) — to judge whether `PICTURE_PIXEL` and `CAMP` in
  `src/browser/sim/data/scene.ts` bear on D-04.
- `foundations/decisions.md:9495-9561`, D-389 whole — the change's own entry, to know what the camp is to do
  when judging it against the nine.
- The D-271 and D-272 diff in `foundations/decisions.md` — to check D-372, which derives from D-271.
- `src/browser/styles.css:1915-1927, 2396-2499, 2602-2612, 2686-2690` and `src/browser/view/scene.tsx:130-199`
  — the frame rule, `Sheet` and the scene's pause rule, for D-319.
- grep of the nine identifiers in `docs/task-cycles/oboz-w-siedzibie/task.md` — no match, so the task carries
  no passage of them.

## Unread material

The entries the nine link to (D-39, D-40, D-190, D-219, D-280, D-282, D-291, D-316, D-317, D-271 whole, D-325,
D-314, D-315 and the invariants named in Verification other than by their tests) were not read whole; none was
needed to judge the camp against the nine — the passages that bear (D-271's diff, D-04's Verification
invariants by their tests) are named above. Each of the nine was read whole, heading to next heading
(D-320 `:7897-7937`). Otherwise none.

## Searches not found or unclear

- `sim/data/scene`, "data of the scene", "scene's data" in `foundations/` — no decision settles where the
  picture data stands; one hit (`decisions.md:9240`) is unrelated. Taken as established layout (see D-04).
