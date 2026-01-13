package main

import (
	"log"
	"os"
	
	"gateway/internal/server"
)


// @title Gateway API
// @version 1.0
// @description API del gateway
// @host localhost:8080
// @BasePath /

// @securityDefinitions.token BearerAuth
// @in header
// @name Authorization


func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	srv := server.New(":" + port)

	log.Printf("Gateway escuchando en :%s\n", port)
	log.Fatal(srv.Start())
}
