export const HEADS = {
  S: `/*
 * The game's shared stylesheet (D-421): the base rules, the one :focus-visible rule, the header with
 * the menu bar and the menu „Konto”, the rows of sentences, the place of the screens and their common
 * layout, the shared controls with the icon mask and the forms, and the rules of what the kitchen-sink
 * page draws besides the controls — the drawing of the map, the table of tiles, the form and the
 * block of the account menu. It holds also the sentence \`trip-warning\`, which the screens Przejście
 * and Mapy both draw. The rules of each screen and of each part several screens use stand in the
 * stylesheet of that screen or part, which the page links after this one. It reads each value of
 * appearance from the design tokens of tokens.css by var(--…) (guidelines/styleguide-browser-view.md).
 * Layout values D-43 leaves out stand here: line-height, the @media threshold, widths and heights, and
 * the sizes of the columns of the layout grid.
 */`,
  W: `/*
 * The stylesheet of the waiting screen (D-421): the section \`session-check\` and its text, shown while
 * the page asks the server whom this browser is signed in as. The page links it after styles.css, and
 * it reads each value of appearance from the design tokens of tokens.css by var(--…).
 */`,
  A: `/*
 * The stylesheet of the login card (D-421): the screen of the card with the picture behind it, the
 * card and its failure panel, its heading, the switch between „Zaloguj się” and „Załóż konto”, and its
 * forms. The folded credits at the foot of the card stand in credits.css. The page links it after
 * styles.css, and it reads each value of appearance from the design tokens of tokens.css by var(--…).
 */`,
  C: `/*
 * The stylesheet of the folded credits (D-421), which the login card and Siedziba both show: the
 * section set off by a line, its summary and the list of the credits, with the rules that name
 * \`.account-card\` or \`.headquarters\` beside \`.credits\`. The page links it after styles.css, and it
 * reads each value of appearance from the design tokens of tokens.css by var(--…).
 */`,
  N: `/*
 * The stylesheet of the screen of the list of accounts, \`#/konta\` (D-421): its heading, the line
 * while the list is read, the list and its rows, the buttons of a row and the confirmation of
 * „Zablokuj”. The page links it after styles.css, and it reads each value of appearance from the
 * design tokens of tokens.css by var(--…).
 */`,
  H: `/*
 * The stylesheet of the screen Siedziba (D-421): the camp at the top, the sections „Drużyna” and
 * „Skrzynka”, the team and the chest, the report on earning loops and the creation of a character.
 * The folded credits at its foot stand in credits.css. The frames of the camp's characters and fire
 * (\`.camp-member img\`, \`.camp-fire img\`) are animated by a rule that stands whole in the block of
 * motion of run-screen.css, beside the frames of the scene's sprites, because one selector list holds
 * both; every stylesheet is linked on every page, so the camp moves as it did. The page links this
 * file after styles.css, and it reads each value of appearance from the design tokens of tokens.css
 * by var(--…).
 */`,
  X: `/*
 * The stylesheet of the screen Postać (D-421): the name and the facts of a character, its
 * resurrection line, its earning loop and the section „Umiejętności” with its trees and branches. The
 * page links it after styles.css, and it reads each value of appearance from the design tokens of
 * tokens.css by var(--…).
 */`,
  M: `/*
 * The stylesheet of the screen Mapy (D-421): the list of maps, the card of a map, the section „Kto
 * idzie” with its characters, and the mark of a rehearsal that stands under „Wejdź”. The columns of
 * the two areas stand in styles.css with those of Programy and Wiedza. The page links it after
 * styles.css, and it reads each value of appearance from the design tokens of tokens.css by var(--…).
 */`,
  K: `/*
 * The stylesheet of the screen Wiedza (D-421): its heading, the Understanding with its groups and
 * things, and the skill trees with their branches. The columns of the two areas stand in styles.css
 * with those of Programy and Mapy. The page links it after styles.css, and it reads each value of
 * appearance from the design tokens of tokens.css by var(--…).
 */`,
};
export const FILES = {
  S: "styles.css",
  W: "waiting-screen.css",
  A: "account-card.css",
  C: "credits.css",
  N: "accounts-screen.css",
  H: "headquarters.css",
  X: "character-screen.css",
  M: "maps-screen.css",
  K: "knowledge-screen.css",
};
