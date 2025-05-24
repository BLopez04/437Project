import { Link } from "react-router";
import "./css/homestyles.css";
import "./css/tokens.css"
import "./css/general.css"
import Header from "./modules/Header.tsx";
import Footer from "./modules/Footer.tsx";

interface IHomeProps {
    username: string;
}

function Home(props: IHomeProps) {
    return (
        <div className="body">
            <Header header="Home" username={props.username}/>
            <main>
                <h2>
                    Welcome to Ingready!
                </h2>
                <div>
                    <Link to="/recipe" aria-label="Recipes">
                        Add a Recipe
                    </Link>
                    <Link to="/ingredient" aria-label="Ingredients">
                        Log Ingredients
                    </Link>
                    <Link to="/cook" aria-label="Cook a Meal">
                        Cook a Meal
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Home;