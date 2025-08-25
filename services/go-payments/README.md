# Go Payment Service (Example)

This directory contains an example of a performance-critical microservice written in Go.

## Rationale

For most of the application (storefront, admin dashboard, general API), TypeScript is an excellent choice that provides great developer experience and type safety. However, for certain performance-sensitive operations, a compiled language like Go can provide significant benefits.

**Why Go for this service?**
-   **Performance**: Go is a compiled language that offers near-native performance, which is ideal for high-throughput tasks like payment processing.
-   **Concurrency**: Go has built-in support for concurrency with goroutines and channels, making it easy to handle many simultaneous requests efficiently.
-   **Low Memory Footprint**: Go applications have a small memory footprint, which can lead to cost savings in a containerized environment.
-   **Static Typing**: Like TypeScript, Go is statically typed, which helps prevent runtime errors.

## Architecture

This Go service is designed to run as a separate microservice from the main Node.js API. It would be deployed independently and could be scaled separately based on its specific load.

Communication between the main API (`@repo/api`) and this service would typically happen via:
-   **Direct API Calls**: The Node.js API could make REST or gRPC calls to the Go service.
-   **Message Queue**: For asynchronous operations, a message queue (like RabbitMQ or Kafka) could be used. The Node.js API would publish a "payment processing" event, and the Go service would subscribe to that event, process the payment, and then publish a "payment complete" event.

## How to Use

### Build and Run with Docker

The easiest way to run this service is with Docker.

1.  **Build the Docker image**:
    ```bash
    docker build -t go-payments-service .
    ```
2.  **Run the Docker container**:
    ```bash
    docker run -p 8080:8080 go-payments-service
    ```

The service will be available at `http://localhost:8080`. You can test it by visiting `http://localhost:8080/process-payment`.
