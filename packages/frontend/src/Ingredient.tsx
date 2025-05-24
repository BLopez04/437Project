import "./css/formpagestyles.css";
import "./css/tokens.css"
import "./css/general.css"
import Header from "./modules/Header.tsx";
import Footer from "./modules/Footer.tsx";
import IngredientItem from "./modules/IngredientItem.tsx";
import type {IIngredient} from "./App.tsx";
import AddIngredient from "./modules/AddIngredient.tsx";

interface IIngredientProps {
    username: string;
    ingredients: IIngredient[];
    deleteIngredient: (name: string) => void;
    addIngredient: (ingredient: IIngredient) => void;
}

function Ingredient(props: IIngredientProps) {
    return (
        <div className="body">
            <Header header="Log Ingredients" username={props.username}/>
            <main>
                <AddIngredient addIngredient={props.addIngredient}/>
                <ul role="list"
                    aria-labelledby="list-heading">
                    {
                        props.ingredients.map((ingredient) =>
                            <IngredientItem ingredient={ingredient}
                            deleteIngredient={props.deleteIngredient}/>)
                    }
                </ul>
            </main>
            <Footer />
        </div>
    )
}

export default Ingredient;