async (page) => {
  await page.evaluate(async () => {
    const [game, actions, conditions, creatures, items, campfire, headquarters,
      status, combatLine, bodyRow, terrain, editor] = await Promise.all([
      import("/sim/game.js"),
      import("/sim/data/actions.js"),
      import("/sim/data/conditions.js"),
      import("/sim/data/creatures.js"),
      import("/sim/data/items.js"),
      import("/sim/data/campfire.js"),
      import("/view/headquarters.js"),
      import("/view/status-row.js"),
      import("/view/combat-line.js"),
      import("/view/body-row.js"),
      import("/view/terrain-panel.js"),
      import("/view/program-editor.js"),
    ]);
    const understanding = {
      actions: Object.keys(actions.ACTIONS),
      conditions: Object.keys(conditions.CONDITIONS),
      items: [...Object.keys(items.ITEMS), campfire.CAMPFIRE.id],
      creatures: Object.keys(creatures.CREATURES),
    };
    const rule = (condition, action) => ({ condition, action });
    const below = (kind, value) => ({ kind, value });
    const itemBelow = (item, value) => ({ kind: "itemBelow", item, value });
    const gather = (resource) => ({ kind: "gather", resource });
    const walkTo = (resource) => ({ kind: "walkTo", resource });
    const rules = [
      rule(below("satietyBelow", 80), { kind: "eat" }),
      rule(below("temperatureBelow", 36), { kind: "lightCampfire" }),
      rule(below("temperatureBelow", 36.5), { kind: "feedCampfire" }),
      rule(below("temperatureBelow", 35.2), { kind: "walkToCampfire" }),
      rule(below("campfireLeftBelow", 1), { kind: "craftCampfire" }),
      rule(itemBelow("berry", 1), gather("berry")),
      rule(itemBelow("berry", 1), walkTo("berry")),
      rule({ kind: "hereBelow", resource: "berry", value: 1 }, { kind: "explore" }),
      rule(itemBelow("berry", 1), { kind: "wander" }),
      rule(itemBelow("stick", 8), gather("stick")),
      rule(itemBelow("stick", 8), walkTo("stick")),
      rule(below("temperatureBelow", 36), { kind: "lightItem" }),
      rule({ kind: "always" }, { kind: "explore" }),
      rule({ kind: "awayFromCampfire" }, { kind: "walkToCampfire" }),
      rule({ kind: "always" }, gather("stick")),
      rule({ kind: "always" }, gather("berry")),
      rule({ kind: "always" }, { kind: "wander" }),
    ];
    const program = {
      groups: [{
        id: 1,
        name: "Program",
        condition: { kind: "always" },
        rules: rules.map((entry, index) => ({ ...entry, id: index + 1 })),
      }],
      nextGroupId: 2,
      nextRuleId: rules.length + 1,
    };
    let state = { ...game.newGame(), understanding };
    state = game.createCharacter(state, "Ala").state;
    state = game.createCharacter(state, "Ola").state;
    state = game.setProgram(state, program).state;
    const sent = game.send(
      state,
      { mapId: "forest", characterId: 1 },
      1760000800000 + 49 * 137,
    ).state;
    const completed = game.advanceMinutes(sent, 700).state;
    if (!completed.solvedMaps.includes("forest"))
      throw new Error("The real simulation did not complete the prepared forest run.");
    state = completed;
    const fullCheckpoint = game.end(completed).state;
    const combatKnowledge = {
      ...understanding,
      actions: understanding.actions.filter(
        (kind) => !["strikeWithStick", "kick", "dodge"].includes(kind),
      ),
      conditions: understanding.conditions.filter(
        (kind) => !["healthBelow", "opponentHealthBelow"].includes(kind),
      ),
      creatures: [],
    };
    const forestCheckpoint = {
      ...fullCheckpoint,
      understanding: combatKnowledge,
    };

    const columns = document.createElement("div");
    columns.className = "columns";
    const programPanel = document.createElement("section");
    programPanel.className = "program-panel";
    const mapColumn = document.createElement("section");
    mapColumn.className = "map-column";
    const runPanel = document.createElement("div");
    runPanel.className = "run-panel";
    const mapView = terrain.createTerrainPanel();
    const combat = combatLine.createCombatLine();
    const body = bodyRow.createBodyRow();
    const controls = status.createStatusRow({
      togglePause() {
        state = game.setPaused(state, !state.paused).state;
        render();
      },
      setPace(pace) {
        state = game.setPace(state, pace).state;
        render();
      },
      restart() {
        state = game.restart(state).state;
        render();
      },
      end() {
        state = game.end(state).state;
        render();
      },
    });
    const programEditor = editor.createProgramEditor((next) => {
      state = game.setProgram(state, next).state;
      render();
    });
    const home = headquarters.createHeadquarters({
      create(name) {
        state = game.createCharacter(state, name).state;
        render();
      },
      send(characterId, mapId) {
        state = game.send(state, { characterId, mapId }, 1760000800000 + 17).state;
        render();
      },
    });
    programPanel.append(programEditor.element);
    runPanel.append(controls.element, controls.discovery, combat.element,
      body.element, mapView.element);
    mapColumn.append(home.element, runPanel);
    columns.append(programPanel, mapColumn);
    document.querySelector("main").replaceChildren(columns);

    function render() {
      home.element.hidden = state.run !== null;
      runPanel.hidden = state.run === null;
      home.update(state);
      controls.update(state);
      combat.update(state.run?.lastCombat ?? null);
      body.update(state);
      mapView.update(state);
      programEditor.update(state);
    }
    function advance(minutes) {
      if (state.paused) state = game.setPaused(state, false).state;
      const result = game.advanceMinutes(state, minutes);
      state = result.state;
      render();
      return {
        minute: state.run?.minute ?? null,
        discovery: state.discovery,
        activeCombat: state.run?.activeCombat ?? null,
        lastCombat: state.run?.lastCombat ?? null,
        death: state.run?.death ?? null,
        completion: state.run?.completion ?? null,
        events: result.events.map((event) => event.kind),
      };
    }
    function prepareDeep(realMs) {
      state = game.send(
        forestCheckpoint,
        { mapId: "forestDeep", characterId: 2 },
        realMs,
      ).state;
      render();
    }
    function findAttack() {
      for (let attempt = 0; attempt < 100; attempt += 1) {
        let candidate = game.send(
          forestCheckpoint,
          { mapId: "forestDeep", characterId: 2 },
          1760000800000 + 1000 + attempt * 137,
        ).state;
        for (let minute = 0; minute < 300; minute += 1) {
          if (candidate.paused)
            candidate = game.setPaused(candidate, false).state;
          const result = game.advanceMinutes(candidate, 1);
          candidate = result.state;
          if (result.events.some((event) => event.kind === "attacked")) {
            return {
              realMs: 1760000800000 + 1000 + attempt * 137,
              attempt,
              minute: candidate.run.minute,
              health: candidate.run.body.health,
              seed: candidate.run.seed,
            };
          }
          if (candidate.run.death || candidate.run.completion) break;
        }
      }
      return null;
    }
    function prepareCompletionWindow(beforeTurns) {
      const combatProgram = structuredClone(program);
      combatProgram.groups.push({
        id: combatProgram.nextGroupId,
        name: "Walka",
        condition: { kind: "always" },
        rules: [
          {
            id: combatProgram.nextRuleId,
            condition: { kind: "always" },
            action: { kind: "strikeWithStick" },
          },
          {
            id: combatProgram.nextRuleId + 1,
            condition: { kind: "always" },
            action: { kind: "kick" },
          },
        ],
      });
      combatProgram.nextGroupId += 1;
      combatProgram.nextRuleId += 2;
      const prepared = game.setProgram(fullCheckpoint, combatProgram).state;
      const sent = game.send(
        prepared,
        { mapId: "forestDeep", characterId: 2 },
        1760000801000,
      ).state;
      const attacked = game.advanceMinutes(sent, 238);
      if (!attacked.events.some((event) => event.kind === "attacked"))
        throw new Error("The seeded simulation did not produce the expected attack.");
      const run = attacked.state.run;
      const streak = beforeTurns ? 539 : 535;
      state = {
        ...attacked.state,
        run: { ...run, streak, defeatedAttacks: beforeTurns ? 2 : 1 },
      };
      if (!beforeTurns) {
        const resolved = game.advanceMinutes(state, 5);
        state = resolved.state;
      } else {
        state = game.advanceMinutes(state, 1).state;
      }
      render();
      return {
        minute: state.run.minute,
        status: status.statusText(state.run, state.paused),
        line: combatLine.combatText(state.run.lastCombat),
        completion: state.run.completion,
        outcome: state.run.lastCombat.result?.outcome ?? null,
      };
    }
    render();
    window.__slice8 = {
      advance,
      findAttack,
      prepareDeep,
      prepareCompletionWindow,
      state: () => state,
      render,
    };
  });
  await page.screenshot({ path: ".playwright-mcp/slice8-prepared-forest-completion.png", scale: "css" });
  return await page.evaluate(() => ({
    homeRows: document.querySelectorAll(".team-member").length,
    mapLabels: [...document.querySelectorAll(".team-member .map-label")].map((node) => node.textContent),
    solvedMaps: window.__slice8.state().solvedMaps,
    runVisible: !document.querySelector(".run-panel").hidden,
  }));
}
