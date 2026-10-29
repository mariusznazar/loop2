import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { generateKeyPairSync, randomBytes, sign } from "node:crypto";
import { test } from "node:test";
import { SMTPServer } from "smtp-server";
import {
  composeConfirmationMessage,
  SmtpMailer,
} from "../dist/server/account-mail.js";

// Synthetic settings; no case reaches a mail service outside this process.
const sender = "sender@example.test";
const login = "smtp-login@example.test";
const password = "synthetic-smtp-password-7Qx";
const recipient = "player@example.test";
const token = "Zm9yLXRlc3RzLW9ubHktbm90LWEtcmVhbC10b2tlbi0";
const link = `https://loop2.mariusznazar.com/#confirm-email=${token}`;

// A self-signed certificate made in the test, so no file or network is needed.
// Only the subjectAltName differs between the two: the address the mailer
// connects to, or a name it does not connect to.
const localCertificate = certificate([0x87, Buffer.from([127, 0, 0, 1])]);
const otherHostCertificate = certificate([
  0x82,
  Buffer.from("mail.example.test"),
]);

function der(tag, ...parts) {
  const body = Buffer.concat(parts);
  let length = Buffer.from([body.length]);
  if (body.length >= 0x80) {
    const bytes = [];
    for (let n = body.length; n > 0; n >>= 8) bytes.unshift(n & 0xff);
    length = Buffer.from([0x80 | bytes.length, ...bytes]);
  }
  return Buffer.concat([Buffer.from([tag]), length, body]);
}

function oid(dotted) {
  const [first, second, ...rest] = dotted.split(".").map(Number);
  const bytes = [40 * first + second];
  for (const value of rest) {
    const chunk = [value & 0x7f];
    for (let n = value >> 7; n > 0; n >>= 7) chunk.unshift((n & 0x7f) | 0x80);
    bytes.push(...chunk);
  }
  return der(0x06, Buffer.from(bytes));
}

function utcTime(date) {
  const digits = date.toISOString().replace(/[-:T]/g, "").slice(2, 14);
  return der(0x17, Buffer.from(`${digits}Z`));
}

function certificate([altNameTag, altNameValue]) {
  const { privateKey, publicKey } = generateKeyPairSync("ec", {
    namedCurve: "prime256v1",
  });
  const sequence = (...parts) => der(0x30, ...parts);
  const ecdsaWithSha256 = sequence(oid("1.2.840.10045.4.3.2"));
  const name = sequence(
    der(0x31, sequence(oid("2.5.4.3"), der(0x0c, Buffer.from("loop2 test")))),
  );
  // A DER INTEGER is minimal and positive only when its first byte is
  // 0x01..0x7f; OpenSSL refuses a certificate whose serial has a leading zero.
  const serial = randomBytes(16);
  serial[0] = (serial[0] & 0x7f) | 0x40;
  const now = Date.now();
  const tbs = sequence(
    der(0xa0, der(0x02, Buffer.from([2]))),
    der(0x02, serial),
    ecdsaWithSha256,
    name,
    sequence(
      utcTime(new Date(now - 3_600_000)),
      utcTime(new Date(now + 86_400_000)),
    ),
    name,
    publicKey.export({ type: "spki", format: "der" }),
    der(
      0xa3,
      sequence(
        sequence(
          oid("2.5.29.19"),
          der(0x01, Buffer.from([0xff])),
          der(0x04, sequence(der(0x01, Buffer.from([0xff])))),
        ),
        sequence(
          oid("2.5.29.17"),
          der(0x04, sequence(der(altNameTag, altNameValue))),
        ),
      ),
    ),
  );
  const signature = sign("sha256", tbs, privateKey);
  const encoded = sequence(
    tbs,
    ecdsaWithSha256,
    der(0x03, Buffer.from([0]), signature),
  ).toString("base64");
  return {
    key: privateKey.export({ type: "pkcs8", format: "pem" }),
    cert: `-----BEGIN CERTIFICATE-----\n${encoded.match(/.{1,64}/g).join("\n")}\n-----END CERTIFICATE-----\n`,
  };
}

function withinLimit(promise, milliseconds, label) {
  let deadline;
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      deadline = setTimeout(
        () => reject(new Error(`${label} exceeded ${milliseconds} ms`)),
        milliseconds,
      );
    }),
  ]).finally(() => clearTimeout(deadline));
}

