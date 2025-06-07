import { Link } from "react-router";
import logo from "../assets/logo.png";
import "../css/header.css";
import DarkModeToggle from "./DarkModeToggle";

interface IHeaderProps {
    header: string;
    username: string;
}

function Header(props: IHeaderProps) {
    return (
        <header>
            <Link to="/" aria-label="Homepage">
                <img className="logo" src={logo} alt="" width="150" />
                {props.username}
            </Link>
            <h1>{props.header}</h1>
            <DarkModeToggle />
        </header>
    );
}

export default Header;
