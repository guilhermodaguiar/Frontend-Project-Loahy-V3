import "./CustomerSignUp.css";

import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {faCheck, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";
import {BsFillPencilFill} from "react-icons/bs";
import {MdAccountCircle} from "react-icons/md";
import {IoMdLogIn} from "react-icons/io";
import CustomerRegister from "../customerRegister/CustomerRegister";


const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function CustomerSignUp() {
    // const history = useHistory();

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validUserEmail, setValidUserEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);


    const [success, toggleSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidConfirmPassword(password === confirmPassword);
    }, [password, confirmPassword])

    useEffect(() => {
        setValidUserEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setErrorMessage('');
    }, [email, password, confirmPassword])


    async function registerUser(e) {
        e.preventDefault();

        const v1 = EMAIL_REGEX.test(email);
        const v2 = PASSWORD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrorMessage("Invalid Entry");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/users/create", {
                userEmail: email,
                password: password,
            });

            console.log(response.data);
            toggleSuccess(true);

            // setTimeout(() => {
            //
            //     history.push('/customer/register/step2');
            //
            // }, 2000);


        } catch (e) {
            if (!e?.response) {
                setErrorMessage('Geen server response');
            } else if (errorMessage.response?.status === 409) {
                setErrorMessage('Gebruikersnaam al in gebruik');
            } else {
                setErrorMessage('Registratie mislukt.. Gebruikersnaam en/of email al in gebruik!')
            }
            errRef.current.focus();
        }
    }


    return (
        <>
            {success ? (
                <section className="block-new-user-created-with-succes">
                    <div>
                        <CustomerRegister
                            customer= {email}
                        />
                    </div>
                </section>) : (
                <div>
                    <div className="customer-register-page">
                        <h1 className="header-name">Registreren</h1>
                    </div>
                    <div className="customer-register-outer-container">
                        <div>
                            <h3 className="customer-h3-header"><MdAccountCircle size={36}/>&nbsp;Loahy account aanmaken
                            </h3>
                        </div>
                        <div className="customer-inner-container">
                            <div className="register-body">
                                <section className="block-new-costumer">
                                    <p ref={errRef} className={errorMessage ? "err-msg" : "offscreen"}
                                       aria-live="assertive">{errorMessage}</p>

                                    <form
                                        className="form-container-register"
                                        onSubmit={registerUser}>

                                        <section className="email">
                                            <label>
                                                E-mailadres:
                                                <FontAwesomeIcon icon={faCheck}
                                                                 className={validUserEmail ? "valid" : "hide"}/>
                                                <FontAwesomeIcon icon={faTimes}
                                                                 className={validUserEmail || !email ? "hide" : "invalid"}/>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                ref={userRef}
                                                autoComplete="off"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                                required
                                                aria-invalid={validUserEmail ? "false" : "true"}
                                                aria-describedby="user-email-note"
                                                onFocus={() => setEmailFocus(true)}
                                                onBlur={() => setEmailFocus(false)}
                                            />
                                            <p id="email-note"
                                               className={emailFocus && email && !validUserEmail ? "instructions" : "offscreen"}>
                                                <FontAwesomeIcon icon={faInfoCircle}/>
                                                Email is verplicht!<br/>
                                            </p>
                                        </section>
                                        <section className="password">
                                            <label htmlFor="password-field">
                                                Wachtwoord:
                                                <FontAwesomeIcon icon={faCheck}
                                                                 className={validPassword ? "valid" : "hide"}/>
                                                <FontAwesomeIcon icon={faTimes}
                                                                 className={validPassword || !password ? "hide" : "invalid"}/>
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                                required
                                                aria-invalid={validPassword ? "false" : "true"}
                                                aria-describedby="password-note"
                                                onFocus={() => setPasswordFocus(true)}
                                                onBlur={() => setPasswordFocus(false)}
                                            />

                                            <p id="password-note"
                                               className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                                <FontAwesomeIcon icon={faInfoCircle}/>

                                                8 to 24 karakters.<br/>
                                                Hoofdletter, klein letter, cijfer en een speciaal teken <br/>
                                                (!, @, #, $ of %)bevatten.<br/>
                                            </p>
                                        </section>
                                        <section className="confirm-password">
                                            <label htmlFor="confirm-password-field">
                                                Herhaal wachtwoord:
                                            </label>
                                            <input
                                                type="password"
                                                id="confirm-password-field"
                                                name="password"
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                value={confirmPassword}
                                                required
                                                aria-invalid={validConfirmPassword ? "false" : "true"}
                                                aria-describedby="confirm-password"
                                                onFocus={() => setConfirmPasswordFocus(true)}
                                                onBlur={() => setConfirmPasswordFocus(false)}

                                            />
                                            <p id="confirm-password"
                                               className={confirmPasswordFocus && !validConfirmPassword ? "instructions" : "offscreen"}>
                                                <FontAwesomeIcon icon={faInfoCircle}/>
                                                Wachtwoorden moeten overeenkomen.
                                            </p>
                                        </section>

                                        <button
                                            type="submit"
                                            className="form-button"
                                            disabled={!validUserEmail || !validPassword || !validConfirmPassword}
                                        >
                                            <BsFillPencilFill/>&nbsp; Registreer
                                        </button>
                                    </form>
                                </section>
                            </div>
                            <div className="sign-in-body">
                                <p className="form-footer">
                                    <IoMdLogIn size={40}/>Ik heb al een Loahy account!<br/>
                                    <span className="line">
                                            <NavLink to="/customer/login">
                                               login
                                            </NavLink>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default CustomerSignUp;