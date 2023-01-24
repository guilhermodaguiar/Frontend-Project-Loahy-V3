import './CustomerLogIn.css';

import React, {useContext, useState} from "react";
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../../../context/AuthContext";
import axios from "axios";
import {RiLoginCircleFill} from "react-icons/ri";
import {MdAccountCircle} from "react-icons/md";
import {AiOutlineForm} from "react-icons/ai";
import {Icon} from 'react-icons-kit';
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';

function CustomerLogIn() {
    const history = useHistory();
    const {login, isAuth} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password');
        }
    }


    async function userLoginRequest(e) {
        e.preventDefault();
        toggleLoading(false);

        try {
            const response = await axios.post('http://localhost:8080/authenticate', {
                userEmail: email,
                password: password,
            });

            console.log(response.data);
            login(response.data.jwt);

            setTimeout(() => {
                history.push("/customer/profile");
            }, 1500)

        } catch (error) {
            console.error("E~r is iets misgegaan met inloggen", error);
            toggleError(true);
        }
    }

    return (
        <>
            {!isAuth ? (
                    <div>
                        <div className="customer-inlog-page">
                            <h1 className="header-name">Inloggen</h1>
                        </div>
                        <div className="customer-register-outer-container">
                            <div>
                                <h3 className="customer-h3-header"><MdAccountCircle size={36}/>&nbsp;Ik heb een Loahy
                                    account</h3>
                            </div>
                            <div className="login-field-note">
                                Meld je aan met je e-mailadres en wachtwoord
                            </div>
                            <div className="customer-inner-container">
                                <div className="login-body">
                                    <section className="block-login-costumer">
                                        <form
                                            className="form-container-login"
                                            onSubmit={userLoginRequest}>
                                            <label htmlFor="email-field">
                                                E-mailadres:
                                                <input
                                                    type="email"
                                                    autoComplete="off"
                                                    id="email-field"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </label>
                                            <label htmlFor="password-field">
                                                Wachtwoord:
                                                <div className="password-container">
                                                    <input
                                                        type={type}
                                                        autoComplete="off"
                                                        id="password-field"
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        value={password}
                                                        required
                                                    />
                                                    <span className="show-hide-password" onClick={handleToggle}><Icon
                                                        icon={icon} size={25}/>
                                                    </span>
                                                </div>
                                            </label>
                                            {error &&
                                                <p className="error-customer-login"> Combinatie van email-adres en
                                                    wachtwoord is
                                                    onjuist</p>}
                                            <button
                                                disabled={loading}
                                                type="submit"
                                                className="form-button-login"
                                            >
                                                <RiLoginCircleFill/>&nbsp;Inloggen
                                            </button>
                                        </form>
                                    </section>
                                </div>
                                <div className="to-register-body">
                                    <p className="form-footer">
                                        <AiOutlineForm size={40}/>Ik heb geen Loahy account
                                        <span className="line">
                                            <NavLink to="/customer/register">
                                                Registreer
                                            </NavLink>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>)
                :
                (<span className="inlog-customer-successful">
                <h3>Inloggen succesvol!</h3>
                    <div className="dot-pulse">
                        loading
                    </div>
                <h5>U bent succesvol ingelogd<br/> en wordt automatisch doorgestuurd..</h5>
                <p>Mocht u niet automatisch doorgestuurd worden<br/>
                <NavLink to="/customer/profile" className="active-link">klik dan hier!</NavLink>
                </p>
                </span>)
            }

        </>
    );
}


export default CustomerLogIn;
