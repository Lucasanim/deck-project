package main

import (
	"log"
	"os"

	"github.com/Lucasanim/deck-project/tree/main/chats/websockets"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()

	app.Use(cors.New())

	app.Use(cors.New(cors.Config{
		AllowOriginsFunc: func(origin string) bool {
			return os.Getenv("ENVIRONMENT") == "development"
		},
	}))

	websockets.AddSocketConnection(app)

	log.Fatal(app.Listen(":3000"))
}
