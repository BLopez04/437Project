import "../css/tokens.css"
import "../css/header.css"
import "../css/formpagestyles.css"

interface IShortRecipeItemProps {
    name: string,
    scale: string,
    before: number,
    after: number
}

function EffectItem(props : IShortRecipeItemProps) {
    return (
        <li className={`${props.after === 0 ? "no" : ""}`}>
            <b className="name">{props.name}</b>
            <p className="before">{props.before} {props.scale}</p>
            <p> {">"} </p>
            <p className="after"> {props.after} {props.scale}</p>
        </li>
    )
}

export default EffectItem;
