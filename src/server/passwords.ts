import argon2 from "argon2";

export const PASSWORD_HASH_PROFILE = {
  type: argon2.argon2id,
  memoryCost: 65536,
  timeCost: 3,
  parallelism: 1,
  hashLength: 32,
} as const;

const MAX_ACTIVE_PASSWORD_OPERATIONS = 2;
let activeOperations = 0;

export class PasswordCapacityError extends Error {
  constructor() {
    super("Password work capacity is full");
    this.name = "PasswordCapacityError";
  }
}

async function withPasswordCapacity<T>(
  operation: () => Promise<T>,
): Promise<T> {
  if (activeOperations >= MAX_ACTIVE_PASSWORD_OPERATIONS) {
    throw new PasswordCapacityError();
  }

  activeOperations += 1;
  try {
    return await operation();
  } finally {
    activeOperations -= 1;
  }
}

export function hashPassword(password: string): Promise<string> {
  return withPasswordCapacity(() =>
    argon2.hash(password, PASSWORD_HASH_PROFILE),
  );
}

export function verifyPassword(
  hash: string,
  password: string,
): Promise<boolean> {
  return withPasswordCapacity(() => argon2.verify(hash, password));
}
