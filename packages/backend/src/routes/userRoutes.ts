import express, {Request, Response} from "express";
import { UserProvider } from "../userProvider";

export function registerUserRoutes(app: express.Application, userProvider: UserProvider) {

    app.get("/api/users", async (req: Request, res: Response) => {
        try {
            if (!req.user) {
                throw new Error("No user associated")
            }
            const data = await userProvider.getUserData(req.user?.username)
            res.send(data)
        }
        catch(err) {
            res.status(500).send("Failed to fetch user data")
        }
    });

    app.put("/api/users/ingredients", async (req: Request, res: Response) => {
        try {
            if (!req.user) {
                throw new Error("No user associated")
            }

            if (!req.body) {
                throw new Error("No ingredient updates provided")
            }
            const update = await userProvider
                .updateIngredients(req.user?.username, req.body)
            res.status(200).send(update)
        }
        catch(err) {
            res.status(500).send("Failed to post to user ingredients")
        }
    });

    app.put("/api/users/recipes", async (req: Request, res: Response) => {
        try {
            if (!req.user) {
                throw new Error("No user associated")
            }

            if (!req.body) {
                throw new Error("No ingredient updates provided")
            }
            const update = await userProvider
                .updateRecipes(req.user?.username, req.body)
            res.status(200).send(update)
        }
        catch(err) {
            res.status(500).send("Failed to post to user ingredients")
        }
    });
}