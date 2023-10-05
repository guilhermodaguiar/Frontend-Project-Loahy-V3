import './UserUpdate.css';

import React, {useContext, useState} from "react";
import axios from "axios";
import {BsFillPencilFill} from "react-icons/bs";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../../context/AuthContext";


function UserUpdate() {
    const token = localStorage.getItem('token');
    const [addSuccess, toggleAddSuccess] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const {user: {address_id}} = useContext(AuthContext);

    const {handleSubmit, formState: {errors}, register} = useForm({
        defaultValues: {
            street_Name: '', houseNumber: '', houseNumberAddition: '', zipcode: '', city: '', phoneNumber: ''
        }
    });


    async function handleUpdateUser(data) {
        toggleLoading(true);
        try {
            await axios.put(`http://localhost:8080/address/${address_id}`, {
                streetName: data.streetName,
                houseNumber: data.houseNumber,
                houseNumberAddition: data.houseNumberAddition,
                zipcode: data.zipcode,
                city: data.city,
                phoneNumber: data.phoneNumber,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
            toggleAddSuccess(true);
            setTimeout(() => {
                    refreshPage()
                }
                , 1500);
        } catch (e) {
            console.error(e);
        }
    }

    function refreshPage() {
        window.location.reload();
    }

    return (<>
        <article id="user_update">
            <form
                className="form-container-register"
                onSubmit={handleSubmit(handleUpdateUser)}>

                <input
                    type="text"
                    id="street-name"
                    {...register("streetName", {
                        required: "straat is verplicht"
                    })}
                    autoComplete="off"
                    placeholder="Straatnaam"
                />
                <p>{errors.streetName?.message}</p>

                <input
                    type="text"
                    id="house-number"
                    autoComplete="off"
                    {...register("houseNumber", {
                        required: "huisnummer is verplicht", pattern: /^\d+$/,
                    })}
                    placeholder="Huisnr"
                />
                <p>{errors.houseNumber?.message}</p>

                <input
                    type="text"
                    id="house-number-add"
                    autoComplete="off"
                    {...register("houseNumberAddition", {
                        required: false,
                    })}
                    placeholder="Toevoeging"
                />
                <p>{errors.houseNumberAddition?.message}</p>

                <input
                    type="text"
                    id="zipcode"
                    autoComplete="off"
                    {...register("zipcode", {
                        required: "Postcode is verplicht", pattern: /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i
                    })}
                    placeholder="Postcode"
                />
                <p>{errors.zipcode?.message}</p>

                <input
                    type="text"
                    id="city"
                    autoComplete="off"
                    {...register("city", {
                        required: "stad is verplicht"
                    })}
                    placeholder="Stad"
                />
                <p>{errors.city?.message}</p>

                <input
                    type="tel"
                    id="phone-number"
                    autoComplete="off"
                    {...register("phoneNumber", {
                        required: "mobiel nummer is verplicht",
                        pattern: /^\(?([+]31|0031|0)-?6(\s?|-)([0-9]\s{0,3}){8}$/
                    })}
                    placeholder="mobiel"
                />
                <p>{errors.phoneNumber?.message}</p>


                <button
                    type="submit"
                    disabled={loading}
                    className="form-button"
                >
                    <BsFillPencilFill/> Wijzigen
                </button>
                {addSuccess === true && <p>Update is gelukt!</p>}
            </form>
        </article>
    </>)
}

export default UserUpdate;