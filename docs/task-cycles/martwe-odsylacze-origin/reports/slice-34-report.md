# Slice 34 report

**Status:** done with concerns

Slice base: ff93642b61d79c1276c724d9444f470780c1d41f (HEAD at start; worktree clean).

## Change
- `foundations/environment_facts.md`: *Source* of `pixel-crawler-terms` rewritten (1 line replaced, 1 added). The fact's sentence is unchanged, so no invariant or decision that names it (decision with `Based on: pixel-crawler-terms`, invariant `sprite-credits` with `Rests on`) needs a change.
- Written by the steps of the project skill `the-way-record-environment-fact` (read, decide, draft, write), by hand-edit of the one *Source* line with the editor tool.

New Source wording: the pack's public page by its author (itch.io), with its archived copy of 2026-10-16, the link "Terms" on it, the document that link opens (a PDF on Google Drive, shared publicly, fetched with no login), the four points quoted word for word plus the closing line "These terms apply to all works available for sale or distribution by anokolisa"; read 2026-11-12.

## Checks
- `python -B .the-way/elements/common/foundation_check.py` -> exit 0 ("0 errors")
- `npm test -- tests/invariants/test_icon_credits.py` -> exit 0 (3 tests OK)
- `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` -> exit 0, lists nothing
- whole-repository S1 `git grep ...` -> exit 1, no line
- Mechanical check before writing: the five quoted passages stand word for word (whitespace collapsed) in the text extracted from the downloaded PDF (pdftotext) -> all True.

## Findings (public places)
- https://anokolisa.itch.io/dungeon-crawler-pixel-art-asset-pack -> 302 to https://anokolisa.itch.io/free-pixel-art-asset-pack-topdown-tileset-rpg-16x16-sprites (title "Free - Pixel Art Asset Pack - Topdown Tileset - 16x16 Sprites by Anokolisa"; the series is Pixel Crawler). The page has no terms text and no licence field; it has a "Terms" link to https://drive.google.com/file/d/17y1gjuwVirE8V79WcTL9tgTUtMu6R1je/view?usp=sharing.
- The Drive viewer needs JavaScript (WebFetch saw only "Terms.pdf" and a sign-in link), but https://drive.usercontent.google.com/download?id=17y1gjuwVirE8V79WcTL9tgTUtMu6R1je&export=download (reached by `curl` with no login, generic User-Agent) returns the PDF. Its text holds points 1, 2, 3 and 4 in the same sense as the old repository's Terms.txt, and the closing line that the terms apply to all works of the author.
- Wayback CDX: captures of the pack page exist (latest 2026-10-16, holds the Terms link; verified). Captures of the Drive viewer exist (e.g. 2026-10-30, title "Terms.pdf - Google Drive") but hold no terms text. No archived copy of the terms text exists, so the Source gives the archived copy of the pack page, which carries the link.
- Web search for a quoted sentence found no other place holding the terms.

## Concerns (for the orchestrator)
1. The public document is longer than the old Terms.txt. Points 1.3-1.5, 2.1, 3.2-3.5, 4.1 are extra, and there is a point 5: "If at any point in your project, there is a saxophone solo, the name of the author must be credited". The four quoted points hold in the same sense. Point 5 is a credit condition that does not arise in a game without a saxophone solo; the fact's sentence ("ask for no credit") is as the slice says to leave it, but a reader could note point 5. Also point 3.5 (not for sale where a store does not sell them) and 3.3/3.4 do not touch the fact. Decide whether the sentence should carry "but for a saxophone solo".
2. The terms document is a Google Drive file, not a page of the author's site, and the Wayback has no capture of its text. The place may move or change; the quote is what a reader compares with.
3. The page found is the free pack's page. The terms document states it applies to all works of the author, which the last quoted passage records.
4. Template says a page without editions takes "the closest archived copy that already exists"; none exists for the document's text, so the archive given is of the page that links to it. A reviewer may prefer another form.

## Own-work check
Requirement most likely unmet: the Source must point to a place a reader reaches and the quotes must stand there word for word. Check: fetched the document myself without a login and tested each quote against the extracted text (all True); fetched the archived pack page with `--compressed` and found the Drive link in it. No private data in the line (git grep S1 clean).

## Reaches beyond the dispatch
None (all read were named by the handoff; also `.the-way/task-cycle/change/slice.md`, named by the make-change skill).

## Unread material
Not read: `foundations/decisions.md` D-271 and `foundations/invariants.md` sprite-credits whole, `.runs/.../task.md` beyond the passages copied in the handoff, the `the-way-record-environment-fact` project skill's further elements (`projected.md`, `missing_element_file.md`, `projected_mode.md`, `critique/SKILL.md`), `ui_check.md`. Reason: not needed, as the sentence did not change and no dependant was touched. Also not read: the full "Foundation entries row 2". Read in part: D-271 (grep only for the fact's name). Read whole: the make-change skill, slice.md, the fact's neighbours (snippets), the template, rules.md, way_of_working.md, foundation_step.md, the skill's read/decide_entry/draft/write.

## Searches not found or unclear
- No archived copy of the terms document's text (see above).
- Whether the product's pack is the free one or a paid Pixel Crawler pack: the repository does not say; the terms apply to all works of the author.
