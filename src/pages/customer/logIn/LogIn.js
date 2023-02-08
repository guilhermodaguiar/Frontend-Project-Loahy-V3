import './LogIn.css';

import React, {useContext, useState} from "react";
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../../../context/AuthContext";
import axios from "axios";
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {FormContext} from "../../../context/FormContext";

function LogIn() {
    const history = useHistory();
    const {login, isAuth} = useContext(AuthContext);

    const {register, errors, handleSubmit} = useContext(FormContext);

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
                    <>
                        //hier komt email en wachtwoord als inputveld

                    </>
                )
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
    )
}


export default LogIn;
