import { MAPS } from "../sim/data/maps.js";
import type { CharacterId, GameState } from "../sim/types.js";

/**
 * The first line of the frame of what a character does, on the screen Postać (D-447): „W obozie” where
 * the character is neither the character of the manual map run nor in an earning loop; „Przejście:
 * {mapa} · minuta {m}” while its manual map run goes on or waits in a pause, ended by „ · postać
 * zginęła” or „ · mapa rozwiązana” once the map run has ended and waits for „Restart” or „Zakończ”, the
 * minute being the one the clock in the header of that map run writes; and null for a character in an
 * earning loop, whose frame holds the line of the earning loop in its place (D-244). A character whose
 * earning loop was stopped is in the camp. Pure.
 */
export function statusLine(
  state: GameState,
  characterId: CharacterId,
): string | null {
  if (state.loops[characterId] !== undefined) return null;
  const run = state.run;
  if (run === null || run.character.id !== characterId) return "W obozie";
  const minute = run.death?.minute ?? run.completion?.minute ?? run.minute;
  const line = `Przejście: ${MAPS[run.mapId].name} · minuta ${minute}`;
  if (run.death !== null) return `${line} · postać zginęła`;
  if (run.completion !== null) return `${line} · mapa rozwiązana`;
  return line;
}
