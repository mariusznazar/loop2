/**
 * The entry of the kitchen-sink page of the browser view (D-45): every shared control in each of
 * the seven states of the styleguide's rule "States of shared controls", or the reason a state
 * does not apply; every role of the styleguide's table Roles; and samples of tiles in each state,
 * drawn with the roles by the game's own stylesheet — never a drawing of the game from a game state
 * (D-04). Forms and the part of the menu „Konto” for an unconfirmed address are shown waiting for
 * the server and with a refusal sentence, and the form „Nie pamiętam hasła” with the sentence that
 * answers its request, with made-up values. The page is one React root on a host element it
 * appends to the body, and it draws each control from the React form the game draws it from
 * (D-269). This module marks the body, renders the page and empties the number field's sample once
 * drawn; each group of samples stands in a module of its own beside it. Code only this page needs
 * stays in this directory: beyond it the page imports only modules the game itself uses, so
 * nothing of the page is compiled into what `npm run build` writes.
 */
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { FormsSection, MenuSection } from "./account-samples.js";
import { ControlsSection, emptyNumberInput } from "./control-samples.js";
import { RolesSection } from "./role-samples.js";
import { TilesSection } from "./tile-samples.js";

/** The page's marker: it stands in this module and in the page's HTML, in no other file of src. */
export const PAGE_MARKER = "loop2-kitchen-sink-page";

function Page() {
  return (
    <>
      <header>
        <h1>Loop — strona wszystkich stanów</h1>
      </header>
      <ControlsSection />
      <FormsSection />
      <MenuSection />
      <RolesSection />
      <TilesSection />
    </>
  );
}

/**
 * Types an empty text into an input the way a player clears it, and the way the test harness types
 * (`typeInto` of `tests/view/page-document.mjs`): through the native value setter of the input's
 * prototype, which React's own record of the value does not see, and then a bubbling `input` event,
 * which React reads as a change. The field's change handler then holds an empty draft, and the field
 * shows what the game shows after a player empties it, which no prop of the number field draws:
 * the field shows its number unless a draft stands, and a draft comes only from typing. The page
 * needs this alone, so it stays here and the shared field keeps no prop for the page (D-45).
 */
function typeEmptyInto(input: HTMLInputElement): void {
  const descriptor = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(input),
    "value",
  );
  if (descriptor?.set === undefined) return;
  descriptor.set.call(input, "");
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

document.body.dataset.page = PAGE_MARKER;
// The root stands on a host element the page appends to the body, never on the body itself.
const host = document.createElement("div");
host.className = "sample-page";
document.body.append(host);
const root = createRoot(host);
flushSync(() => {
  root.render(<Page />);
});
// Right after the first draw, outside React and not in an Effect: an Effect synchronizes with a
// system outside React and handles no event of a user (D-267), and typing is such an event.
if (emptyNumberInput.current !== null) typeEmptyInto(emptyNumberInput.current);
