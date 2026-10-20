export type ButtonOptions = {
  text: string;
  label?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export type SelectedButtonOptions = ButtonOptions & {
  selected?: boolean;
};

function button(options: ButtonOptions, variant: string): HTMLButtonElement {
  const control = document.createElement("button");
  control.type = "button";
  control.className = `control ${variant}`;
  control.textContent = options.text;
  control.disabled = options.disabled ?? false;
  if (options.label !== undefined)
    control.setAttribute("aria-label", options.label);
  if (options.onClick) control.addEventListener("click", options.onClick);
  return control;
}

/** Native button; callers can update its label, disabled state and listeners in place. */
export function createButton(options: ButtonOptions): HTMLButtonElement {
  return button(options, "button");
}

/** An action that risks losing a character, progress or data. */
export function createDestructiveButton(
  options: ButtonOptions,
): HTMLButtonElement {
  return button(options, "destructive-button");
}

/** Selection within a group; aria-pressed controls its accessible and visual state. */
export function createSelectedButton(
  options: SelectedButtonOptions,
): HTMLButtonElement {
  const control = button(options, "selected-button");
  control.setAttribute("aria-pressed", String(options.selected ?? true));
  return control;
}
