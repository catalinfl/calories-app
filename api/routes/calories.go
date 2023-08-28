package routes

import (
	"github.com/catalinfl/calories-app/handlers"
	"github.com/gofiber/fiber/v2"
)

func Lists(api *fiber.App) {
	router := api.Group("/api/lists")

	router.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "lists works"})
	})

	router.Put("/", handlers.CalculateCalories)

	router.Get("/foods/:name", handlers.GetFoodsBySearch)
}
