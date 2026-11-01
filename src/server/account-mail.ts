import { rootCertificates } from "node:tls";
import MailComposer from "nodemailer/lib/mail-composer";
import SMTPConnection from "nodemailer/lib/smtp-connection";

// D-158: sender name, subject and the four paragraphs of the confirmation message.
const senderName = "loop2";
const confirmationSubject = "Potwierdź adres e-mail w loop2";
const confirmationOpening =
  "Ktoś — zapewne Ty — założył konto w loop2 na ten adres e-mail. Aby go potwierdzić, otwórz odnośnik:";
const confirmationValidity =
  "Odnośnik jest ważny przez 24 godziny i działa raz.";
const confirmationReset =
  "Potwierdzony adres pozwala samodzielnie zresetować zapomniane hasło.";
const confirmationIgnore = "Jeśli to nie Ty, zignoruj tę wiadomość.";

// D-227: subject and the three paragraphs of the password-reset message; the
// sender is the confirmation message's.
const resetSubject = "Ustaw nowe hasło w loop2";
const resetOpening =
  "Ktoś — zapewne Ty — poprosił o ustawienie nowego hasła do konta w loop2 na tym adresie e-mail. Aby je ustawić, otwórz odnośnik:";
const resetValidity = "Odnośnik jest ważny przez godzinę i działa raz.";
const resetIgnore =
  "Jeśli to nie Ty, zignoruj tę wiadomość. Hasło się nie zmieni.";

const defaultDeadline = 10_000;
const phaseTimeout = 5_000;
// Whitespace, control characters and the characters that separate, quote or
// group addresses in a header; D-99 accepts them at registration.
const unsafeAddressCharacter = /[\s\p{Cc},;<>()[\]"\\:]/u;
const libraryErrorCode = /^[A-Z][A-Z0-9_]*$/;

export type AccountMessage = {
  readonly to: string;
  readonly subject: string;
  readonly text: string;
};

export type SendOutcome = "sent" | "failed";

export interface Mailer {
  send(message: AccountMessage): Promise<SendOutcome>;
}

export type MailSettings = {
  readonly from: string;
  readonly host: string;
  readonly port: number;
  readonly user: string;
  readonly password: string;
};

export type SmtpMailerOptions = {
  // The whole send, connecting included; a late answer is ignored.
  readonly deadline?: number;
  // Tests only: one more certificate the server's chain may end in.
  readonly trustedCertificate?: string;
};

export function composePasswordResetMessage(
  address: string,
  link: string,
): AccountMessage {
  return {
    to: address,
    subject: resetSubject,
    text: [`${resetOpening}\n${link}`, resetValidity, resetIgnore].join("\n\n"),
  };
}

export function composeConfirmationMessage(
  address: string,
  link: string,
): AccountMessage {
  return {
    to: address,
    subject: confirmationSubject,
    text: [
      `${confirmationOpening}\n${link}`,
      confirmationValidity,
      confirmationReset,
      confirmationIgnore,
    ].join("\n\n"),
  };
}

// Exactly one "@" with text on both sides, nothing that could add a recipient
// or header text.
function plainAddress(value: string): boolean {
  const parts = value.split("@");
  return (
    parts.length === 2 &&
    parts[0] !== "" &&
    parts[1] !== "" &&
    !unsafeAddressCharacter.test(value)
  );
}

function reportFailure(error: unknown): void {
  const code =
    error instanceof Error &&
    "code" in error &&
    typeof error.code === "string" &&
    libraryErrorCode.test(error.code)
      ? error.code
      : "unknown";
  console.error(`Account mail failed: ${code}`);
}

export class SmtpMailer implements Mailer {
  readonly #settings: MailSettings;
  readonly #deadline: number;
  readonly #trustedCertificates: string[] | undefined;

  constructor(settings: MailSettings, options: SmtpMailerOptions = {}) {
    this.#settings = settings;
    this.#deadline = options.deadline ?? defaultDeadline;
    this.#trustedCertificates =
      options.trustedCertificate === undefined
        ? undefined
        : [...rootCertificates, options.trustedCertificate];
  }

  send(message: AccountMessage): Promise<SendOutcome> {
    if (!plainAddress(message.to)) {
      reportFailure(undefined);
      return Promise.resolve("failed");
    }
    return new Promise((resolve) => {
      let connection: SMTPConnection | undefined;
      let settled = false;
      const finish = (outcome: SendOutcome, error?: unknown): void => {
        if (settled) return;
        settled = true;
        clearTimeout(deadline);
        if (outcome === "failed") {
          reportFailure(error);
          connection?.close();
        } else {
          connection?.quit();
        }
        resolve(outcome);
      };
      const deadline = setTimeout(() => finish("failed"), this.#deadline);
      try {
        connection = this.#connection();
        this.#submit(connection, message, finish);
      } catch (error) {
        finish("failed", error);
      }
    });
  }

  #connection(): SMTPConnection {
    return new SMTPConnection({
      host: this.#settings.host,
      port: this.#settings.port,
      secure: false,
      requireTLS: true,
      tls: {
        minVersion: "TLSv1.2",
        rejectUnauthorized: true,
        ...(this.#trustedCertificates && {
          ca: this.#trustedCertificates,
        }),
      },
      connectionTimeout: phaseTimeout,
      greetingTimeout: phaseTimeout,
      socketTimeout: phaseTimeout,
      dnsTimeout: phaseTimeout,
      logger: false,
      debug: false,
      transactionLog: false,
    });
  }

  #submit(
    connection: SMTPConnection,
    message: AccountMessage,
    finish: (outcome: SendOutcome, error?: unknown) => void,
  ): void {
    const { from, user, password } = this.#settings;
    const composed = new MailComposer({
      from: { name: senderName, address: from },
      to: { name: "", address: message.to },
      subject: message.subject,
      text: message.text,
      disableFileAccess: true,
      disableUrlAccess: true,
    }).compile();
    connection.on("error", (error) => finish("failed", error));
    connection.on("end", () => finish("failed"));
    connection.connect((connectError) => {
      if (connectError) return finish("failed", connectError);
      // requireTLS already refuses a connection without STARTTLS; the mailer
      // checks the upgrade itself before it sends the password.
      if (!connection.secure) return finish("failed");
      connection.login(
        { credentials: { user, pass: password } },
        (loginError) => {
          if (loginError) return finish("failed", loginError);
          connection.send(
            { from, to: [message.to] },
            composed.createReadStream(),
            (sendError) => {
              if (sendError) finish("failed", sendError);
              else finish("sent");
            },
          );
        },
      );
    });
  }
}
