# Spec — Styleguide loop2

- Task: `.runs/task-cycles/styleguide-loop2/task.md` (frozen copy of
  `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\styleguide_loop2.md`, accepted 2026-10-23)
- Open choice: the three *Questions carried to cycle* — (1) where the file of appearance values
  (design tokens) and the stylesheet stand and what form they take; (2) where the Geist font files
  come from; (3) where the kitchen-sink page's sources stand, outside what `tsconfig.browser.json`
  compiles, and how its own command builds and opens it locally, away from `dist/public/`.

## Intent

The task gives `browser-view` a styleguide, one file of appearance values, shared controls, a
kitchen-sink page and five invariant tests. This spec fixes the files and conventions those pieces
stand on: one CSS file of design tokens that every style reads and every test reads as text; Geist
fonts kept in the repository beside the icons; and a kitchen-sink page inside the browser source
but outside the game's build, built and served on the developer's machine by its own command.
Everything else the task's *To do* asks for is built on these three choices and is not reopened
here.

## Goals and non-goals

Goals:

- One token file holds every value Q15 counts, each with its source right after it, in a form the
  contrast and source tests read without parsing code or computing the cascade (Q22).
- One stylesheet for the game reads values only from the token file; no style stands in HTML.
- Geist and Geist Mono reach the player from the game's own files, with the OFL 1.1 licence beside
  them, in local builds and in the container.
- The kitchen-sink page is code of `browser-view`, under the invariants that already reach
  `src/browser`, built and opened by `npm run kitchen-sink`, and absent from everything
  `npm run build` writes.
- The five invariant tests of Q16 each have the convention they check written into the code.

Non-goals:

- The interface of the six shared controls and how screens move onto them (To do 4) — left to the
  plan and the maker.
- A token for `line-height`, or any unitless value outside Q15's four kinds (cycle answer QA-1).
- A check that the container serves the fonts; a credit for the fonts in the footer.
- Type checking of the kitchen-sink in `npm run typecheck`; the kitchen-sink is compiled in
  `npm test` by the positive control of the test of row 15 (Decision 8).
- Any change to the account server (`src/server/**`) or to how the server serves `dist/public`.
- A new npm dependency.

## Constraints

- The task: Q9–Q11 and Q19 give every value and its source (To do 2); Q15 with Q19 D defines a value
  in place of a token, its four unitless kinds being a closed list (QA-1); Q18 gives the role names
  and kinds; Q13 keeps the page out of `npm run build`; Q16, Q21 and Q22 shape the five tests, which
  search file text or read the token file and nothing more; Q11 keeps the font files in the
  repository and copies them at build like the icons; To do 9 gives the font directory a trust
  boundary at `browser-view`.
- D-03: the page and the controls are TypeScript on DOM APIs, no UI framework.
- D-06: one npm package and lockfile; the browser and server configurations stay as they are and
  `npm run build` compiles both. A bundler stays rejected.
- D-18 and the invariant `content-identifiers`: the kitchen-sink's sources name no map, resource or
  archetype; they reach content through `src/browser/sim/data/`.
- D-27: icons stay in `assets/icons/`, copied at build; the recoloured files still hold nothing that
  runs or refers outside.
- D-29, D-32: every new TypeScript, JavaScript, HTML and CSS file passes ESLint and Prettier as
  configured; a change to `eslint.config.mjs` may only add the pattern of a new code directory.
- D-33: the chosen route leaves `package-lock.json` unchanged, so the audit stays offline.
- The code as it stands: all styles are in the `<style>` block of `src/browser/index.html:8-175`;
  `scripts/build.mjs` compiles both configurations and copies `index.html` and `assets/icons/*.svg`
  into `dist/public/`; `Dockerfile` copies only `assets/icons/` of `assets/`, and `.dockerignore`
  passes only that directory; `express.static` serves all of `dist/public`
  (`src/server/app.ts:18`); `tests/invariants/test_application_build_output.py:38` takes the browser
  source as all of `src/browser`; the invariant tests `test_browser_view_framework.py` and
  `test_content_identifiers.py` take `src/browser` as their population; ESLint's typed program for
  the browser lists `src/browser/**/*` itself, independent of the tsconfig's `exclude`
  (`eslint.config.mjs`, `program(...)`).
