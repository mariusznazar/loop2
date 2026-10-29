import { createHash, randomBytes } from "node:crypto";

const minute = 60 * 1000;
const emailFailureLimit = 5;
const emailFailureWindow = 15 * minute;
const emailLockDuration = 15 * minute;
const addressFailureLimit = 20;
const addressFailureWindow = 15 * minute;
const registrationLimit = 5;
const registrationWindow = 60 * minute;
const defaultKeyCapacity = 10_000;
const defaultSendingDeadline = 10_000;

// D-105: at most 30 account messages an hour in total and three for one
// address, counted for the account, whose address never changes (D-159, D-161).
export const accountMessageLimits = {
  windowMs: 60 * minute,
  total: 30,
  perAccount: 3,
} as const;

// D-155: a confirmation link works for 24 hours from the moment it is recorded.
export const confirmationLinkLifetime = 24 * 60 * minute;

const linkTokenBytes = 32;
const linkTokenText = /^[A-Za-z0-9_-]{43}$/;

// 32 random bytes as 43 base64url characters (D-156).
export function createLinkToken(): string {
  return randomBytes(linkTokenBytes).toString("base64url");
}

// Exactly the form createLinkToken writes: 43 base64url characters that decode
// to 32 bytes and encode back to the same text, so one link has one spelling.
export function isLinkToken(value: string): boolean {
  if (!linkTokenText.test(value)) return false;
  const bytes = Buffer.from(value, "base64url");
  return (
    bytes.length === linkTokenBytes && bytes.toString("base64url") === value
  );
}

// The account database keeps only this digest of a link's token (D-156).
export function linkTokenDigest(token: string): string {
  return createHash("sha256").update(token).digest("base64url");
}

export type RegistrationCheck =
  | { ok: true; email: string; password: string }
  | {
      ok: false;
      problem: "invalid-email" | "invalid-password" | "password-mismatch";
    };

// ECMAScript trim and lowercase; the shape is exactly one "@" with text on both sides.
export function normalizeEmail(value: string): string | null {
  const email = value.trim().toLowerCase();
  const parts = email.split("@");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  return email;
}

// Counted in Unicode code points; the content is never trimmed or normalized.
export function acceptablePassword(password: string): boolean {
  const length = [...password].length;
  return length >= 12 && length <= 128;
}

export function checkRegistration(input: {
  email: string;
  password: string;
  passwordConfirmation: string;
}): RegistrationCheck {
  const email = normalizeEmail(input.email);
  if (!email) return { ok: false, problem: "invalid-email" };
  if (!acceptablePassword(input.password))
    return { ok: false, problem: "invalid-password" };
  if (input.password !== input.passwordConfirmation)
    return { ok: false, problem: "password-mismatch" };
  return { ok: true, email, password: input.password };
}

export function checkLogin(input: {
  email: string;
  password: string;
}): { email: string; password: string } | null {
  const email = normalizeEmail(input.email);
  if (!email || !acceptablePassword(input.password)) return null;
  return { email, password: input.password };
}

interface EmailHistory {
  failures: number[];
  reserved: number;
  lockedUntil: number;
}

interface AddressHistory {
  failures: number[];
  reserved: number;
  registrations: number[];
  registrationsReserved: number;
}

// An admitted attempt holds its reservation until exactly one settlement,
// made when its password work has actually completed.
export interface LoginTicket {
  succeed(): void;
  fail(): void;
  release(): void;
}

export interface RegistrationTicket {
  created(): void;
  release(): void;
}

interface PolicyOptions {
  now?: () => number;
  keyCapacity?: number;
  // The whole sending of an account message, in milliseconds; tests shorten it.
  sendingDeadline?: number;
}

function recent(times: number[], now: number, window: number): number[] {
  return times.filter((time) => time + window > now);
}

export class AccountPolicy {
  private readonly now: () => number;
  private readonly keyCapacity: number;
  private readonly emails = new Map<string, EmailHistory>();
  private readonly addresses = new Map<string, AddressHistory>();
  private reservations = 0;
  // After this long a sending whose mailer has not answered counts as failed,
  // so a registration or a resend never waits on the mail service unbounded.
  readonly sendingDeadline: number;

  constructor(options: PolicyOptions = {}) {
    this.now = options.now ?? Date.now;
    this.keyCapacity = options.keyCapacity ?? defaultKeyCapacity;
    if (!Number.isSafeInteger(this.keyCapacity) || this.keyCapacity < 1)
      throw new Error("Invalid limiter capacity");
    this.sendingDeadline = options.sendingDeadline ?? defaultSendingDeadline;
    if (
      !Number.isSafeInteger(this.sendingDeadline) ||
      this.sendingDeadline < 1 ||
      this.sendingDeadline > 2 ** 31 - 1
    )
      throw new Error("Invalid sending deadline");
  }

  // Attempts admitted and not yet settled.
  get inFlight(): number {
    return this.reservations;
  }

