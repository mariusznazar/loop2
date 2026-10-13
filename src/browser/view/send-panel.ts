import { ARCHETYPES } from '../sim/data/archetypes.js';
import { MAPS } from '../sim/data/maps.js';
import type { ArchetypeId, MapId } from '../sim/types.js';

/** A character the player can send, and the map it goes to. */
export type SendTarget = { mapId: MapId; archetypeId: ArchetypeId };

/** Every archetype with every map the data holds, in the data's order. Pure. */
export function sendTargets(): SendTarget[] {
  const mapIds = Object.keys(MAPS) as MapId[];
  const archetypeIds = Object.keys(ARCHETYPES) as ArchetypeId[];
  return archetypeIds.flatMap(archetypeId => mapIds.map(mapId => ({ mapId, archetypeId })));
}

/**
 * Builds the send panel: per target, the archetype's name, „Mapa: ” with the map's name, and the
 * button „Wyślij”. Every name comes from the data.
 */
export function createSendPanel(onSend: (target: SendTarget) => void): HTMLElement {
  const panel = document.createElement('div');
  panel.className = 'send-panel';
  for (const target of sendTargets()) {
    const entry = document.createElement('div');
    entry.className = 'send-entry';
    const who = document.createElement('p');
    who.className = 'send-character';
    who.textContent = ARCHETYPES[target.archetypeId].name;
    const where = document.createElement('p');
    where.textContent = `Mapa: ${MAPS[target.mapId].name}`;
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Wyślij';
    button.addEventListener('click', () => onSend(target));
    entry.append(who, where, button);
    panel.append(entry);
  }
  return panel;
}
