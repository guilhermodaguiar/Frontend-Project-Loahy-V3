import "./AdminLogIn.css";

import React, {useContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {AuthContext} from "../../context/AuthContext";
import {NavLink, useHistory} from "react-router-dom";
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {useForm} from "react-hook-form";
import {Icon} from "react-icons-kit";
import SubmitButton from "../../components/buttonComponents/submitButton/SubmitButton";


function AdminLogIn() {
    const {login, isAuth} = useContext(AuthContext);
    const history = useHistory();
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [error2, toggleError2] = useState(false);
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const userRef = useRef();
    const {handleSubmit, formState: {errors}, register, setFocus} = useForm({
        defaultValues: {
            email: '', password: ''
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


    async function adminLoginRequest(data, e) {
        e.preventDefault();
        toggleLoading(false);

        try {
            const response = await axios.post(`http://localhost:8080/authenticate`, {
                email: data.email, password: data.password
            })
            login(response.data.jwt);

            setTimeout(() => {
                history.push("/admin/profile");
            }, 500)

        } catch (e) {
            if (e.response?.status === 403) {
                console.error("Er is iets misgegaan met het inloggen van Admin!!", e);
                toggleError(true);
            } else if
            (e.response?.status === 404) {
                console.error("Email bestaat niet!!", e);
                toggleError2(true);
            }
        }
    }

    useEffect(() => {
        setFocus("email")
    }, [setFocus]);


    return (<>
        {!isAuth ? <div>
            <div className="admin-page">
                <h1 className="admin-h1">Admin pagina</h1>
            </div>
            <div className="admin-sign-in-body">
                <div className="outer-container">
                    <div className="inner-container-admin">

                        <form
                            className="form-container-admin"
                            onSubmit={handleSubmit(adminLoginRequest)}>

                            <input
                                ref={userRef}
                                type="email"
                                autoComplete="off"
                                {...register("email", {
                                    required: "email is verplicht",
                                    pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                })}
                                placeholder="Emailadres"
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

                            {error &&
                                <p className="error-admin-login"> Combinatie van email-adres en wachtwoord is
                                    onjuist</p>}
                            {error2 &&
                                <p className="error-admin-login"> email-adres is onjuist</p>}
                            <SubmitButton disabled={loading} text="Inloggen"></SubmitButton>
                        </form>
                    </div>
                </div>
            </div>
        </div> : <span>
                    <h3> Inloggen succesvol!</h3>
                    <h5>Loading...<br/> U bent succesvol ingelogd<br/> en wordt automatisch doorgestuurd..</h5>
                    <p>Mocht u niet automatisch doorgestuurd worden<br/>
                        <NavLink to="/admin/profile">klik dan hier!</NavLink>
                    </p>
                </span>}
    </>);
}

export default AdminLogIn;