import React, {useContext} from "react";
import {AuthContext} from "../../../context/AuthContext";

function LogoutButton(props) {
    const {logout} = useContext(AuthContext);
    return(
        <>
            <button
                className={props.className}
                type={props.type}
                onClick={logout}>
                Uitloggen
            </button>
        </>
    )
}

export default LogoutButton;