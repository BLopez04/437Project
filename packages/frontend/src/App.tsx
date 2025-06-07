import {Route, Routes, useNavigate} from "react-router";
import Home from "./Home";
import Cook from "./Cook";
import Ingredient from "./Ingredient";
import Recipe from "./Recipe";
import {useState} from "react";
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
    if (darkModeState) {
        document.body.classList.add("dark-mode");
    }
    console.log(authToken)

    function changeToken(token: string) {
        setAuthToken(token);

        nav('/')
    }

    function addRecipe(recipe: IApiRecipe) {
        const updatedRecipes = recipeList.filter((rec) => rec.name !== recipe.name)
        const withNew = [recipe, ...updatedRecipes]
        setRecipeList(withNew)
    }

    function deleteRecipe(name: string) {
        const updatedRecipes = recipeList.filter((rec) => rec.name !== name)
        setRecipeList(updatedRecipes);
    }

    function addIngredient(ingredient: IApiIngredient) {
        const updatedIngredients = ingredientList.filter((ing) => ing.name !== ingredient.name)
        const withNew = [ingredient, ...updatedIngredients]
        setIngredientList(withNew)
        refreshRecipes(withNew)
    }

    function deleteIngredient(name: string) {
        const updatedIngredients = ingredientList.filter((ing) => ing.name !== name)
        setIngredientList(updatedIngredients);
        refreshRecipes(updatedIngredients)
    }

    function refreshRecipes(ingredients: IApiIngredient[]) {
        const updatedRecipes = recipeList.map((recipe) => {
            return {
                name: recipe.name,
                steps: recipe.steps,
                possible: possibleToMake(recipe, ingredients),
                ingredients: [...recipe.ingredients]
            }
        })
        console.log("updated recipes")
        console.log(updatedRecipes)
        setRecipeList(updatedRecipes)
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

    function logChanges(after: IApiIngredient[]) {
        const updatedIngredients = ingredientList
            .map((before) => {
                const updateNeeded = after.find((af) => af.name === before.name);
                return updateNeeded ? updateNeeded : before;
            })
            .filter((ing) => ing.amount > 0);
        setIngredientList(updatedIngredients);
        refreshRecipes(updatedIngredients);
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
