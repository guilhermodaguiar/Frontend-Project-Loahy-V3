import './Login.css';

import React, {useContext, useEffect, useRef, useState} from "react";
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../../../context/AuthContext";
import axios from "axios";
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {useForm} from "react-hook-form";
import {RiLoginCircleFill} from "react-icons/ri";
import {Icon} from "react-icons-kit";

function Login() {
    const history = useHistory();
    const {login, isAuth} = useContext(AuthContext);
    const {handleSubmit, formState: {errors}, register, setFocus} = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const [loading, toggleLoading] = useState(false);
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const userRef = useRef();

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password');
        }
    }


    async function logIn(data) {
        toggleLoading(false);

        try {
            const response = await axios.post('http://localhost:8080/authenticate', {
                data
            });

            console.log(response.data);
            login(response.data.jwt);

            setTimeout(() => {
                history.push("/userOverview/profile");
            }, 1500)

        } catch (error) {
            console.error("E~r is iets misgegaan met inloggen", error);
        }
    }

    useEffect(() => {
        setFocus("email");
    }, [setFocus]);


    return (
        <>
            {!isAuth ?
                <div className="login-field-note">
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
                            {...register("email", {
                                required: "email is verplicht",
                                pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            })}
                            placeholder="E-mailadres"
                        />
                        <p> {errors.email?.message} </p>


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


                        <button
                            disabled={loading}
                            type="submit"
                            className="form-button-login"
                        >
                            <RiLoginCircleFill/>&nbsp;Inloggen
                        </button>
                    </form>
                </div>
                :
                <span className="inlog-customer-successful">
                <h3>Inloggen succesvol!</h3>
                <div className="dot-pulse">
                loading
                </div>
                <h5>U bent succesvol ingelogd<br/> en wordt automatisch doorgestuurd..</h5>
                <p>Mocht u niet automatisch doorgestuurd worden<br/>
                <NavLink to="/user/profile" className="active-link">klik dan hier!</NavLink>
                </p>
                </span>
            }

        </>
    )
}


export default Login;