- Cycle answers QA-1 to QA-4 (`cycle.md`, questions table) and the five readings accepted there.

## Decisions

### 1. The token file is `src/browser/tokens.css`

- It holds only two kinds of content, with comments: one `:root` rule of CSS custom properties, and
  the `@font-face` rules of the fonts.
- Each role of Q18 is the custom property `--<role>`, its name exactly as Q18 writes it (`--page`,
  `--text-strong`, `--player-change`, `--tile-edge`, …). A role of kind `background` or `text`, and
  every other role whose value is a colour, holds a lowercase six-digit `#rrggbb`. `--depleted` holds
  the opacity 0.35 (Q10).
- Every other value Q15 counts is a custom property of its own, named by what it is for, never by a
  colour or a number alone: the two font stacks, the six text sizes (Q11), the seven steps of the
  spacing scale (Q11), the frame width and the bar width (Q11), the character outline width, the
  step-target width and dash pattern and the link-highlight width (Q19 C), the focus width and
  offset (Q10), the two font weights (Q19). The tile edge uses the frame width (QA-2); no second
  token holds the same value for it.
- A declaration of the file — each custom property and each `@font-face` descriptor — runs from
  its property or descriptor name to the `;` that ends it, over as many lines as Prettier
  gives it where it breaks a comma-separated value after the colon (the font stacks, probed by the spec's reviewer
  with Prettier 3.9.10). Directly after that `;`, on the same line, stands a comment that opens with
  `Source:` followed by non-empty text; Prettier keeps it there in every layout. The text names the
  source To do 2 gives that value: the rendered page of https://kantarion.bieda.it/ read 2026-10-20
  with the element Q9–Q11 name; the threshold of Q8 for the two changed values; Mariusz's choice
  from the preview of Q10; Q11 for the spacing scale and its 24 px step; for the font stacks, Q11;
  for the `@font-face` descriptors, the release of Decision 3 and, for weights, Q19.
- A `@font-face` rule holds only the descriptors `font-family`, `src` and `font-weight`, each of
  which has a source above. It holds no `font-display` and no other descriptor, for which To do 2
  gives no source; the browser's default applies. The generic family that ends each font stack
  (`sans-serif`, `monospace`) is a keyword within the stack's value and shares its source.
- No other file of `browser-view` holds a value Q15 counts, outside the exemptions Q15 and Q19 D
  name; the icon files are among those exemptions.

Rejected: a JSON token file turned into CSS by a step of the build — a generator and generated CSS
for no gain any test needs, and two places to look for a value; a TypeScript token module applying
custom properties at run time — the page draws before its styles arrive, and the tests would have to
read compiled code. Cost if wrong: the token file's format is read by three tests and every style;
changing it later rewrites those, but no data or deployment depends on it.

### 2. The game's stylesheet is `src/browser/styles.css`

- It holds every style of the game's screens and shared controls, reading each value Q15 counts
  through `var(--…)` of the token file. Values outside Q15's list stay where they are, among them
  `line-height: 1.4` (QA-1), the `@media` threshold of 720 px and the layout dimensions of Q19 D.
- It holds the one rule `:focus-visible` of the game, the only rule of the file declaring `outline`
  or an `outline-*` property, drawing the outline from `--focus` with the focus width and offset
  (Q10, Q21).
- `src/browser/index.html` keeps no `<style>` element and no `style` attribute; it links
  `/tokens.css` and then `/styles.css` with root-relative addresses, which work both in
  `dist/public/` and at the root of the kitchen-sink's server.
