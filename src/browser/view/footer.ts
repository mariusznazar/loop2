import { CAMPFIRE } from "../sim/data/campfire.js";
import { RESOURCES } from "../sim/data/resources.js";
import { ICON_CREDITS, ICON_LICENCE } from "./credits.js";

/** One line of the footer: the credit of the icon of something the data names. */
export type FooterCredit = {
  /** Name of what the icon shows, from the data. */
  name: string;
  /** Title of the icon, as its page on game-icons.net gives it; from the data. */
  title: string;
  author: string;
  sourceUrl: string;
  licenceName: string;
  licenceUrl: string;
  /** How the icon file was changed from its source. */
  changes: string;
};

const SOURCE_SITE = "game-icons.net";

/** Something the data gives an icon: its name, its icon file and the icon's title. */
type WithIcon = { name: string; icon: string; iconTitle: string };

/** Everything the data gives an icon, in the footer's order: the resources, then the campfire. */
const WITH_ICONS: readonly WithIcon[] = [...Object.values(RESOURCES), CAMPFIRE];

/** The icon credits, one per icon the data names, in the order of WITH_ICONS. Pure. */
export function footerCredits(): FooterCredit[] {
  return WITH_ICONS.map((named) => {
    const credit = ICON_CREDITS[named.icon];
    if (!credit)
      throw new Error(`footer: no credit for the icon ${named.icon}`);
    return {
      name: named.name,
      title: named.iconTitle,
      author: credit.author,
      sourceUrl: credit.sourceUrl,
      licenceName: ICON_LICENCE.name,
      licenceUrl: ICON_LICENCE.url,
      changes: credit.changes,
    };
  });
}

function link(text: string, href: string): HTMLAnchorElement {
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.textContent = text;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  return anchor;
}

/**
 * Builds the footer: per icon „{name}: „{title}”, {author}, game-icons.net, CC BY 3.0, {changes}”,
 * linking the icon's source page and the licence in a new tab, so the run in this page is kept.
 */
export function createFooter(): HTMLElement {
  const footer = document.createElement("footer");
  const list = document.createElement("ul");
  list.className = "credits";
  for (const credit of footerCredits()) {
    const item = document.createElement("li");
    item.append(
      `${credit.name}: „${credit.title}”, ${credit.author}, `,
      link(SOURCE_SITE, credit.sourceUrl),
      ", ",
      link(credit.licenceName, credit.licenceUrl),
      `, ${credit.changes}`,
    );
    list.append(item);
  }
  footer.append(list);
  return footer;
}
