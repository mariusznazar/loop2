---
name: loop2-play
description: How an agent runs the game on this computer and operates it in a real browser as a player does - npm run local over HTTPS, an account through the form, Playwright CLI with Playwright MCP where the CLI fails, reading motion from a stream of frames, ending the start. Use to check a screen or a change in the running game, or for any question about running the game locally.
---

# loop2-play

`npm run local` builds the game and runs it on this computer over HTTPS, with a database made for
that start. An agent operates it in a real browser with Playwright CLI, and with Playwright MCP
where the CLI fails. A check made here touches neither the test server nor a player's save.

This inspection adds to what a person checks and replaces none of it. Nothing of it stays in the
repository: no Playwright test, no frame, no snapshot. Its evidence goes into the report or the
request.

Run every command below in the repository's root: Playwright CLI finds its setting for the local
certificate, `.playwright/cli.config.json`, from the directory it is called in.

## Start the game

Run `npm run local` as a background command and wait for its line:

```text
Local game: https://127.0.0.1:53211 (Ctrl+C or npm run local:stop ends it)
```

That address is the game, and the system picks its port at each start, so read it from the line.
The line above it, `Loop: http://127.0.0.1:…`, is the server behind the address; a browser cannot
sign in there. `Account mail failed: ESOCKET` in the output is expected: mail goes to an address
where nothing answers.

Each start has a database of its own under `.runs/local-start/` and removes those of the starts
that have ended, so an account lives until the next start. Two starts side by side do not touch
each other. Every account is made through the form, with a made-up address at `example.test`.

## Operate the game with Playwright CLI

`playwright-cli` is a program installed on the computer, not a dependency of the repository. Where
`playwright-cli --version` fails, stop and tell the human: installing it is their step.

```sh
playwright-cli open https://127.0.0.1:53211
playwright-cli snapshot
playwright-cli fill <ref> "agent@example.test"
playwright-cli click <ref>
playwright-cli reload
playwright-cli eval "document.body.innerText.match(/Minuta[^\n]*/)[0]"
```

`snapshot` lists the page with a reference for each element; references change after a reload, so
take a new snapshot before the next click. The session has no window and closes by itself after an
hour. Its working files go to `.playwright-cli/`, which git ignores.

The way into a map run:

1. Under „Załóż konto”, fill „Adres e-mail”, „Hasło” (at least 12 characters) and „Powtórz hasło”,
   then click „Załóż konto”. „Nie udało się wysłać wiadomości. Spróbuj ponownie później.” is
   expected here.
2. In „Drużyna”, fill „Imię nowej postaci” and click „Załóż”.
3. Click „Wyślij” at the character. The line „Minuta …” appears and its number grows once a second
   at the pace 1×.
4. After a reload the same map run comes back paused, with „(pauza)” in that line. Click „Wznów”.
   A map run also stops by itself at a discovery, again with „Wznów”.

## Read motion from a stream of frames

The text of a page shows no motion, and one screenshot misses what lasts a moment. With a map run
going, read the frames of the next three seconds into files:

```sh
playwright-cli --raw run-code --filename .claude/skills/loop2-play/frames.js | node .claude/skills/loop2-play/save-frames.mjs
```

It prints the path of each frame, a JPEG image, in `.playwright-cli/frames/`, with its milliseconds
since the first frame. Open the frames you need; each costs tokens. The stream gives a frame when
the screen changes, so a paused map run gives one frame, and a run at 1× about one a second. To
watch something else, copy `frames.js` to `.playwright-cli/` and change what it waits for.

## Where the CLI fails: Playwright MCP

Playwright MCP has no setting for the local certificate here, so its first navigation ends in
`ERR_CERT_AUTHORITY_INVALID`. Run this through `browser_run_code_unsafe`, with the address of the
start, once for each new tab:

```js
async (page) => {
  const session = await page.context().newCDPSession(page);
  await session.send("Security.setIgnoreCertificateErrors", { ignore: true });
  await page.goto("https://127.0.0.1:53211/");
}
```

After that `browser_navigate`, `browser_snapshot`, `browser_click` and the other tools work on the
game as usual. For images use `browser_take_screenshot`: the stream of frames above is the CLI's.

## End the check

```sh
playwright-cli close
npm run local:stop
```

`npm run local:stop` ends every start of this checkout and says how many; a person at the console
uses Ctrl+C. It needs no process number. The database stays until the next start and is no leftover
to clean up. Delete `.playwright-cli/` when the evidence is in your report.

## What this start cannot check

- Mail: no message leaves, so confirming an address and setting a new password end on the test
  server, where a person goes through them.
- The tunnel in front of the test server: this start's HTTPS proxy stands in for it, and headers
  made up here prove nothing about that route.
- Late states of the game: they take too long to reach by playing.