// A real SMTP server on port 0 of the loopback interface, closed after the
// case whether it passed or not.
async function smtpServer(
  t,
  {
    offerStartTls = true,
    tlsCertificate = localCertificate,
    holdData = false,
  } = {},
) {
  const record = {
    connections: 0,
    authentications: [],
    messages: [],
    closed: 0,
    heldAnswers: [],
  };
  const server = new SMTPServer({
    secure: false,
    key: tlsCertificate.key,
    cert: tlsCertificate.cert,
    // Without STARTTLS the server accepts plain-text login and mail, so only
    // the mailer can refuse to go on.
    disabledCommands: offerStartTls ? [] : ["STARTTLS"],
    authOptional: !offerStartTls,
    allowInsecureAuth: !offerStartTls,
    authMethods: ["PLAIN", "LOGIN"],
    logger: false,
    closeTimeout: 1000,
    onConnect(session, callback) {
      record.connections += 1;
      callback();
    },
    onAuth(auth, session, callback) {
      record.authentications.push({
        username: auth.username,
        password: auth.password,
        secure: session.secure,
      });
      if (auth.username === login && auth.password === password) {
        callback(null, { user: auth.username });
      } else {
        callback(new Error(`Invalid password for ${auth.username}`));
      }
    },
    onData(stream, session, callback) {
      const chunks = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("end", () => {
        record.messages.push({
          raw: Buffer.concat(chunks).toString("latin1"),
          from: session.envelope.mailFrom.address,
          to: session.envelope.rcptTo.map((address) => address.address),
          secure: session.secure,
          user: session.user,
        });
        if (holdData) record.heldAnswers.push(callback);
        else callback();
      });
    },
    onClose() {
      record.closed += 1;
    },
  });
  server.on("error", () => {});
  await withinLimit(
    new Promise((resolve, reject) => {
      server.server.once("error", reject);
      server.listen(0, "127.0.0.1", resolve);
    }),
    5000,
    "SMTP readiness",
  );
  t.after(() =>
    withinLimit(
      new Promise((resolve) => server.close(resolve)),
      5000,
      "SMTP shutdown",
    ),
  );
  return { port: server.server.address().port, record };
}

function settings(port, overrides = {}) {
  return {
    from: sender,
    host: "127.0.0.1",
    port,
    user: login,
    password,
    ...overrides,
  };
}

function trusting(tlsCertificate = localCertificate, options = {}) {
  return { trustedCertificate: tlsCertificate.cert, ...options };
}

// RFC 2047 encoded words and RFC 2045 quoted-printable, decoded here rather
// than with the library under test.
function quotedPrintableBytes(text) {
  const bytes = [];
  for (let index = 0; index < text.length; index += 1) {
    if (
      text[index] === "=" &&
      /^[0-9A-F]{2}$/i.test(text.slice(index + 1, index + 3))
    ) {
      bytes.push(parseInt(text.slice(index + 1, index + 3), 16));
      index += 2;
    } else {
      bytes.push(...Buffer.from(text[index], "latin1"));
    }
  }
  return Buffer.from(bytes);
}

function decodeWords(value) {
  return value
    .replace(/(?:=\?[^?]+\?[QqBb]\?[^?]*\?=\s*)+/g, (run) => {
      const bytes = [...run.matchAll(/=\?[^?]+\?([QqBb])\?([^?]*)\?=/g)].map(
        ([, encoding, text]) =>
          encoding.toUpperCase() === "B"
            ? Buffer.from(text, "base64")
            : quotedPrintableBytes(text.replace(/_/g, " ")),
      );
      const trailing = run.match(/\s*$/)[0];
      return Buffer.concat(bytes).toString("utf8") + trailing;
    })
    .trimEnd();
}

function parse(raw) {
  const split = raw.indexOf("\r\n\r\n");
  const headers = new Map();
  for (const line of raw
    .slice(0, split)
    .replace(/\r\n[ \t]/g, " ")
    .split("\r\n")) {
    const colon = line.indexOf(":");
    const name = line.slice(0, colon).toLowerCase();
    headers.set(name, [
      ...(headers.get(name) ?? []),
      line.slice(colon + 1).trim(),
    ]);
  }
  const encoding = (
    headers.get("content-transfer-encoding")?.[0] ?? "7bit"
  ).toLowerCase();
  const body = raw.slice(split + 4);
  let bytes = Buffer.from(body, "latin1");
  if (encoding === "quoted-printable") {
    bytes = quotedPrintableBytes(body.replace(/=\r\n/g, ""));
  } else if (encoding === "base64") {
    bytes = Buffer.from(body, "base64");
  }
  return { headers, text: bytes.toString("utf8").replace(/\r\n/g, "\n") };
}

