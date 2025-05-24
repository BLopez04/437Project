import "../css/tokens.css"
import "../css/header.css"
import "../css/formpagestyles.css"
import type {IRecipe} from "../App.tsx";

interface IShortRecipeItemProps {
    recipe: IRecipe
    setModalOn: (recipe: IRecipe) => void;
    possible: boolean;
}

function ShortRecipeItem(props : IShortRecipeItemProps) {

    return (
        <li className={props.possible ? "yes" : "no"}>
            <label className="Include">
                                    <span>
                                        Make?
                                    </span>
                <input type="radio" name="include" value="no"/>
            </label>
            <b className="name">{props.recipe.name}</b>
            <label className="Details">
                <button type="button" onClick={() => props.setModalOn(props.recipe)}>Details</button>
            </label>
        </li>
    )
}

export default ShortRecipeItem;