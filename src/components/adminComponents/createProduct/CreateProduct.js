import "./CreateProduct.css"

import React, {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import {NavLink} from "react-router-dom";
import {MdAddCircle} from "react-icons/md";
import {useForm} from "react-hook-form";


function CreateProduct() {
    const {user} = useContext(AuthContext);
    const [loading, toggleLoading] = useState(false);
    const [addSuccess, toggleAddSuccess] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            product_name: '', product_description: '', product_price: 10.00
        }
    });

    async function sendItemData(data) {
        toggleLoading(true);
        try {
            const response = await axios.post(`http://localhost:8080/products/create`, {
                productName: data.product_name,
                productDescription: data.product_description,
                productPrice: data.product_price,
            })
            console.log(response.data);
            toggleAddSuccess(true);
        } catch (e) {
            console.error(e, "er is iets misgegaan bij product maken");
        }
    }


    return (<>
        {user.roles !== "ROLE_ADMIN" ? <h3>Moet ingelogd zijn als Admin</h3> :
            <div className="ia-container" id="add_new_product">
                <h2>Product Toevoegen<MdAddCircle size={25}/></h2>
                <div className="add-item-container">
                    <p>Voeg hier je product:</p>
                    <p>Een product Id wordt automatisch gegenereerd, deze is terug te vinden in: Mijn producten
                    </p>
                    <p> Een afbeelding kan geupload worden in Mijn producten</p>
                </div>
                <div className="form-container">

                    <form
                        onSubmit={handleSubmit(sendItemData)}>
                        <input
                            type="text"
                            id="product_name"
                            placeholder="Product naam"
                            {...register("product_name", {
                                required: "product naam is verplicht", pattern: /^[a-z ,.'-]+$/i,
                            })}
                            autoComplete="off"
                        />
                        <p> {errors.product_name?.message} </p>


                        <textarea
                            type="text"
                            className="text-area-product"
                            id="product_description"
                            {...register("product_description", {
                                required: "product omschrijving is verplicht",
                            })}
                            rows={3}
                            cols={20}
                            placeholder="product omschrijving"
                            autoComplete="off"
                        />
                        <p>{errors.product_description?.message}</p>

                        <pre>Prijs in Euro...</pre>
                        <input
                            {...register("product_price", {
                                required: "product prijs is verplicht",
                            })}
                            placeholder="Product Prijs in €"
                            type="number"
                            id="product_price"
                            min="1"
                            step="0.10"
                            title="Currency"
                            lang="en-US"
                            autoComplete="off"
                        />
                        <p>{errors.product_price?.message}</p>

                        <div className="button-container">
                            <button
                                type="submit"
                                disabled={loading}
                            >
                                Voeg product toe
                            </button>
                            {addSuccess === true &&
                                <p>Gelukt met het creeren van een product. Ga naar mijn producten of
                                    <NavLink to="/admin">klik hier!</NavLink>
                                </p>}
                        </div>
                    </form>
                </div>
            </div>}
    </>)
}

export default CreateProduct;
