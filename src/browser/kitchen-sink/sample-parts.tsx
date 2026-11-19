/**
 * What more than one group of samples of the kitchen-sink page shares (D-45): the section with its
 * title, the reason a state does not apply, the wrapper that holds hover and focus on a sample, the
 * figure that names a sample, the list of the resources' icon files and the icon drawn from one of
 * them. Like every module of the page, it stands in `src/browser/kitchen-sink/`, so nothing of it is
 * compiled into what `npm run build` writes.
 */
import type { CSSProperties, ReactNode } from "react";
import { RESOURCES } from "../sim/data/resources.js";

export type State =
  "default" | "hover" | "focus" | "disabled" | "error" | "empty" | "loading";

/** The reason a state does not apply to a control, as the page shows it. */
export function reason(text: string): ReactNode {
  return <span className="sample-reason">{text}</span>;
}

/**
 * Hover and focus cannot be held by the page, so their samples stand in a wrapper that carries a
 * class `kitchen-sink.css` draws as the game draws the state, on the control inside it: hover from
 * the role `highlight` (the secondary action's hover by its own rule, in `text` on the background
 * it has; the destructive button's hover and focus in `danger` by the rules of its own in
 * `kitchen-sink.css`), focus by the one `:focus-visible` rule, repeated there with the selector of
 * the wrapper's class. The wrapper stands round the control, so the control's own element carries
 * nothing for the page.
 */
export function Forced({
  state,
  children,
}: {
  state: State;
  children: ReactNode;
}) {
  const forced =
    state === "hover"
      ? "sample-hover"
      : state === "focus"
        ? "sample-focus"
        : undefined;
  return <span className={forced}>{children}</span>;
}

/** A sample with its name under it, as the forms and the part of the menu are listed. */
export function FormFigure({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <figure className="form-sample">
      {children}
      <figcaption>{name}</figcaption>
    </figure>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="sample-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

/** The icon files of the resources, in the data's order, never named here (D-18). */
export const ICONS = Object.values(RESOURCES).map(
  ({ icon }) => `/icons/${icon}.svg`,
);

/**
 * An icon file drawn as the game draws it: the mask `icon-mask`, in the colour its place gives. A
 * `span` beside text, as the game draws it there, and a `div` in the foreign object of the drawing.
 */
export function IconMask({
  href,
  tag,
  className,
}: {
  href: string;
  tag: "span" | "div";
  className?: string;
}) {
  const Tag = tag;
  return (
    <Tag
      className={
        className === undefined ? "icon-mask" : `icon-mask ${className}`
      }
      style={{ "--icon": `url("${href}")` } as CSSProperties}
    />
  );
}
