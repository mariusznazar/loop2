done

# Executor report - Slice 12 (the section "The screen Mapy" of the styleguide), task `katalog-map`

Worktree `the task's worktree`, branch `task/katalog-map`, base `8ae831a9`. Nothing pushed. The full gate (`npm test` with no file argument) was not run. No product code was changed, so the product's coding and testing guidelines did not apply to this slice.

## Commits

- `cf6be29e` docs: :memo: write the section The screen Mapy of the styleguide as the catalog of the screen ... (D-325, D-331, D-134, D-149, D-327, D-440, D-441). Files: `guidelines/styleguide-browser-view.md` +63 / -13.
- Note on the history: a first commit `b5b5c9a0` had the same change with the emoji before the type; I amended it to the repository's `docs: :memo:` order before anything else touched the branch. Only `cf6be29e` is on the branch.

## What the section now says (rule "The screen Mapy")

- Decision line: D-325, D-326, D-327, D-328, D-329, D-331, D-332, D-333, D-439, D-440, D-441, D-243, D-134, D-149, D-188, D-217, D-244, D-274, D-276, D-287, D-281, D-39, D-40, D-44, D-282, D-396. The added ones are D-149, D-441, D-332, D-333, D-276 and D-44, each used in the text.
- Good: a row of a solved map with the circle filled in `positive`, the name in `text`, the facts in `text-secondary` with „⊘ wnosisz 0” in `warning`, the picked row in `text-strong` with the bar in `selected`, and on the lair after the first judging the number as the row's last fact in `text`. Bad: the old list's „rozwiązana” after the name is now a bad case, with the circle in `text` and the number before the first judging or as „0”.
- The old description of the list ("Lista: ... po nazwie stoi „rozwiązana”") is replaced by a description of the catalog: the search field, the three views as tab-look buttons (D-276), the counter line of each view, regions with a `divider` line and their header in `text-label` ("{m} z {n}", n counting the unopened maps), the „Dokąd” folding row (shared plain button, „▸ {n} rozwiązane”, disabled and in `text-disabled` while a search or the picked map holds the group open), the „Co daje” groups (rarest resource first, header with icon, name and map count, rows with „≈ … · po …” and „+1 co … min” / „nie wraca” in `warning`), the „Postęp” empty places (dashed, `text-disabled`, no name, not drawn while searching), the row (two lines, circle `●`/`○`, facts in order with separate elements that never break inside, icons at the right, phone minimum `--touch-target-min`), the record fact and its absence in „Co daje”, and that the view, the typed text and the unfolded groups end with the screen.
- The card: unchanged except one sentence added to the card bullet: in „Czyha” of a map whose data name a creature for the record, the number stands under that creature's odds line in `text`, only after its first judging (D-440). The card rules, the „Kto idzie” rules and the judging rules are otherwise unchanged.
- Nothing else in the file changed; the Roles table and the other rules are untouched.

## Checks (command - exit code)

