/** Credits of the icon files in assets/icons, taken from the game-icons source repository. */
export type IconCredit = {
  /** Author, as the source repository's licence file names the contributor of the icon's folder. */
  author: string;
  /** Page of the icon on game-icons.net. */
  sourceUrl: string;
  /** How the file differs from the source; CC BY 3.0 requires the credit to say it was changed. */
  changes: string;
};

/** The change made to every icon file: the black background removed, the shape drawn light. */
const CHANGES = "zmienione (bez tła, jasny kolor)";

/** Commit of https://github.com/game-icons/icons the icon files were copied from, `wood-pile.svg` excepted: it was taken from its page on game-icons.net. */
export const ICON_SOURCE_COMMIT = "82d948812bfe3f269ef8f731dcdb07b08160edc4";

export const ICON_LICENCE = {
  name: "CC BY 3.0",
  url: "https://creativecommons.org/licenses/by/3.0/",
} as const;

/** Credits keyed by icon file name without the extension. */
export const ICON_CREDITS: Readonly<Record<string, IconCredit>> = {
  "wood-stick": {
    author: "Delapouite",
    sourceUrl: "https://game-icons.net/1x1/delapouite/wood-stick.html",
    changes: CHANGES,
  },
  "berry-bush": {
    author: "Delapouite",
    sourceUrl: "https://game-icons.net/1x1/delapouite/berry-bush.html",
    changes: CHANGES,
  },
  fern: {
    author: "Delapouite",
    sourceUrl: "https://game-icons.net/1x1/delapouite/fern.html",
    changes: CHANGES,
  },
  flax: {
    author: "Delapouite",
    sourceUrl: "https://game-icons.net/1x1/delapouite/flax.html",
    changes: CHANGES,
  },
  campfire: {
    author: "Lorc",
    sourceUrl: "https://game-icons.net/1x1/lorc/campfire.html",
    changes: CHANGES,
  },
  binoculars: {
    author: "Delapouite",
    sourceUrl: "https://game-icons.net/1x1/delapouite/binoculars.html",
    changes: CHANGES,
  },
  hiking: {
    author: "Delapouite",
    sourceUrl: "https://game-icons.net/1x1/delapouite/hiking.html",
    changes: CHANGES,
  },
  "direction-sign": {
    author: "Delapouite",
    sourceUrl: "https://game-icons.net/1x1/delapouite/direction-sign.html",
    changes: CHANGES,
  },
  grab: {
    author: "Lorc",
    sourceUrl: "https://game-icons.net/1x1/lorc/grab.html",
    changes: CHANGES,
  },
  "claw-hammer": {
    author: "Lorc",
    sourceUrl: "https://game-icons.net/1x1/lorc/claw-hammer.html",
    changes: CHANGES,
  },
  "match-tip": {
    author: "Lorc",
    sourceUrl: "https://game-icons.net/1x1/lorc/match-tip.html",
    changes: CHANGES,
  },
  logging: {
    author: "Skoll",
    sourceUrl: "https://game-icons.net/1x1/skoll/logging.html",
    changes: CHANGES,
  },
  meal: {
    author: "Delapouite",
    sourceUrl: "https://game-icons.net/1x1/delapouite/meal.html",
    changes: CHANGES,
  },
  "deadly-strike": {
    author: "Lorc",
    sourceUrl: "https://game-icons.net/1x1/lorc/deadly-strike.html",
    changes: CHANGES,
  },
  "boot-kick": {
    author: "Lorc",
    sourceUrl: "https://game-icons.net/1x1/lorc/boot-kick.html",
    changes: CHANGES,
  },
  dodge: {
    author: "Felbrigg",
    sourceUrl: "https://game-icons.net/1x1/felbrigg/dodge.html",
    changes: CHANGES,
  },
  "wood-pile": {
    author: "Delapouite",
    sourceUrl: "https://game-icons.net/1x1/delapouite/wood-pile.html",
    changes: CHANGES,
  },
};
