#!/bin/sh
# usage: setup2.sh <port> <email> <state file in .runs/executor-4> <map name>
PORT=$1; EMAIL=$2; STATE=$3; MAP=$4
playwright-cli close >/dev/null 2>&1
playwright-cli open "https://127.0.0.1:$PORT" >/dev/null
cat > .playwright-cli/signup.js <<EOT
async (page) => {
  await page.getByRole("button", { name: "Załóż konto", exact: true }).first().click();
  await page.getByRole("textbox", { name: "Adres e-mail" }).fill("$EMAIL");
  await page.getByRole("textbox", { name: "Hasło", exact: true }).fill("AgentPassword123");
  await page.getByRole("textbox", { name: "Powtórz hasło" }).fill("AgentPassword123");
  await page.getByRole("button", { name: "Załóż konto", exact: true }).last().click();
  await page.getByRole("heading", { name: "Siedziba" }).waitFor();
  return "signed up";
}
EOT
playwright-cli --raw run-code --filename .playwright-cli/signup.js
{ printf 'async (page) => {\n  const saved = '; tr -d '\n' < ".runs/executor-4/$STATE"; cat <<'EOT'
;
  return page.evaluate(async (saved) => {
    const current = await (await fetch("/api/saved-game")).json();
    const reply = await fetch("/api/saved-game", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ version: saved.version, basedOn: current.save?.revision ?? 0, game: saved.game }),
    });
    return `${reply.status} ${await reply.text()}`;
  }, saved);
}
EOT
} > .playwright-cli/send-state.js
playwright-cli --raw run-code --filename .playwright-cli/send-state.js
playwright-cli reload >/dev/null
cat > .playwright-cli/enter.js <<EOT
async (page) => {
  await page.getByRole("link", { name: "Mapy", exact: true }).click();
  await page.getByRole("link", { name: /$MAP/ }).first().click();
  await page.getByRole("button", { name: /Wejdź: Agent, mapa $MAP/ }).click();
  await page.waitForSelector(".scene");
  return await page.evaluate(() => document.body.innerText.match(/Minuta[^\n]*/)?.[0]);
}
EOT
playwright-cli --raw run-code --filename .playwright-cli/enter.js
