import "./css/tokens.css"
import "./css/general.css"
import "./css/cookstyles.css"
import Header from "./modules/Header.tsx";
import Footer from "./modules/Footer.tsx";
import ViewRecipesModal from "./modules/ViewRecipesModal.tsx";
import {useState} from "react";
import type {IIngredient, IRecipe} from "./App.tsx";
import RecipeItem from "./modules/RecipeItem.tsx";
import ShortRecipeItem from "./modules/ShortRecipeItem.tsx";
import EffectItem from "./modules/EffectItem.tsx";

interface ICookProps {
    username: string;
    recipes: IRecipe[];
    ingredients: IIngredient[]
    deleteRecipe: (name: string) => void;
    possibleToMake: (recipe: IRecipe, ingredients: IIngredient[]) => void;
    subtractIngredientAmounts: (amount1: number, unit1: string, amount2: number, unit2: string) => {amount: number, scale: string}
    logChanges: (after: IIngredient[]) => void;
}

function Cook(props: ICookProps) {
    const [modalState, setModalState] =
    useState<{recipe?: IRecipe, isOpen: boolean}>({ recipe: undefined, isOpen: false });
    const [selectedRecipe, setSelectedRecipe] = useState("")

    const selectedActual = getRecipe(selectedRecipe)

    function onSubmit() {
        props.logChanges(afterIngredients)
        setSelectedRecipe("")
    }

    const afterIngredients = selectedActual
        ? selectedActual.ingredients
            .map((uses) => {
                const before = props.ingredients.find((before) => before.name === uses.name);
                if (before) {
                    return {
                        name: before.name,
                        amount: props.subtractIngredientAmounts(before.amount, before.scale, uses.amount, uses.scale).amount,
                        scale: before.scale,
                        type: before.type
                    };
                }
                return null;
            })
            .filter((ingredient) => ingredient !== null) // Filters out null values
        : [];


    function onCloseRequested() {
        const newState = { recipe: undefined, isOpen: false };
        setModalState(newState);
    }

    function setRecipe(recipe: string) {
        setSelectedRecipe(selectedRecipe === recipe ? "" : recipe)
    }

    function getRecipe(recipe: string) {
        return(props.recipes.find(r => r.name === recipe))
    }

    function setModalOn(recipe: IRecipe) {
        const newState = { recipe: recipe, isOpen: true }
        setModalState(newState)
    }

    return (
        <div className="body">
            <ViewRecipesModal isOpen={modalState.isOpen}
                              onCloseRequested={onCloseRequested}
                              headerLabel={modalState.recipe ? modalState.recipe.name : ""}>
                { modalState.recipe ? <RecipeItem recipe={modalState.recipe}
                                            deleteRecipe={props.deleteRecipe}
                                            onCloseRequested={onCloseRequested}/> :
                    ''}
            </ViewRecipesModal>
            <Header header="Cook a Meal" username={props.username}/>
            <main>
                <form className="input">
                    <fieldset>
                        <legend>Choose a Recipe to Make</legend>
                        <ul>
                            { props.recipes.map((recipe) =>
                                <ShortRecipeItem recipe={recipe}
                                                 setModalOn={setModalOn}
                                                 setRecipe={setRecipe}
                                                 selectedRecipe={selectedRecipe}
                                />)}
                        </ul>
                        <label>
                            <button className="submit" type="button"
                                    disabled={!selectedRecipe}
                                    onClick={onSubmit}>
                                Make the Recipe!
                            </button>
                        </label>
                    </fieldset>

                    <div className="effect">
                        <h2>
                            Effects:
                        </h2>
                        <ul>
                            { selectedActual ?
                                selectedActual.ingredients.map((ing) => {
                                    const beforeIng = props.ingredients.find((b4) => b4.name === ing.name);
                                    const afterIng = afterIngredients.find((af) => af?.name === ing.name);
                                    return (<EffectItem name={ing.name}
                                                before={beforeIng ? beforeIng.amount : 0}
                                                scale={beforeIng ? beforeIng.scale : "oz"}
                                                after={afterIng ? afterIng.amount : 0}
                                    />)
                                }) : ''}

                        </ul>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    )
}

export default Cook;