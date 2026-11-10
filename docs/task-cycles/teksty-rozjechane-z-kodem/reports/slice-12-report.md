# Slice 12 report — The instructions for the browser view: the page's class rule and a changed token value

**Status:** done

## Commits

- `0fba2b3` docs: :memo: say in the browser instructions that a class of the kitchen-sink page has its rule in its own stylesheet, and that a changed token value takes a source like a new one

Range from the slice base `b8abf535193c8e387dc5ddf3b2e652fc5e4f3b94`: one commit, one file.

## Files changed

- `src/browser/AGENTS.md`: 2 lines added, 2 removed (lines 5 and 9; the other sentences are unchanged).

## Changes made

1. Line 5, the sentence on giving an element a class. Added: a class that an element of the kitchen-sink page (`src/browser/kitchen-sink/`) needs for its own samples has its rule in `src/browser/kitchen-sink/kitchen-sink.css`, not in `src/browser/styles.css`, which is copied to `dist/public` and reaches the players.
   - Rests on: the styleguide rule "The kitchen-sink page" in `guidelines/styleguide-browser-view.md` (the page's sources live in `src/browser/kitchen-sink/`), and D-45 in `foundations/decisions.md`. The stylesheet `src/browser/kitchen-sink/kitchen-sink.css` holds the rules of the page's sample classes (`sample-hover`, `sample-focus`, and others). For `styles.css` reaching players: `dist/public/index.html` links `/styles.css`, and `src/browser/index.html` is the game's page; the build script was not read whole.
2. Line 9, the sentence on a value the token file does not hold. Now covers a changed value of an existing token as well as a new one, with the same source rule.
   - Rests on: the styleguide rule "Every value with its source" in `guidelines/styleguide-browser-view.md` (its text: "Nowa albo zmieniona wartość dostaje wpis swojego źródła w tej samej zmianie", source settled with Mariusz), under D-38.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (run on its own, because the one command is not run by this slice) | 0 | `0 errors` |
| `git diff --check b8abf535193c8e387dc5ddf3b2e652fc5e4f3b94..HEAD` (run as `git diff --check` on the working tree before commit) | 0 | no output |
| `grep -c "kitchen-sink/kitchen-sink.css" src/browser/AGENTS.md` | 0 (count 1) | new sentence present |
| `grep -c "a changed value of one it holds" src/browser/AGENTS.md` | 0 (count 1) | changed-value wording present |

The foundation check was run twice (before and after the wording fix in the commit), both exit 0 with `0 errors`. No test was written: the change is prose, and the slice's checks name none. Not run: `npm test` (the orchestrator runs the gate, per the handoff).

## Own-work check

- Requirement (To do 6): the sentence on giving an element a class must say that a class of the kitchen-sink page has its rule in `kitchen-sink.css`, not in `styles.css`.
  - Check: the grep above on the file, and reading line 5 against the kitchen-sink stylesheet.
  - Showed: present. The rule for the page's own sample classes is in `kitchen-sink.css` (the `.sample-*` and `.button.sample-*` rules), and the file's copy to `dist/public` is `styles.css`.
- Requirement (To do 7): the sentence on a value the token file does not hold must also cover a changed value of an existing token.
  - Check: the grep above, and reading line 9 against the styleguide rule "Every value with its source".
  - Showed: present; the wording now covers "a changed value of one it holds", and the missing-value fallback names "missing or changed value".

## Adaptations and choices

- **Scope of the class sentence (adaptation).** The plan says "the class of an element of the kitchen-sink page has its rule in `kitchen-sink.css`". Taken literally, that is wrong for the page's shared controls: the page also uses classes such as `.button` and `.select-list` whose base rules are in `styles.css`, and `kitchen-sink.css` is read after `styles.css` (its own header says so). I narrowed the sentence to "a class that an element of the kitchen-sink page needs for its own samples". Cost if wrong: an agent that adds a sample class in `styles.css` on the page would still be told it is allowed; `styles.css` reaches players, so this is the case the sentence is meant to catch.
- **Wording of the Goal.** The plan's Goal says the file "says two things right" and then describes the fix. Read literally, that claims the current file already says these things; it does not (line 5 names only `styles.css`, and line 9 covers only new values). I treated the Goal as describing the target state.
- **Wording of line 9.** Kept the file's structure: "enter it only with their source settled with the human" now covers both new and changed values; the fallback "name the missing or changed value in your report" follows the same rule.

## Unread material

- `docs/task-cycles/teksty-rozjechane-z-kodem/task.md`: read lines 28-39 only (the To do items 3-8 that contain items 6 and 7 at lines 34-35). The rest of the task was not read; the handoff names only those lines.
- `guidelines/styleguide-browser-view.md`: read whole.
- `src/browser/kitchen-sink/kitchen-sink.css`: read whole.
- `foundations/decisions.md` D-43 (913-926), D-45 (943-956), D-48 (988-1001): read whole, as the entries run.
- `foundations/invariants.md` `browser-view-token-values` and `design-token-sources` (459-497): read whole.
- `foundations/part_map.md` `browser-view` (3-28) and `agent-workflow` (118-133): read whole as sections.
- `src/browser/AGENTS.md`: read whole.
- The build script that copies `styles.css` to `dist/public` (`scripts/` or `package.json`): not read; the claim about the copy rests on `dist/public/index.html` linking `/styles.css`, found by grep.

## Searches not found or unclear

- The plan's Goal wording "says two things right": unclear, see Adaptations.
- The copy of `styles.css` to `dist/public`: confirmed only by the `dist/public/index.html` link (grep), not by the build script.

## Reach beyond the handoff

- `.the-way/task-cycle/change/SKILL.md` (read whole) and `.the-way/task-cycle/change/slice.md` (read whole): named by the method, as the handoff directs.
- `a rule file of the author's agent instructions` (read whole) before the commit, as the user's global instructions require. The commit message is in English, follows the repo's `docs: :memo:` form, and the file was added by path. The commit author is the private address, which the rule expects for a `mariusznazar` GitHub remote.
- Grep of the repo for `styles.css` and `kitchen-sink.css` (not a read; used to find the copy and the links).

## Questions and concerns

- None blocking. The narrowing of the class sentence (see Adaptations) is the one place the orchestrator may want to confirm against the plan's intent.
