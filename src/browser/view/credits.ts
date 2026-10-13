/** Credits of the icon files in assets/icons, taken from the game-icons source repository. */
export type IconCredit = {
  /** Title of the icon, as its page on game-icons.net gives it. */
  title: string;
  /** Author, as the source repository's licence file names the contributor of the icon's folder. */
  author: string;
  /** Page of the icon on game-icons.net. */
  sourceUrl: string;
  /** How the file differs from the source; CC BY 3.0 requires the credit to say it was changed. */
  changes: string;
};

/** The change made to every icon file: the black background removed, the shape drawn dark. */
const CHANGES = 'zmienione (bez tła, ciemny kolor)';

/** Commit of https://github.com/game-icons/icons the icon files were copied from. */
export const ICON_SOURCE_COMMIT = '82d948812bfe3f269ef8f731dcdb07b08160edc4';

export const ICON_LICENCE = { name: 'CC BY 3.0', url: 'https://creativecommons.org/licenses/by/3.0/' } as const;

/** Credits keyed by icon file name without the extension. */
export const ICON_CREDITS: Readonly<Record<string, IconCredit>> = {
  'wood-stick': { title: 'Wood stick icon', author: 'Delapouite', sourceUrl: 'https://game-icons.net/1x1/delapouite/wood-stick.html', changes: CHANGES },
  'berry-bush': { title: 'Berry bush icon', author: 'Delapouite', sourceUrl: 'https://game-icons.net/1x1/delapouite/berry-bush.html', changes: CHANGES },
  fern: { title: 'Fern icon', author: 'Delapouite', sourceUrl: 'https://game-icons.net/1x1/delapouite/fern.html', changes: CHANGES },
  flax: { title: 'Flax icon', author: 'Delapouite', sourceUrl: 'https://game-icons.net/1x1/delapouite/flax.html', changes: CHANGES },
};
