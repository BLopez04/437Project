import { Link } from "react-router";
import logo from "../assets/logo.png";
import "../css/tokens.css"
import "../css/header.css"
import {useState} from "react";
interface IHeaderProps {
    header: string;
    username: string;
}

function Header(props : IHeaderProps) {
    const [checked, setChecked] = useState(localStorage.getItem("darkMode") === "true")

    return (
            <header>
                <Link to="/" aria-label="Homepage">
                    <img className="logo" src={logo} alt="" width="150"/>
                    {props.username}
                </Link>
                <h1>{props.header}</h1>
                <label className={"dark-toggle"}>
                    <input
                        type="checkbox"
                        checked={checked}
                        autoComplete="off"
                        onClick={(e) => {
                            const checked = (e.target as HTMLInputElement).checked
                            document.body.classList.toggle("dark-mode", checked);
                            localStorage.setItem("darkMode", `${checked}`);
                            setChecked(checked)
                        }}/>
                    Dark Mode
                </label>
            </header>
    )
}

export default Header;