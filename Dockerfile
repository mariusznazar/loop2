FROM node:24-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.*.json ./
COPY scripts/ scripts/
COPY src/ src/
COPY assets/icons/ assets/icons/
COPY assets/fonts/ assets/fonts/
RUN npm run typecheck
RUN npm run build
RUN npm prune --omit=dev

FROM node:24-slim
ARG LOOP2_COMMIT=unknown
LABEL org.opencontainers.image.title="loop2" \
      org.opencontainers.image.revision="${LOOP2_COMMIT}"
ENV NODE_ENV=production \
    LOOP2_LISTEN_HOST=0.0.0.0 \
    LOOP2_LISTEN_PORT=3000
WORKDIR /app
COPY --from=build --chown=node:node /app/package.json ./package.json
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
USER node
EXPOSE 3000
HEALTHCHECK --interval=5s --timeout=3s --start-period=5s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.status===200?0:1),()=>process.exit(1))"]
CMD ["node", "dist/server/main.js"]
