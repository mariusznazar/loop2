/**
 * The shared text field (D-44), and the field the number field builds on: an `<input>` with,
 * under it, the message of its error state, both in one wrapper that `styles.css` draws from its
 * classes. An empty field shows its hint, if it has one. Nothing here runs when the module is
 * imported.
 */

export type FieldOptions = {
  /** The field's name for assistive technology. */
  label: string;
  /** What an empty field shows in place of a value. */
  hint?: string;
};

export type Field = {
  /** The wrapper to place on the screen: the input and, under it, the message of an error. */
  element: HTMLElement;
  /** The input itself: its value, its events and its focus. */
  input: HTMLInputElement;
  /** Shows `message` under the field in the error state, or, given null, leaves that state. */
  setError(message: string | null): void;
};

/** Numbers the error messages of the page, so each field names its own by `id`. */
let messageCount = 0;

/** A field of the given input type; the text and number fields are made by it. */
export function createInputField(
  type: "text" | "number",
  options: FieldOptions,
): Field {
  const element = document.createElement("span");
  element.className = "input-field";
  const input = document.createElement("input");
  input.type = type;
  input.setAttribute("aria-label", options.label);
  if (options.hint) input.placeholder = options.hint;
  const message = document.createElement("span");
  message.className = "input-field-message";
  messageCount += 1;
  message.id = `input-field-message-${messageCount}`;
  message.hidden = true;
  element.append(input, message);

  return {
    element,
    input,
    setError(text: string | null): void {
      const failed = text !== null;
      element.classList.toggle("error", failed);
      message.hidden = !failed;
      message.textContent = text ?? "";
      if (failed) {
        input.setAttribute("aria-invalid", "true");
        input.setAttribute("aria-describedby", message.id);
      } else {
        input.removeAttribute("aria-invalid");
        input.removeAttribute("aria-describedby");
      }
    },
  };
}

/** A text field named `label`, showing `hint` while empty. */
export function createTextField(options: FieldOptions): Field {
  return createInputField("text", options);
}