- `scripts/build.mjs` copies every `*.css` file directly in `src/browser/` into `dist/public/`.

Rejected: a stylesheet per control or per screen — several links or `@import` chains for a page of
a few screens, with no rule of the task that needs them. Cost if wrong: splitting one stylesheet
later is a mechanical move.

### 3. Fonts stand in `assets/fonts/`, taken from a pinned release of github.com/vercel/geist-font

- `assets/fonts/` holds the release's woff2 web-font files of Geist and Geist Mono covering weights
  400 and 500 — the static per-weight files where the release has them, else its variable file per
  family — and the release's OFL 1.1 licence file, each byte for byte as the release publishes it,
  and nothing else.
- The release is the newest one at the time the maker fetches the files; its tag and commit stand
  in the `Source:` comments of the `@font-face` rules.
- `scripts/build.mjs` copies the woff2 files and the licence file into `dist/public/fonts/`; the
  `@font-face` rules of the token file reach them at `/fonts/<file name>`.
- `Dockerfile` copies `assets/fonts/` into its build stage beside `assets/icons/`, and
  `.dockerignore` passes `assets/fonts/` beside `assets/icons/` (part `deployment`). Without both
  lines the image build fails at `npm run build`.
- `.gitattributes` (part `deployment`) gains `assets/fonts/** -text`, so git converts no line ending
  of any file there, the licence text included, on a checkout with `core.autocrlf=true`: the
  working tree, `dist/public/fonts/` and the image hold the release's bytes.
- `assets/fonts/**` is a trust boundary of `browser-view`; review checks that the files are the
  release's published binaries with its licence and that the stylesheets load fonts from nowhere
  else.

Rejected: npm package `geist` — version 1.8.2 declares `peerDependencies: {"next": ">=13.2.0"}`
(`npm view geist`, read 2026-10-23), which npm installs by default, so Next.js and React would enter
the lockfile and every later D-33 audit, and its files would stand in `node_modules` rather than in
the product's files Q11 and row 9 ask for, the same ground on which D-27 rejected an npm icon
package; `src/browser/fonts/` — it would spare `deployment` its lines but put binaries among the
sources, apart from where `assets/icons/` stands. Cost if wrong: moving four to six binary files,
three copy lines and the attribute line.

### 4. The kitchen-sink's sources stand in `src/browser/kitchen-sink/`

- The directory holds exactly three files: the page's HTML file, its one TypeScript module (the
  entry) and its own stylesheet, and nothing the game imports. Beyond its entry the page imports only modules the game itself
  uses; code only the page needs stays in its entry module (a second module here would be a module
  of `browser-view` of a kind the guidelines' index does not hold, and page-only code in
  `src/browser/view/` would be compiled into `dist/public/`, where the test of row 15 does not see it). The page shows the shared controls of `src/browser/view/controls/` by importing
  them, every colour role, and samples of tiles in each state drawn with the roles (Q19 A); it takes
  any icon for a sample through `src/browser/sim/data/`, never by name (D-18).
- `tsconfig.browser.json` gains an `exclude` of `src/browser/kitchen-sink/`, so the game's build
  does not compile it.
- `tests/invariants/test_application_build_output.py` takes the browser configuration's source as
  `src/browser` without `src/browser/kitchen-sink/`, as a literal beside the others; its docstring
  says so. The invariant's sentence does not change.
- Because the page lies under `src/browser`, the tests of `content-identifiers` and
  `browser-view-framework` reach it unchanged, and the patterns of ESLint, Prettier and
  `.gitattributes` already cover it.
- The page's stylesheet holds no value Q15 counts. It holds the page's own layout, samples of
  forced states drawn from tokens, and the rule `:focus-visible` with one more selector, that of the
  focus sample (Q22, row 12), as its only rule declaring `outline` or `outline-*`. The page links the
  token file and the game's stylesheet before its own.
