import "../css/tokens.css"
import "../css/header.css"
import "../css/formpagestyles.css"
import type {IRecipe} from "../App.tsx";

interface IShortRecipeItemProps {
    recipe: IRecipe
    setModalOn: (recipe: IRecipe) => void;
    setRecipe: (name: string) => void;
    selectedRecipe: string;
}

function ShortRecipeItem(props : IShortRecipeItemProps) {
    return (
        <li className={`recipe ${props.recipe.possible ? "yes" : "no"}`}>
            <label className="Include">
                                    <span>
                                        Make?
                                    </span>
                <input type="radio" disabled={!props.recipe.possible} name="include" value={props.recipe.name}
                       checked={props.recipe.name === props.selectedRecipe}
                onClick={() => props.setRecipe(props.recipe.name)}/>
            </label>
            <b className="name">{props.recipe.name}</b>
            <label className="Details">
                <button type="button" onClick={() => props.setModalOn(props.recipe)}>Details</button>
            </label>
        </li>
    )
}

export default ShortRecipeItem;