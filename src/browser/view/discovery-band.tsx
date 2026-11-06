/**
 * The band of a discovery in React (D-122, D-312, D-313, D-39, D-44, D-279; task ekran-przejscia,
 * To do 7): the text of what a game minute revealed in the role `discovery`, the sentence about the
 * program rule the game wrote where the copy holds it, „Dodaj regułę z tym” and „Wznów”. It is a
 * component with no boundary of its own: the screen of a map run renders it above the program from
 * the game state it was given and answers its two callbacks, which are the screen's to carry out.
 * It imports the pure functions of the DOM modules (`discoveryText`, `chillRuleGroupName`,
 * `discoveryRule`) and builds no element after their pattern (D-265). Nothing runs when the module
 * is imported.
 */
import { ACTIONS } from "../sim/data/actions.js";
import { CONDITIONS } from "../sim/data/conditions.js";
import { mapRunEnded } from "../sim/game.js";
import type { GameState } from "../sim/types.js";
import { chillRuleGroupName } from "../sim/understanding.js";
import { ReactButton } from "./controls/react-button.js";
import { discoveryRule } from "./discovery-rule.js";
import { discoveryText } from "./status-row.js";

/** What the screen gives the band; every render gives it whole. */
export type DiscoveryBandProps = {
  /** The game state the band draws; it draws nothing while the state holds no discovery. */
  state: GameState;
  /** „Dodaj regułę z tym”: the screen adds the rule the discovery gives to the copy (D-313). */
  onAddRule: () => void;
  /** „Wznów”: the one resumption the „Wznów” of the header makes too (D-122). */
  onResume: () => void;
};

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
 * The band: the text of the discovery held by the game state, then the sentence about the rule the
 * game wrote, then „Dodaj regułę z tym” and „Wznów”. „Dodaj regułę z tym” is disabled where the
 * rule it would add cannot be built, as where the copy holds no rule group. „Wznów” is left out
 * once the map run has ended, in death or a completion, where nothing is left to go on to; the band
 * then stands until „Restart” or „Zakończ”. Nothing is drawn while the state holds no discovery.
 */
export function DiscoveryBand({
  state,
  onAddRule,
  onResume,
}: DiscoveryBandProps) {
  if (state.discovery === null) return null;
  const text = [discoveryText(state.discovery), writtenRuleSentence(state)]
    .filter((part) => part !== null && part !== "")
    .join(" ");
  const ended = state.run !== null && mapRunEnded(state.run);
  return (
    <div className="discovery-band">
      <p className="discovery-band-text">{text}</p>
      <ReactButton
        text="Dodaj regułę z tym"
        disabled={discoveryRule(state) === null}
        onClick={() => onAddRule()}
      />
      {ended ? null : <ReactButton text="Wznów" onClick={() => onResume()} />}
    </div>
  );
}
