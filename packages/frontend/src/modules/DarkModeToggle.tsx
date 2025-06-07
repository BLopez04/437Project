import { useState } from "react";
import "../css/tokens.css";

function DarkModeToggle() {
    const [checked, setChecked] = useState(localStorage.getItem("darkMode") === "true");

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        document.body.classList.toggle("dark-mode", isChecked);
        localStorage.setItem("darkMode", `${isChecked}`);
        setChecked(isChecked);
    };

    return (
        <label className="dark-toggle">
            <input type="checkbox" checked={checked} autoComplete="off" onChange={handleToggle} />
            Dark Mode
        </label>
    );
}

export default DarkModeToggle;
