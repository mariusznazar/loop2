/**
 * The card of a map on the right of the screen Mapy (D-327, D-328): its heading with the name, the tag of
 * the state and the opener, the button that takes the player to „Kto idzie”, the one short sentence of
 * what the map demands, and the parts the map has in two columns, drawn from the pure lines of
 * `map-lines.ts`. It names no map, resource or creature: every name comes from the data. Nothing here runs
 * when the module is imported.
 */
import type { CSSProperties, ReactNode } from "react";
import { MAPS } from "../sim/data/maps.js";
import { RESOURCES } from "../sim/data/resources.js";
import type { MapId } from "../sim/types.js";
import { ReactButton } from "./controls/react-button.js";
import {
  attackerLines,
  capLines,
  cardHeading,
  demandRows,
  resourceLines,
  solvingSentence,
  terrainRows,
} from "./map-lines.js";
import type { TableRow } from "./map-lines.js";

/** The button at the top of the card, which takes the player to „Kto idzie” to pick the character who enters. */
const CHOOSE_TEXT = "Wejdź — wybierz postać";

/** One line of a part of the card, `warning` where the lines say so. */
function CardLine({ text, warning }: { text: string; warning: boolean }) {
  return <li className={warning ? "maps-card-warning" : undefined}>{text}</li>;
}

/** An icon of the icon directory drawn as a mask in the colour of the text beside it (D-43). */
function CardIcon({ name }: { name: string }) {
  return (
    <span
      className="icon-mask maps-card-icon"
      aria-hidden="true"
      style={{ "--icon": `url("/icons/${name}.svg")` } as CSSProperties}
    />
  );
}

/** A part of the card: its name in `text-label` over what it holds (D-327). */
function CardPart({ name, children }: { name: string; children: ReactNode }) {
  return (
    <section className="maps-card-part">
      <h3 className="maps-card-part-name">{name}</h3>
      {children}
    </section>
  );
}

/** A table of the card, „Żąda” or „Teren”: a label and its value on each row, a note after the value where it has one. */
function CardTable({ rows }: { rows: readonly TableRow[] }) {
  return (
    <dl className="maps-card-table">
      {rows.map((row) => (
        <div key={row.label} className="maps-card-row">
          <dt className="maps-card-label">{row.label}</dt>
          <dd className="maps-card-value">
            {row.icons.map((icon, index) => (
              <CardIcon key={`${icon}|${index}`} name={icon} />
            ))}
            {row.value}
            {row.note === null ? null : (
              <span className="maps-card-note">{row.note}</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** A row of „Leży tu” or „Czyha”: the icon in its column, the head on the first line and the detail under it. */
function CardEntry({
  icon,
  head,
  children,
  className,
}: {
  icon: string;
  head: string;
  children: ReactNode;
  className: string;
}) {
  return (
    <li className={`maps-card-entry ${className}`}>
      <CardIcon name={icon} />
      <div className="maps-card-entry-text">
        <p className="maps-card-entry-head">{head}</p>
        {children}
      </div>
    </li>
  );
}

/**
 * The card of a map (D-327): a heading with the map's name, the tag of its state and its opener, and at
 * its right „Wejdź — wybierz postać”, which takes the player to „Kto idzie”; under it the one sentence of
 * the solving condition; then two columns, the tables „Żąda” and „Teren” on the left and „Czyha”, „Leży
 * tu” and „Odbiera” on the right, one under the other in the phone layout. A part the map lacks stands
 * nowhere, and „Czyha” holds the record of D-440 at the creature the map's data name for it.
 */
export function MapCard({
  mapId,
  solved,
  record,
  onChoose,
}: {
  mapId: MapId;
  solved: boolean;
  record: number | null;
  onChoose: () => void;
}) {
  const map = MAPS[mapId];
  const heading = cardHeading(map, solved);
  const attackers = attackerLines(map, record);
  const caps = capLines(map);
  return (
    <div className="maps-card">
      <div className="maps-card-top">
        <div className="maps-card-heading">
          <h2 className="maps-card-name">{heading.name}</h2>
          <span
            className={
              heading.state.solved
                ? "maps-card-state solved"
                : "maps-card-state"
            }
          >
            {heading.state.text}
          </span>
          {heading.openedBy === null ? null : (
            <>
              <span className="maps-card-sep"> · </span>
              <span className="maps-card-opened-by">{heading.openedBy}</span>
            </>
          )}
        </div>
        <div className="maps-card-go">
          <ReactButton text={CHOOSE_TEXT} onClick={onChoose} />
        </div>
      </div>
      <p className="maps-card-goal">{solvingSentence(mapId)}</p>
      <div className="maps-card-columns">
        <div className="maps-card-column">
          <CardPart name="Żąda">
            <CardTable rows={demandRows(map)} />
          </CardPart>
          <CardPart name="Teren">
            <CardTable rows={terrainRows(map)} />
          </CardPart>
        </div>
        <div className="maps-card-column">
          {attackers.length === 0 ? null : (
            <CardPart name="Czyha">
              <ul className="maps-card-lines">
                {attackers.map((attacker) => (
                  <CardEntry
                    key={`${attacker.head}|${attacker.odds}`}
                    icon={attacker.icon}
                    head={attacker.head}
                    className="maps-card-attacker"
                  >
                    <p className="maps-card-attacker-odds">{attacker.odds}</p>
                    {attacker.record === undefined ? null : (
                      <p className="maps-card-attacker-record">
                        {attacker.record}
                      </p>
                    )}
                  </CardEntry>
                ))}
              </ul>
            </CardPart>
          )}
          <CardPart name="Leży tu">
            <ul className="maps-card-lines">
              {resourceLines(map).map((resource) => (
                <CardEntry
                  key={resource.id}
                  icon={RESOURCES[resource.id].icon}
                  head={resource.name}
                  className="maps-card-resource"
                >
                  <p className="maps-card-detail">
                    {`${resource.spread} · `}
                    <span
                      className={
                        resource.renewal.warning
                          ? "maps-card-warning"
                          : undefined
                      }
                    >
                      {resource.renewal.text}
                    </span>
                  </p>
                </CardEntry>
              ))}
            </ul>
          </CardPart>
          {caps.length === 0 ? null : (
            <CardPart name="Odbiera">
              <ul className="maps-card-lines">
                {caps.map((cap) => (
                  <CardLine
                    key={cap.text}
                    text={cap.text}
                    warning={cap.warning}
                  />
                ))}
              </ul>
            </CardPart>
          )}
        </div>
      </div>
    </div>
  );
}
