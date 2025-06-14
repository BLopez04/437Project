import "./css/formpagestyles.css";
import "./css/tokens.css"
import "./css/general.css"
import Header from "./modules/Header.tsx";
import Footer from "./modules/Footer.tsx";
import type {IApiIngredient} from "csc437-monorepo-backend/src/common/ApiUserData.ts";
import type {IApiRecipe} from "csc437-monorepo-backend/src/common/ApiUserData.ts";
import AddRecipe from "./modules/AddRecipe.tsx";
import React, {useState} from "react";
import IngredientItem from "./modules/IngredientItem.tsx";
import ViewRecipesModal from "./modules/ViewRecipesModal.tsx";
import RecipeItem from "./modules/RecipeItem.tsx";

interface IRecipeProps {
    username: string;
    recipes: IApiRecipe[];
    ingredients: IApiIngredient[];
    addRecipe: (recipe: IApiRecipe) => void;
    deleteRecipe: (name: string) => void;
    possibleToMake: (recipe: IApiRecipe, ingredients: IApiIngredient[]) => boolean;
}

function Recipe(props: IRecipeProps) {
    const [recipeIngredients, setRecipeIngredients] = React.useState<IApiIngredient[]>([])
    const [isOpen, setIsOpen] = useState(false);

    function addRecipeIngredient(ingredient: IApiIngredient) {
        const updatedIngredients = recipeIngredients.filter((ing) => ing.name !== ingredient.name)
        const withNew = [ingredient, ...updatedIngredients]
        setRecipeIngredients(withNew)
    }

    function deleteIngredient(name: string) {
        const updatedIngredients = recipeIngredients.filter((ing) => ing.name !== name)
        console.log(updatedIngredients)
        setRecipeIngredients(updatedIngredients);
    }

    function wipeIngredients() {
        const mt : IApiIngredient[] = [];
        setRecipeIngredients(mt)
    }


    function onCloseRequested() {
        setIsOpen(false);
    }

    return (
        <div className="body">
            <ViewRecipesModal isOpen={isOpen}
                              onCloseRequested={onCloseRequested}
                              headerLabel="All Recipes">
                { props.recipes.map((recipe) =>
                        <RecipeItem recipe={recipe}
                        deleteRecipe={props.deleteRecipe}/>)}

            </ViewRecipesModal>
            <Header header="Add a Recipe" username={props.username}/>
            <main>
                <AddRecipe addRecipe={props.addRecipe}
                           ingredients={props.ingredients}
                           addRecipeIngredient={addRecipeIngredient}
                           recipeIngredients={recipeIngredients}
                           wipeIngredients={wipeIngredients}
                           possibleToMake={props.possibleToMake}
                />
                <ul role="list"
                    aria-labelledby="list-heading">
                    {
                        recipeIngredients.map((ingredient) =>
                            <IngredientItem ingredient={ingredient}
                                            deleteIngredient={deleteIngredient}/>)
                    }
                </ul>
                <button className="view-all" onClick={() => setIsOpen(true)}> View All Recipes</button>
            </main>
            <Footer/>
        </div>
    )
}

export default Recipe;