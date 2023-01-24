import './GreetCustomer.css';

import React, {AuthContext} from "../../../context/AuthContext";
import {useContext} from "react";

function GreetCustomer() {
    const {user} = useContext(AuthContext);

    return (
        <>
            <section className="greet-user-container">
                <div className="welcome-user">
                    <div className="welcome-user-outer-container">
                        <h1 className="greet-email">Welkom</h1>
                    </div>
                    <div>
                        <h1 className="greet-email">
                            &nbsp; {user.customer_firstname}&nbsp;{user.customer_lastname}
                        </h1><
                    /div>
                </div>
            </section>
        </>
    )
}

export default GreetCustomer;