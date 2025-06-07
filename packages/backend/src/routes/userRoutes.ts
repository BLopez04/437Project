import express, {Request, Response} from "express";
import { UserProvider } from "../userProvider";

export function registerUserRoutes(app: express.Application, userProvider: UserProvider) {

    app.get("/api/users", async (req: Request, res: Response) => {
        try {
            if (!req.user) {
                console.log("whoops")
                throw new Error("No user associated")
            }
            const data = await userProvider.getUserData(req.user?.username)
            console.log(data)
            res.send(data)
        }
        catch(err) {
            res.status(500).send("Failed to fetch user data")
        }
    });


}