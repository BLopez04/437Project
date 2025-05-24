import "../css/tokens.css"
import "../css/header.css"
import "../css/general.css"
import "../css/addingredient.css"
import "../css/modal.css"

interface IViewRecipesProps {
    isOpen: boolean;
    onCloseRequested: () => void;
    headerLabel: string;
    children: React.ReactNode;
}

function ViewRecipesModal(props: IViewRecipesProps) {

    function handleClick(e: React.MouseEvent<HTMLDivElement>) {
        const inner = document.querySelector(".inner");
        if (inner !== null && !inner.contains(e.target as Node)) {
            props.onCloseRequested();
        }
    }
    return (
        props.isOpen ?
            (
                <div className="modal"
                     onClick={handleClick}>
                    <div className="inner">
                        <div className="heading">
                            <h2>
                                {props.headerLabel}
                            </h2>
                            <button
                                onClick={props.onCloseRequested}
                                aria-label="Close">
                                X
                            </button>
                        </div>
                        <ul>
                            {props.children}
                        </ul>
                    </div>
                </div>)
            : null)
    }



export default ViewRecipesModal;