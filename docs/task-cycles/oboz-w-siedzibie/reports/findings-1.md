# Findings 1 — the Minor findings of the whole-change review (PASS 07fd0de35e07ea03bb4e8e706ce221f54be0b801)

Source: `reports/review-1-report.md`, cut word for word. The review passed with no blocking finding;
each Minor finding below lies within the task and none is marked outside its scope, so each is fixed
before the request opens (the orchestrator's rule, WAY-161). Fix range runs from the reviewed head
`07fd0de35e07ea03bb4e8e706ce221f54be0b801`. Where you hold a finding wrong, answer with evidence
instead of changing code.

### Blocking findings

none

### Minor findings within the task

**M1 — The layout the human is still to judge is written into the foundation and the styleguide as the
expected one.** `foundations/decisions.md:9518` (D-389 *Verification*, complies: "the fire in the middle
… the chest to its right and the characters of Siedziba to its left"), `guidelines/styleguide-browser-view.md:792`
(*Good* of "The camp of Siedziba") and `:803-806` (the rule's body: "skrzynki po jego prawej … postaci
po jego lewej"), and the comment of `src/browser/sim/data/scene.ts:307-322`. The task leaves the
composition of the camp to Mariusz on the screenshot at the request (Q3: "Dokładną kompozycję i wysokość
Mariusz ocenia na zrzucie przy prośbie o scalenie"; *Questions carried to cycle*, first item), and
settlement row 1 says nothing of where the chest and the characters stand. Nothing here is false today,
and the binding sentence of D-389 does not fix the sides, so this is no departure from an entry; but
accepting the screenshot now also accepts these three texts, and a changed composition at the request
has to change all of them, the styleguide rule included. Evidence: the task's Q3 and row 1 against
the three places quoted. Suggest the orchestrator says so beside the screenshot in the request.

**M2 — D-271's title no longer names what the entry answers.** `foundations/decisions.md:6153`, "D-271 —
Where do the scene's pictures come from?", while its binding text now also settles the pictures of the
camp at the top of Siedziba (`:6159-6161`). A reader who scans the log by title for where the camp's
pictures come from passes D-271 by (this review found it through the task, not the title). Evidence:
the title against the added sentence. Whether a title may change is the record-decision skill's to
say; if it may, "Where do the pictures of the scene and of the camp come from?" or similar.

**M3 — The new styleguide rule restates D-389 and lists where the code stands.**
`guidelines/styleguide-browser-view.md:788-822`. `.the-way/product-guidelines/template.md:84-88` asks
that a rule "repeats [no] decision of the product's log" and "does not list the state of the product's
code"; the body repeats D-389 almost sentence by sentence and names `camp.tsx`, `camp-picture.ts`,
`styles.css` and `scene.ts` (`:798-801`). To do 7 asks for exactly this content ("z czego obóz się
składa, które postacie w nim stoją, gdzie stoi pas …") and the neighbouring rule "The scene of a map
run" (`:614-786`) has the same form, so the cost is only the usual one: two texts to keep in step with
D-389. Evidence: the template lines against the rule.

**M4 — No permanent case checks that the two new sprite files hold pixels alone.** `assets/sprites/chest.png`,
`assets/sprites/camp-clearing.png`. Earlier sprite additions each got such a case in
`tests/view/scene-picture.test.mjs` (the smaller flame, `:826-837`; the death sheet, `:1234`; the wolf's
files, `:1477`). D-273 and `guidelines/testing.md:171,179-186` leave the boundary to review, and this
review checked both files (chunks `IHDR`, `IDAT`, `IEND` only, see Checks), so the change keeps the
rule; the gap is that a later re-export of either file with a text or colour-profile chunk would pass
every test. Optional.
