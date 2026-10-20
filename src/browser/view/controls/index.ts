import {
  createButton,
  createDestructiveButton,
  createSelectedButton,
} from "./buttons.js";
import { createSelect, createNumberField, createTextField } from "./fields.js";

export { createButton, createDestructiveButton, createSelectedButton };
export { createSelect, createNumberField, createTextField };
export type { ButtonOptions, SelectedButtonOptions } from "./buttons.js";
export type {
  Field,
  FieldOptions,
  InputOptions,
  SelectOptions,
} from "./fields.js";

/** All shared factories, also used to enumerate the local all-states page. */
export const controlFactories = {
  button: createButton,
  "destructive-button": createDestructiveButton,
  "selected-button": createSelectedButton,
  select: createSelect,
  "number-field": createNumberField,
  "text-field": createTextField,
} as const;
