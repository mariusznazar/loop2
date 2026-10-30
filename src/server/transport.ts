import express from "express";
import type { Request, RequestHandler } from "express";
import { isIP } from "node:net";
import type { ProxyMode } from "./configuration.js";

export function singleHeader(request: Request, name: string): string | null {
  const values: string[] = [];
  for (let index = 0; index < request.rawHeaders.length; index += 2) {
    if (request.rawHeaders[index].toLowerCase() === name) {
      values.push(request.rawHeaders[index + 1]);
    }
  }
  return values.length === 1 ? values[0] : null;
}

function canonicalAddress(value: string | undefined | null): string | null {
  if (!value || value.includes("%") || !isIP(value)) return null;
  if (isIP(value) === 4) return value;
  const address = new URL(`http://[${value}]/`).hostname.slice(1, -1);
  const mapped = /^::ffff:([a-f0-9]+):([a-f0-9]+)$/.exec(address);
  if (!mapped) return address;
  const high = parseInt(mapped[1], 16);
  const low = parseInt(mapped[2], 16);
  return [high >> 8, high & 255, low >> 8, low & 255].join(".");
}

export function trustProxy(
  mode: ProxyMode,
): (address: string, hop: number) => boolean {
  return (address, hop) =>
    hop === 0 &&
    (mode === "cloudflare-tunnel" ||
      (mode === "loopback-proxy" && isLoopback(address)));
}

function isLoopback(address: string): boolean {
  const normalized = canonicalAddress(address);
  return normalized === "::1" || Boolean(normalized?.startsWith("127."));
}

export function clientAddress(
  request: Request,
  mode: ProxyMode,
): string | null {
  if (mode === "direct") {
    return request.secure
      ? canonicalAddress(request.socket.remoteAddress)
      : null;
  }
  if (singleHeader(request, "x-forwarded-proto") !== "https" || !request.secure)
    return null;
  if (mode === "loopback-proxy") {
    const peer = request.socket.remoteAddress;
    return peer && isLoopback(peer) ? canonicalAddress(peer) : null;
  }
  return canonicalAddress(singleHeader(request, "cf-connecting-ip"));
}

// The guards of every state-changing account route (D-104). They differ only
// in the body limit, in bytes, that the route allows.
export function mutationGuards(
  publicOrigin: string,
  bodyLimit: number,
): RequestHandler[] {
  return [
    (request, response, next) => {
      if (singleHeader(request, "origin") !== publicOrigin) {
        response.status(403).json({ error: "Invalid request origin" });
        return;
      }
      const type = singleHeader(request, "content-type");
      const encoding = singleHeader(request, "content-encoding");
      if (
        !type ||
        !/^application\/json(?:\s*;\s*charset=(?:[a-z0-9_-]+|"[a-z0-9_-]+"))?\s*$/i.test(
          type,
        ) ||
        (request.headers["content-encoding"] !== undefined &&
          encoding !== "identity")
      ) {
        response.status(415).json({ error: "JSON required" });
        return;
      }
      next();
    },
    express.json({
      limit: bodyLimit,
      inflate: false,
      verify: (_request, _response, buffer) => {
        if (buffer.length === 0) throw new Error("Empty JSON body");
      },
    }),
    (request, response, next) => {
      const body: unknown = request.body;
      if (typeof body !== "object" || body === null || Array.isArray(body)) {
        response.status(400).json({ error: "JSON object required" });
        return;
      }
      next();
    },
  ];
}
