import { RESOURCES } from '../sim/data/resources.js';
import type { ResourceId } from '../sim/types.js';
import { ICON_CREDITS, ICON_LICENCE } from './credits.js';

/** One line of the footer: the credit of a resource's icon. */
export type FooterCredit = {
  resourceName: string;
  /** Title of the icon, as its page on game-icons.net gives it. */
  title: string;
  author: string;
  sourceUrl: string;
  licenceName: string;
  licenceUrl: string;
  /** How the icon file was changed from its source. */
  changes: string;
};

const SOURCE_SITE = 'game-icons.net';

/** The icon credits, one per resource in the data's order. Pure. */
export function footerCredits(): FooterCredit[] {
  return (Object.keys(RESOURCES) as ResourceId[]).map(id => {
    const resource = RESOURCES[id];
    const credit = ICON_CREDITS[resource.icon];
    if (!credit) throw new Error(`footer: no credit for the icon ${resource.icon}`);
    return {
      resourceName: resource.name,
      title: credit.title,
      author: credit.author,
      sourceUrl: credit.sourceUrl,
      licenceName: ICON_LICENCE.name,
      licenceUrl: ICON_LICENCE.url,
      changes: credit.changes,
    };
  });
}

function link(text: string, href: string): HTMLAnchorElement {
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.textContent = text;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  return anchor;
}

/**
 * Builds the footer: per icon „{resource name}: „{title}”, {author}, game-icons.net, CC BY 3.0, {changes}”,
 * linking the icon's source page and the licence in a new tab, so the run in this page is kept.
 */
export function createFooter(): HTMLElement {
  const footer = document.createElement('footer');
  const list = document.createElement('ul');
  list.className = 'credits';
  for (const credit of footerCredits()) {
    const item = document.createElement('li');
    item.append(
      `${credit.resourceName}: „${credit.title}”, ${credit.author}, `,
      link(SOURCE_SITE, credit.sourceUrl),
      ', ',
      link(credit.licenceName, credit.licenceUrl),
      `, ${credit.changes}`,
    );
    list.append(item);
  }
  footer.append(list);
  return footer;
}
