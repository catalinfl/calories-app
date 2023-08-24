package handlers

import (
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
)

type RequestUser struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func CreateJWTToken(user *RequestUser) (string, int64, error) {
	exp := time.Now().Add(time.Hour * 24).Unix()
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["username"] = user.Username
	claims["exp"] = exp
	t, err := token.SignedString([]byte(os.Getenv("SECRET_KEY")))

	if err != nil {
		return "", 0, err
	}

	return t, exp, nil
}

func VerifyJWTToken(c *fiber.Ctx) error {
	authCookie := c.Cookies("jwt")

	if authCookie == "" {
		return c.Status(401).JSON(fiber.Map{"error": "unauthorized"})
	}

	tokenString := strings.Replace(authCookie, "Bearer ", "", 1)

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method %s", token.Header["alg"])
		}

		return []byte(os.Getenv("SECRET_KEY")), nil
	})

	if err != nil {
		return fiber.NewError(fiber.StatusUnauthorized, "Invalid auth token")
	}

	if !token.Valid {
		return fiber.NewError(fiber.StatusUnauthorized, "Token is not valid")
	}

	claims := token.Claims.(jwt.MapClaims)

	c.Locals("username", claims["username"])

	return c.Next()
}
