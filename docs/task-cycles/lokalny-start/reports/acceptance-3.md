# Acceptance check 3

Result: all seven steps went through.

## Steps, commands, exit codes
- Read AGENTS.md, then .claude/skills/loop2-play/SKILL.md (as pointed by AGENTS.md line 14). No source read.
- Prep: `playwright-cli --version` -> 0.1.22, exit 0. `git status --short` -> empty.
1. Start: `npm run local` (background, log to temp file). Lines: `Loop: http://127.0.0.1:62298`, `Local game: https://127.0.0.1:62300 (Ctrl+C or npm run local:stop ends it)`. Game address: https://127.0.0.1:62300. Startup took under 60 s.
2. Sign-up: `playwright-cli open https://127.0.0.1:62300` (0), `snapshot` (0), `fill` e22/e25/e28 with agent3@example.test and a 21-char password, `click e29` (0). Page showed "Wyloguj", "Nie udało się wysłać wiadomości. Spróbuj ponownie później." (expected), and Drużyna section.
3. Character: `fill e90 "Ala"`, `click e91` (Załóż), then `click e104` ("Wyślij: Ala, mapa Las") (0).
4. Minute grows: `playwright-cli eval "document.body.innerText.match(/Minuta[^\n]*/)[0]"`
   - t0: "Minuta 1 · Czeka — żadna reguła nie pasuje · Passa 1/480"
   - ~4 s later: "Minuta 7 · Czeka — żadna reguła nie pasuje · Passa 7/480"
5. Reload: `playwright-cli reload` (0). Status: "Minuta 8 · Czeka — żadna reguła nie pasuje · Passa 8/480 (pauza)"
6. Resume: snapshot showed `button "Wznów" [ref=f1e47]` (ref in an iframe-style prefix, worked); `click f1e47` (0). Status after 2 s: "Minuta 12 · Czeka — żadna reguła nie pasuje · Passa 12/480"
7. Frames: `playwright-cli --raw run-code --filename .claude/skills/loop2-play/frames.js | node .claude/skills/loop2-play/save-frames.mjs` (exit 0). 4 frames, in `.playwright-cli/frames/` (000.jpeg +0 ms, 001 +388, 002 +1388, 003 +2388). Opened 003.jpeg: the game view with status "Minuta 16 · Czeka — żadna reguła nie pasuje · Passa 16/480" and buttons Pauza/1×/2×/4×/8×/16×/Restart/Zakończ, stats (Temperatura 36,6 °C, Sytość 90 %, Zdrowie 100, Energia natury 100, Plecak 0/15), a hex map with one highlighted hex and item icons patyk/jagoda/mech/włókno; left side the program editor ("Kopia w przejściu", "Plan wyprawy"), "Adres e-mail niepotwierdzony." banner.
   Note: `run-code` echoed a stray line `await page.evaluate(...)` before the paths (harmless).

## Files read, in order
1. AGENTS.md
2. .claude/skills/loop2-play/SKILL.md
3. Played script files only executed, not read: frames.js, save-frames.mjs.

## Gaps
none (minor: the stray `await page.evaluate(...)` echo line from the CLI in outputs; the playwright-cli eval snippet in SKILL.md worked as written. Step 3 needed a ref re-snapshot after the character was made, which the skill says.)

## End and cleanup
- `playwright-cli close` (0), `npm run local:stop` -> "Local starts stopped: 1" (0), removed `.playwright-cli/`.
- Check: `netstat -ano | grep 62298|62300` shows only TIME_WAIT entries; LISTENING count on 6230x = 0. 
- `git status --short` output: (empty)
