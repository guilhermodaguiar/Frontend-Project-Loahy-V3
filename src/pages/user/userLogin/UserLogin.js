import './UserLogin.css';

import React from "react";
import Login from "../logIn/Login";
import Register from "../register/Register";


function UserLogin() {


    return (
        <>
            <div className="customer-login-page">
                <h1 className="header-name">Inloggen</h1>
                <div className="login-outer-container">
                    <Login/>
                    <Register/>
                </div>
            </div>

        </>
    )

}

export default UserLogin;