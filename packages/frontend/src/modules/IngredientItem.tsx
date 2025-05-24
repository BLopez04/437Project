import "../css/tokens.css"
import "../css/header.css"
import "../css/formpagestyles.css"
import type {IIngredient} from "../App.tsx";

interface IIngredientItemProps {
    ingredient: IIngredient
    deleteIngredient?: (name: string) => void;
}

function IngredientItem(props : IIngredientItemProps) {
    return (
        <li className="ing">
            <b className="name">{props.ingredient.name}</b>
            <p className="amount">{props.ingredient.amount}</p>
            <p className="scale">{props.ingredient.scale}</p>
            <p className="type">{props.ingredient.type}</p>
            {props.deleteIngredient ?
                <button className="symbol remove" onClick={() => {
                    if (props.deleteIngredient !== undefined) {
                        props.deleteIngredient(props.ingredient.name);
                    }}}>
                    Remove
                </button> : ''}
        </li>
    )
}

export default IngredientItem;