"""Convert Tailwind v4 oklch palette values to sRGB hex and compute WCAG 2.2 contrast ratios.

Controls: palette entries whose hex loop2's tokens already hold from loop's rendered page.
"""

import math

PALETTE = {
    "red-400": (0.704, 0.191, 22.216),
    "orange-300": (0.837, 0.128, 66.29),
    "orange-400": (0.75, 0.183, 55.934),
    "orange-500": (0.705, 0.213, 47.604),
    "amber-300": (0.879, 0.169, 91.605),
    "sky-500": (0.685, 0.169, 237.323),
    "zinc-400": (0.705, 0.015, 286.067),
    "zinc-500": (0.552, 0.016, 285.938),
    "zinc-950": (0.141, 0.005, 285.823),
}


def encode(c):
    c = min(max(c, 0.0), 1.0)
    return 12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055


def oklch_hex(lightness, chroma, hue):
    a = chroma * math.cos(math.radians(hue))
    b = chroma * math.sin(math.radians(hue))
    l_ = lightness + 0.3963377774 * a + 0.2158037573 * b
    m_ = lightness - 0.1055613458 * a - 0.0638541728 * b
    s_ = lightness - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_**3, m_**3, s_**3
    r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    bb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    return "#" + "".join(f"{round(encode(v) * 255):02x}" for v in (r, g, bb)), (r, g, bb)


def luminance(colour):
    total = 0.0
    for weight, start in zip((0.2126, 0.7152, 0.0722), (1, 3, 5)):
        q = int(colour[start : start + 2], 16) / 255
        total += weight * (q / 12.92 if q <= 0.04045 else ((q + 0.055) / 1.055) ** 2.4)
    return total


def ratio(x, y):
    hi, lo = sorted((luminance(x), luminance(y)), reverse=True)
    return (hi + 0.05) / (lo + 0.05)


def over(fg, bg, alpha):
    out = "#"
    for start in (1, 3, 5):
        f = int(fg[start : start + 2], 16)
        b = int(bg[start : start + 2], 16)
        out += f"{round(alpha * f + (1 - alpha) * b):02x}"
    return out


if __name__ == "__main__":
    lines = []
    for name, value in PALETTE.items():
        hexv, linear = oklch_hex(*value)
        lines.append(f"{name}: {hexv} linear {tuple(round(v, 4) for v in linear)}")
    panel, highlight, page = "#18181b", "#27272a", "#09090b"
    chosen = {
        "satiety-fill": "#ff8904",
        "chill-zone": "#00a6f4",
        "safe-zone": "#9f9fa9",
        "scale-marker": "#09090b",
        "warming-frame": "#ffd230",
        "danger": "#ff6467",
        "positive": "#00bc7d",
        "text-strong": "#f4f4f5",
        "warning": "#fe9a00",
    }
    for fill in ("positive", "satiety-fill", "text-strong"):
        lines.append(f"{fill} on highlight: {ratio(chosen[fill], highlight):.3f}")
        dim = over(chosen[fill], highlight, 0.4)
        lines.append(f"  dim 40% {dim} on highlight: {ratio(dim, highlight):.3f}")
    for zone in ("chill-zone", "safe-zone", "danger", "warming-frame"):
        lines.append(f"{zone} on panel: {ratio(chosen[zone], panel):.3f}")
    for zone in ("chill-zone", "safe-zone", "danger"):
        lines.append(f"scale-marker on {zone}: {ratio(chosen['scale-marker'], chosen[zone]):.3f}")
        dim = over(chosen[zone], panel, 0.4)
        lines.append(f"  dim 40% {zone} {dim} on panel: {ratio(dim, panel):.3f}")
    lines.append(f"satiety-fill vs danger: {ratio(chosen['satiety-fill'], chosen['danger']):.3f}")
    lines.append(f"satiety-fill vs warning: {ratio(chosen['satiety-fill'], chosen['warning']):.3f}")
    lines.append(f"warming-frame vs chill-zone: {ratio(chosen['warming-frame'], chosen['chill-zone']):.3f}")
    with open(".runs/executor-1/out.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
