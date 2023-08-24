package routes

import (
	"time"

	"github.com/catalinfl/calories-app/database"
	"github.com/catalinfl/calories-app/handlers"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func Login(api *fiber.App) {
	router := api.Group("/api/login")

	router.Post("/", func(c *fiber.Ctx) error {

		err := handlers.VerifyJWTToken(c)

		if err == nil {
			return c.Status(401).JSON(fiber.Map{"error": "already logged in"})
		}

		var creds Credentials
		err = c.BodyParser(&creds)

		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "invalid body request"})
		}

		if creds.Username == "" || creds.Password == "" {
			return c.Status(400).JSON(fiber.Map{"error": "invalid body request"})
		}

		collection := database.GetClientDB().Database("calories-app").Collection("users")
		filter := bson.M{"username": creds.Username}

		var user bson.M

		err = collection.FindOne(c.Context(), filter).Decode(&user)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				return c.Status(404).JSON(fiber.Map{"error": "user not found"})
			}
			return c.Status(500).JSON(fiber.Map{"error": "something went wrong"})
		}

		hashedPassword := user["password"].(string)

		err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(creds.Password))

		if err != nil {
			return c.Status(402).JSON(fiber.Map{"error": "wrong password"})
		}

		token, exp, err := handlers.CreateJWTToken(&handlers.RequestUser{
			Username: creds.Username,
		})

		c.Cookie(&fiber.Cookie{
			Name:     "jwt",
			Value:    "Bearer" + token,
			Expires:  time.Unix(exp, 0),
			HTTPOnly: true,
		})

		return c.Status(200).JSON(fiber.Map{
			"message": "success",
		})
	})

}
