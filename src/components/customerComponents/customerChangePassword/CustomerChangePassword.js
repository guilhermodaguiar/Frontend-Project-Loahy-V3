import "./CustomerChangePassword.css";

import React, {useContext, useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import {MdAccountCircle} from "react-icons/md";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import {BsFillPencilFill} from "react-icons/bs";
import {RiLockPasswordFill} from "react-icons/ri";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function CustomerChangePassword() {
    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const history = useHistory();

    const userRef = useRef();
    const errRef = useRef();

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const [success, toggleSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidConfirmPassword(password === confirmPassword);
    }, [password, confirmPassword])


    useEffect(() => {
        setErrorMessage('');
    }, [password, confirmPassword]);

    async function updatePassword() {

        try {
            const response = await axios.put(`http://localhost:8080/users/${user.user_email}`, {
                password: password,
            }).then(savedPassword);
            console.log(response.data);
        } catch (e) {
            console.error(e)
        }
    }

    function savedPassword() {
        history.push('/customer/profile/#customer_user_profile')
    }

    return (
        <>
            {user.roles !== "ROLE_USER" ? (
                <div className="user-route-container">
                    <div className="user-route">
                        <h1>U moet ingelogd zijn als
                            <br/> CUSTOMER
                            <br/>om deze content te mogen zien..
                        </h1>
                    </div>
                </div>
            ) : (
                <>
                    <div>
                        <h1 className="password-change-container"><RiLockPasswordFill size={40}/>Wachtwoord</h1>
                        <div>
                            <h3 className="password-change-text">Loahy wachtwoord wijzigen
                            </h3>
                        </div>
                        <div className="change-password-inner-container">
                            <div>
                                <section className="block-new-costumer">
                                    <p ref={errRef} className={errorMessage ? "err-msg" : "offscreen"}
                                       aria-live="assertive">{errorMessage}</p>

                                    <form
                                        className="form-container-update"
                                        onSubmit={updatePassword}>

                                        <section className="update-customer">
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
                                        <section className="update-customer">
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
                                            disabled={!validPassword || !validConfirmPassword}
                                        >
                                            <BsFillPencilFill/>&nbsp; Wijzigen
                                        </button>
                                    </form>
                                </section>
                            </div>
                        </div>
                    </div>


                </>
            )}
        </>
    )
}

export default CustomerChangePassword;