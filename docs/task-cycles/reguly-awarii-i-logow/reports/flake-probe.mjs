// Counts how often the session library's Store.createSession moves a stored expiry.
import session from "express-session";

const store = new session.Store();
const runs = 3_000_000;
const seen = new Map();
for (let i = 0; i < runs; i += 1) {
  const cookie = new session.Cookie({
    expires: new Date(5000),
    originalMaxAge: 1000,
    path: "/",
  });
  const request = { sessionID: "one", sessionStore: store };
  const made = store.createSession(request, { cookie });
  const value = made.cookie.expires.getTime();
  seen.set(value, (seen.get(value) ?? 0) + 1);
}
console.log(JSON.stringify({ runs, seen: [...seen.entries()] }));
