import React from "react";
import {RiLoginCircleFill} from "react-icons/ri";

function SubmitButton(props) {
    return(
        <>
            <button
                disabled={props.disabled}
                type="submit"
                className="form-button-login"
            >
                <RiLoginCircleFill/>&nbsp;Inloggen
            </button>
        </>
    )
}

export default SubmitButton;