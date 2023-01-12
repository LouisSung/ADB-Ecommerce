FROM node:18-bullseye-slim

ENV NODE_ENV=production
WORKDIR /app

COPY ["package.json", "package-lock.json", "dist", "decorate-angular-cli.js", "./"]

RUN npm ci

EXPOSE 3333
CMD ["node", "/app/apps/api/main.js"]
