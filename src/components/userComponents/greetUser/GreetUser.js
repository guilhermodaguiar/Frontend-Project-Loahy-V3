import './GreetUser.css';

import React, {AuthContext} from "../../../context/AuthContext";
import {useContext} from "react";

function GreetUser() {
    const {user} = useContext(AuthContext);

    return (
        <>
            <section className="gu-container">
                <div className="welcome-user">
                    <div className="wou-container">
                        <h1 className="greet-email">Welkom</h1>
                    </div>
                    <div>
                        <h1 className="greet-email">
                            &nbsp; {user.user_first_name}&nbsp;{user.user_last_name}
                        </h1><
                    /div>
                </div>
            </section>
        </>
    )
}

export default GreetUser;