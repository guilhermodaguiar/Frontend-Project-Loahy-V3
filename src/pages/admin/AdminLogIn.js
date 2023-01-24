import "./AdminLogIn.css";

import React, {useContext, useState} from 'react';
import axios from 'axios';
import {AuthContext} from "../../context/AuthContext";
import {NavLink, useHistory} from "react-router-dom";
import {RiLoginCircleFill} from "react-icons/ri";


function AdminLogIn() {
    const history = useHistory();
    const {login, isAuth} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);


    async function adminLoginRequest(e) {
        e.preventDefault();
        toggleLoading(false);

        try {
            const response = await axios.post(`http://localhost:8080/authenticate`, {
                userEmail: email,
                password: password,
            });

            console.log(response.data);
            login(response.data.jwt);

            setTimeout(() => {
                history.push("/admin/profile");
            }, 1500)
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }

    return (
        <>
            {!isAuth ? (
                    <div>
                        <div className="admin-page">
                            <h1 className="admin-h1">Admin pagina</h1>
                        </div>
                        <div className="admin-sign-in-body">
                            <div className="outer-container">
                                <div className="inner-container-admin">

                                    <form
                                        className="form-container-admin"
                                        onSubmit={adminLoginRequest}>
                                        <label htmlFor="email-field">
                                            E-mailadres
                                            <input
                                                className="admin-input"
                                                type="email"
                                                autoComplete="off"
                                                id="email-field"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="admin email-adres"
                                            />
                                        </label>
                                        <label htmlFor="password-field">
                                            Wachtwoord:
                                            <input
                                                className="admin-input"
                                                type="password"
                                                autoComplete="off"
                                                id="password-field"
                                                name="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="admin-wachtwoord"
                                            />
                                        </label>
                                        {error &&
                                            <p className="error-admin-login"> Combinatie van email-adres en wachtwoord is
                                                onjuist</p>}
                                        <button
                                            disabled={loading}
                                            type="submit"
                                            className="form-button-login-admin"
                                        >
                                            Inloggen&nbsp;<RiLoginCircleFill size={22}/>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                )
                : (
                    <span className="inlog-admin-successful">
                        <h3> Inloggen succesvol!</h3>
                        <div className="dot-pulse">
                            loading
                        </div>
                        <h5>U bent succesvol ingelogd<br/> en wordt automatisch doorgestuurd</h5>
                        <p>Mocht u niet automatisch doorgestuurd worden<br/>
                        <NavLink to="/admin/profile">klik dan hier!</NavLink>
                        </p>
                    </span>
                )
            }
        </>

    );
}

export default AdminLogIn;