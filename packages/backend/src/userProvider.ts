import {Collection, MongoClient, ObjectId} from "mongodb";
import {IApiUserData} from "./common/ApiUserData";

export class UserProvider {
    private collection: Collection<IApiUserData>

    constructor(private readonly mongoClient: MongoClient) {
        const collectionName = process.env.USERS_COLLECTION_NAME;
        if (!collectionName) {
            throw new Error("Missing USERS_COLLECTION_NAME from environment variables");
        }
        this.collection = this.mongoClient.db().collection(collectionName);
    }

    getUserData(user: string) {
        return this.collection.findOne({ username: user }); // Without any options, will by default get all documents in the collection as an array.
    }
}