# Stage 1: Build the Go application
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Copy Go modules and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -o /go-payments-service

# Stage 2: Production image
FROM alpine:latest

WORKDIR /

# Copy the binary from the builder stage
COPY --from=builder /go-payments-service /go-payments-service

# Expose the port the app runs on
EXPOSE 8080

# Start the app
CMD ["/go-payments-service"]
