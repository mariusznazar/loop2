export type FieldOptions = {
  label: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

export type InputOptions = FieldOptions & {
  placeholder?: string;
};

export type SelectOptions = FieldOptions & {
  options?: ReadonlyArray<{ value: string; label: string }>;
};

export type Field<T extends HTMLInputElement | HTMLSelectElement> = {
  element: HTMLSpanElement;
  control: T;
  error: HTMLSpanElement;
  /** Null or blank clears the warning without replacing the native node. */
  setError(message: string | null): void;
};

let nextErrorId = 0;

function field<T extends HTMLInputElement | HTMLSelectElement>(
  control: T,
  options: FieldOptions,
): Field<T> {
  const element = document.createElement("span");
  element.className = "control-field";
  const error = document.createElement("span");
  error.className = "control-error";
  error.id = `control-error-${++nextErrorId}`;
  error.hidden = true;
  control.className = "control";
  control.setAttribute("aria-label", options.label);
  control.disabled = options.disabled ?? false;
  if (options.value !== undefined) control.value = options.value;
  const onChange = options.onChange;
  if (onChange)
    control.addEventListener("change", () => onChange(control.value));
  element.append(control, error);

  return {
    element,
    control,
    error,
    setError(message: string | null): void {
      const shown = message?.trim() ? message : "";
      error.textContent = shown;
      error.hidden = shown === "";
      const descriptions = (control.getAttribute("aria-describedby") ?? "")
        .split(/\s+/)
        .filter((id) => id && id !== error.id);
      if (shown) {
        control.setAttribute("aria-invalid", "true");
        descriptions.push(error.id);
      } else {
        control.removeAttribute("aria-invalid");
      }
      if (descriptions.length)
        control.setAttribute("aria-describedby", descriptions.join(" "));
      else control.removeAttribute("aria-describedby");
    },
  };
}

/** A native select; callers may populate options and attach listeners on control. */
export function createSelect(options: SelectOptions): Field<HTMLSelectElement> {
  const control = document.createElement("select");
  for (const choice of options.options ?? []) {
    const option = document.createElement("option");
    option.value = choice.value;
    option.textContent = choice.label;
    control.append(option);
  }
  return field(control, options);
}

function input(
  type: "number" | "text",
  options: InputOptions,
): Field<HTMLInputElement> {
  const control = document.createElement("input");
  control.type = type;
  control.placeholder = options.placeholder ?? options.label;
  return field(control, options);
}

/** Native number semantics; range, step and commit rules belong to the caller. */
export function createNumberField(
  options: InputOptions,
): Field<HTMLInputElement> {
  return input("number", options);
}

/** A generic text field; it defines no game condition language or validation. */
export function createTextField(
  options: InputOptions,
): Field<HTMLInputElement> {
  return input("text", options);
}
