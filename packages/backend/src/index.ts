import express, { Request, Response } from "express";
import dotenv from "dotenv";
import {ValidRoutes} from "./common/ValidRoutes";
import {connectMongo} from "./connectMongo";
import {registerAuthRoutes} from "./routes/authRoutes";
import {CredentialsProvider} from "./CredentialsProvider";
import {verifyAuthToken} from "./authMiddleware";
import {UserProvider} from "./userProvider";
import {registerUserRoutes} from "./routes/userRoutes";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;

export const mongoClient = connectMongo()

mongoClient.connect()
    .then(() => console.log("Connected to Mongo"))

export const CREDENTIALS = new CredentialsProvider(mongoClient)
export const USERPROVIDER = new UserProvider(mongoClient)

const STATIC_DIR = process.env.STATIC_DIR || "public";

const options = {
    root: process.env.STATIC_DIR
}
const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.locals.JWT_SECRET = process.env.JWT_SECRET;

app.use(express.static(STATIC_DIR));

app.get("/api/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get(Object.values(ValidRoutes), (req: Request, res: Response) => {
    res.sendFile("index.html", options);
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.use("/api/*", verifyAuthToken);

registerAuthRoutes(app, CREDENTIALS, USERPROVIDER)
registerUserRoutes(app, USERPROVIDER)