- The page's HTML file and its entry module each carry one fixed marker string that names the page
  and stands in no other file of `src/`; the test of row 15 writes it out.

Rejected: `src/kitchen-sink/` outside `src/browser` — the sentences and tests of
`content-identifiers` and `browser-view-framework` would not reach the page, against the task's
note on D-18, and ESLint, Prettier and `.gitattributes` would each need new patterns; the page in
`tests/view/` — a test directory for product code; the page served by the account server in a
development mode — the way Q13 rejected. Cost if wrong: moving the directory and its three patterns;
the risk the chosen place carries — game code importing a module of the page, which the compiler
would then pull into `dist/public` despite the `exclude` — is what the test of row 15 catches.

### 5. `tsconfig.kitchen-sink.json` compiles the page

- A third configuration beside the two of D-06, in part `build-tools`: the browser's compiler
  options and libraries, root `src/browser`, output `dist/kitchen-sink/`, input the TypeScript file
  of `src/browser/kitchen-sink/` (the modules it imports compile with it, at the same relative paths
  as in `dist/public/`). It sets its own `include` and `exclude`; should it extend
  `tsconfig.browser.json`, it does not inherit that file's `exclude` of `src/browser/kitchen-sink/`.
- `npm run build` and `npm run typecheck` do not use it; `scripts/build.mjs` keeps its two
  configurations.

### 6. `npm run kitchen-sink` builds and opens the page

- `package.json` gains the script `kitchen-sink`, running `node scripts/kitchen-sink.mjs`.
- Without arguments the script: compiles `tsconfig.kitchen-sink.json` with the pinned TypeScript 7
  compiler, as `scripts/build.mjs` runs it; assembles `dist/kitchen-sink/` from the compiled modules,
  the page's HTML at its root, the page's stylesheet, `tokens.css`, `styles.css`, `fonts/` and
  `icons/`, at the addresses the page and the token file use; serves `dist/kitchen-sink/` with
  `express.static` (the `express` dependency the product already has) on `127.0.0.1` only, at a port
  the system picks; prints the address; opens it in the default browser; runs until Ctrl+C. A failed
  browser launch is no error — the printed address stays. A failed compile exits non-zero before
  serving.
- With `--build-only` it assembles `dist/kitchen-sink/` and exits 0, serving nothing and opening
  nothing.
- It writes nothing outside `dist/kitchen-sink/` and never into `dist/public/`.
- `scripts/kitchen-sink.mjs` is a trust boundary of `build-tools` (QA-3): it answers HTTP
  requests. Review keeps its address to loopback and its served root to `dist/kitchen-sink/`.

Rejected: opening `dist/kitchen-sink/index.html` from disk — browsers refuse ES module scripts from
`file://`; a static server written in the script — path handling the product would have to get
right itself, where `express.static` already refuses paths outside its root; a fixed port — clashes
with `npm start` on 3000 or another local service. Cost if wrong: the command is local and
reversible; nothing deploys it.

### 7. Copying shared by both builds

`scripts/build.mjs` and `scripts/kitchen-sink.mjs` copy the same CSS, font and icon files. Whether
they share a helper module in `scripts/` or each copy for itself is the maker's; the copied sets are
the same either way.

### 8. The five invariant tests

Each is a Python file in `tests/invariants/`, as the product's other invariant tests are, citing
its invariant by `# invariant: <id>`; each runs on the real files and on made-up text showing it can
fail. Rows 11–14 belong to `browser-view`, row 15 to `build-tools`.

