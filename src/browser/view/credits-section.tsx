/**
 * The folded credits of the icons (D-27, D-47): a native `<details>` that one click, or the
 * keyboard, opens and closes. It holds no state and runs no script, so it stays as the page
 * leaves it when the card around it changes. Its content is the footer's, from `footerCredits()`:
 * per icon „{name}: „{title}”, {author}, game-icons.net, CC BY 3.0, {changes}”, the icon's source
 * page and the licence linked in a new tab.
 */
import { footerCredits } from "./footer.js";

const SOURCE_SITE = "game-icons.net";

function NewTabLink({ text, href }: { text: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
}

/** The section of credits, folded, with the summary „Autorzy grafiki”. */
export function CreditsSection() {
  return (
    <details>
      <summary>Autorzy grafiki</summary>
      <ul className="credits">
        {footerCredits().map((credit) => (
          <li key={credit.name}>
            {`${credit.name}: „${credit.title}”, ${credit.author}, `}
            <NewTabLink text={SOURCE_SITE} href={credit.sourceUrl} />
            {", "}
            <NewTabLink text={credit.licenceName} href={credit.licenceUrl} />
            {`, ${credit.changes}`}
          </li>
        ))}
      </ul>
    </details>
  );
}
