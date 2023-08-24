package database

import (
	"context"
	"fmt"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var dbClient *mongo.Client

func InitDB() {
	MONGOURL := os.Getenv("MONGO_URL")
	clientOptions := options.Client().ApplyURI(MONGOURL)

	client, err := mongo.Connect(context.Background(), clientOptions)

	if err != nil {
		fmt.Println("Error connecting to MongoDB")
		panic(err)
	}

	err = client.Ping(context.Background(), nil)

	if err != nil {
		fmt.Println("Error connecting to MongoDB")
		panic(err)
	}

	fmt.Println("Connected to MongoDB")

	dbClient = client
}

func GetClientDB() *mongo.Client {
	return dbClient
}
