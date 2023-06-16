import './UserUpdate.css';

import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {BsFillPencilFill} from "react-icons/bs";
import {useForm} from "react-hook-form";


function UserUpdate() {
    const history = useHistory();
    const token = localStorage.getItem('token');
    const [addSuccess, toggleAddSuccess] = useState(false);

    const {handleSubmit, formState: {errors}, register} = useForm({
        defaultValues: {
            streetName: "",
            houseNumber: "",
            houseNumberAddition: "",
            zipcode: "",
            city: "",
            phoneNumber: "",
        }
    });


    async function handleUpdateUser(data, id) {
        try {
            await axios.put(`http://localhost:8080/users/${id}`,
                {
                    streetName: data.streetName,
                    houseNumber: data.houseNumber,
                    houseNumberAddition: data.houseNumberAddition,
                    zipcode: data.zipcode,
                    city: data.city,
                    phoneNumber: data.phoneNumber,
                },{
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }).then(toggleAddSuccess(true)).then(updatedUser);
        } catch (e) {
            console.error(e);
        }
    }

    function updatedUser() {
        history.push('/user/profile/#profile')
    }


    return (
        <>
            <div>
                <form
                    className="form-container-register"
                    onSubmit={handleSubmit(handleUpdateUser)}>

                    <section className="street-name">
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
                    </section>

                    <section className="house-number">
                        <input
                            type="text"
                            id="house-number"
                            autoComplete="off"
                            {...register("houseNumber", {
                                required: "huisnummer is verplicht",
                                pattern: /^\d+$/,
                            })}
                            placeholder="Huisnr"
                        />
                        <p>{errors.houseNumber?.message}</p>
                    </section>

                    <section className="additional">
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
                    </section>

                    <section className="zipcode">
                        <input
                            type="text"
                            id="zipcode"
                            autoComplete="off"
                            {...register("zipcode", {
                                required: "Postcode is verplicht",
                                pattern: /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i
                            })}
                            placeholder="Postcode"
                        />
                        <p>{errors.zipcode?.message}</p>
                    </section>

                    <section className="city">
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
                    </section>

                    <section className="phoneNumber">
                        <input
                            type="tel"
                            id="phone-number"
                            autoComplete="off"
                            {...register("phone", {
                                required: "mobiel nummer is verplicht",
                                pattern: /^\(?([+]31|0031|0)-?6(\s?|-)([0-9]\s{0,3}){8}$/
                            })}
                            placeholder="Telefoonnummer"
                        />
                        <p>{errors.phoneNumber?.message}</p>
                    </section>

                    <button
                        type="submit"
                        className="form-button"
                    >
                        <BsFillPencilFill/>&nbsp; Wijzigen
                    </button>
                    {addSuccess === true &&
                        <p>Update is gelukt!</p>
                    }
                </form>
            </div>
        </>
    )
}

export default UserUpdate;