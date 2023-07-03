import './UserLogin.css';

import React from "react";
import Login from "../logIn/Login";
import Register from "../register/Register";
import NavBar from "../../../layout/navBar/NavBar";


function UserLogin() {
    return (
        <>
            <NavBar/>
            <div className="user-login-page">
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