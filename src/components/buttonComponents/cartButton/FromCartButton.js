import React from "react";
import {BsFillCartDashFill} from "react-icons/bs";

function FromCartButton(props) {
    return (<>

            <button
                onClick={props.onClick}
            >
                <p><BsFillCartDashFill/> &nbsp;Uit winkelwagen</p>
            </button>
        </>
    )
}

export default FromCartButton;