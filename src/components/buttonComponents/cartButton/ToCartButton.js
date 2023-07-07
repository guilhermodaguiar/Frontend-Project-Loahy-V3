import React from "react";
import {BsFillCartPlusFill} from "react-icons/bs";

function ToCartButton(props) {
    return(
        <>
            <button
                    onClick={props.onClick}>
                <p><BsFillCartPlusFill/> &nbsp;In winkelwagen</p>
            </button>
        </>
    )
}

export default ToCartButton;