package main

import (
	"log"
	"os"

	"gateway/internal/server"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	srv := server.New(":" + port)

	log.Printf("Gateway escuchando en :%s\n", port)
	log.Fatal(srv.Start())
}