- **Row 11 — no value in place of a token.** Population: the files the part map assigns to
  `browser-view`, resolved over the files git tracks as `test_application_package_layout.py` resolves
  them, limited to `.css`, `.html`, `.ts`, `.mts`, `.cts`, without `src/browser/tokens.css`.
  CSS text is the stylesheet files and, in HTML, the content of `<style>` elements and the values of
  `style` attributes. It reports:
  - in CSS text, within declaration values only (never selectors, property names, custom property
    names or the names inside `var()`): a colour in any notation — hexadecimal, functional, or a
    named colour or system colour as a whole word in any case (never `transparent` or
    `currentColor`); a length in `px`, `rem` or `em`; a
    font name; a unitless number in a declaration of stroke width, dash pattern, opacity or font
    weight;
  - in TypeScript, within string and template literals only (never identifiers, other code or
    comments): a colour in any notation, a named colour or system colour counting as a whole word
    in any case (never `transparent` or `currentColor`); the role names of Q18 as text are no colour names.
  It passes what Q15 and Q19 D exempt, by property name or context: `0`, percentages, `fr`, `vw`,
  `vh`, the keywords `transparent`, `currentColor`, `inherit`, `none` and other keywords that are no
  named or system colour, `@media` preludes, the layout dimensions (`width`, `height`,
  their `min-` and `max-` forms, the grid template sizes), `width` and `height` attributes of
  images, and TypeScript geometry (numbers). Thus `field` in `program-editor.ts:381-383` (system
  colour `Field`) and a selector `.highlight` (system colour `Highlight`) are not reported.
- **Row 12 — visible focus.** Population: the `.css` files of `browser-view`. `styles.css` holds a
  rule whose selector is exactly `:focus-visible`, declaring the outline from `var(--focus)`; in every
  `.css` file, `outline` and `outline-*` are declared only in a rule whose selector is `:focus-visible`
  — or, in the kitchen-sink's stylesheet alone, `:focus-visible` with one more selector. The token
  file declares none. The `outline` field of `src/browser/view/terrain-picture.ts:26` and the class
  `.outline` of the drawing are no declarations and fall outside its population or its pattern.
- **Row 13 — contrast of every pair.** Reads `src/browser/tokens.css` as text and takes the
  `#rrggbb` of each role it names. The pairs and thresholds are literals of the test as row 13 lists
  them. The contrast ratio is computed by WCAG 2.2's definitions of contrast ratio and relative
  luminance, its constants taken from the environment fact of those definitions (QA-4), never from
  memory.
- **Row 14 — every value with its source.** Reads the token file as text: it holds only the `:root`
  rule of custom properties and `@font-face` rules, and every declaration — read as Decision 1
  defines it, from its name to its `;`, over however many lines — has directly after its `;`, on the
  same line, a comment opening with `Source:` and non-empty text. It checks that the entry is there,
  not that it is true (Q22).
- **Row 15 — kitchen-sink outside the build.** In a fresh copy of the working tree
  (`TreeCopy` of `loop2_invariant_support.py`), `npm run build` exits 0 and no file under `dist/`
  holds the page's marker, nor does `dist/kitchen-sink/` exist. As positive control, in a fresh copy,
  `npm run kitchen-sink -- --build-only` exits 0 and `dist/kitchen-sink/` holds the marker in the
  page's HTML. The control also compiles the page in every `npm test`.

### 8a. Settlement after the review of the revision (orchestrator, step 7)

The review of the revision (`reports/05-spec-review-revision.md`) left one finding, R1, and two
notes; the cycle's orchestrator settled them from the frozen task, without a further round:

- R1 — answered from Q15 and row 6: `transparent` and `currentColor` are exempt keywords. The test of
  row 11 reports named colours and system colours, in CSS and in TypeScript alike, and never
  `transparent` or `currentColor` (Decision 8 now says so).
- A declaration of the token file may span as many lines as Prettier gives it; Decisions 1 and 8 no
  longer say "one line or two".
- Beyond its entry the kitchen-sink page imports only modules the game itself uses; code only the page
  needs stays in its entry module, so no page-only code is compiled into `dist/public/` (Decision 4).

### 9. Files outside the three choices that the change brings in line

- `README.md` (build-tools): what `npm run build` copies (CSS and fonts added), the command
  `npm run kitchen-sink`, and the icons' description of change (To do 5).
