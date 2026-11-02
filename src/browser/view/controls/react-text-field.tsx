/**
 * The shared text field and password field in their React form (D-44): the element tree
 * `createInputField` in `text-field.ts` builds, with the same classes and attributes, so
 * `styles.css` stays the one place of the look; `tests/view/react-controls.test.mjs` keeps the
 * two forms alike. The field is controlled by the screen that holds its value. Nothing here runs
 * when the module is imported.
 */
import { useId } from "react";
import type { ChangeEventHandler, Ref } from "react";

export type ReactFieldProps = {
  /** The field's name for assistive technology. */
  label: string;
  /** What an empty field shows in place of a value. */
  hint?: string;
  /** Shows the label as text above the input, joined to it. */
  visibleLabel?: boolean;
  /** The `autocomplete` token of the input, such as "email" or "new-password". */
  autocomplete?: string;
  /** The message under the field in the error state; null or left out, there is none. */
  error?: string | null;
  /** Locks the field while it waits for the server. */
  disabled?: boolean;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** The input's element, for the screen that moves focus to it. */
  inputRef?: Ref<HTMLInputElement>;
};

function ReactInputField({
  type,
  label,
  hint,
  visibleLabel,
  autocomplete,
  error,
  disabled,
  value,
  onChange,
  inputRef,
}: ReactFieldProps & { type: "text" | "password" }) {
  const id = useId();
  const inputId = `${id}-input`;
  const messageId = `${id}-message`;
  const failed = error !== undefined && error !== null;
  return (
    <span className={failed ? "input-field error" : "input-field"}>
      {visibleLabel ? (
        <label className="input-field-label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        ref={inputRef}
        id={visibleLabel ? inputId : undefined}
        type={type}
        autoComplete={autocomplete}
        placeholder={hint}
        aria-label={visibleLabel ? undefined : label}
        aria-invalid={failed ? "true" : undefined}
        aria-describedby={failed ? messageId : undefined}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
      <span className="input-field-message" id={messageId} hidden={!failed}>
        {failed ? error : ""}
      </span>
    </span>
  );
}

/** A text field named `label`, showing `hint` while empty. */
export function ReactTextField(props: ReactFieldProps) {
  return <ReactInputField type="text" {...props} />;
}

/** A password field named `label`: what is typed is masked by the browser. */
export function ReactPasswordField(props: ReactFieldProps) {
  return <ReactInputField type="password" {...props} />;
}
