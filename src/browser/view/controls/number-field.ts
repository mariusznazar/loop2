/**
 * The shared number field (D-44): the field of `text-field.ts` taking a number within a range.
 * Nothing here runs when the module is imported.
 */
import {
  createInputField,
  type Field,
  type FieldOptions,
} from "./text-field.js";

export type NumberFieldOptions = FieldOptions & {
  min: number;
  max: number;
  step: number;
};

/** A number field named `label`, offering `min` to `max` in steps of `step`. */
export function createNumberField(options: NumberFieldOptions): Field {
  const field = createInputField("number", options);
  field.input.min = String(options.min);
  field.input.max = String(options.max);
  field.input.step = String(options.step);
  return field;
}
