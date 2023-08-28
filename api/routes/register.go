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

type User struct {
	Username       string `json:"username"`
	Password       string `json:"password"`
	Lists          []List `json:"lists"`
	PersonCalories int32  `json:"personcalories"`
}

type List struct {
	Time  string `json:"time"`
	Meals []Meal `json:"meals"`
}

type Meal struct {
	Name  string `json:"name"`
	Foods []Food `json:"food"`
}

type Food struct {
	Name     string `json:"name"`
	Calories int32  `json:"calories"`
}

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

		if len(req.Password) < 6 {
			return c.Status(400).JSON(fiber.Map{"error": "password must be at least 6 characters long"})
		}

		if len(req.Username) < 6 {
			return c.Status(400).JSON(fiber.Map{"error": "username must be at least 6 characters long"})
		}

		var filter bson.M = bson.M{"username": req.Username}

		collection := database.GetClientDB().Database("calories-app").Collection("users")

		var searchUser bson.M

		err = collection.FindOne(c.Context(), filter).Decode(&searchUser)

		if err != nil {
			if err != mongo.ErrNoDocuments {
				return c.Status(500).JSON(fiber.Map{"error": "something went wrong"})
			}
		} else {
			return c.Status(400).JSON(fiber.Map{"error": "user already exists"})
		}

		user := &User{
			Username:       req.Username,
			Password:       string(hash),
			Lists:          []List{},
			PersonCalories: 0,
		}

		_, err = collection.InsertOne(c.Context(), user)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				return c.Status(404).JSON(fiber.Map{"error": "user not found"})
			}
			return c.Status(500).JSON(fiber.Map{"error": "error at introducing user"})
		}

		token, exp, err := handlers.CreateJWTToken(&handlers.RequestUser{
			Username: req.Username,
		})

		c.Cookie(&fiber.Cookie{
			Name:     "jwt",
			Value:    token,
			Expires:  time.Unix(exp, 0),
			HTTPOnly: true,
		})

		return c.Status(200).JSON(fiber.Map{
			"username": req.Username,
			"calories": 0,
			"exp": exp,
		})
	})

	router.Get("/protected", handlers.VerifyJWTToken, func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "protected"})
	})
}
