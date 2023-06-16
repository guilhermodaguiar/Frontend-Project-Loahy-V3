import "./UserChangePassword.css";

import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import {BsFillPencilFill} from "react-icons/bs";
import {useForm} from "react-hook-form";


function UserChangePassword() {
    const {user} = useContext(AuthContext);
    const history = useHistory();
    const {handleSubmit, formState: {errors}, register, getValues} = useForm({
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    });

    const [loading, toggleLoading] = useState(false);

    async function updatePassword(data) {
        toggleLoading(false);

        try {
            const response = await axios.put(`http://localhost:8080/users/${user.user_email}`, {
                data
            }).then(savedPassword);
            console.log(response.data);
        } catch (e) {
            console.error(e)
        }
    }

    function savedPassword() {
        history.push('/user/profile/#profile')
    }

    return (
        <>
            <div className="change-password-inner-container">
                <form
                    className="form-container-update"
                    onSubmit={handleSubmit(updatePassword)}>

                    <div className="password-container">
                        <input
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
                        <p> {errors.password?.message} </p>

                    </div>

                    <input
                        type="email"
                        autoComplete="off"
                        {...register("confirmPassword", {
                            required: "herhaal wachtwoord",
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
                        className="form-button"
                        disabled={loading}
                    >
                        <BsFillPencilFill/>&nbsp; Wijzigen
                    </button>
                </form>
            </div>
        </>
    )
}

export default UserChangePassword;