1. `Grep` (the search tool, ripgrep, in place of `rg -U`) for `katalog|Katalog` in `guidelines/styleguide-browser-view.md`, output mode count: 10 matches in the file, the section is found. (Shell-free equivalent of the slice's first check.)
2. `Grep` for `lista\s+otwartych\s+map` with multiline and case-insensitive: 0 matches. (Equivalent of the second check.)
3. `python -B .the-way/elements/common/foundation_check.py` (run on its own, not the gate) - exit 0, output "0 errors".
4. `git status --short` after the commit: clean (no stray file).

The "rg -U" wording of the slice was run through the Grep tool because the Bash tool's `rg` is not the same binary; the results above are from that tool.

## Own-work check

- Requirement most likely unmet: "says nothing the code does not do" and "where the code departs from the old Loop, say what stands now". Check: each claim of the new section read against `src/browser/view/catalog-lines.ts` (counter texts, the header counts over all data maps, the search: trim, lower case, no Polish folding, resource names, sorting of „Co daje”, the fact order and the step rule, the record placement in `rowFacts` for the two views only, the region filter that drops regions with no open map, the fold's `expanded` and forced rules), `src/browser/view/map-catalog.tsx` (the component state, the classes `solved`, `maps-catalog-fact`, `maps-catalog-record`, the disabled fold, the empty places `aria-hidden` and not drawn while searching, the `aria-label` „Rozwiązana”/„Otwarta”) and `src/browser/maps-screen.css` (the colours of the circle, the picked row, the bar, the dashed places in `text-disabled`, the touch minimum under 1280 px, `hover: none`). No mismatch found.
- What it showed on the card: the card's record line `p.maps-card-attacker-record` (`src/browser/view/maps-screen.tsx:299`) has no rule of its own in `maps-screen.css`; it takes its colour from its parent, as the odds line above it does. The section says `text`, the role of a card's content in D-327; I did not measure it in a browser (the slice is prose), so this is read from the code and from D-327, not from a computed colour.
- Mutation: not applicable to prose; the only executable check is the foundation check above.

## Questions

none

## Concerns for the orchestrator

- The disabled „Dokąd” folding row (shows `text-disabled` while a search or the picked map holds the group open) is written as the code does it. Slice 10's report called it a likely fault to the eye; the section describes it as it stands and does not judge it.
- The card's „Czyha” record takes the role from its parent (see the own-work check). If the human wants it named in its own rule, it needs a rule in `maps-screen.css`, which is code, not this slice.
- The example numbers "24 ze 120" and "⊘ wnosisz 0" are the examples the foundation and the earlier reports use; the section presents them as examples of the form, not as data.

## Unread material

- `.the-way/task-cycle/change/SKILL.md`, `slice.md`: read whole.
- `.the-way/product-guidelines/styleguide/SKILL.md`, `.the-way/product-guidelines/styleguide/template.md`: read whole (the handoff's "file rules" are the template's rules for the rule fields and the Roles table).
- `guidelines/styleguide-browser-view.md`: read whole (1–1508).
- `src/browser/AGENTS.md`: read whole.
- `foundations/part_map.md`: lines 1–40 read (the `browser-view` part is at 1–33).
- `.runs/task-cycles/katalog-map/task.md`: lines 25–185 read (To do 1–9, Questions, Decisions in play, Working copies rule), which includes the handoff's *Read* passages 31–32 and 168–176; lines 1–24 not read (the title and the header, not named by the handoff).
- `foundations/decisions.md`: D-325 (10201–10230) whole; D-327 (10251–10281) whole; D-331 (10347–10369) whole; D-134 (5916–5937) whole; D-149 (5989–6009) whole; D-440 (12230–12270) whole; D-441 read to line 12309 only: its *Rationale* and *Rejected* and the tail of its *Verification* (from line 12310) are not read; D-333 read to line 10400 only (the tail of its *Verification* not read). Neither tail bears on a sentence of this section.
- `src/browser/view/maps-screen.tsx`: not read whole; grepped for the record's markup (lines 276–299, 697) only.
- `src/browser/view/map-catalog.tsx`, `src/browser/view/catalog-lines.ts`, `src/browser/maps-screen.css`: read whole.
- The executors' reports `executor-9-report.md`, `executor-10-report.md`, `executor-11-report.md`: read whole.
- `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/coding-browser-module.md`: not read; no product code or test changed in this slice, so the rule that asks for them did not start.
- `.claude/skills/loop2-play/SKILL.md`, `walkthrough.md`, `ui_check.md`: not read; the slice changes no screen and shows no screenshot, so their rules did not start.

## Searches not found or unclear

- The handoff's *Read* paths `.runs/task-cycles/katalog-map/...` do not resolve from the worktree root with the plain path; they resolve under `.runs/task-cycles/katalog-map/`, which is where I read them. The first attempt at the root failed with "File does not exist".
- The handoff's *Checks* use `rg -U`; the Bash tool's `rg` is not the same binary here, so the two checks were run with the Grep tool instead (results in *Checks*).
- The card's record line has no rule of its own in `maps-screen.css`; its colour is inherited (see the own-work check), not measured.
- The foundation check gave "0 errors" without `--skip-test-citations`; the 14 known citation errors that the handoff mentions are not present at this base.
- The first commit attempt was blocked by a hook that asks for the rules of git before the call; I read the rules it named and then re-ran the commit with the same path-based staging (`git add guidelines/styleguide-browser-view.md`), and then amended the subject to the repository's order.

## Working copies

None made. `.runs/executor-12/` was not created.