  admitLogin(email: string, address: string): LoginTicket | null {
    const now = this.now();
    const emailKey = createHash("sha256").update(email).digest("base64url");
    let byEmail = this.currentEmail(emailKey, now);
    let byAddress = this.currentAddress(address, now);
    if (
      (byEmail &&
        (byEmail.lockedUntil > now ||
          byEmail.failures.length + byEmail.reserved >= emailFailureLimit)) ||
      (byAddress &&
        byAddress.failures.length + byAddress.reserved >= addressFailureLimit)
    )
      return null;
    if (
      (!byEmail && !this.room(this.emails, now)) ||
      (!byAddress && !this.room(this.addresses, now))
    )
      return null;
    byEmail ??= this.track(this.emails, emailKey, {
      failures: [],
      reserved: 0,
      lockedUntil: 0,
    });
    byAddress ??= this.track(this.addresses, address, newAddress());
    const emailEntry = byEmail;
    const addressEntry = byAddress;
    emailEntry.reserved += 1;
    addressEntry.reserved += 1;
    this.reservations += 1;
    let open = true;
    const once = (outcome: (time: number) => void) => () => {
      if (!open) return;
      open = false;
      emailEntry.reserved -= 1;
      addressEntry.reserved -= 1;
      this.reservations -= 1;
      outcome(this.now());
      this.forget(this.emails, emailKey, emailEntry);
      this.forget(this.addresses, address, addressEntry);
    };
    return {
      succeed: once(() => {
        emailEntry.failures = [];
      }),
      fail: once((time) => {
        emailEntry.failures = recent(
          emailEntry.failures,
          time,
          emailFailureWindow,
        );
        emailEntry.failures.push(time);
        if (emailEntry.failures.length >= emailFailureLimit) {
          emailEntry.lockedUntil = time + emailLockDuration;
          emailEntry.failures = [];
        }
        addressEntry.failures = recent(
          addressEntry.failures,
          time,
          addressFailureWindow,
        );
        addressEntry.failures.push(time);
      }),
      release: once(() => {}),
    };
  }

  admitRegistration(address: string): RegistrationTicket | null {
    const now = this.now();
    let byAddress = this.currentAddress(address, now);
    if (
      byAddress &&
      byAddress.registrations.length + byAddress.registrationsReserved >=
        registrationLimit
    )
      return null;
    if (!byAddress && !this.room(this.addresses, now)) return null;
    byAddress ??= this.track(this.addresses, address, newAddress());
    const entry = byAddress;
    entry.registrationsReserved += 1;
    this.reservations += 1;
    let open = true;
    const once = (outcome: (time: number) => void) => () => {
      if (!open) return;
      open = false;
      entry.registrationsReserved -= 1;
      this.reservations -= 1;
      outcome(this.now());
      this.forget(this.addresses, address, entry);
    };
    return {
      created: once((time) => {
        entry.registrations = recent(
          entry.registrations,
          time,
          registrationWindow,
        );
        entry.registrations.push(time);
      }),
      release: once(() => {}),
    };
  }

  private currentEmail(key: string, now: number): EmailHistory | undefined {
    const entry = this.emails.get(key);
    if (!entry) return undefined;
    entry.failures = recent(entry.failures, now, emailFailureWindow);
    return entry;
  }

  private currentAddress(
    address: string,
    now: number,
  ): AddressHistory | undefined {
    const entry = this.addresses.get(address);
    if (!entry) return undefined;
    entry.failures = recent(entry.failures, now, addressFailureWindow);
    entry.registrations = recent(entry.registrations, now, registrationWindow);
    return entry;
  }

  // A full table first drops expired entries; a live restriction is never evicted.
  private room<T extends EmailHistory | AddressHistory>(
    table: Map<string, T>,
    now: number,
  ): boolean {
    if (table.size < this.keyCapacity) return true;
    for (const [key, entry] of table) {
      if (!live(entry, now)) table.delete(key);
    }
    return table.size < this.keyCapacity;
  }

  private track<T>(table: Map<string, T>, key: string, entry: T): T {
    table.set(key, entry);
    return entry;
  }

  private forget<T extends EmailHistory | AddressHistory>(
    table: Map<string, T>,
    key: string,
    entry: T,
  ): void {
    if (!live(entry, this.now())) table.delete(key);
  }
}

function newAddress(): AddressHistory {
  return {
    failures: [],
    reserved: 0,
    registrations: [],
    registrationsReserved: 0,
  };
}

function live(entry: EmailHistory | AddressHistory, now: number): boolean {
  if (entry.reserved > 0) return true;
  if ("lockedUntil" in entry) {
    return (
      entry.lockedUntil > now ||
      recent(entry.failures, now, emailFailureWindow).length > 0
    );
  }
  return (
    entry.registrationsReserved > 0 ||
    recent(entry.failures, now, addressFailureWindow).length > 0 ||
    recent(entry.registrations, now, registrationWindow).length > 0
  );
}
