/**
 * The band of a discovery in React (D-122, D-312, D-313, D-39, D-44, D-279): the text of what a game
 * minute revealed in the role `discovery`, the sentence about the program rule the game wrote where
 * the copy holds it, „Dodaj regułę z tym” and „Wznów”. It is a component with no boundary of its
 * own: the screen of a map run renders it above the program from the game state it was given and
 * answers its two callbacks, which are the screen's to carry out. Its text is `discoveryBandText`,
 * which the chronicle writes into the entry of the discovery too (D-345). It imports the pure
 * functions of the DOM modules (`discoveryRule`) and builds no element after their pattern (D-265).
 * Nothing runs when the module is imported.
 */
import { mapRunEnded } from "../sim/game.js";
import type { GameState } from "../sim/types.js";
import { ReactButton } from "./controls/react-button.js";
import { discoveryBandText } from "./discovery-band-text.js";
import { discoveryRule } from "./discovery-rule.js";

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
 * The band: the text of the discovery held by the game state, then the sentence about the rule the
 * game wrote, then „Dodaj regułę z tym” and „Wznów”. „Dodaj regułę z tym” is disabled where the
 * rule it would add cannot be built, as where the copy holds no rule group. Nothing is drawn while
 * the state holds no discovery, nor once the map run has ended, in death or a completion: the
 * end-of-run window then names that discovery (D-122).
 */
export function DiscoveryBand({
  state,
  onAddRule,
  onResume,
}: DiscoveryBandProps) {
  const text = discoveryBandText(state);
  if (text === null) return null;
  if (state.run !== null && mapRunEnded(state.run)) return null;
  return (
    <div className="discovery-band">
      <p className="discovery-band-text">{text}</p>
      <ReactButton
        text="Dodaj regułę z tym"
        disabled={discoveryRule(state) === null}
        onClick={() => onAddRule()}
      />
      <ReactButton text="Wznów" onClick={() => onResume()} />
    </div>
  );
}
