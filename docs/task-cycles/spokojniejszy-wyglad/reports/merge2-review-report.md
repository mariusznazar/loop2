PASS ca9b82da69ba6d07e3f04baa481d8f98d2832b50

# Review — second reconciliation of `task/spokojniejszy-wyglad` with `origin/main`

Kind: the reconciliation with the target branch (`review-change`, `.the-way/task-cycle/review/SKILL.md`, read whole).
Head `ca9b82da69ba6d07e3f04baa481d8f98d2832b50` = `git rev-parse HEAD`; first parent `2cd2f1ec8e9d39fc77b9565988430dadbb1027ff`
(task branch tip), second parent `4027d2fd75e7b46baa9545a1d11bd011f55e5824` (`origin/main`), merge base
`01418389d242cbe5792d8b22291acf4303c4edc3`. Worktree clean (`git status --porcelain` empty). Nothing built, nothing tested,
nothing in the worktree changed.

## Findings

### Critical

none

### Important

none

### Minor

none

Blocking: 0. Minor: 0. Out of scope: 2 (both under Declined to judge).

## The four questions of the handoff

1. **Nothing the two pull requests brought undoes the task.**
   - Source: `git diff 01418389..4027d2fd -- src/ tests/` holds no line matching `icon|svg|<img|background-image|mask|footer|credit|stopk|wzmian|autor` (grep exit 1), no added `img`, `.svg`, `wood-stick` or `#f4f4f5` and no added hex colour in `src/` (grep exit 1). The CSS classes main adds (`.end-window*`, `.run-header-requirement`, `.discovery-band*`, `.positive`, `.danger`) do not overlap the ones the task changed (`.icon-mask`, `.action-icon`, `.credits`, `.headquarters`, `.account-card`, `.scene-badge`, `.scene-flight-plaque`, `.terrain-drawing`, `.tile-list`, `.trip-plan-icon`). In the merged tree every icon of `assets/icons/` is drawn through `--icon` on an `.icon-mask` element (`maps-screen.tsx:185`, `tile-table.tsx:49`, `trip-plan.tsx:209`, `terrain-drawing.tsx:51`, `scene.tsx:124`, `:186`, `now-rows.tsx:19`, `rule-list.tsx:534`, `pick-cell.ts:28`, `react-pick-cell.tsx:50`, `kitchen-sink.ts:587`); the remaining `<img>` in `scene.tsx:114`, `:342` draw sprites and the scene background, not icons. `end-window.tsx` and `end-window-lines.ts` draw no icon.
   - Foundation: `git diff 01418389..4027d2fd -- foundations/` mentions icons, footer or credits only in one *Relations* line of D-147 (`derives from D-40`). In the merged tree `footer|stopk` appears only in the rejections of D-27 (`foundations/decisions.md:695`) and D-262 (`:5500`), which is the task's wording. D-368 to D-371 and the changed D-53, D-62, D-122, D-132, D-135, D-147, D-173, D-185, D-212, D-216, D-311, D-313, D-324, D-339 and D-362 say nothing about a footer, a credit or how an icon is coloured. D-43's ban on "an icon of `assets/icons/` drawn as a picture of its file, with the colour the file holds" (`:931`) is untouched.
   - Styleguide: the end-of-run window rule main added (`guidelines/styleguide-browser-view.md`, "The end-of-run window") puts the window under "Pasek menu z wierszem ostrzeżeń". It mentions no footer, and the word *ikon* does not appear in it. Every *ikon* line of the merged guidelines (grep) matches the task's single way of drawing icons: lines 25, 109–113, 569, 600–613 and 633.
2. **The two resolved tables are complete and in order.** I compared every table row of each file with whitespace and dash padding normalised.
   - `guidelines/coding-browser-module.md`: compared with the task parent, the merge adds only `end-window-lines.ts` and `end-window.tsx`. Compared with the main parent, the merge only adds `credit-lines.ts` and drops `footer.ts`. The 62 rows are in C-locale order (`sort -c` passes), and each names a file that exists at `ca9b82da`.
   - `guidelines/styleguide-browser-view.md`: every table row of the file (Roles and the others) is the same as the task parent. Compared with the main parent, only the `text-strong` row differs, and it now carries the task's sentence.
   - The task's prose changes to the styleguide outside the tables all survived (`git diff 4027d2fd..ca9b82da -- guidelines/`). These are the single-way paragraph at lines 107–113, the "Good" example of Visible focus about the folded section of credits, and the flying icon as a mask in `text-strong` at line 633. Prettier passes on both files.
