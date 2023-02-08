import './LoginSignUpPage.css';

import React from "react";
import LogIn from "./logIn/LogIn";
import Register from "./register/Register";


function LoginSignUpPage() {


    return (
        <>
            <div className="customer-register-page">
                <h1 className="header-name">Registreren</h1>
            </div>
            <div className="customer-register-outer-container">
                <LogIn/>
                <Register/>
            </div>
        </>
    )

}

export default LoginSignUpPage;