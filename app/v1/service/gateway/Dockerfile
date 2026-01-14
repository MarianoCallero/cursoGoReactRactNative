# ===== Build =====
FROM golang:1.25-alpine AS build
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o server ./cmd/api

# ===== Run =====
FROM alpine:3.19
WORKDIR /app
RUN apk add --no-cache ca-certificates wget
COPY --from=build /app/server /app/server

ENV PORT=8080
EXPOSE 8080
CMD ["/app/server"]
