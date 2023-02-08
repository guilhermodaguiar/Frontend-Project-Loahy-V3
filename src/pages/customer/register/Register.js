import "./Register.css";

import React, {useContext, useState} from "react";
import axios from "axios";
import {Icon} from "react-icons-kit";
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {FormContext} from "../../../context/FormContext";


function Register() {
    const [success, toggleSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const{errors, handleSubmit, register} = useContext(FormContext);



    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password');
        }
    }


    async function submitForm(data) {
        try {
            const response = await axios.post(`http://localhost:8080/users/create`, {
                data
            })
            console.log(data)


        } catch (e) {
            console.error(e, "er is iets misgegaan met het registreren")
        }

    }


    return (
        <div className="Form">
            <div className="title">Sign Up</div>
            <div className="inputs">
                <form onSubmit={handleSubmit(submitForm)}>

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name..."
                        ref={register}
                        autoComplete="off"
                    />
                    <p> {errors.lastName?.message} </p>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email..."
                        ref={register}
                        autoComplete="off"
                    />
                    <p> {errors.email?.message} </p>
                    <input type="text" name="age" placeholder="Age..." ref={register}/>
                    <p> {errors.age?.message} </p>
                    <input
                        type={type}
                        name="password"
                        placeholder="Password..."
                        ref={register}
                        autoComplete="off"
                    />
                    <span className="show-hide-password" onClick={handleToggle}><Icon
                        icon={icon} size={25}/>
                    </span>
                    <p> {errors.password?.message} </p>
                    <input
                        type={type}
                        name="confirmPassword"
                        placeholder="Confirm Password..."
                        ref={register}
                        autoComplete="off"
                    />
                    <span className="show-hide-password" onClick={handleToggle}><Icon
                        icon={icon} size={25}/>
                    </span>
                    <p> {errors.confirmPassword && "Passwords Should Match!"} </p>
                    <input type="submit" id="submit"/>
                </form>
            </div>
        </div>
    )
}

export default Register;