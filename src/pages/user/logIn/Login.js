import './Login.css';

import React, {useContext, useEffect, useRef, useState} from "react";
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../../../context/AuthContext";
import axios from "axios";
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {useForm} from "react-hook-form";
import {Icon} from "react-icons-kit";
import SubmitButton from "../../../components/buttonComponents/submitButton/SubmitButton";

function Login() {
    const history = useHistory();
    const {login, isAuth} = useContext(AuthContext);
    const userRef = useRef();
    const [type, setType] = useState('password');
    const [error, toggleError] = useState(false);
    const [error2, toggleError2] = useState(false);
    const [icon, setIcon] = useState(eyeOff);
    const {handleSubmit, formState: {errors}, register, setFocus} = useForm({
        defaultValues: {
            userEmail: '', password: ''
        }
    });


    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password');
        }
    }


    async function logIn(data, e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/authenticate', {
                userEmail: data.userEmail, password: data.password
            });
            login(response.data.jwt);

            setTimeout(() => {
                history.push("/user/profile");
            }, 500)

        } catch (e) {
            if (e.response.status === 403) {
                console.error("Er is iets misgegaan met inloggen van user!!", e);
                toggleError(true);
            } else if (e.response?.status === 404) {
                console.error("Email bestaat niet!!", e);
                toggleError2(true);
            }
        }
    }

    useEffect(() => {
        setFocus("email");
    }, [setFocus]);


    return (<>
        {!isAuth ? <span className="login-field-note">
            <h3 className="login-field-note">
                Inloggen
            </h3>
            <form
                className="form-container-login"
                onSubmit={handleSubmit(logIn)}>

                <input
                    ref={userRef}
                    type="email"
                    autoComplete="off"
                    {...register("userEmail", {
                        required: "email is verplicht",
                        pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })}
                    placeholder="E-mailadres"
                />
                <p> {errors.userEmail?.message} </p>


                <div className="password-container">
                    <input
                        type={type}
                        autoComplete="off"
                        {...register("password", {
                            required: 'wachtwoord is verplicht',
                            minLength: {value: 8, message: 'Minimaal 8 karakters nodig'},
                            maxLength: {value: 15, message: "Maximaal 15 karakters nodig"},
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,15}$/
                        })}
                        placeholder="Wachtwoord"
                    />
                    <p> {errors.password?.message} </p>

                </div>
                <span className="show-hide-password" onClick={handleToggle}>
                            <Icon
                                icon={icon} size={20}/>
                            </span>
                {error && <p className="error-admin-login"> Combinatie van email-adres en wachtwoord is
                    onjuist</p>}
                {error2 && <p className="error-admin-login"> email-adres is onjuist</p>}
                <SubmitButton/>
            </form>
        </span> :
            <span>
                <h4>Inloggen succesvol!</h4>
                <p>Loading...<br/> U bent succesvol ingelogd<br/> en wordt automatisch doorgestuurd..</p>
                <p>Mocht u niet automatisch doorgestuurd worden<br/>
                    <NavLink to="/user/profile" className="active-link">klik dan hier!</NavLink>
                </p>
            </span>
        }
    </>)
}


export default Login;
