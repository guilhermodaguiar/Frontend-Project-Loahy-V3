import "./Register.css";

import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {RiLoginCircleFill} from "react-icons/ri";
import axios from "axios";
import {SiProbot} from "react-icons/si";


function Register() {
    const {
        register, getValues,
        handleSubmit, formState: {errors}
    } = useForm({
        defaultValues: {
            firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
        }
    });

    const [success, toggleSuccess] = useState(false);

    async function submitForm(data) {
        try {
            await axios.post(`http://localhost:8080/users`, {
                firstName: data.firstName, lastName: data.lastName, email: data.email, password: data.password,
            });
            toggleSuccess(true);
        } catch (e) {
            console.error(e, "er is iets misgegaan met het registreren")
        }
    }


    return (<>
        {success ?
            <section className="register-success">
                <h3>
                    <SiProbot size={25}/> gelukt! je kan nu inloggen
                </h3>
            </section> :
            <section>
                <h3 className="register-field-note">
                    Registreren
                </h3>
                <form
                    className="form-container-register"
                    onSubmit={handleSubmit(submitForm)}
                >
                    <input
                        type="text"
                        {...register("firstName", {
                            required: "Naam is verplicht", pattern: /^[a-z ,.'-]+$/i,
                        })}
                        autoComplete="off"
                        placeholder="Naam"
                    />
                    <p> {errors.firstName?.message} </p>

                    <input
                        type="text"
                        autoComplete="off"
                        {...register("lastName", {
                            required: "Achternaam is verplicht", pattern: /^[a-z ,.'-]+$/i,
                        })}
                        placeholder="Achternaam"
                    />
                    <p> {errors.lastName?.message} </p>

                    <input
                        name="email"
                        type="email"
                        autoComplete="off"
                        {...register("email", {
                            required: "email is verplicht",
                            pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                        placeholder="E-mailadres"
                    />
                    <p> {errors.email?.message} </p>

                    <input
                        name="password"
                        type="password"
                        autoComplete="off"
                        {...register("password", {
                            required: 'wachtwoord is verplicht',
                            minLength: {value: 8, message: 'Minimaal 8 karakters nodig'},
                            maxLength: {value: 15, message: "Maximaal 15 karakters nodig"},
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,15}$/
                        })}
                        placeholder="Wachtwoord"
                    />
                    <p> {errors.email?.message} </p>

                    <input
                        type="password"
                        autoComplete="off"
                        {...register("confirmPassword", {
                            required: 'wachtwoord is verplicht',
                            minLength: {value: 8, message: 'Minimaal 8 karakters nodig'},
                            maxLength: {value: 15, message: "Maximaal 15 karakters nodig"},
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,15}$/,
                            validate: (value) => {
                                const {password} = getValues();
                                return password === value || "wachtwoorden moeten overeenkomen!"
                            }
                        })}
                        placeholder="Herhaal wachtwoord"
                    />
                    <p> {errors.confirmPassword?.message} </p>

                    <button
                        type="submit"
                        className="form-button-login"
                    >
                        <RiLoginCircleFill/>&nbsp;Registreren
                    </button>
                </form>
            </section>}
    </>)
}

export default Register;





