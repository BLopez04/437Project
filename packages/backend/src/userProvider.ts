import {Collection, MongoClient} from "mongodb";
import {IApiIngredient, IApiRecipe, IApiUserData} from "./common/ApiUserData";

export class UserProvider {
    private collection: Collection<IApiUserData>

    constructor(private readonly mongoClient: MongoClient) {
        const collectionName = process.env.USERS_COLLECTION_NAME;
        if (!collectionName) {
            throw new Error("Missing USERS_COLLECTION_NAME from environment variables");
        }
        this.collection = this.mongoClient.db().collection(collectionName);
    }

    async getUserData(user: string) {
        return this.collection.findOne({ username: user }); // Without any options, will by default get all documents in the collection as an array.
    }
    async addUser(user: string) {
        return await this.collection.insertOne({
            username: user,
            ingredients: [],
            recipes: []
        })
    }

    async updateRecipes(user: string, recipes: IApiRecipe[]) {
        return this.collection.updateOne(
            { username: user } ,
            { $set: { recipes: recipes} }
        );
    }

    async updateIngredients(user: string, ingredients: IApiIngredient[]) {
        return this.collection.updateOne(
            { username: user } ,
            { $set: { ingredients: ingredients} }
        );
    }
}