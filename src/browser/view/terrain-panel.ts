import type { GameState, MapRun } from '../sim/types.js';
import { terrainPicture, type TerrainPicture } from './terrain-picture.js';
import { createTileListView, tileKey, tileList } from './tile-list.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
/** Room around the tiles for the outlines' stroke. */
const MARGIN = 4;

export type TerrainPanel = {
  element: HTMLElement;
  /** Draws the game state's map run; skips the redraw while the map run is the same object. */
  update(state: GameState): void;
};

function svgElement<K extends keyof SVGElementTagNameMap>(name: K, attributes: Record<string, string | number>): SVGElementTagNameMap[K] {
  const element = document.createElementNS(SVG_NS, name);
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, String(value));
  return element;
}

/**
 * Builds the terrain panel: the drawing of the map run and, beside it, the list of revealed tiles.
 * The drawing is a picture, not a control: it has no click handling, and hovering is its only
 * interaction — a hovered tile highlights its row in the list and a hovered row its tile. The
 * hovered tile's key is the only state the view keeps, and it survives redraws.
 */
export function createTerrainPanel(): TerrainPanel {
  const element = document.createElement('div');
  element.className = 'terrain-panel';
  const drawing = document.createElementNS(SVG_NS, 'svg');
  drawing.classList.add('terrain-drawing');
  let hovered: string | null = null;
  const list = createTileListView(key => setHovered(key));
  element.append(drawing, list.element);

  drawing.addEventListener('pointerover', event => {
    const tile = event.target instanceof Element ? event.target.closest('[data-tile]') : null;
    setHovered(tile?.getAttribute('data-tile') ?? null);
  });
  drawing.addEventListener('pointerleave', () => setHovered(null));

  function setHovered(key: string | null): void {
    if (key === hovered) return;
    hovered = key;
    markHovered();
  }

  function markHovered(): void {
    for (const marked of element.querySelectorAll('[data-tile]')) {
      marked.classList.toggle('hovered', marked.getAttribute('data-tile') === hovered);
    }
  }

  function drawPicture(picture: TerrainPicture): void {
    const width = picture.width + 2 * MARGIN;
    const height = picture.height + 2 * MARGIN;
    drawing.setAttribute('width', String(width));
    drawing.setAttribute('height', String(height));
    drawing.setAttribute('viewBox', `${-MARGIN} ${-MARGIN} ${width} ${height}`);
    const tiles = picture.tiles.map(tile => {
      const group = svgElement('g', { 'data-tile': tileKey(tile), class: tile.revealed ? 'tile revealed' : 'tile' });
      group.append(svgElement('polygon', { points: tile.points }));
      for (const icon of tile.icons) {
        group.append(
          svgElement('image', {
            href: icon.href,
            x: icon.x,
            y: icon.y,
            width: icon.size,
            height: icon.size,
            class: icon.dimmed ? 'icon dimmed' : 'icon',
          }),
        );
      }
      return group;
    });
    // Outlines go on top of every tile, so a neighbour drawn later does not cover them.
    const outlines = picture.tiles
      .filter(tile => tile.outline !== null)
      .map(tile => svgElement('polygon', { points: tile.points, class: `outline ${tile.outline === 'character' ? 'character' : 'step-target'}` }));
    drawing.replaceChildren(...tiles, ...outlines);
  }

  let drawnRun: MapRun | null | undefined;
  return {
    element,
    update(state: GameState): void {
      // A clock tick that passes no whole game minute keeps the map run as it was.
      if (state.run === drawnRun) return;
      drawnRun = state.run;
      // Without a map run the panel is hidden, and the pointer may leave it unseen.
      if (!state.run) hovered = null;
      drawPicture(terrainPicture(state));
      list.draw(tileList(state));
      markHovered();
    },
  };
}
