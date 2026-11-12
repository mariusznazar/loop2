/** Credits of the icon files in assets/icons, which come from game-icons.net: from its source repository, and `wood-pile.svg` from its page. */
export type IconCredit = {
  /** Author, as the source repository's licence file names the contributor of the icon's folder. */
  author: string;
  /** Page of the icon on game-icons.net. */
  sourceUrl: string;
  /** How the file differs from the source; CC BY 3.0 requires the credit to say it was changed. */
  changes: string;
};

/** The change made to the icon files copied from the source repository: the black background removed, the shape drawn light. */
const CHANGES = "zmienione (bez tła, jasny kolor)";

/**
 * The change made to `wood-pile.svg`, which was taken from its page as the download with no
 * background: only its colour was changed.
 */
const COLOUR_CHANGED = "zmienione (zmieniony kolor)";

/** Commit of https://github.com/game-icons/icons the icon files were copied from, `wood-pile.svg` excepted: it was taken from its page on game-icons.net. */
export const ICON_SOURCE_COMMIT = "82d948812bfe3f269ef8f731dcdb07b08160edc4";

export const ICON_LICENCE = {
  name: "CC BY 3.0",
  url: "https://creativecommons.org/licenses/by/3.0/",
} as const;

/**
 * The credit of a pack of pictures of the scene in assets/sprites whose licence asks for one (D-271,
 * `sprite-credits`), in the shape of an icon's: what it is for, the pack's title, its author, its
 * page and the site of it, the licence with its page, and how the files differ from the source. The
 * title, the author and the licence are those the pack's page on OpenGameArt gives.
 */
export type PackCredit = {
  /** What in the game the pack's pictures are for. */
  name: string;
  title: string;
  author: string;
  /** The site of the pack's page, as the credit's text names it. */
  sourceSite: string;
  sourceUrl: string;
  licenceName: string;
  licenceUrl: string;
  changes: string;
};

/**
 * The packs of the scene's pictures that ask for a credit: the cloud of dust of a miss and of a scuffle
 * is from the first, the wolf from the second. The wolf's files are frames cut from the pack's sheet,
 * its pixels moved unchanged, none mirrored.
 */
export const PACK_CREDITS: readonly PackCredit[] = [
  {
    name: "Kurz i obłók walki",
    title: "Smoke & Fire Animated Particle [16x16]",
    author: "KnoblePersona",
    sourceSite: "opengameart.org",
    sourceUrl:
      "https://opengameart.org/content/smoke-fire-animated-particle-16x16",
    licenceName: "CC BY 3.0",
    licenceUrl: "http://creativecommons.org/licenses/by/3.0/",
    changes: "zmienione (przekolorowane)",
  },
  {
    name: "Wilk",
    title: "[LPC] Wolf Animation",
    author:
      "Stephen „Redshrike” Challener (grafika), William.Thompsonj (współtwórca)",
    sourceSite: "opengameart.org",
    sourceUrl: "https://opengameart.org/content/lpc-wolf-animation",
    licenceName: "CC BY 3.0",
    licenceUrl: "http://creativecommons.org/licenses/by/3.0/",
    changes: "zmienione (wycięte klatki)",
  },
];

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
    changes: COLOUR_CHANGED,
  },
};