test("a message is submitted only after STARTTLS and login with the configured login and password", async (t) => {
  const smtp = await smtpServer(t);
  const mailer = new SmtpMailer(settings(smtp.port), trusting());

  const outcome = await mailer.send(
    composeConfirmationMessage(recipient, link),
  );

  assert.equal(outcome, "sent");
  assert.deepEqual(smtp.record.authentications, [
    { username: login, password, secure: true },
  ]);
  assert.equal(smtp.record.messages.length, 1);
  const [message] = smtp.record.messages;
  assert.equal(message.secure, true);
  assert.equal(message.user, login);
  assert.equal(message.from, sender);
  assert.deepEqual(message.to, [recipient]);
});

test("a server that offers no STARTTLS receives no login and no message", async (t) => {
  // invariant: account-email-nodemailer-starttls
  const smtp = await smtpServer(t, { offerStartTls: false });
  const mailer = new SmtpMailer(settings(smtp.port), trusting());

  const outcome = await mailer.send(
    composeConfirmationMessage(recipient, link),
  );

  assert.equal(outcome, "failed");
  assert.equal(
    smtp.record.connections,
    1,
    "precondition: the mailer connected",
  );
  assert.deepEqual(smtp.record.authentications, []);
  assert.deepEqual(smtp.record.messages, []);
});

test("a STARTTLS upgrade to a certificate not trusted for the host completes nothing", async (t) => {
  const cases = [
    ["a certificate the mailer does not trust", localCertificate, undefined],
    [
      "a trusted certificate for another host name",
      otherHostCertificate,
      otherHostCertificate,
    ],
  ];
  for (const [label, served, trusted] of cases) {
    const smtp = await smtpServer(t, { tlsCertificate: served });
    const options = trusted ? trusting(trusted) : {};
    const mailer = new SmtpMailer(settings(smtp.port), options);

    const outcome = await mailer.send(
      composeConfirmationMessage(recipient, link),
    );

    assert.equal(outcome, "failed", label);
    assert.equal(
      smtp.record.connections,
      1,
      `precondition: ${label} was reached`,
    );
    assert.deepEqual(smtp.record.authentications, [], label);
    assert.deepEqual(smtp.record.messages, [], label);
  }
});

test("a server that stops answering yields failed within the shortened deadline and loses the connection", async (t) => {
  const smtp = await smtpServer(t, { holdData: true });
  // Each phase of the library may wait 5 s; the deadline cuts the send at 300 ms.
  const mailer = new SmtpMailer(
    settings(smtp.port),
    trusting(localCertificate, { deadline: 300 }),
  );
  const started = Date.now();

  const outcome = await withinLimit(
    mailer.send(composeConfirmationMessage(recipient, link)),
    3000,
    "the send",
  );

  assert.equal(outcome, "failed");
  assert.ok(Date.now() - started < 3000);
  assert.equal(
    smtp.record.heldAnswers.length,
    1,
    "precondition: the server held its answer",
  );
  await withinLimit(
    (async () => {
      while (smtp.record.closed === 0)
        await new Promise((resolve) => setTimeout(resolve, 10));
    })(),
    3000,
    "the server seeing the connection closed",
  );
});

test("a crafted recipient fails without connecting, and a plain one is sent", async (t) => {
  const smtp = await smtpServer(t);
  const mailer = new SmtpMailer(settings(smtp.port), trusting());
  const crafted = [
    ["CR/LF and a header", "player@example.test\r\nBcc: other@example.test"],
    ["a line feed", "player@example.test\nother@example.test"],
    ["a comma", "player@example.test,other@example.test"],
    ["a semicolon", "player@example.test;other@example.test"],
    ["angle brackets", "Player<other@example.test>"],
    ["a second @", "player@other@example.test"],
    ["a space", "player @example.test"],
    ["a quote", '"player"@example.test'],
    ["a colon", "group:player@example.test"],
    ["parentheses", "player(x)@example.test"],
    ["square brackets", "player@[127.0.0.1]"],
    ["a backslash", "pla\\yer@example.test"],
    ["a control character", "player\u0000@example.test"],
    ["no local part", "@example.test"],
    ["no domain", "player@"],
  ];

  for (const [label, address] of crafted) {
    const outcome = await mailer.send(
      composeConfirmationMessage(address, link),
    );
    assert.equal(outcome, "failed", label);
  }
  assert.equal(smtp.record.connections, 0);

  const outcome = await mailer.send(
    composeConfirmationMessage("gracz.ąę@przykład.test", link),
  );
  assert.equal(outcome, "sent");
  assert.equal(smtp.record.connections, 1);
  assert.equal(smtp.record.messages.length, 1);
});

