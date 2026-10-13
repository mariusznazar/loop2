# Planner report — mag-w-lesie

- Skill: `the-way-plan-task` → `.the-way/task-cycle/plan/SKILL.md`, pin verified: gitlink and
  `git -C .the-way rev-parse HEAD` both d04c3feb1a47e0ffc9a3b2354c23aacafe25c74b.
- Worktree: C:\Storage\repos\loop2-mag-w-lesie, branch task/mag-w-lesie, HEAD 1701186 (base); tree
  clean apart from the ignored `.runs/`.
- Read: frozen task; spec; cycle record (Q1–Q21); spec review; projected entries of
  `definicja_mvp_loop2.md` (D-04 projected 463–504, content 779–802, the two invariants 2024–2054,
  terms 2132–2171 and 2232–2239, gate record); plan item 3; `foundations/*.md`; `package.json`,
  `scripts/build.mjs`, `tsconfig.browser.json`, `src/browser/*`, `README.md`,
  `tests/invariants/loop2_invariant_support.py`, `test_application_package_layout.py`,
  `test_browser_view_framework.py`; the guards' cross-file checks (part-map
  `decision-scope-names`, invariants *Part* names); `task-cycle/skill/SKILL.md` § Design and plan,
  § Execute. Loop: only the sizes of the allowed data and test files; none of the prohibited
  sources.

## Outcome

- Plan: `.runs/task-cycles/mag-w-lesie/plan.md` — 10 slices, two foundation steps (step 1 before
  Slice 1; step 2, the part map, after Slice 6), and the check in the running product.
- Size report: `.runs/task-cycles/mag-w-lesie/plan-size.md` — every slice `fits` (exit 0); the
  largest reads about 35.5k estimated tokens, the most files changed is 9 (Slice 1).
- No open design choice found (step 2 of the skill): the spec and the cycle's answers settle
  every entry and every hard-to-reverse way the code shows.

## Findings from the code that shaped the plan

1. The part-map guard checks that every decision's *Scope* names a part of the map
   (`.the-way/elements/part-map/format_guard.py:1151-1176`). The new D-04 version's Scope names
   `simulation`, so the part-map guard reports it until the part map gains the part (foundation
   step 2). The decisions guard itself does not check Scope.
2. The part-map guard rejects Files and trust-boundary patterns matching no tracked file
   (`format_guard.py:812-815`). All patterns of spec § 10 match tracked files from Slice 6 on, which
   is why foundation step 2 sits right after Slice 6.
3. `node --test "<glob>"` with a glob matching nothing exits 0 with 0 tests (checked here on Node
   24.17.0). Each slice that adds tests therefore checks that the reported count grew.
4. A fingerprint covers binding sentences only (`.the-way/elements/decisions/template.md:154`):
   D-03's new version, with unchanged sentences, keeps `D-03@fb5aa3b0`, so
   `browser-view-framework/1` needs no new version.
5. `test_application_package_layout.py` resolves owners from the part map; a new `simulation` part
   owning `src/browser/sim/**` passes it (no nested package; `src/browser/*.ts` does not overlap
   `src/browser/sim/**`), as the spec review found.
6. `slice_size.py` measures only *Read* paths that exist now. Files that earlier slices or
   foundation step 1 create are listed under a separate field "Also reads (made by earlier slices,
   not measured)", and loop's files and the game-icons source under "Reads outside the repository";
   the script ignores both fields. Their size is small (loop's allowed files 74 KB in all; the
   simulation's modules a few KB each), so no slice comes near the limit.

## Questions, each with a proposed answer

1. **Part map as a second foundation step right after Slice 6** (written by the orchestrator with
   `the-way-update-part-map`), rather than a final slice or a step after Slice 10. Proposed: yes —
   it is the earliest point at which the guard can pass, and Slices 7–10 are then reviewed under
   their final owners with the icons' trust boundary recorded.
2. **Interim part-map guard errors** between foundation step 1 and foundation step 2 (D-04's Scope
   names `simulation`; files of foundation step 1 and Slices 1–6 unclaimed). Proposed: accept and
   record them as expected interim states, not passes; the part-map guard is not among the checks
   of foundation step 1 or Slices 1–6. Alternative: write D-04 without `simulation` in Scope and
   add it later — a second D-04 version in one request, rejected.
3. **Three view tests beyond spec § 9.2** (`tests/view/status-row.test.mjs`,
   `program-editor.test.mjs`, `tile-list.test.mjs`) on pure helpers, so Slices 8–10 start from a
   failing test as `test-driven-development` requires. Proposed: accept — tests only, no behaviour
   added; cost: a view module must not touch the DOM when imported.
4. **Pinned commit of the game-icons source**: the Slice 6 agent pins the commit current when it
   fetches, and records it in `credits.ts`. Proposed: yes; the spec names no commit.
5. **Slice 10 carries README** next to the terrain panel and tile list. Proposed: keep — a separate
   README slice would be a slice for its own sake.
