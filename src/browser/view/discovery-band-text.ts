/**
 * The text of the band of a discovery without its buttons (D-122, D-312, D-345): the band draws it
 * while the discovery stands, and the chronicle writes it into the entry of the discovery from the
 * game state returned with that discovery. Pure; nothing runs when the module is imported.
 */
import { ACTIONS } from "../sim/data/actions.js";
import { CONDITIONS } from "../sim/data/conditions.js";
import type { GameState } from "../sim/types.js";
import { chillRuleGroupName } from "../sim/understanding.js";
import { discoveryText } from "./status-row.js";

/**
 * The sentence about the rule the game wrote at the discovery, naming the group of the copy that
 * holds it now and giving the rule no number (D-312); null where the discovery wrote no rule or no
 * group of the copy holds it any more.
 */
function writtenRuleSentence(state: GameState): string | null {
  const name = chillRuleGroupName(state);
  if (name === null) return null;
  const rule = `${CONDITIONS.always.label} → ${ACTIONS.explore.label}`;
  return `Gra dopisała regułę w grupie „${name}”: ${rule}.`;
}

/**
 * The band's text for the discovery the game state holds: what was discovered, then the sentence
 * about the rule the game wrote, where there is one; null while the state holds no discovery.
 */
export function discoveryBandText(state: GameState): string | null {
  if (state.discovery === null) return null;
  return [discoveryText(state.discovery), writtenRuleSentence(state)]
    .filter((part) => part !== null && part !== "")
    .join(" ");
}
