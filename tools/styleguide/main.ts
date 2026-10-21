import { createStyleguidePage, readStyleguideTokens } from "./page.js";

/** index.html receives inert JSON with this id from the standalone build. */
export function startStyleguide(pageDocument: Document): void {
  const root = pageDocument.getElementById("styleguide-root");
  if (!root) throw new Error("Missing styleguide root");
  try {
    const data = pageDocument.getElementById("styleguide-tokens");
    const tokens = readStyleguideTokens(data?.textContent);
    root.replaceChildren(createStyleguidePage(tokens));
  } catch (error) {
    const message = pageDocument.createElement("p");
    message.setAttribute("role", "alert");
    message.textContent =
      "Nie można pokazać próbek: brakuje poprawnych danych tokenów. Uruchom ponownie lokalne budowanie.";
    root.replaceChildren(message);
    throw error;
  }
}

if (typeof document !== "undefined") startStyleguide(document);
