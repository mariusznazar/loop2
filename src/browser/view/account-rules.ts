/**
 * The messages of a registration the server would refuse, word for word as the server's account
 * routes give them, so the player reads the same sentence whichever side finds the problem.
 */
const PROBLEM_MESSAGES = {
  email: "Podaj adres e-mail w postaci nazwa@domena.",
  password: "Hasło musi mieć od 12 do 128 znaków.",
  confirmation: "Powtórzone hasło różni się od hasła.",
} as const;

export type RegistrationField = keyof typeof PROBLEM_MESSAGES;

/**
 * The message for an address the server would refuse, or null when it would take it. The rule is
 * the server's: the address, trimmed, holds exactly one „@” with text on both sides. Pure.
 */
export function addressProblem(email: string): string | null {
  const parts = email.trim().split("@");
  return parts.length !== 2 || parts[0] === "" || parts[1] === ""
    ? PROBLEM_MESSAGES.email
    : null;
}

/**
 * The fields of a new password the server would refuse, with their messages; empty when it would
 * take it. The password has 12 to 128 Unicode code points, counted as typed, never trimmed; the
 * repetition equals the password exactly. Pure.
 */
export function passwordProblems(
  password: string,
  confirmation: string,
): Partial<Record<"password" | "confirmation", string>> {
  const problems: Partial<Record<"password" | "confirmation", string>> = {};
  const length = [...password].length;
  if (length < 12 || length > 128)
    problems.password = PROBLEM_MESSAGES.password;
  if (confirmation !== password)
    problems.confirmation = PROBLEM_MESSAGES.confirmation;
  return problems;
}

/**
 * The fields of a registration the server would refuse, with their messages; empty when it would
 * take it: the address's rule and the password rules together. Pure.
 */
export function registrationProblems(
  email: string,
  password: string,
  confirmation: string,
): Partial<Record<RegistrationField, string>> {
  const problems: Partial<Record<RegistrationField, string>> = {};
  const address = addressProblem(email);
  if (address !== null) problems.email = address;
  return { ...problems, ...passwordProblems(password, confirmation) };
}

/** The answer to a request for a password-reset link, the same for every well-formed address. */
export const RESET_REQUESTED_SENTENCE =
  "Jeśli to konto ma potwierdzony adres, wysłaliśmy na niego odnośnik. Gdy wiadomość nie przyjdzie, spróbuj ponownie później.";
