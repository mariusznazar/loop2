
const RUN = "#/postac/1/przejscie";

const escape = (target) =>
  inAct(() =>
    target.dispatchEvent(
      new window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    ),
  );

await onPage("create character", withEdgeSolved(game.newGame()), "#/", {}, async (c) => {
  await c.tick(1000);
  const field = [...c.document.querySelectorAll("input")].find((i) => shown(i));
  log.push(`field ${field ? field.id : "none"}`);
  if (field) await typeInto(field, "Cela");
  await c.click("Załóż");
  await c.record("created");
  await c.tick(1000);
  await c.record("after tick");
});

await onPage("escape window and leave", dead(going()), RUN, {}, async (c) => {
  await c.tick(1000);
  await c.record("window");
  await escape(c.document.activeElement);
  await c.record("escaped");
  await c.follow("#/mapy");
  await c.record("maps from ended run");
  await c.follow("#/mapy/forest");
  await c.record("map card from ended run");
  await c.follow(RUN);
  await c.record("back on ended run");
  await c.click("Koniec przejścia");
  await c.record("koniec");
});

await onPage("halt on ended run", dead(going()), RUN, {}, async (c) => {
  await c.tick(1000);
  await inAct(() => c.view.halt());
  await c.click("✕");
  await c.record("x after halt");
  await c.follow("#/");
  await c.follow(RUN);
  await c.record("back after halt on ended run");
  await c.click("Koniec przejścia");
  await c.click("Zakończ");
  await c.record("end after halt");
});

await onPage("commit on leaving programs", twoPrograms(), "#/programy/1", {}, async (c) => {
  await c.tick(1000);
  await c.click("Zmień nazwę");
  await c.record("rename open");
  const field = [...c.document.querySelectorAll("input")].find((i) => shown(i));
  log.push(`field ${field ? field.id : "none"}`);
  if (field) {
    await inAct(() => field.focus());
    await typeInto(field, "Nowa");
  }
  await c.record("typed");
  await c.follow("#/programy/2");
  await c.record("program 2");
  await c.follow("#/");
  await c.record("left programs");
});

await onPage("going run left by maps", going(), RUN, {}, async (c) => {
  await c.tick(1000);
  await c.click("Wznów");
  await c.tick(2000);
  await c.record("going");
  await c.follow("#/mapy");
  await c.record("left to maps");
  await c.tick(1000);
  await c.follow(RUN);
  await c.record("returned");
  await c.click("Wznów");
  await c.tick(1000);
  await c.click("Pauza");
  await c.record("paused");
});

writeFileSync(OUT, log.join("\n"), "utf8");
console.log("lines", log.length);
process.exit(0);
