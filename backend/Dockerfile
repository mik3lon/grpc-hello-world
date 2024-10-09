# Etapa de construcción
FROM golang:1.22.5 AS builder

WORKDIR /app

# Copiar los archivos y construir el binario
COPY ./helloworld /app/helloworld
COPY server /app/server
COPY go.mod go.sum /app/

# Descargar dependencias y construir el binario
RUN go mod download
RUN go build -o /app/server/server /app/server/main.go

# Etapa final con Debian
FROM debian:bookworm-slim

WORKDIR /app

# Copiar el binario del servidor
COPY --from=builder /app/server/server /server

# Exponer el puerto
EXPOSE 50051

# Ejecutar el servidor
CMD ["/server"]
