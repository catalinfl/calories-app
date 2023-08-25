package main

import (
	"fmt"

	"github.com/catalinfl/calories-app/database"
	"github.com/catalinfl/calories-app/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	fmt.Println("Hello test")

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "http://localhost:5173",
	}))

	err := godotenv.Load()

	database.InitDB()

	if err != nil {
		panic("Error loading .env file")
	}

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"test": "works"})
	})

	routes.Register(app)
	routes.Login(app)
	routes.Lists(app)

	app.Listen(":3000")

}
