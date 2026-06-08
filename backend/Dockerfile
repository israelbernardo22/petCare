# Stage 1: instala todas as deps e gera o Prisma Client
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate

# Stage 2: imagem de produção
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
# Copia o Prisma Client gerado no stage anterior
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY src ./src
COPY prisma ./prisma
COPY app.js ./
EXPOSE 3000
CMD ["node", "app.js"]
