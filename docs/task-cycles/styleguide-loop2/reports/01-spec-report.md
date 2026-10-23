# Report 01 — spec designer

- Status: `done`
- Spec: `.runs/task-cycles/styleguide-loop2/spec.md`
- Method: `.the-way/task-cycle/spec/SKILL.md` at the pin `f0b2130`, as the designer
- Check run: no test or check of the product. Read-only probes: `npm view geist version
  peerDependencies dependencies license --json` (exit 0, 2026-10-23: version 1.8.2,
  `peerDependencies: {"next": ">=13.2.0"}`); Prettier 3.9.10 `--no-config --no-editorconfig` on a
  scratch CSS file (exit 0; a trailing `/* … */` comment stays on its declaration's line); WCAG
  contrast of the settled values computed in a scratch script (every pair of row 13 passes; lowest
  text pair 4.53:1, `control-border` on `highlight` 3.09:1, `character` on `tile-revealed` 3.34:1,
  `tile-revealed` against `tile-hidden` 3.67:1). The scratch formula was for orientation only; the
  test takes its constants from the environment fact of QA-4.

## Read

Frozen task `task.md` whole; cycle record `cycle.md`; `AGENTS.md`; `guidelines/coding.md` and
`guidelines/coding-browser-module.md` (selected by `.the-way/product-guidelines/reading.md`; no
styleguide exists, this task writes it); `foundations/decisions.md` whole; the part map whole; the
invariants the change reaches (`browser-view-framework`, `application-build-output`,
`application-package-layout`, `application-build-layout`, `content-identifiers`, `icon-file-content`,
`icon-credits`, `loop2-container-icons`, `terrain-drawing-numbers`, `eslint-source-rules`,
`prettier-source-format`, `introduced-npm-vulnerabilities`); the-way's glossary entries used;
the-way's styleguide template; the code: `src/browser/index.html`, `scripts/build.mjs`,
`package.json`, both `tsconfig.*.json`, `eslint.config.mjs`, `Dockerfile`, `.dockerignore`,
`.gitattributes`, the view modules, and the tests that read `src/browser`, `dist/public` or the part
map.

## Questions sent and answers

Batch 1, answered by the orchestrator (provisional; `cycle.md`, questions table, QA-1..QA-4, QA-r):

| ID | Question | Recommended | Answer |
|---|---|---|---|
| QA-1 | Is Q15's list of unitless values closed? (`line-height: 1.4` has no settled source) | closed; `line-height` stays | closed; `line-height: 1.4` stays in the stylesheet |
| QA-2 | Width and source of the tile edge, which Q19 does not give | Q11's frame width, same token | as recommended |
| QA-3 | Is `scripts/kitchen-sink.mjs` a trust boundary of `build-tools`? | yes | yes; reviews check its address and file root |
| QA-4 | One more environment fact for WCAG 2.2's definitions of contrast ratio and relative luminance? | yes | yes; read from the Recommendation, never from memory |
| QA-r | Five readings (opening the page; Q15's scope by file kind; row 12's stylesheets; test language and parts; row 15's marker) | as stated | accepted |

No answer opened a new question.

## Ways weighed

- **Token file.** Chosen: `src/browser/tokens.css`, custom properties plus `@font-face`, a trailing
  `Source:` comment on every declaration line. Rejected: JSON with a generator in the build (a build
  step and generated CSS for no gain a test needs); a TypeScript module applying properties at run
  time (late styles; tests reading compiled code).
- **Stylesheet.** Chosen: one `src/browser/styles.css`. Rejected: one per control or screen (link or
  `@import` chains with no rule asking for them).
- **Fonts.** Chosen: woff2 files and the OFL licence of a pinned release of
  github.com/vercel/geist-font in `assets/fonts/`, with one line each in `Dockerfile` and
  `.dockerignore`. Rejected: npm `geist` (peer dependency on Next.js brings Next.js and React into the
  lockfile and every D-33 audit; files in `node_modules`, not in the product's files; D-27's ground
  against an npm icon package); `src/browser/fonts/` (binaries among sources, apart from the icons).
- **Kitchen-sink place.** Chosen: `src/browser/kitchen-sink/`, excluded from `tsconfig.browser.json`,
  compiled by `tsconfig.kitchen-sink.json` into `dist/kitchen-sink/`; one literal of
  `test_application_build_output.py` follows. Rejected: `src/kitchen-sink/` (outside the reach of
  `content-identifiers` and `browser-view-framework`, against the task's D-18 note, and new ESLint,
  Prettier and `.gitattributes` patterns); `tests/view/`; serving from the account server (Q13).
- **Kitchen-sink command.** Chosen: `npm run kitchen-sink` compiles, assembles, serves with
  `express.static` on `127.0.0.1` at a system-picked port, prints and opens the address; `--build-only`
  for the test's positive control. Rejected: opening from `file://` (module scripts refused); a
  hand-written static server (path handling to get right); a fixed port (clash with `npm start`).

## Four checks of the spec

1. Placeholder, `TBD` or empty section: none.
2. Contradictions: one found and fixed — Decision 1 first said nothing in the repository holds a
   counted value, wider than Q15's scope (tests hold colour literals); it now says no other file of
   `browser-view`, outside Q15's exemptions. A wrong cross-reference (non-goals pointing to
   Decision 9 instead of 8) fixed. No decision found against the task or the foundation: the third
   TypeScript configuration leaves D-06's two and their build untouched; `express` in a script adds no
   dependency; the `outline` field of `terrain-picture.ts:26` is outside the focus test as Q22 says.
3. Scope: the three choices are coupled (the page links the token file and stylesheet and copies the
   fonts), but the task as a whole holds independent pieces — fonts and their copying, the token file
   with the restyle, the controls, the terrain redraw with the icon recolouring, the kitchen-sink and
   its command, the tests, the styleguide and instruction files. The spec settles no order; the plan
   can slice along these lines.
4. Requirements readable two ways, now written down: "builds and opens" (serve on loopback, print,
   launch the browser, launch failure no error); Q15's scope by file kind; row 12's "stylesheets"
   (the part's `.css` files); the closed unitless list (QA-1); which fonts files (weights 400 and
   500 of both families, static where the release has them); the release (newest at fetch time,
   tag and commit in the sources).

## Concerns for the next dispatch

- The foundation step writes one entry beyond the task's 20 rows: the environment fact of WCAG 2.2's
  definitions (QA-4), on which the contrast invariant rests; its author reads them from
  https://www.w3.org/TR/2024/REC-WCAG22-20241212/.
- Part map lines beyond To do 9's list: trust boundary `scripts/kitchen-sink.mjs` of `build-tools`
  (QA-3) and `tsconfig.kitchen-sink.json` in its *Files*.
- No test checks that the container serves the fonts; a missing `!assets/fonts/` in `.dockerignore`
  shows only where Docker runs, as a failed image build in `tests/deploy/test_loop2_image_icons.py`
  and `tests/invariants/test_loop2_container_icons.py`. Unchecked where no Docker daemon answers.
- Text still describing the dark icons, to change with To do 5: `README.md:53`, `README.md:59`,
  `tests/view/icons.test.mjs:87` (`#2b2b2b`) and `:116` (the change text).
- The spec assumes ESLint's typed program for the browser covers `src/browser/kitchen-sink/` without a
  configuration change (it lists `src/browser/**/*` itself); the maker confirms it by running ESLint.

## Revision 1 — after the spec review (FAIL, `02-spec-review.md`, findings `03-spec-findings.md`)

Probe run for the revision: Prettier 3.9.10 `--no-config --no-editorconfig` on a scratch token
file with a font stack, `@font-face` descriptors and long `Source:` comments (exit 0): the stack
breaks after the colon and its comment stays after the `;` on the second line; the descriptors stay
on one line each. No test or check of the product.

| Finding | What changed in `spec.md` |
|---|---|
| F1 — Prettier breaks font stacks across two lines | Decision 1 defines a declaration as running from its name to its `;`, over one line or two, with the `Source:` comment directly after the `;` on the same line; Decision 8, row 14, reads declarations that way. Goals reworded to "its source right after it". As the reviewer recommended. |
| F2 — where a colour name counts | Decision 8, row 11: CSS text is stylesheet files plus `<style>` content and `style` attribute values; colours, lengths, font names and unitless values count in declaration values only, never selectors, property names, custom property names or names inside `var()`. In TypeScript, colours count inside string and template literals only, colour keywords and system colours as whole words in any case, Q18 role names as text exempt. Names the two cases the reviewer found (`field` in `program-editor.ts:381-383`, a `.highlight` selector) as not reported. As the reviewer recommended. |
| F3 — licence bytes under `core.autocrlf=true` | Decision 3 adds `assets/fonts/** -text` to `.gitattributes` (part `deployment`) beside the `Dockerfile` and `.dockerignore` lines; its cost line counts it. As the reviewer recommended. |

Non-blocking notes taken up:

- "release of Decision 4" corrected to Decision 3.
- `font-display`: Decision 1 now limits a `@font-face` rule to `font-family`, `src` and
  `font-weight`, each with a source, and names no `font-display` (To do 2 gives it no source); the
  font stacks' generic family is a keyword sharing the stack's source (Q11). *Left to the maker*
  drops `font-display` and keeps only the choice of keywords after the Geist family.
- `tsconfig.kitchen-sink.json` sets its own `include` and `exclude` and, if it extends the browser
  configuration, does not inherit its `exclude` (Decision 5).
- Decision 4 holds the page to exactly three files — HTML, one TypeScript entry module, one
  stylesheet; code beyond the entry belongs to `src/browser/view/`.
- *Foundation entries*: row 12 rests on the fact of row 18 (WCAG 2.4.7).
- Decision 9 adds the comment at `src/browser/view/credits.ts:11` to what follows To do 5.

Four checks on the revised spec: no placeholder or empty section; no contradiction found between
the revised Decisions 1, 3, 4, 5, 8 and the rest (the `.gitattributes` line adds a third
`deployment` file the scope already reaches through `Dockerfile` and `.dockerignore`); scope
unchanged; the two readings F1 and F2 named are now written down.
