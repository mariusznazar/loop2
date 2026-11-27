# Findings of the review of the whole change (reviewer's words; report `reports/review-whole-report.md`, first line `FAIL d19e544514d3d6c07cfb2d57c04dc53403f58308`)

Range `d79ad0b7fc3972bf2b2fb3124c593522f01eda92..d19e544514d3d6c07cfb2d57c04dc53403f58308`. One author, no plan: no finding comes from a slice.

## Blocking

### Important

**I-1. The rationale of D-389, an entry the change edits, still says that „Drużyna” speaks of
earning loops alone and that Siedziba nowhere else says a character is in a manual map run; the
cards of the change now say it.**

- Place: `foundations/decisions.md:10755-10757` (D-389, *Rationale*): „The picture says what the text
  under it does not: a character in a manual map run is a thing Siedziba otherwise says nowhere, since
  „Drużyna” speaks of earning loops alone, so the picture band shows the characters that are at the
  fire and the screen is drawn again at every change of the map run.” The same entry's *Rejected*
  (`foundations/decisions.md:10769`, `:10773-10774`) gives as the reason against drawing every character in the
  band that „a character of a manual map run sits at the fire and nothing on Siedziba says it is on the
  map”, and names „the report „Gdy cię nie było””, a title the change removes.
- What is wrong: after the change each card shows „Przejście: {mapa} · minuta {m}” (with its ending) for
  the character of the manual map run — `src/browser/view/team-cards.tsx:56` (`statusLine`),
  `src/browser/view/team-cards.tsx:88`, redrawn at each minute (`src/browser/view/headquarters.tsx:231`,
  `:244`), as D-447's new paragraph requires (`foundations/decisions.md:4938`). So „Drużyna” no longer
  speaks of earning loops alone, and Siedziba does say, in text, that a character is in a manual map run.
  The change edited D-389 (its sentence „the way to a character stays its card”, `:10765`), and left the
  sentence beside it false.
- Why it matters: the rationale is the reason the band exists in its present form; a later agent that
  reads D-389 to change the band or the cards takes as a fact that the band is the only place that shows
  a character in a manual map run, and may design on that (for instance drop the line from the card as a
  duplicate of nothing, or keep the band's reason as stated). The method grades a disagreement between
  the content of an entry the change writes or changes and the code as Important (WAY-263, WAY-364);
  the content here is the rationale's factual claim, and the cost of the fix is one sentence of D-389
  (and the two phrases of its *Rejected*), written through the project skill `the-way-record-decision`.
- Evidence: the cited lines of `foundations/decisions.md` at the head, against
  `tests/view/headquarters-screen.test.mjs` „each card shows what its character does: „W obozie”,
  „Przejście: {mapa} · minuta {m}” with its end, drawn anew at each minute, death and completion”
  (passes, 37/37), and the screenshot `loop2_siedziba_kilka_postaci.png` (Ela's card „Przejście: Skraj
  lasu · minuta 0”).
- Within the task: yes — To do 4 and the D-447 row of *Settlements to record* make the card say this,
  and the change edits D-389 itself; the handoff's note that the cycle's return step may correct a
  foundation entry does not move it out of this change.
- Slice: from no slice (a one-author change; the gap is in the change's own foundation entries,
  commit `3d8cb03d`).
- Contradiction: yes — D-389 (its *Rationale* and *Rejected*), which the code of the change now
  contradicts.

## Minor — within the task (fixed in the same fix, after the blocking finding)

**M-1. The one-character screenshot, the loop2 half of the side-by-side with the old Loop, shows the
name underlined, which the code at the head does not draw.** `loop2_siedziba_jedna_postac.png`
(screenshots repository, commit `c47fe3e51ca0c483600d2d5adf0a3964db0adeb4`) shows „Nowa postać”
underlined like a web link; `src/browser/headquarters.css:221` sets `text-decoration: none` on
`.team-member-name`, no other rule of the head underlines it, and the other screenshots of the same set
(`loop2_siedziba_plus_postac_otwarte.png`, the same „Nowa postać” card; `loop2_siedziba_kilka_postaci.png`)
show the name without an underline. The shot is most likely from a build before that line. It matters
because this pair (`loop_13_siedziba.png` beside `loop2_siedziba_jedna_postac.png`) is where the human
judges the task's acceptance criterion, To do 12; he would judge a look that does not merge. Fix: take
that screenshot again at the head, at 1600 × 1000, and publish it under the cycle's directory of the
screenshots repository.

**M-2. The play skill names the report by a title the screen no longer shows.**
`.claude/skills/loop2-play/SKILL.md:346`: „To get the report „Gdy cię nie było” of a return, stamp the
document with a time hours back …”. After the change no heading „Gdy cię nie było” stands on Siedziba
(To do 7; D-246 at `foundations/decisions.md:9336` ff.): the report is a counting sentence above
„Drużyna” and lines in the cards. An agent that follows the skill and looks for that heading finds
nothing and may take the report for missing. Fix: name it as the report of a return, the sentence
„Bez ciebie …” above „Drużyna” with the lines in the cards. Within the task: the change removed the title
the skill names.
