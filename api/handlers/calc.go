package handlers

import (
	"fmt"

	"github.com/catalinfl/calories-app/database"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

type Calories struct {
	Username string `json:"username"`
	Calories int32  `json:"calories"`
}

func CalculateCalories(c *fiber.Ctx) error {
	req := new(Calories)

	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "cannot parse JSON"})
	}

	if req.Username == "" || req.Calories == 0 {
		return c.Status(400).JSON(fiber.Map{"error": "invalid body request"})
	}

	if req.Calories < 0 {
		return c.Status(400).JSON(fiber.Map{"error": "calories must be a positive number"})
	}

	collection := database.GetClientDB().Database("calories-app").Collection("users")

	filter := bson.M{"username": req.Username}

	var user bson.M

	err := collection.FindOne(c.Context(), filter).Decode(&user)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "something went wrong"})
	}

	_, err = collection.UpdateOne(c.Context(), filter, bson.M{"$set": bson.M{"personcalories": req.Calories}})

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "something went wrong updating the calories"})
	}

	return c.Status(200).JSON(fiber.Map{"message": fmt.Sprintf("Calories updated to %d", req.Calories)})
}
