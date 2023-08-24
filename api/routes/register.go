package routes

import (
	"time"

	"github.com/catalinfl/calories-app/database"
	"github.com/catalinfl/calories-app/handlers"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

func Register(api *fiber.App) {
	router := api.Group("/api/register")

	router.Post("/", func(c *fiber.Ctx) error {
		req := new(handlers.RequestUser)

		if err := c.BodyParser(req); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "cannot parse JSON"})
		}

		hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)

		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "something went wrong"})
		}

		if req.Username == "" || req.Password == "" {
			return c.Status(400).JSON(fiber.Map{"error": "invalid body request"})
		}

		user := &handlers.RequestUser{
			Username: req.Username,
			Password: string(hash),
		}

		collection := database.GetClientDB().Database("calories-app").Collection("users")

		_, err = collection.InsertOne(c.Context(), user)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				return c.Status(404).JSON(fiber.Map{"error": "user not found"})
			}
			return c.Status(500).JSON(fiber.Map{"error": "error at introducing user"})
		}

		token, exp, err := handlers.CreateJWTToken(user)

		c.Cookie(&fiber.Cookie{
			Name:     "jwt",
			Value:    token,
			Expires:  time.Unix(exp, 0),
			HTTPOnly: true,
		})

		return c.JSON(fiber.Map{"token": token, "exp": exp})
	})

	router.Get("/protected", handlers.VerifyJWTToken, func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "protected"})
	})
}
