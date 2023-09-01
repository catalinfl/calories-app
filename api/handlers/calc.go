package handlers

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/catalinfl/calories-app/database"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Food struct {
	Name string `json:"name"`
}

type ProductAPI struct {
	Name                string  `json:"name"`
	Calories            string  `json:"calories"`
	Quantity            string  `json:"quantity"`
	CaloriesPerQuantity float32 `json:"caloriesPerQuantity"`
	Grams               float32 `json:"grams"`
}

type CaloriesRequest struct {
	Username string  `json:"username"`
	Calories float32 `json:"calories"`
}

type PostList struct {
	Listname      string       `json:"listname"`
	Products      []ProductAPI `json:"products"`
	FinalCalories float32      `json:"finalCalories"`
	Username      string       `json:"username"`
}

func CalculateCalories(c *fiber.Ctx) error {
	req := new(CaloriesRequest)

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

	return c.Status(200).JSON(fiber.Map{"message": fmt.Sprintf("Calories updated to %f", req.Calories)})
}

func GetFoodsBySearch(c *fiber.Ctx) error {
	var name string = c.Params("name")
	prod := GetJSONFood()

	var results []ProductAPI

	if len(name) < 3 {
		return c.Status(400).JSON(fiber.Map{"error": "name must be at least 3 characters long"})
	}

	for _, product := range prod {
		nameLower := strings.ToLower(name)
		productNameLower := strings.ToLower(product.Name)

		nameSegments := strings.Split(nameLower, "%20")
		productNameSegments := strings.Split(productNameLower, " ")

		if len(nameSegments) == 1 && strings.Contains(productNameLower, nameLower) {
			results = append(results, product)
		} else if len(nameSegments) >= 2 && len(productNameSegments) >= 2 {
			toSearch := fmt.Sprintf("%s %s", nameSegments[0], nameSegments[1])
			if strings.Contains(productNameLower, toSearch) {
				results = append(results, product)
			}
		}
	}
	jsonData, err := json.Marshal(results)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to marshal products data"})
	}

	return c.Status(200).Type("json").Send(jsonData)
}

func GetJSONFood() []ProductAPI {
	file, err := os.Open("products.json")
	if err != nil {
		fmt.Println(err)
	}
	defer file.Close()

	data := make([]byte, 0)
	buf := make([]byte, 1024)

	for {
		n, err := file.Read(buf)
		if err != nil {
			fmt.Println(err)
			break
		}
		if n == 0 {
			break
		}
		data = append(data, buf[:n]...)
	}

	var products []ProductAPI

	if err := json.Unmarshal(data, &products); err != nil {
		fmt.Println(err)
	}

	return products
}

func CreateList(c *fiber.Ctx) error {
	req := new(PostList)
	c.BodyParser(&req)
	user := req.Username

	if user == "" {
		return c.Status(400).JSON(fiber.Map{"error": "invalid body request"})
	}

	collection := database.GetClientDB().Database("calories-app").Collection("users")

	collection.UpdateOne(c.Context(), bson.M{"username": user}, bson.M{"$push": bson.M{"lists": bson.M{"listname": req.Listname, "products": req.Products, "finalCalories": req.FinalCalories}}})

	return c.Status(200).JSON(fiber.Map{"message": "List created"})
}

func GetAllLists(c *fiber.Ctx) error {
	username := c.Params("username")

	if username == "" {
		return c.Status(400).JSON(fiber.Map{"error": "invalid body request"})
	}

	collection := database.GetClientDB().Database("calories-app").Collection("users")

	filter := bson.M{"username": username}

	var user bson.M

	err := collection.FindOne(c.Context(), filter).Decode(&user)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "something went wrong"})
	}

	return c.Status(200).JSON(user["lists"])
}

func DeleteList(c *fiber.Ctx) error {
	username := c.Params("username")
	listname := c.Params("listname")

	if username == "" || listname == "" {
		return c.Status(400).JSON(fiber.Map{"error": "invalid body request"})
	}

	splitListname := strings.Split(listname, "%20")
	listname = strings.Join(splitListname, " ")

	collection := database.GetClientDB().Database("calories-app").Collection("users")

	user := bson.M{}

	collection.FindOne(c.Context(), bson.M{"username": username}).Decode(&user)

	lists := user["lists"]

	var isFound bool = false
	for i, list := range lists.(primitive.A) {
		if list.(primitive.M)["listname"] == listname {
			lists = append(lists.(primitive.A)[:i], lists.(primitive.A)[i+1:]...)
			isFound = true
			break
		}
	}

	if !isFound {
		return c.Status(400).JSON(fiber.Map{"error": "list not found"})
	}

	collection.UpdateOne(c.Context(), bson.M{"username": username}, bson.M{"$set": bson.M{"lists": lists}})

	return c.Status(200).JSON(fiber.Map{"message": "list deleted"})
}
