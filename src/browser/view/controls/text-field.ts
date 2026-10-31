/**
 * The shared text field (D-44), and the field the number field and the password field build on:
 * an `<input>` with, under it, the message of its error state, both in one wrapper that
 * `styles.css` draws from its classes. An empty field shows its hint, if it has one. A field
 * waiting for a server is locked by `input.disabled`, which draws the state disabled. The module
 * also makes the one sentence under a form that tells of a server refusal or a lost connection and
 * the one that tells of an answer which refuses nothing.
 * Nothing here runs when the module is imported.
 */

export type FieldOptions = {
  /** The field's name for assistive technology. */
  label: string;
  /** What an empty field shows in place of a value. */
  hint?: string;
  /**
   * Shows the label as text above the input, joined to it, instead of only naming the input for
   * assistive technology.
   */
  visibleLabel?: boolean;
  /** The `autocomplete` token of the input, such as "email" or "new-password". */
  autocomplete?: string;
};

export type Field = {
  /** The wrapper to place on the screen: the input and, under it, the message of an error. */
  element: HTMLElement;
  /** The input itself: its value, its events and its focus. */
  input: HTMLInputElement;
  /** Shows `message` under the field in the error state, or, given null, leaves that state. */
  setError(message: string | null): void;
};

/** Numbers the fields of the page, so each names its own message and input by `id`. */
let messageCount = 0;

/** A field of the given input type; the text, number and password fields are made by it. */
export function createInputField(
  type: "text" | "number" | "password",
  options: FieldOptions,
): Field {
  const element = document.createElement("span");
  element.className = "input-field";
  const input = document.createElement("input");
  input.type = type;
  if (options.autocomplete)
    input.setAttribute("autocomplete", options.autocomplete);
  if (options.hint) input.placeholder = options.hint;
  const message = document.createElement("span");
  message.className = "input-field-message";
  messageCount += 1;
  message.id = `input-field-message-${messageCount}`;
  message.hidden = true;
  if (options.visibleLabel) {
    const label = document.createElement("label");
    label.className = "input-field-label";
    label.htmlFor = `input-field-input-${messageCount}`;
    label.textContent = options.label;
    input.id = label.htmlFor;
    element.append(label);
  } else {
    input.setAttribute("aria-label", options.label);
  }
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

/** A password field named `label`: what is typed is masked by the browser. */
export function createPasswordField(options: FieldOptions): Field {
  return createInputField("password", options);
}

export type FormWarning = {
  /** The sentence to place under the form; it is hidden while there is none. */
  element: HTMLElement;
  /** Shows `sentence` in the role `warning`, or, given null, removes it. */
  set(sentence: string | null): void;
};

/**
 * The one sentence under a form that tells of a server refusal or a lost connection (D-44). It is
 * announced to assistive technology when it appears.
 */
export function createFormWarning(): FormWarning {
  const element = document.createElement("p");
  element.className = "form-warning";
  element.setAttribute("role", "alert");
  element.hidden = true;
  return {
    element,
    set(sentence: string | null): void {
      element.hidden = sentence === null;
      element.textContent = sentence ?? "";
    },
  };
}

export type FormNote = {
  /** The sentence to place under the form; it is hidden while there is none. */
  element: HTMLElement;
  /** Shows `sentence` in the role `status`, or, given null, removes it. */
  set(sentence: string | null): void;
};

/**
 * The one sentence under a form that tells of an answer which refuses nothing, such as the one to
 * a request for a password-reset link (D-44, D-214). It stands where the warning stands, in
 * `text-secondary`, and is announced politely to assistive technology when it appears.
 */
export function createFormNote(): FormNote {
  const element = document.createElement("p");
  element.className = "form-note";
  element.setAttribute("role", "status");
  element.hidden = true;
  return {
    element,
    set(sentence: string | null): void {
      element.hidden = sentence === null;
      element.textContent = sentence ?? "";
    },
  };
}