- `tests/view/icons.test.mjs`: its expected icon colour and change text follow To do 5, as does the
  comment above the change text in `src/browser/view/credits.ts:11`.
- `eslint.config.mjs`: no change expected, since its browser program already lists
  `src/browser/**/*`; if ESLint shows otherwise, only the pattern a D-29 compliance example allows.

## Foundation entries

From the task's *Settlements to record* (worded by the foundation step from their sources):

- Row 1 — decision: loop2 adopts the pinned the-way's styleguide template with no departure.
- Row 2 — decision: the meanings of the five signal colours, each standing as text on the three
  backgrounds.
- Row 3 — decision: the meanings of the neutral roles and `selected`, the five text roles on the
  three backgrounds.
- Row 4 — decision: the meanings of the grid and focus roles, the step target told apart by shape.
- Row 5 — decision: the three WCAG 2.2 criteria with their thresholds and pairs, no return date.
- Row 6 — decision: what counts as a value in place of a design token, and its exemptions; the
  unitless kinds are the closed list of four (QA-1).
- Row 7 — decision: the six shared controls in `src/browser/view/controls/`, the three destructive
  buttons, loading not applying.
- Row 8 — decision: the kitchen-sink is built and opened locally by its own command, absent from
  `npm run build`, showing controls and tile samples, not the game. It may name the command and
  `src/browser/kitchen-sink/`.
- Row 9 — decision: Geist and Geist Mono kept in the product's files with their licence and copied
  at build, never fetched from another server. It may name `assets/fonts/` and the GitHub release as
  the source, with the npm package `geist` among *Rejected* (Decision 3, its `npm view` reading
  cited inline).
- Row 10 — decision changed in place: D-28 adds CSS to the deferred kinds beside HTML.
- Rows 11–15 — invariants, method test, as Decision 8 tests them. Row 12 rests on the fact of row
  18 (WCAG 2.4.7), as the styleguide template gives the visible-focus invariant; row 13 rests on the
  facts of rows 16 and 17 and on the new fact below.
- Rows 16–18 — environment facts: WCAG 2.2 1.4.3, 1.4.11 and 2.4.7, verbatim.
- Row 19 — environment fact: Geist is released under the SIL Open Font License 1.1.
- Row 20 — decision: a control is every element the browser lets the keyboard reach; one
  `:focus-visible` rule draws its focus from `focus`.

Beyond the rows, from this spec and the cycle answers:

- Environment fact (QA-4): WCAG 2.2's definitions of "contrast ratio" and "relative luminance",
  read from https://www.w3.org/TR/2024/REC-WCAG22-20241212/; the contrast invariant rests on it.
- Part map, `browser-view`: *Files* gain `src/browser/*.css`, `src/browser/kitchen-sink/**`,
  `assets/fonts/**` and the tests of rows 11–14; *Trust boundary* gains `assets/fonts/**`.
- Part map, `build-tools`: *Files* gain `tsconfig.kitchen-sink.json` and the test of row 15
  (`scripts/kitchen-sink.mjs` falls under `scripts/**`); *Trust boundary* gains
  `scripts/kitchen-sink.mjs` (QA-3).
- Part map, *External context*: a row for github.com/vercel/geist-font, them → us, untrusted.

## Left to the maker

- The names of the non-role custom properties, within Decision 1's rule.
- Which text size, spacing step and weight each present style maps onto (nearest step, ties
  upward — Q11, Q19 E), and how links are coloured on the dark backgrounds.
- The interface of the six controls and how each marks its error and empty states (To do 4).
- Whether the two builds share a copying helper (Decision 7); the file names inside
  `src/browser/kitchen-sink/` and in `dist/kitchen-sink/`; the marker string.
- How the script launches the default browser on each platform.
- The exact text patterns of the tests, within the readings of Decision 8, and their made-up probes.
- Which generic family keyword and which further keywords stand in each font stack after the Geist
  family, within Decision 1.
