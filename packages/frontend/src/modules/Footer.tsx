import { Link } from "react-router";
import logo from "../assets/logo.png";
import "../css/tokens.css"
import "../css/footer.css"

function Footer() {
    return (
        <footer>
            <nav>
                <Link to="/" aria-label="Homepage">
                    <img src={logo} className="weblink" alt=""/>
                    <p>Home</p>
                </Link>
                <Link to="/recipe" aria-label="Add Recipes">
                    <img src={logo} className="weblink" alt=""/>
                    <p>Recipes</p>
                </Link>
                <Link to="/ingredient" aria-label="Add Ingredients">
                    <img src={logo} className="weblink" alt=""/>
                    <p>Ingredients</p>
                </Link>
                <Link to="/cook" aria-label="Cook a Meal">
                    <img src={logo} className="weblink" alt=""/>
                    <p>Cook</p>
                </Link>
            </nav>
        </footer>
    )
}

export default Footer;