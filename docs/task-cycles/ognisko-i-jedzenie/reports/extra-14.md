
## After the reconciliation with `main`

- `main` (task 11, merge d11dd0f) is merged into the branch (55818a4): the headquarters, the team,
  `createCharacter`, sending a character of the team; D-50–D-56, `character-team`, `headquarters`.
- This branch's decisions were renumbered D-50–D-65 → D-57–D-72 (ddc587f). **`reports/foundation-map.md`
  shows the numbers before that renumbering and is stale**; the ranges in your *Read* above are
  current.
- At the merge the map run's character became `RunCharacter` (`id`, `at`, `traits`, `backpack`);
  `main`'s team character keeps the type `Character`. A send still gives the map run's character
  `newTraits()` (`src/browser/sim/game.ts`, around line 301); your slice replaces that with the sent
  character's traits.
- D-56's *Verification* names as violating "a map run holding a copy of the character's name or
  archetype in place of its number": the map run keeps the number and holds a copy of the traits
  beside it (spec Decision 2) — keep the number; name in your report how the copy stands beside it.
