// Contrast as WCAG 2.2 defines it, the definition D-42 takes: the ratio of the relative luminances
// of two colours, each lightened by 0.05.

const linear = (value) => {
  const unit = value / 255;
  return unit <= 0.04045 ? unit / 12.92 : ((unit + 0.055) / 1.055) ** 2.4;
};

/** Relative luminance of [r, g, b], from 0 to 1. */
export const luminance = ([r, g, b]) =>
  0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);

/** Contrast ratio of two colours, from 1 to 21, whichever is lighter. */
export function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}
