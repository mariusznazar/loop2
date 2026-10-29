import { constants } from "node:fs";
import { open } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import { AccountDatabase } from "./database.js";
import { SqliteSessionStore } from "./session-store.js";
import { hashPassword } from "./passwords.js";
import { SmtpMailer } from "./account-mail.js";
import type { MailSettings, Mailer } from "./account-mail.js";

export type ProxyMode = "cloudflare-tunnel" | "loopback-proxy" | "direct";

export interface AccountConfiguration {
  databasePath: string;
  publicOrigin: string;
  proxyMode: ProxyMode;
  secrets: string[];
  mail: MailSettings;
}

export interface AccountRuntime {
  configuration: AccountConfiguration;
  database: AccountDatabase;
  store: SqliteSessionStore;
  dummyHash: string;
  // The seam for route tests: a stand-in mailer replaces this property.
  mailer: Mailer;
  close(): void;
}

const settings = [
  "LOOP2_DATABASE_PATH",
  "LOOP2_SESSION_SECRET_FILE",
  "LOOP2_PUBLIC_ORIGIN",
  "LOOP2_PROXY_MODE",
  "LOOP2_MAIL_FROM",
  "LOOP2_SMTP_HOST",
  "LOOP2_SMTP_PORT",
  "LOOP2_SMTP_USER",
  "LOOP2_SMTP_PASSWORD_FILE",
] as const;

// Printable ASCII with no address special (D-99 accepts those at registration).
const senderAddress = /^[^@\s,;<>()[\]"\\:]+@[^@\s,;<>()[\]"\\:]+$/;
const printableAscii = /^[\x21-\x7e]+$/;
const hostName = /^[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*$/;
const login = /^[^\s\p{Cc}]+$/u;
const controlCharacter = /\p{Cc}/u;
const passwordFileLimit = 1024;

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

// The SMTP password: one small UTF-8 file without control characters, so a
// trailing newline is refused instead of trimmed; read once at startup.
async function readSmtpPassword(path: string): Promise<string> {
  try {
    const file = await open(path, constants.O_RDONLY | constants.O_NONBLOCK);
    try {
      if (!(await file.stat()).isFile()) throw new Error();
      const buffer = Buffer.alloc(passwordFileLimit + 1);
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
      if (length === 0 || length > passwordFileLimit) throw new Error();
      const password = new TextDecoder("utf-8", { fatal: true }).decode(
        buffer.subarray(0, length),
      );
      if (controlCharacter.test(password)) throw new Error();
      return password;
    } finally {
      await file.close();
    }
  } catch {
    throw invalid("LOOP2_SMTP_PASSWORD_FILE");
  }
}

function readMailSettings(
  environment: NodeJS.ProcessEnv,
): Omit<MailSettings, "password"> {
  const from = environment.LOOP2_MAIL_FROM!;
  if (!senderAddress.test(from) || !printableAscii.test(from))
    throw invalid("LOOP2_MAIL_FROM");
  const host = environment.LOOP2_SMTP_HOST!;
  if (host.length > 253 || !hostName.test(host))
    throw invalid("LOOP2_SMTP_HOST");
  const rawPort = environment.LOOP2_SMTP_PORT!;
  const port = /^[0-9]+$/.test(rawPort) ? Number(rawPort) : NaN;
  if (!Number.isInteger(port) || port < 1 || port > 65535)
    throw invalid("LOOP2_SMTP_PORT");
  const user = environment.LOOP2_SMTP_USER!;
  if (user.length > 254 || !login.test(user)) throw invalid("LOOP2_SMTP_USER");
  return { from, host, port, user };
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
  const mail = readMailSettings(environment);
  const secrets = await readSecrets(environment.LOOP2_SESSION_SECRET_FILE!);
  const password = await readSmtpPassword(
    environment.LOOP2_SMTP_PASSWORD_FILE!,
  );
  return {
    databasePath,
    publicOrigin: origin.origin,
    proxyMode,
    secrets,
    mail: { ...mail, password },
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
      mailer: new SmtpMailer(configuration.mail),
      close: () => store.close(),
    };
  } catch {
    database.close();
    throw new Error("Account password readiness failed");
  }
}
