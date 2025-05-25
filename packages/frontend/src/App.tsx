import {Route, Routes} from "react-router";
import Home from "./Home";
import Cook from "./Cook";
import Ingredient from "./Ingredient";
import Recipe from "./Recipe";
import {useState} from "react";

export interface IIngredient {
    name: string;
    amount: number;
    scale: string;
    type: string;
}

export interface IRecipe {
    name: string;
    steps: string;
    possible: boolean;
    ingredients: IIngredient[]
}

interface IAppProps {
    id: string;
    username: string;
    ingredients: IIngredient[]
    recipes: IRecipe[]
}

const darkModeState = localStorage.getItem("darkMode") === "true";

function App(props: IAppProps) {
    const [ingredientList, setIngredientList] = useState(props.ingredients);
    const [recipeList, setRecipeList] = useState(props.recipes);

    if (darkModeState) {
        document.body.classList.add("dark-mode");
    }
    console.log(darkModeState)

    function addRecipe(recipe: IRecipe) {
        const updatedRecipes = recipeList.filter((rec) => rec.name !== recipe.name)
        const withNew = [recipe, ...updatedRecipes]
        setRecipeList(withNew)
    }

    function deleteRecipe(name: string) {
        const updatedRecipes = recipeList.filter((rec) => rec.name !== name)
        setRecipeList(updatedRecipes);
    }

    function addIngredient(ingredient: IIngredient) {
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

    function refreshRecipes(ingredients: IIngredient[]) {
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

    function possibleToMake(recipe: IRecipe, ingredients: IIngredient[]) {
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

    function logChanges(after: IIngredient[]) {
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
                <Route path="/" element={<Home username={props.username}/>} />
                <Route path="/cook" element={<Cook username={props.username}
                recipes={recipeList} ingredients={ingredientList}
                deleteRecipe={deleteRecipe}
                possibleToMake={possibleToMake}
                subtractIngredientAmounts={subtractIngredientAmounts}
                logChanges={logChanges}/>} />
                <Route path="/ingredient" element={<Ingredient username={props.username}
                    ingredients={ingredientList}
                    deleteIngredient={deleteIngredient}
                    addIngredient={addIngredient}/>}/>
                <Route path="/recipe" element={<Recipe username={props.username}
                    recipes={recipeList} ingredients={props.ingredients}
                    addRecipe={addRecipe}
                    deleteRecipe={deleteRecipe}
                    possibleToMake={possibleToMake}/>} />
                <Route path="*" element={<p> This Page Does Not Exist.</p>} />
            </Routes>
        </div>
    );
}

export default App;
