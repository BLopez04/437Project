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

interface ICookProps {
    username: string;
    recipes: IRecipe[];
    ingredients: IIngredient[]
    addRecipe: (recipe: IRecipe) => void;
    deleteRecipe: (name: string) => void;
}

function Cook(props: ICookProps) {
    const [modalState, setModalState] =
    useState<{recipe?: IRecipe, isOpen: boolean}>({ recipe: undefined, isOpen: false });

    function onCloseRequested() {
        const newState = { recipe: undefined, isOpen: false };
        setModalState(newState);
    }


    function setModalOn(recipe: IRecipe) {
        const newState = { recipe: recipe, isOpen: true }
        setModalState(newState)
    }


    return (
        <div className="body">
            <ViewRecipesModal isOpen={modalState.isOpen}
                              onCloseRequested={onCloseRequested}
                              headerLabel="All Recipes">
                { modalState.recipe ? <RecipeItem recipe={modalState.recipe}
                                            deleteRecipe={props.deleteRecipe}
                                            onCLoseRequested={onCloseRequested}/> :
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
                                                    possible={false}
                                />)}
                        </ul>
                        <label>
                            <button className="submit">Make the Recipe!</button>
                        </label>
                    </fieldset>

                    <div className="effect">
                        <h2>
                            Effects:
                        </h2>

                        <ul>
                            <li className="no">
                                <b className="name">Butter</b>
                                <p className="before">4 oz</p>
                                <p> {">"} </p>
                                <p className="after">0 oz</p>
                            </li>
                            <li className="no">
                                <b className="name">Fettuccine</b>
                                <p className="before">16 oz</p>
                                <p> {">"} </p>
                                <p className="after">0 oz</p>
                            </li>
                            <li className="no">
                                <b className="name">Parmesan</b>
                                <p className="before">2 cups</p>
                                <p> {">"} </p>
                                <p className="after">1 cups</p>
                            </li>
                            <li className="no">
                                <b className="name">Heavy Cream</b>
                                <p className="before">24 oz</p>
                                <p> {">"} </p>
                                <p className="after">12 oz</p>
                            </li>
                        </ul>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    )
}

export default Cook;