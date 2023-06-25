import "./AdminLogIn.css";

import React, {useContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {AuthContext} from "../../context/AuthContext";
import {NavLink, useHistory} from "react-router-dom";
import {RiLoginCircleFill} from "react-icons/ri";
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {useForm} from "react-hook-form";
import {Icon} from "react-icons-kit";


function AdminLogIn() {
    const {login, isAuth} = useContext(AuthContext);
    const history = useHistory();
    const {handleSubmit, formState: {errors}, register, setFocus} = useForm({
        defaultValues: {
            userEmail: '', password: ''
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


    async function adminLoginRequest(data, e) {
        e.preventDefault();
        toggleLoading(false);

        try {
            const response = await axios.post(`http://localhost:8080/authenticate`, {
                userEmail: data.userEmail, password: data.password
            })
            login(response.data.jwt);
            setTimeout(() => {
                history.push("/admin/profile");
            }, 500)

        } catch (e) {
            console.error("Er is iets misgegaan met het inloggen van Admin!!", e);
        }
    }


    useEffect(() => {
        setFocus("email")
    }, [setFocus]);


    return (
        <>
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


                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="form-button-login"
                                    >
                                        <RiLoginCircleFill/>&nbsp;Inloggen
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> :
                <span>
                    <h3> Inloggen succesvol!</h3>
                    <h5>Loading...<br/> U bent succesvol ingelogd<br/> en wordt automatisch doorgestuurd..</h5>
                    <p>Mocht u niet automatisch doorgestuurd worden<br/>
                        <NavLink to="/admin/profile">klik dan hier!</NavLink>
                    </p>
                </span>
            }
        </>
    );
}

export default AdminLogIn;