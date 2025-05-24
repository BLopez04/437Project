import { Routes, Route } from "react-router";

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
    ingredients: IIngredient[]
}

interface IAppProps {
    id: string;
    username: string;
    ingredients: IIngredient[]
    recipes: IRecipe[]
}

function App(props: IAppProps) {
    const [ingredientList, setIngredientList] = useState(props.ingredients);
    const [recipeList, setRecipeList] = useState(props.recipes);

    function deleteIngredient(name: string) {
        const updatedIngredients = ingredientList.filter((ing) => ing.name !== name)
        setIngredientList(updatedIngredients);
    }

    function deleteRecipe(name: string) {
        const updatedRecipes = recipeList.filter((rec) => rec.name !== name)
        setRecipeList(updatedRecipes);
    }

    function addIngredient(ingredient: IIngredient) {
        const updatedIngredients = ingredientList.filter((ing) => ing.name !== ingredient.name)
        const withNew = [ingredient, ...updatedIngredients]
        setIngredientList(withNew)
    }

    function addRecipe(recipe: IRecipe) {
        const updatedRecipes = recipeList.filter((rec) => rec.name !== recipe.name)
        const withNew = [recipe, ...updatedRecipes]
        setRecipeList(withNew)
    }
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home username={props.username}/>} />
                <Route path="/cook" element={<Cook username={props.username}
                recipes={recipeList} ingredients={ingredientList}
                addRecipe={addRecipe}
                deleteRecipe={deleteRecipe}/>} />
                <Route path="/ingredient" element={<Ingredient username={props.username}
                    ingredients={ingredientList}
                    deleteIngredient={deleteIngredient}
                    addIngredient={addIngredient}/>} />
                <Route path="/recipe" element={<Recipe username={props.username}
                    recipes={recipeList}
                    addRecipe={addRecipe}
                    deleteRecipe={deleteRecipe}/>} />
                <Route path="*" element={<p> This Page Does Not Exist.</p>} />
            </Routes>
        </div>
    );
}

export default App;
