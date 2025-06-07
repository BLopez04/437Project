import "../css/tokens.css"
import "../css/header.css"
import "../css/formpagestyles.css"
import type {IApiRecipe} from "csc437-monorepo-backend/src/common/ApiUserData.ts";
import IngredientItem from "./IngredientItem.tsx";

interface IRecipeItemProps {
    recipe: IApiRecipe
    deleteRecipe: (name: string) => void;
    onCloseRequested?: () => void;
}

function RecipeItem(props : IRecipeItemProps) {
    return (
        <li className="rec">
            <div className="head">
                <b className="name">{props.recipe.name}</b>
                <button className="remove"
                        type="button"
                        onClick={() => {
                            if (props.onCloseRequested) {
                                props.onCloseRequested()
                            }
                            props.deleteRecipe(props.recipe.name)}}>Remove
                </button>
            </div>
            <p className="steps">{props.recipe.steps}</p>
            <div className="ingredients">
                {props.recipe.ingredients.map((ingredient) =>
                    <IngredientItem ingredient={ingredient}/>)
                }
            </div>
        </li>
    )
}

export default RecipeItem;