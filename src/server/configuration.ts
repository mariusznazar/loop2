import { constants } from "node:fs";
import { open } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import { AccountDatabase } from "./database.js";
import { SqliteSessionStore } from "./session-store.js";
import { hashPassword } from "./passwords.js";

export type ProxyMode = "cloudflare-tunnel" | "loopback-proxy" | "direct";

export interface AccountConfiguration {
  databasePath: string;
  publicOrigin: string;
  proxyMode: ProxyMode;
  secrets: string[];
}

export interface AccountRuntime {
  configuration: AccountConfiguration;
  database: AccountDatabase;
  store: SqliteSessionStore;
  dummyHash: string;
  close(): void;
}

const settings = [
  "LOOP2_DATABASE_PATH",
  "LOOP2_SESSION_SECRET_FILE",
  "LOOP2_PUBLIC_ORIGIN",
  "LOOP2_PROXY_MODE",
] as const;

function invalid(setting: string): Error {
  return new Error(`Invalid or unavailable account configuration: ${setting}`);
}

async function readSecrets(path: string): Promise<string[]> {
  try {
    const file = await open(path, constants.O_RDONLY | constants.O_NONBLOCK);
    try {
      if (!(await file.stat()).isFile()) throw new Error();
      const buffer = Buffer.alloc(16 * 1024 + 1);
      let length = 0;
      while (length < buffer.length) {
        const { bytesRead } = await file.read(
          buffer,
          length,
          buffer.length - length,
        );
        if (bytesRead === 0) break;
        length += bytesRead;
      }
      if (length > 16 * 1024) throw new Error();
      const value: unknown = JSON.parse(
        new TextDecoder("utf-8", { fatal: true }).decode(
          buffer.subarray(0, length),
        ),
      );
      if (!Array.isArray(value) || value.length === 0) throw new Error();
      const keys: string[] = [];
      for (const key of value) {
        if (
          typeof key !== "string" ||
          !/^[A-Za-z0-9_-]{43}$/.test(key) ||
          Buffer.from(key, "base64url").length !== 32 ||
          Buffer.from(key, "base64url").toString("base64url") !== key ||
          keys.includes(key)
        )
          throw new Error();
        keys.push(key);
      }
      return keys;
    } finally {
      await file.close();
    }
  } catch {
    throw invalid("LOOP2_SESSION_SECRET_FILE");
  }
}

export async function readAccountConfiguration(
  environment: NodeJS.ProcessEnv,
): Promise<AccountConfiguration | null> {
  const supplied = settings.filter((name) => environment[name] !== undefined);
  if (supplied.length === 0 && environment.NODE_ENV !== "production")
    return null;
  for (const name of settings) {
    if (!environment[name]?.trim()) throw invalid(name);
  }
  const databasePath = environment.LOOP2_DATABASE_PATH!;
  if (databasePath === ":memory:") throw invalid("LOOP2_DATABASE_PATH");
  let origin: URL;
  try {
    const suppliedOrigin = environment.LOOP2_PUBLIC_ORIGIN!;
    if (!/^https:\/\/[^/?#\\\s@]+\/?$/i.test(suppliedOrigin)) throw new Error();
    origin = new URL(suppliedOrigin);
    if (
      origin.protocol !== "https:" ||
      origin.username ||
      origin.password ||
      origin.pathname !== "/" ||
      origin.search ||
      origin.hash
    )
      throw new Error();
  } catch {
    throw invalid("LOOP2_PUBLIC_ORIGIN");
  }
  const proxyMode = environment.LOOP2_PROXY_MODE;
  if (
    (proxyMode !== "cloudflare-tunnel" &&
      proxyMode !== "loopback-proxy" &&
      proxyMode !== "direct") ||
    (environment.NODE_ENV === "production" && proxyMode !== "cloudflare-tunnel")
  )
    throw invalid("LOOP2_PROXY_MODE");
  return {
    databasePath,
    publicOrigin: origin.origin,
    proxyMode,
    secrets: await readSecrets(environment.LOOP2_SESSION_SECRET_FILE!),
  };
}

export async function openAccountRuntime(
  environment: NodeJS.ProcessEnv,
): Promise<AccountRuntime | null> {
  const configuration = await readAccountConfiguration(environment);
  if (!configuration) return null;
  let database: AccountDatabase;
  try {
    database = new AccountDatabase(configuration.databasePath);
  } catch {
    throw invalid("LOOP2_DATABASE_PATH");
  }
  try {
    const store = new SqliteSessionStore(database);
    const dummyHash = await hashPassword(randomBytes(32).toString("base64url"));
    return {
      configuration,
      database,
      store,
      dummyHash,
      close: () => store.close(),
    };
  } catch {
    database.close();
    throw new Error("Account password readiness failed");
  }
}
