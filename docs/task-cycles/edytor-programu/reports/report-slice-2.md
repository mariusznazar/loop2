# Report — slice 2 of `edytor-programu`

**Status:** done

**Commit:** see `git log -1` on `task/edytor-programu` (message: "feat: :sparkles: let an agent compose a game state and send it to the local start with the save request"; base 5836c0b).

## Files changed
- `.claude/skills/loop2-play/compose-state.mjs`, `.agents/skills/loop2-play/compose-state.mjs` — new, byte-identical (~58 lines each).
- `.claude/skills/loop2-play/SKILL.md`, `.agents/skills/loop2-play/SKILL.md` — new section "Compose a game state" (about 59 added lines), the *What this start cannot check* bullet on late states replaced by what stays true (state built by the game's own code agrees with the game even where both are wrong; a loaded save carries no events). Copies byte-identical.
- `tests/agent_workflow/test_loop2_play_skill.py` — `FILES` names `compose-state.mjs` (1 line).

## Checks (command, exit code)
- `npm test -- tests/agent_workflow/test_loop2_play_skill.py` with FILES changed and no copy of the script: exit 1 (assertion: listing lacked `compose-state.mjs`; also byte-identity error). After the script and the copies: exit 0, 8 tests OK.
- `npm test -- tests/quality/test_quality_invariants.py`: exit 1, only `test_ruff_source_rules` and `test_shellcheck_source_rules` error (tools not installed: the base's state). `test_eslint_source_rules` passed in the final run. One earlier run failed on it because my scratch file `.playwright-cli/send-tail.js` was linted (see problems); fixed by deleting `.playwright-cli/`.
- `npx prettier --no-config --no-editorconfig --check` and `npx eslint --max-warnings 0` on `compose-state.mjs`: exit 0.
- Real run: `playwright-cli --version` 0.1.22 (exit 0); `npm run build` ok; script into `.playwright-cli/state.json` (1.5 KB); `npm run local` background, line "Local game: https://127.0.0.1:55419"; account `agent@example.test` made through the login card; document sent from the page (`GET` gave `{"save":null}`, `PUT` answered `200 {"revision":…}`); reload showed the team with "Agent"; "Wyślij" then the editor of the map run, "Dodaj regułę": the "Akcja" select list held Eksploruj, Wędruj, Idź, Zbierz, Obchód, Wytwórz — ognisko, Zapal — ognisko, Zapal — patyk, Zjedz — jagoda, Uderz — patyk, Kopnij, Odskocz. The condition lists held the combat conditions. `playwright-cli close` and `npm run local:stop` ("Local starts stopped: 1") done. `.playwright-cli/` deleted; nothing of the run stays.

## Own-work check
Weakest point: that the document the script prints loads in the game (the shape check refuses silently with "Zapis był uszkodzony"). Check: the real run. First send was refused on load (`loadSavedGame` gave `shape`) because `saveTimeMs` was null: every saved document must be stamped. Fixed with `withSaveTime(state, Date.now())`; second run loaded (`loadSavedGame(...).ok` true, then the real page). The skill's `sh` snippet that builds `send-state.js` was extracted from SKILL.md and run; its output parses as JS. The final `PUT` of the real run used the same function body through a scratch tail file, not the extracted snippet itself (the code is identical).

## Choices
- Understanding is built with `discover` against a real map run from `send` (throwaway; only its Understanding is kept) fed with synthetic events (chill, attack by wolf, finished explore with revealed tiles, finished gathers). Rejected: assigning the lists by hand (not "functions of the simulation", drifts from the data). Cost if wrong: events shape changes break the script; the skill tells to check with `loadSavedGame`.
- Branch bought: "Obchód" (`patrol`) with `paidPractice(...,{smallItemGathering:160})` then `buyBranch` (cost 3 = three thresholds 30, 80, 160). Map `forest`.
- The sending code is given as a shell snippet building the file for `run-code` (no file system there), because the plan lists no further file.

## Reaches beyond the handoff
- `src/browser/sim/understanding.ts` revelation events, `src/browser/sim/data/items.ts`/`campfire.ts` (`revealedBy`), `src/browser/sim/data/maps.ts` (map id `forest`), `src/browser/sim/saved-game.ts:1140-1230, 1310` (`loadSavedGame`, the stamping rule): to learn how to make a loadable state.

## Searches not found or unclear
- The plan names `discover` "or the other functions it needs" — fine. The save route's code (`src/server/`) was not read; the form came from `account-api.ts` and the run's answers.

## Problems / concerns
- Scratch files left in `.playwright-cli/` as `.js` are linted by the quality test (eslint covers the whole tree): the skill already says to delete `.playwright-cli/` when evidence is in; an agent that leaves `send-state.js` there fails `test_eslint_source_rules` in the gate. Not changed (outside the slice); worth noting for the orchestrator.
- No test runs `compose-state.mjs` (plan: other cases stay); it needs a build, so a behavioural test would depend on `dist/`.
- Plan's `npm test` for quality fails on the two base errors, ruff and shellcheck, as the handoff says.
