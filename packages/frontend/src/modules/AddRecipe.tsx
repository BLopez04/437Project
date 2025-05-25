import "../css/tokens.css"
import "../css/header.css"
import "../css/general.css"
import "../css/addingredient.css"
import type {IIngredient, IRecipe} from "../App.tsx";
import React, {useState} from "react";
import AddIngredient from "./AddIngredient.tsx";

interface IAddRecipeProps {
    ingredients: IIngredient[]
    addRecipe: (recipe: IRecipe) => void;
    recipeIngredients: IIngredient[];
    addRecipeIngredient: (ingredient: IIngredient) => void;
    wipeIngredients: () => void;
    possibleToMake: (recipe: IRecipe, ingredients: IIngredient[]) => boolean;
}

function AddRecipe(props: IAddRecipeProps) {
    const [nameFieldContents, setName] = useState("");
    const [stepsFieldContents, setSteps] = useState("");

    function handleNameTyping(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value)
    }

    function handleStepsTyping(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setSteps(e.target.value)
    }

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const newRecipe : IRecipe =
            { name: nameFieldContents, steps: stepsFieldContents, ingredients: props.recipeIngredients,
            possible: false}
        newRecipe.possible = props.possibleToMake(newRecipe, props.ingredients)
        console.log(newRecipe)
        props.addRecipe(newRecipe);
        setName("");
        setSteps("");
        props.wipeIngredients();
    }

    return (
            <form className="input">
                <label className="Title">
                    <span>Recipe Name</span>
                    <input name="name" placeholder="Enter Recipe Name"
                           value={nameFieldContents}
                           onChange={handleNameTyping}/>
                </label>
                <label className="Steps">
                    <span>Recipe Steps</span>
                    <textarea name="recipe-steps"
                              placeholder=""
                              value={stepsFieldContents}
                              onChange={handleStepsTyping}></textarea>
                </label>
                <AddIngredient addIngredient={props.addRecipeIngredient}/>
                <label className="Button">
                    <button onClick={handleSubmit}
                            disabled={!nameFieldContents || !stepsFieldContents}>Submit
                    </button>
                </label>
            </form>
    )
}

export default AddRecipe;