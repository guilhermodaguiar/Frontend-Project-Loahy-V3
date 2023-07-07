import React from "react";
import {IoCloseSharp} from "react-icons/io5";

function RemoveButton(props) {
    return(
        <>
            <button className="remove-from-cart-button">
                <IoCloseSharp
                    size={20}
                    onClick={props.onClick}
                />
            </button>
        </>
    )
}

export default RemoveButton;