import {Route, Routes, useNavigate} from "react-router";
import Home from "./Home";
import Cook from "./Cook";
import Ingredient from "./Ingredient";
import Recipe from "./Recipe";
import {useRef, useState} from "react";
import {ValidRoutes} from "../../backend/src/common/ValidRoutes.ts"
import type {IApiIngredient} from "csc437-monorepo-backend/src/common/ApiUserData.ts";
import type {IApiRecipe} from "csc437-monorepo-backend/src/common/ApiUserData.ts";
import {LoginPage} from "./LoginPage.tsx";
import {ProtectedRoute} from "./ProtectedRoute.tsx";


const darkModeState = localStorage.getItem("darkMode") === "true";

function App() {
    const [ingredientList, setIngredientList] = useState<IApiIngredient[]>([]);
    const [recipeList, setRecipeList] = useState<IApiRecipe[]>([]);
    const [authToken, setAuthToken] = useState<string>("");
    const [username, setUsername] = useState("Signed Out")
    const nav = useNavigate()
    const ref = useRef(0)

    if (darkModeState) {
        document.body.classList.add("dark-mode");
    }

    function changeToken(token: string) {
        setAuthToken(token);
        fetchUserData(token);
        nav('/')
    }

    async function fetchUserData(token: string) {
        const newRef = ref.current + 1;
        ref.current = newRef;

        try {
            const res = await fetch("/api/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            if (res.status >= 400) {
                throw new Error(`HTTP error: ${res.status}`)
            }

            const { ingredients, recipes } = await res.json()

            if (ref.current === newRef) {
                setIngredientList(ingredients);
                setRecipeList(recipes)
            }
        }

        catch(err) {
            console.log(`Error is ${err}`);
        }
    }

    async function updateUser(body: IApiIngredient[] | IApiRecipe[],
                              path: string) {
        try {
            const res = await fetch(`/api/users/${path}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
                body: JSON.stringify(body)
            })

            if (res.status >= 400) {
                throw new Error(`HTTP error: ${res.status}`)
            }

            if (path === "recipes") {
                setRecipeList(body as IApiRecipe[])
            }
            else {
                setIngredientList(body as IApiIngredient[])
            }
            console.log(`updated ${path} with`)
            console.log(body)
        }

        catch(err) {
            console.log(`Error is ${err}`);
        }
    }

    async function addRecipe(recipe: IApiRecipe) {
        const updatedRecipes = recipeList.filter((rec) => rec.name !== recipe.name)
        const withNew = [recipe, ...updatedRecipes]
        await updateUser(withNew, "recipes")
    }

    async function deleteRecipe(name: string) {
        const updatedRecipes = recipeList.filter((rec) => rec.name !== name)
        await updateUser(updatedRecipes, "recipes")
    }

    async function addIngredient(ingredient: IApiIngredient) {
        const updatedIngredients = ingredientList.filter((ing) => ing.name !== ingredient.name)
        const withNew = [ingredient, ...updatedIngredients]
        await updateUser(withNew, "ingredients")
        await refreshRecipes(withNew)
    }

    async function deleteIngredient(name: string) {
        const updatedIngredients = ingredientList.filter((ing) => ing.name !== name)
        await updateUser(updatedIngredients, "ingredients")
        await refreshRecipes(updatedIngredients)
    }

    async function refreshRecipes(ingredients: IApiIngredient[]) {
        const updatedRecipes = recipeList.map((recipe) => {
            return {
                name: recipe.name,
                steps: recipe.steps,
                possible: possibleToMake(recipe, ingredients),
                ingredients: [...recipe.ingredients]
            }
        })
        await updateUser(updatedRecipes, "recipes")
    }

    function possibleToMake(recipe: IApiRecipe, ingredients: IApiIngredient[]) {
        for (const RIng of recipe.ingredients) {
            const found = ingredients.find((IIng) => IIng.name === RIng.name);
            if (!found) {
                return false;
            }
            else {
                const remaining = subtractIngredientAmounts(found.amount, found.scale, RIng.amount, RIng.scale);
                if (remaining.amount < 0) {
                    return false
                }
            }
        }
        return true;
    }

    function subtractIngredientAmounts(amount1: number, unit1: string, amount2: number, unit2: string) {
        const conversionRates: Record<string, number> = {
            "oz": 1,
            "tbsp": 0.5,
            "tsp": 0.1667,
            "cups": 8
        };

        const amount1Oz = amount1 * conversionRates[unit1];
        const amount2Oz = amount2 * conversionRates[unit2];

        const result = (amount1Oz - amount2Oz) / conversionRates[unit1];
        return {amount: result, scale: unit1};
    }

    async function logChanges(after: IApiIngredient[]) {
        const updatedIngredients = ingredientList
            .map((before) => {
                const updateNeeded = after.find((af) => af.name === before.name);
                return updateNeeded ? updateNeeded : before;
            })
            .filter((ing) => ing.amount > 0);
        await updateUser(updatedIngredients, "ingredients");
        await refreshRecipes(updatedIngredients);
        console.log(`the new list`)
        console.log(updatedIngredients)
    }

    return (
        <div>
            <Routes>
                <Route path={ValidRoutes.HOME} element={
                    <ProtectedRoute authToken={authToken}>
                        <Home username={username} />
                    </ProtectedRoute>
                } />
                <Route path={ValidRoutes.COOK} element={
                    <ProtectedRoute authToken={authToken}>
                        <Cook username={username}
                              recipes={recipeList} ingredients={ingredientList}
                              deleteRecipe={deleteRecipe}
                              possibleToMake={possibleToMake}
                              subtractIngredientAmounts={subtractIngredientAmounts}
                              logChanges={logChanges} />
                    </ProtectedRoute>
                } />
                <Route path={ValidRoutes.INGREDIENT} element={
                    <ProtectedRoute authToken={authToken}>
                        <Ingredient username={username}
                                    ingredients={ingredientList}
                                    deleteIngredient={deleteIngredient}
                                    addIngredient={addIngredient} />
                    </ProtectedRoute>
                } />
                <Route path={ValidRoutes.RECIPE} element={
                    <ProtectedRoute authToken={authToken}>
                        <Recipe username={username}
                                recipes={recipeList} ingredients={ingredientList}
                                addRecipe={addRecipe}
                                deleteRecipe={deleteRecipe}
                                possibleToMake={possibleToMake} />
                    </ProtectedRoute>
                } />
                <Route path={ValidRoutes.LOGIN} element={<LoginPage isRegistering={false} changeToken={changeToken}
                                                                    setUsername={(usr: string) => setUsername(usr)}/>} />
                <Route path={ValidRoutes.REGISTER} element={<LoginPage isRegistering={true} changeToken={changeToken}
                                                                       setUsername={(usr: string) => setUsername(usr)}/>} />
                <Route path="*" element={<p>This Page Does Not Exist.</p>} />
            </Routes>
        </div>
    );


}

export default App;
