/**
 * The group of the kitchen-sink page that shows the roles (D-45): every role of the styleguide's
 * table Roles, in its order, with a sample of its kind: a background with the text that stands on
 * it, a text on each of the backgrounds, or a swatch. Like every module of the page, it stands in
 * `src/browser/kitchen-sink/`, so nothing of it is compiled into what `npm run build` writes.
 */
import { ICONS, IconMask, Section } from "./sample-parts.js";

/** The kinds of the table Roles, by their names on the page. */
type Kind = "tło" | "tekst" | "inne";

/** The 31 roles of the styleguide's table Roles, in its order, with their kinds. */
const ROLES: readonly (readonly [string, Kind])[] = [
  ["page", "tło"],
  ["panel", "tło"],
  ["highlight", "tło"],
  ["rule-winning", "tło"],
  ["rule-running", "tło"],
  ["divider", "inne"],
  ["control-border", "inne"],
  ["selected", "inne"],
  ["condition-unmet", "inne"],
  ["text-strong", "tekst"],
  ["text", "tekst"],
  ["text-secondary", "tekst"],
  ["text-label", "tekst"],
  ["text-disabled", "tekst"],
  ["positive", "tekst"],
  ["warning", "tekst"],
  ["danger", "tekst"],
  ["discovery", "tekst"],
  ["player-change", "tekst"],
  ["character", "inne"],
  ["tile-hidden", "inne"],
  ["tile-revealed", "inne"],
  ["tile-edge", "inne"],
  ["link-highlight", "inne"],
  ["depleted", "inne"],
  ["focus", "inne"],
  ["satiety-fill", "inne"],
  ["chill-zone", "inne"],
  ["safe-zone", "inne"],
  ["scale-marker", "inne"],
  ["warming-frame", "inne"],
];

/** The five roles of the kind background, on which every role of the kind text stands. */
const SURFACES = ROLES.filter(([, kind]) => kind === "tło").map(
  ([name]) => name,
);

function RoleSample({ name, kind }: { name: string; kind: Kind }) {
  if (kind === "tło") {
    // A background with the text that stands on it (styleguide: "Every background with its text").
    return (
      <span className="role-sample">
        <span
          className="role-surface"
          style={{ backgroundColor: `var(--${name})` }}
        >
          Treść na tym tle
        </span>
      </span>
    );
  }
  if (kind === "tekst") {
    return (
      <span className="role-sample">
        {SURFACES.map((surface) => (
          <span
            key={surface}
            className="role-surface"
            style={{
              backgroundColor: `var(--${surface})`,
              color: `var(--${name})`,
            }}
          >
            {`Tekst na ${surface}`}
          </span>
        ))}
      </span>
    );
  }
  if (name === "depleted") {
    // The role holds an opacity, not a colour: an icon as the drawing of the map draws it, in
    // `text-strong`, as it stands and dimmed by the role.
    return (
      <span className="role-sample">
        <IconMask href={ICONS[0]} tag="span" className="role-icon" />
        <IconMask href={ICONS[0]} tag="span" className="role-icon dimmed" />
      </span>
    );
  }
  return (
    <span className="role-sample">
      <span
        className="role-swatch"
        style={{ backgroundColor: `var(--${name})` }}
      />
    </span>
  );
}

export function RolesSection() {
  return (
    <Section title="Role">
      <table className="sample-table">
        <thead>
          <tr>
            <th>Rola</th>
            <th>Rodzaj</th>
            <th>Próbka</th>
          </tr>
        </thead>
        <tbody>
          {ROLES.map(([name, kind]) => (
            <tr key={name}>
              <th scope="row">{name}</th>
              <td>{kind}</td>
              <td>
                <RoleSample name={name} kind={kind} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}
