# Findings of the review of the whole change — for the fix

Source: `reports/review-whole-report.md` (`PASS 8e9c01a0`), section Findings, Minor, cut word for word. No blocking finding. All five are within the task and none is marked outside its scope.

**M1 — the styleguide's new exception says every select list of the game is held to its row by the
shared sheet alone; on Mapy it took a rule of the screen as well.** Within the task (point 7).
Place: `guidelines/styleguide-browser-view.md:546-550`, the sentences „Lista jest najwyżej tak
szeroka jak wiersz, w którym stoi …” and „Wygląd listy stoi w jednym miejscu,
`src/browser/styles.css` (D-265), więc tak samo zachowuje się każda lista wyboru gry.”
What is wrong: `max-width: 100%` on `.select-list` (`src/browser/styles.css:300-304`) holds a list
only where the element around it is no wider than its column. On Mapy the row „Program:” is a flex
item of a column with `align-items: flex-start` (`src/browser/maps-screen.css:156-163`), and the
list stayed wide until the change added `.maps-who-program { max-width: 100%; }`
(`src/browser/maps-screen.css:209-211`). In my reproduction with the head's stylesheets, removing
only that row rule gave a list 1245 px wide and a page 1608 px wide in a 1280 px window. The
author's own row "Point 7 on the kitchen-sink page" shows the same thing in a table cell (list
1298 px, no „…”). Why it matters: the rule tells the next author that the shared sheet does the
work for every list, so a new list in a row sized to its content widens the page again, against
this very rule. The sentence also lists today's state of the product ("także lista „Program:” na
ekranie Mapy i na ekranie przejścia", "każda lista wyboru gry"), which
`.the-way/product-guidelines/template.md:90-97` keeps out of a rule. Suggested wording for the
how-to part: the list is never wider than its row, and a row that holds a list is no wider than its
column (in a flex column that does not stretch its items, the row gets `max-width: 100%`); the
name of the picked position longer than the list ends with „…”.

**M2 — the exception now covers every select list, not only the list of programs, and nothing yet
puts that in front of the human.** Within the task (point 7). Place:
`guidelines/styleguide-browser-view.md:543-550` against the old text („lista programów jako
natywne pole wyboru (`select`)”). The task's point 7 asks that the exception for `select` say the
list cuts the name. The change adds to that the width rule and its reach to every select of the
game (the trip plan's „Weź”/„Wynieś” item lists today). The author names this only under *Choices*
in `author-report.md:151`. The rule has *Decision* `none`, and
`.the-way/product-guidelines/template.md:121-125` (WAY-172) says a rule the cycle finds itself is
named in the request's description among what the human did not see in the task and accepted at
the merge. Why it matters: without that line the human approves the request without seeing that
the styleguide's rule changed for lists the task did not name. Fix: the request's description names
the broadening as something the human did not see in the task. No code change needed. My check of
the reach: the trip plan's list in `li.trip-entry` keeps the same box with and without the change
(73 × 23 px at the same place, beside its number field); it has no long names today.

**M3 — D-299 is reported as "matches, with a note" while the state seen does not meet D-299's own
"complies" sentence in the smallest window.** Within the task (point 3). Place:
`author-report.md:71`. D-299 (`foundations/decisions.md`, its *Verification*) gives as complying
"the pick of actions of a game with every action discovered standing whole without scrolling". The
author measured the pick of rule 1.2 from y 438 to 738 in a 720 px window: its last row stands 18 px
below the window's edge until the page scrolls. D-396 makes 1280 × 720 the smallest supported
window. The binding sentence of D-299 (no search field, no row of recent picks) holds, so point 5's
condition (a) does not hold and nothing should be fixed. But the result is not "matches": the
rationale of D-299 rests on "every cell of the pick fitted without scrolling", and says that a
search or recent picks may come back when that stops being true. Why it matters: the human reads
the defects list, and this observation is not there. Fix: relabel the row as
`bad: defect for the human` (or an observation for the human), and add a defect entry that says
what the player sees (the last row of actions below the window's edge when the panel opens under
rule 1.2 in a 1280 × 720 window) and that the entry touched is D-299.

**M4 — the author does not check whether the defect fixed here brings back the excluded image
comparison (D-89 over D-87).** Within the task (point 7). Place: `author-report.md:139`, which
gives D-87 and D-88 as the reason for no test. D-89 counts as a violation "a change of the look of
a screen whose author and reviewer do not check whether a concrete visual defect … now calls for
image comparison". This change fixes exactly such a defect (the page 1661/2053 px wide). My check,
in place of the author's: image comparison is not called for. The defect is a page width, and a
whole-screen image comparison would catch it only with a reference state made for it (a program
with a long name). The measurement that does catch it, `scrollWidth` with a long name in a real
browser, is the automation D-75 and D-88 defer. No smaller test missed it, since none can compute
layout (jsdom computes none). Why it matters: without this line in the request the exclusion is
renewed without the check its decision asks for. Fix: one sentence in the request's description.

**M5 — the comparison of point 6 with the look before the split was a comparison of stylesheet
text; the report does not count it among the weak spots, and it does not say how it set aside
most of the reversed pairs.** Within the task (point 6). Place: `author-report.md:84` and
`author-report.md:185-192`. The task asks the session to view the states "i porównuje je z
wyglądem sprzed podziału". The author compared the rules at `581d09bb^` and `a9a95479`, and then
looked only at reversed pairs "whose last compound shares a class": 14 of them. My rerun of its
script without that filter (`review-whole-script-css_pairs.py.txt`) counts 7724 reversed pairs
that set the same property in the same context. I checked the two ways a set-aside pair could
still meet one element. First, same element type with no shared class: 35 pairs, all of different
element types (`review-whole-type-pairs.txt`). Second, a shared control carrying a class of a
screen: none do; the button carries only `button`, its kind and `selected`
(`src/browser/view/controls/react-button.tsx:66`), and the list only `select-list`
(`src/browser/view/controls/react-select-list.tsx:38`). So the conclusion stands as far as this
reading goes. What the method does not exclude: an element that carries the classes of two screen
rules with no class in common. Why it matters: "matches" reads as a viewed comparison, and the
human cannot tell how much was looked at. Fix: say in the weak spots that the pre-split look was
compared as stylesheet text and not viewed, and state the filter.
