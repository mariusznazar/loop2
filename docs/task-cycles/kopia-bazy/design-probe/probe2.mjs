// Probe only, not product code: is the one target file of backup() whole on its
// own, with commits still in the source's WAL, once moved elsewhere?
import { DatabaseSync, backup } from "node:sqlite";
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

const here = new URL(".", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const work = join(here, "work2");
rmSync(work, { recursive: true, force: true });
mkdirSync(work);
const source = join(work, "accounts.sqlite");
const live = new DatabaseSync(source);
live.exec("PRAGMA journal_mode = WAL");
live.exec("PRAGMA wal_autocheckpoint = 0");
live.exec("PRAGMA user_version = 4");
live.exec("CREATE TABLE saves (id INTEGER PRIMARY KEY, game TEXT NOT NULL)");
live.prepare("INSERT INTO saves (id, game) VALUES (1, 'only in the wal')").run();
console.log("source main file bytes", statSync(source).size, "wal bytes", statSync(`${source}-wal`).size);

const second = new DatabaseSync(source, { timeout: 1000 });
const target = join(work, "copy.sqlite");
const pages = await backup(second, target, { rate: 2 ** 31 - 1 });
second.close();
console.log("pages", pages, "files after backup, before any open:", readdirSync(work).filter((name) => name.startsWith("copy")).join(" "));

const moved = join(work, "moved.sqlite");
copyFileSync(target, moved);
console.log("moved alone, wal beside it:", existsSync(`${moved}-wal`));
const opened = new DatabaseSync(moved);
console.log("row", JSON.stringify(opened.prepare("SELECT game FROM saves").get()), "user_version", JSON.stringify(opened.prepare("PRAGMA user_version").get()), JSON.stringify(opened.prepare("PRAGMA integrity_check").get()));
opened.close();

let negative;
try {
  negative = await backup(new DatabaseSync(source, { timeout: 1000 }), join(work, "negative.sqlite"), { rate: -1 });
} catch (error) {
  negative = `refused: ${error.code ?? ""}`;
}
console.log("rate -1:", negative);
live.close();