test("the submitted message has one recipient, the fixed sender and subject and a text body with the link on its own line", async (t) => {
  const smtp = await smtpServer(t);
  const mailer = new SmtpMailer(settings(smtp.port), trusting());

  assert.equal(
    await mailer.send(composeConfirmationMessage(recipient, link)),
    "sent",
  );

  const { headers, text } = parse(smtp.record.messages[0].raw);
  // Sender name, subject and body: D-146 (foundations/decisions.md).
  assert.match(
    decodeWords(headers.get("from")[0]),
    /^(?:loop2|"loop2") <sender@example\.test>$/,
  );
  assert.deepEqual(headers.get("to"), [recipient]);
  assert.equal(headers.has("cc"), false);
  assert.equal(headers.has("bcc"), false);
  assert.deepEqual(headers.get("subject").map(decodeWords), [
    "Potwierdź adres e-mail w loop2",
  ]);
  assert.match(headers.get("content-type")[0], /^text\/plain;/i);
  assert.equal(
    text.replace(/\n$/, ""),
    [
      "Ktoś — zapewne Ty — założył konto w loop2 na ten adres e-mail. Aby go potwierdzić, otwórz odnośnik:",
      link,
      "",
      "Odnośnik jest ważny przez 24 godziny i działa raz.",
      "",
      "Jeśli to nie Ty, zignoruj tę wiadomość.",
    ].join("\n"),
  );
});

test("nothing the mailer writes to the console holds the password, the login, the token or the link", async (t) => {
  const smtp = await smtpServer(t);
  const wrongPassword = "another-synthetic-password-3Zr";
  const source = String.raw`
    import { composeConfirmationMessage, SmtpMailer } from "./dist/server/account-mail.js";
    const { settings, wrongPassword, certificate, recipient, link } = JSON.parse(process.env.LOOP2_MAIL_CASE);
    const message = composeConfirmationMessage(recipient, link);
    const sent = await new SmtpMailer(settings, { trustedCertificate: certificate }).send(message);
    const refused = await new SmtpMailer({ ...settings, password: wrongPassword }, { trustedCertificate: certificate }).send(message);
    process.send([sent, refused], () => process.disconnect());
  `;
  const child = spawn(process.execPath, ["--input-type=module", "-e", source], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      LOOP2_MAIL_CASE: JSON.stringify({
        settings: settings(smtp.port),
        wrongPassword,
        certificate: localCertificate.cert,
        recipient,
        link,
      }),
    },
    // Outcomes come back over IPC, so stdout and stderr hold only what the
    // mailer writes.
    stdio: ["ignore", "pipe", "pipe", "ipc"],
  });
  t.after(() => child.kill());
  let stdout = "";
  let stderr = "";
  const outcomes = [];
  child.on("message", (outcome) => outcomes.push(outcome));
  child.stdout.setEncoding("utf8").on("data", (chunk) => (stdout += chunk));
  child.stderr.setEncoding("utf8").on("data", (chunk) => (stderr += chunk));

  const status = await withinLimit(
    new Promise((resolve, reject) => {
      child.once("error", reject);
      child.once("close", resolve);
    }),
    30000,
    "the mailer process",
  );

  assert.equal(status, 0, stderr);
  assert.deepEqual(outcomes, [["sent", "failed"]]);
  assert.equal(
    smtp.record.authentications.length,
    2,
    "precondition: both logins reached the server",
  );
  // The library's own log would write the link quoted-printable and the login
  // in base64, so only the absence of other output proves that none of them
  // is written: nothing for the sent message, one line for the refused one.
  assert.equal(stdout, "");
  const lines = stderr.split(/\r?\n/).filter((line) => line !== "");
  assert.equal(lines.length, 1, stderr);
  // The server's refusal repeats the login, so a line that quoted it would show.
  for (const secret of [password, wrongPassword, login, token, link]) {
    assert.equal(lines[0].includes(secret), false, `the line holds ${secret}`);
  }
  // The line names the library's code, which tells a refused login apart from
  // a connection or TLS failure (spec Decision 11).
  assert.match(lines[0], /\bEAUTH\b/);
});