3. **The end-of-run window and the task do not contradict each other.**
   - The window is placed relative to the menu bar, the row of warnings, the header and the three areas (D-368, D-370, D-311, styleguide). It never relies on a footer, so removing the footer leaves nothing it depends on.
   - The task's changes to `app.ts` (the footer removed) and main's changes to `game-view.ts`, `run-screen.tsx` and `run-header.tsx` touch different files and different selectors.
   - Main's change to `tests/view/account-screen.test.mjs` (`buttonNamed` preferring the shown button; save `VERSION = 4`) does not touch the task's tests of no footer and of the credits on Siedziba (`:4931`–`:4973`).
   - D-280 and D-262 agree: the waiting screens show the header alone.
   - The kitchen-sink page has no sample of the window (styleguide line 783), which does not touch To do 7.
4. **The pin.** `git ls-files --stage -- .the-way` gives `e9a0f926…` and `git -C .the-way rev-parse HEAD` gives `e9a0f926…`, so they agree. The pin is `52f8164a…` on the task parent and `e9a0f926…` on the main parent and the merge, and `git diff --stat 4027d2fd..ca9b82da` does not list `.the-way`, so the task does not move it. `git -C .the-way diff --stat 52f8164a e9a0f926 -- task-cycle product-guidelines/template.md elements` is empty.

## Declined to judge

- `src/browser/view/end-question.tsx` has no row in the table of `guidelines/coding-browser-module.md`, at `4027d2fd` as at `ca9b82da`, and it already had none at `01418389`. The gap is main's and older than this merge, so it is outside the task and the reconciliation.
- The table of `guidelines/coding-simulation-module.md` is not in C-locale order (`sort -c` reports `src/browser/sim/body.ts` at row 2). The file comes from main unchanged (the task does not touch it), so it is outside the task.
- Behaviour of the end-of-run window itself (D-368 to D-371, its tests): reviewed in #79, outside this task. I checked only where it meets the task.

## Changed files of `2cd2f1ec..ca9b82da` (added / removed)

```
1	1	.the-way
1	1	AGENTS.md
237	108	foundations/decisions.md
66	64	guidelines/coding-browser-module.md
20	19	guidelines/coding-simulation-module.md
135	28	guidelines/styleguide-browser-view.md
5	0	src/browser/sim/game.ts
82	0	src/browser/sim/run-record.ts
43	2	src/browser/sim/saved-game.ts
31	0	src/browser/sim/types.ts
161	8	src/browser/styles.css
20	0	src/browser/view/chronicle.ts
5	5	src/browser/view/discovery-band.tsx
223	0	src/browser/view/end-window-lines.ts
259	0	src/browser/view/end-window.tsx
141	27	src/browser/view/game-view.ts
30	7	src/browser/view/run-header.tsx
128	17	src/browser/view/run-screen.tsx
2	21	src/browser/view/trip-lines.ts
8	16	src/browser/view/world-area.tsx
1	0	stryker.config.json
8	1	tests/sim/encounters.test.mjs
3	0	tests/sim/loop.test.mjs
375	0	tests/sim/run-record.test.mjs
269	17	tests/sim/saved-game.test.mjs
4	0	tests/sim/skills.test.mjs
8	5	tests/view/account-screen.test.mjs
43	0	tests/view/chronicle.test.mjs
10	6	tests/view/discovery-band.test.mjs
31	13	tests/view/end-question.test.mjs
905	0	tests/view/end-window-game.test.mjs
347	0	tests/view/end-window-lines.test.mjs
663	0	tests/view/end-window.test.mjs
84	8	tests/view/run-header.test.mjs
236	0	tests/view/run-screen.test.mjs
32	46	tests/view/trip.test.mjs
34	28	tests/view/world-area.test.mjs
```

37 files, +4651 −448. Exactly the files of `01418389..4027d2fd`, so the merge carries main's side and the two conflict resolutions only.

## Checks

