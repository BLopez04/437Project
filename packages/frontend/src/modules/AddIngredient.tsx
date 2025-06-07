import "../css/tokens.css"
import "../css/header.css"
import "../css/general.css"
import "../css/addingredient.css"
import type {IApiIngredient} from "csc437-monorepo-backend/src/common/ApiUserData.ts";
import {useState} from "react";

interface IAddIngredientProps {
    addIngredient: (ingredient: IApiIngredient) => void;
}

function AddIngredient(props: IAddIngredientProps) {
    const [nameFieldContents, setName] = useState("");
    const [amountFieldContents, setAmount] = useState(1);
    const [scaleContents, setScale] = useState("oz")
    const [typeContents, setType] = useState("Misc")

    function handleNameTyping(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value)
    }

    function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAmount(Number.parseFloat(e.target.value))
    }

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const newIngredient : IApiIngredient =
            { name: nameFieldContents, amount: amountFieldContents, scale: scaleContents,
            type: typeContents}
        props.addIngredient(newIngredient);
        setName("");
        setAmount(1)
        setScale("oz");
        setType("Misc");
    }

    return (
        <form className="input">
            <label className="Name">
                <span>Name</span>
                <input name="name" placeholder="Enter Ingredient Name"
                value={nameFieldContents}
                onChange={handleNameTyping}/>
            </label>
            <label className="amount">
                <span>Amount</span>
                <input name="amount" type="number" min="1"
                onChange={handleAmountChange}
                value={amountFieldContents}/>
                <select name="scale" defaultValue="oz"
                        value={scaleContents}
                        onChange={(e) => setScale(e.target.value)}>
                    <option value="tsp">Teaspoon</option>
                    <option value="tbsp">Tablespoon</option>
                    <option value="oz">Ounces</option>
                    <option value="cups">Cups</option>
                </select>
            </label>
            <label className="Type">
                <span>Type</span>
                <select name="type" value={typeContents}
                        onChange={(e) => setType(e.target.value)}>
                    <option value="Dairy">Dairy</option>
                    <option value="Grain">Grain</option>
                    <option value="Protein">Protein</option>
                    <option value="Vegetable">Vegetable</option>
                    <option value="Fruit">Fruit</option>
                    <option value="Misc">Misc</option>
                </select>
            </label>
            <label className="Button">
                <button onClick={handleSubmit}
                disabled={!nameFieldContents || !amountFieldContents}>Submit</button>
            </label>
        </form>
    )
}

export default AddIngredient;