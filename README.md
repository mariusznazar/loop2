# Loop

A TypeScript application: a browser game built in React and an Express 5 server that serves its files.

## Product description and the MVP2 epic

Who the game is for, what problem it solves, what goes into MVP2 and what we deliberately leave out — all of it stands in the epic issue [#100 "Epik: MVP2 — ekrany, oprawa i samouczek" ("Epic: MVP2 — screens, presentation and tutorial")](https://github.com/mariusznazar/loop2/issues/100). Under it are the MVP2 tasks, each with its full task document, its acceptance criteria and the pull request that did it.

The decisions that describe the game are recorded in the foundation, in the decision log [`foundations/decisions.md`](foundations/decisions.md).

How agents are permitted to work here, where the secrets are kept and how a trial of prompt injection ended: [`security-notes.md`](security-notes.md).

Requirements: Node.js 24.15.0 or newer in the 24 line (`^24.15.0`) and the npm that comes with it. Run every command in the root directory of the repository.

## First run

1. `npm ci` — install according to the lock file.
2. `npm run local` — build the game and run it on this computer over HTTPS.
3. Open the address from the line `Local game: https://127.0.0.1:…`, which the command prints at the end. The system picks the port at every start.
4. The browser warns about the certificate, because the command makes its own at every start. Choose to go on past the warning.
5. Create an account on the login card: the "Załóż konto" ("Create account") switch, then the form.

Stop with Ctrl+C or `npm run local:stop`. The second command stops every running start of this directory.

This way is for checking, not for playing for good, because the game is played on the test server:

- **The account is lost at the next start.** Every start has its own database in `.runs/local-start/` and deletes the databases of the starts it does not find running; a start whose process number is in use and whose port accepts a connection and stays silent counts as running. Two starts running side by side do not get in each other's way in two browsers or two sessions; in one browser they share the session cookie, so logging in on one logs you out of the other.
- **Mail goes nowhere.** The mail settings point to an address where nothing answers, so after registration the page says the message could not be sent, and the address stays unconfirmed. Confirming the address and setting a new password are done on the test server.
- **The certificate is made by `openssl`** from `PATH` or from the Git for Windows installation. The key lives only in the memory of the command.

Two commands build and run the server, `npm run build` and `npm start`; `npm run typecheck` checks the types of the browser and the server without emitting files. Their description and the notes on the graphics follow:

1. `npm run build` — compile both parts to `dist/browser` and `dist/server`, bundle the browser code with esbuild into `dist/public`, and copy there the HTML, the style sheets that lie directly in `src/browser/`, the icons from `assets/icons/`, the Geist fonts with their licence from `assets/fonts/` (to `dist/public/fonts`) and the PNG files from `assets/sprites/` (to `dist/public/sprites`).
2. The graphics in `assets/sprites/` come from three packs. The first is the Pixel Crawler pack by Anokolisa, whose terms do not require a mention: the picture of the game behind the login card, `assets/sprites/login-backdrop.png`, and the frame of a forest in snow in the scene, `assets/sprites/forest-scene.png`, are composed of its graphics; the mage in the scene, `assets/sprites/mage-idle.png`, `assets/sprites/mage-run.png` and `assets/sprites/mage-death.png` (the mage's death sheet moved to the 64 × 64 px frames in which the scene draws the mage), and the campfire, sticks, bush and moss of the scene, `assets/sprites/fire.png`, `assets/sprites/sticks.png`, `assets/sprites/berry-bush.png` and `assets/sprites/moss.png`, are cut out of it; the bending mage, `assets/sprites/mage-bend.png`, is made by hand from the pack's mage, and the smaller flame of the campfire, `assets/sprites/fire-small.png`, is cut down by hand from the frames of its fire; the camp at the top of the "Siedziba" ("Headquarters") screen is made of a clearing, `assets/sprites/camp-clearing.png`, composed of its snow and trees, and of a chest, `assets/sprites/chest.png`, cut out of its sheet of interior props; the characters and the campfire of the camp are drawn from the same mage and campfire files as in the scene. The second pack is "[LPC] Wolf Animation" (CC BY 3.0): the wolf, `assets/sprites/wolf-idle.png`, `assets/sprites/wolf-run.png`, `assets/sprites/wolf-bite.png` and `assets/sprites/wolf-death.png`, is made of frames cut out of its sheets. The third is "Smoke & Fire Animated Particle [16x16]" (CC BY 3.0): the cloud of dust of a miss and of a scuffle, `assets/sprites/dust.png`, is made of its smoke, recoloured to the browns of the scene. The licences of the second and the third pack ask for a credit, which the section "Autorzy grafiki" gives.
3. `npm run kitchen-sink` does not copy files from `assets/sprites/`.
4. `npm start` — run the built server.

`npm start` needs a build first. By default the server listens on 127.0.0.1:3000; change the address with the environment variables `LOOP2_LISTEN_HOST` and `LOOP2_LISTEN_PORT`. Stop it with Ctrl+C. Without the account settings the page opens, but the server answers account requests with code 503, so nobody gets into the game; `npm run local` leads to the game.

## Code check tools

`npm ci` also installs the developer tools according to the shared `package-lock.json`. The npm that comes with Node.js is enough for the first install; the checks then use the pinned local tools and download nothing while checking. When the lock file is updated on purpose, the local `min-release-age` setting may reject a newly accepted version of a tool as too fresh. For such an accepted version, `--min-release-age=0` can be added to the one-off command that updates the lock file, keeping the global settings. An ordinary install still uses `npm ci`.

The `typescript` package gives the linter the TypeScript 6.0.2 API; an `overrides` entry also pins the actual API version that its compatibility package exports. The separate `typescript-compiler` holds TypeScript 7, and the build script runs its compiler explicitly for both configurations of the application. Use the project's build commands; a bare `npx tsc` picks among the executables available.

Ruff and ShellCheck need Python 3.9 or newer and a separate, local environment. They need neither an activated environment nor a global install. `requirements-quality.in` declares the versions, and `requirements-quality.txt` pins the whole set of packages and the hashes of their ready wheel files. The install downloads only compatible wheel files; on a platform with no such file it ends in an error, with no building from source and no choice of another version.

Windows (PowerShell):

```powershell
python -m venv .runs/quality-venv
.runs/quality-venv/Scripts/python.exe -m pip install --require-hashes -r requirements-quality.txt
.runs/quality-venv/Scripts/ruff.exe --version
.runs/quality-venv/Scripts/shellcheck.exe --version
```

Linux/macOS:

```sh
python3 -m venv .runs/quality-venv
.runs/quality-venv/bin/python -m pip install --require-hashes -r requirements-quality.txt
.runs/quality-venv/bin/ruff --version
.runs/quality-venv/bin/shellcheck --version
```

Ruff must report `ruff 0.17.1`, and ShellCheck the line `version: 0.11.0`. The package `shellcheck-py==0.11.0.1` supplies that ShellCheck executable; its trailing `.1` is the version of the Python wrapper. After a change of the pinned tools, repeat the install from the lock file and check both versions.

`npm test` runs the code checks through `tests/quality/test_quality_invariants.py`, straight from the local copies in `node_modules` and `.runs/quality-venv`, with no downloading of tools while checking. ESLint and Ruff read `eslint.config.mjs` and `ruff.toml`; Prettier checks with its default settings. The flags stand in that test. The editor uses `prettier.config.mjs`, which sets no option; pick the local Prettier and do not override its settings separately. The dependency audit (`scripts/audit_dependencies.py`) queries the public npm registry only when `package-lock.json` differs from its version at `git merge-base HEAD origin/HEAD`, and then compares the `npm audit` reports of both lock files. ESLint also covers new TS/JS files in the directories its configuration names; the helper programs of the TS6 API in its configuration give type information also to the scripts and tests outside the application's compile configurations. Python and Bash are not formatted automatically.

## Icons

The resource icons come from game-icons.net (licence CC BY 3.0). The icons are changed from the source: the black background is removed and the shape is in a light colour. Their sources lie in `assets/icons`, outside the directory the server serves; `npm run build` copies them to `dist/public/icons`. The titles of the icons are held by the resource data in `src/browser/sim/data/resources.ts`, next to the icon's file name; the authors of the icons and the source commit are held by `src/browser/view/credits.ts`, and the required mentions are shown by the collapsed section "Autorzy grafiki" ("Graphics credits") on the login card and at the bottom of the "Siedziba" ("Headquarters") screen.

## The page of all states

`npm run kitchen-sink` builds the page of all states from `src/browser/kitchen-sink/` — every shared control in every state, or with the reason why a state does not apply to it, every colour role and the samples of tiles — into `dist/kitchen-sink/`, serves it on 127.0.0.1 at a port the system picks, prints its address and opens it in the default browser; if the browser does not open, go to the printed address. Stop with Ctrl+C. `npm run kitchen-sink -- --build-only` only assembles `dist/kitchen-sink/`, with no server and no browser. The command writes nothing outside `dist/kitchen-sink/`. `npm run build` does not include this page, so it does not reach the test server; its style sheet lies in `src/browser/kitchen-sink/`, outside the style sheets copied to `dist/public`.

## Local work and checking

`npm run local` does not watch files: after an edit, stop it with Ctrl+C or `npm run local:stop` and run the command again. `npm run dev` builds the application and runs the server without account settings, like `npm start`.

An agent operates a running game in a real browser according to the skill `loop2-play` (`.claude/skills/loop2-play/SKILL.md`). The certificate setting for the Playwright CLI stands in `.playwright/cli.config.json`, and its working files in the ignored directory `.playwright-cli/`. Run the commands in the root directory of the repository. Such a check is added to the manual one and replaces nothing in it.

`npm test` is the one command of all tests. It builds the application and runs the HTTP tests, the server start tests and the simulation and view tests in Node, with no browser. Every test that starts the server gives it, in `LOOP2_LISTEN_PORT`, a free port chosen by the system, so two runs of `npm test` on one computer do not collide on a port, and port 3000 may be in use meanwhile. The exception is one test file of the default address, `tests/invariants/test_account_server_default_address.py`: it starts the server without `LOOP2_LISTEN_HOST` and `LOOP2_LISTEN_PORT` in a case for each of the two starts, one wholly unconfigured outside production and one fully configured with valid settings, and each case passes when the server reports ready on 127.0.0.1:3000 (the test closes it at once) or ends with an error that 127.0.0.1:3000 is taken. Then it runs the Python tests from every directory of `tests/` (invariants, deployment, quality, agent work) through `python -B .the-way/gate/run_tests.py`, so the directories run at the same time. Next it checks the foundation through `python -B .the-way/elements/common/foundation_check.py`, and last the instruction files for agents through `python -B .the-way/instruction-files/check_instructions.py`. The first error stops the later steps; the last check stops the gate only with an error, not with a warning. It needs Python 3.14 on `PATH` as `python`, the initialized submodule `.the-way`, the environment `.runs/quality-venv` described above, and, when the change touches `package-lock.json`, access to the npm registry too.

In the browser, after `npm run local` and creating an account, check that `/main.js` loads without an error, the console holds no runtime errors, and the page shows the "Siedziba" ("Headquarters") screen with the collapsed section "Autorzy grafiki" ("Graphics credits") at the bottom, and in the menu "Konto" ("Account") stands "Wyloguj" ("Log out"); after creating a character, "Mapy" ("Maps"), the row "Skraj lasu" ("Forest edge") and "Wejdź" ("Enter"), the page leads to the "Przejście" ("Passage") screen, where the header shows the character's name, the map's name and the game minute rising every second, under the drawing of the map stand the tabs "Kronika" ("Chronicle") and "Teren" ("Terrain"), and on the right stands the program.

One test file: `npm test -- tests/sim/hex.test.mjs` or `npm test -- tests/quality/test_audit_dependencies.py`. The gate takes exactly one file: Node runs it after the build, Python without the build, without the other tests, the foundation check and the check of the instruction files. A wrong file, or a run in which no test was executed, ends in failure. Before a request, a full `npm test` with no arguments is required.

On GitHub the same `npm test` runs on Linux at every request to merge into `main` (`.github/workflows/tests.yml`, the job `tests`), with `.the-way` at the commit the repository pins. D-413 in `foundations/decisions.md` gives the reason for choosing Linux. The container test is skipped with a message in the log when the Docker daemon does not answer and the computer has no Docker Desktop to start (D-390), so the log of the run shows whether those tests ran; the Windows paths are checked by the local gate.

The mutation tests of the simulation are run by the reviewer on the changed files: `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/hex.ts"`. The scope, the assessment of surviving mutants and the condition for removing the tool are described by the rule Mutation testing in `guidelines/testing.md`. This is a separate check, outside the ordinary `npm test`.

An unknown `/api`, `/api/` and paths under `/api/` get a JSON 404. The other missing paths get a plain 404. The server serves only `dist/public`.

The browser code is in `src/browser` — the game's simulation in `src/browser/sim`, the screens in `src/browser/view` — and the server code in `src/server`. The compilations have separate type configurations; the dependencies and the lock file are shared. The game is computed in the browser, and the server keeps the players' accounts and the saves of the game state; the application is deployed to the test server through a container and the skill `loop2-deploy`.