| Check | Command or method | Result |
|---|---|---|
| Head and parents | `git rev-parse HEAD ca9b82da^1 ca9b82da^2` | `ca9b82da…`, `2cd2f1ec…`, `4027d2fd…`; exit 0 |
| Pin agrees | `git ls-files --stage -- .the-way`; `git -C .the-way rev-parse HEAD`; `git ls-tree <each parent> .the-way` | `e9a0f926…` both; task parent `52f8164a…`; exit 0 |
| Conflicts and their resolution | `git diff --cc ca9b82da` (empty: each resolution equals one side's lines hunk by hunk); `git show --remerge-diff ca9b82da` | the two conflicts as the handoff describes; exit 0 |
| Table completeness | `git show <rev>:<file> \| grep '^\|'`, padding normalised, `diff` task↔merge and main↔merge for both files | only the expected rows differ (exit 1 = differences found, as expected) |
| Table order and existence | `LC_ALL=C sort -c` on the file column; `git cat-file -e ca9b82da:<path>` per row; `comm` against `git ls-tree -r src/browser/view` | browser table sorted, all 62 exist; `end-question.tsx` unlisted on main too |
| Icons/footer in main's code | `git diff 01418389..4027d2fd -- src/ tests/ \| grep -iE 'icon\|svg\|<img\|…\|footer\|credit…'` | no match; exit 1 |
| Images or hex colours added by main | `git diff 01418389..4027d2fd -- tests/ src/ \| grep -E '^\+.*(img\|\.svg\|wood-stick\|f4f4f5)'`; hex grep on `src/` | no match; exit 1 |
| Footer anywhere in merged tree | Grep `footer\|stopk\|colour in the file\|kolor w (swoim )?pliku` over foundations, guidelines, README, AGENTS, src, assets, scripts | only `decisions.md:695`, `:5500` (rejections, task's wording) |
| Icon drawing in merged tree | Grep `icons/\|<img\|background-image\|.svg\|footer` in `src/`; Grep `action-icon\|icon-mask` in `src/`, `tests/` | every icon via `.icon-mask`; `<img>` only for sprites |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | `0 errors`; exit 0 |
| Formatting | `npx --no-install prettier --check guidelines/coding-browser-module.md guidelines/styleguide-browser-view.md guidelines/coding-simulation-module.md` | all formatted; exit 0 |
| Tests and build | not run | not run on purpose: the handoff forbids it, because the orchestrator's full gate runs in this worktree and writes to `dist/` |

## Reaches beyond the dispatch

- D-41, D-42, D-44 to D-46: read whole while reading D-40 to D-47 in one passage of `foundations/decisions.md`, to see D-41's "an icon dimmed at a stock of zero".
- D-280: the first paragraph only (`foundations/decisions.md:6029`), because D-370 sizes the window by its content column and I needed to check whether it mentions a footer. It does not.
- D-320: the lines matching `icon` (`:7142`–`:7172`), to confirm that the rejection "darker than … the icons on the map" agrees with the icons drawn as masks in `text-strong`.
- `foundations/invariants.md`, the entry `icon-credits` whole (`:331`–`:339`).
- `.the-way` diff stat `52f8164a..e9a0f926`, to confirm that the task-cycle files did not change.

## Unread material

- `guidelines/styleguide-browser-view.md` was not read whole. I read its Roles table whole, the passages the merge changes on both sides (whole diffs), the whole rule "The end-of-run window", and every line matching `ikon`, `próbk` or `stopk`.
- `guidelines/coding-browser-module.md` and `guidelines/coding-simulation-module.md`: I read their tables whole, but not their rules.
- Of the foundation entries the dispatch names, these were read whole: D-27, D-40, D-43, D-47, D-262, D-365, `icon-credits`, D-368, D-369, D-370 and D-371. I also read the whole of D-53 as it stands at `4027d2fd`, which the diff showed in full. D-271 was read through its statement only.
- The other entries that changed on main (D-62, D-122, D-132, D-135, D-147, D-173, D-185, D-212, D-216, D-311, D-313, D-324, D-339, D-362) were read only as their diff hunks, each searched for icons, footer and credits.
- The code main added (`end-window.tsx`, `end-window-lines.ts`, `game-view.ts`, `run-screen.tsx`, the tests) was read through searches, plus the diff of `run-header.tsx` and `account-screen.test.mjs`. I did not read it line by line.

## Searches not found or unclear

- `git diff --cc ca9b82da`, which the handoff names for showing the two conflicts, prints nothing, because each resolution takes one side's lines hunk by hunk. I used `git show --remerge-diff ca9b82da` to see the conflicts and their resolution.
- `foundations/invariants.md` holds no `### icon-credits` heading; the entry sits under `## icon-credits`. I found it by the bare name.
