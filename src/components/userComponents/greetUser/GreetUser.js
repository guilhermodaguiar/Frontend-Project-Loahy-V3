import './GreetUser.css';

import React, {AuthContext} from "../../../context/AuthContext";
import {useContext} from "react";

function GreetUser() {
    const {user} = useContext(AuthContext);

    return (
        <>
            <article className="gu-container">
                <section className="welcome-user">
                    <h1 className="greet-email">Welkom</h1>
                    <h1 className="greet-email">
                        &nbsp; {user.user_first_name}&nbsp;{user.user_last_name}
                    </h1>
                </section>
            </article>
        </>
    )
}

export default GreetUser;