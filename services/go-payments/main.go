package main

import (
	"fmt"
	"log"
	"net/http"
)

// This is a placeholder for a performance-critical service, such as a payment processor.
// Go is an excellent choice for this kind of service due to its performance, concurrency,
// and low memory footprint.

// This service would typically communicate with the main Node.js backend
// via a REST API, gRPC, or a message queue like RabbitMQ or Kafka.

func handler(w http.ResponseWriter, r *http.Request) {
	log.Println("Payment service endpoint hit")
	fmt.Fprintf(w, "Hello from the Go Payment Service! This is where payment processing would happen.")
}

func main() {
	http.HandleFunc("/process-payment", handler)

	fmt.Println("Go Payment Service listening on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
