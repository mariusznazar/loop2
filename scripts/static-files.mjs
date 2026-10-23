import { copyFile, mkdir, readdir } from "node:fs/promises";

// Copies the files both builds take as they stand into the output directory `out` (a URL ending
// in "/"): the stylesheets directly in src/browser/, the Geist fonts with their licence into
// fonts/ and the icons into icons/. `root` is the repository root, a URL ending in "/".
export async function copyStaticFiles(root, out) {
  await mkdir(out, { recursive: true });
  for (const name of await readdir(new URL("src/browser/", root))) {
    if (name.endsWith(".css"))
      await copyFile(new URL(`src/browser/${name}`, root), new URL(name, out));
  }
  const fontsOut = new URL("fonts/", out);
  await mkdir(fontsOut, { recursive: true });
  for (const name of await readdir(new URL("assets/fonts/", root))) {
    if (name.endsWith(".woff2") || name === "OFL.txt")
      await copyFile(
        new URL(`assets/fonts/${name}`, root),
        new URL(name, fontsOut),
      );
  }
  const iconsOut = new URL("icons/", out);
  await mkdir(iconsOut, { recursive: true });
  for (const name of await readdir(new URL("assets/icons/", root))) {
    if (name.endsWith(".svg"))
      await copyFile(
        new URL(`assets/icons/${name}`, root),
        new URL(name, iconsOut),
      );
  }
}
