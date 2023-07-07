import "./UpdateProduct.css"

import React, {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {RiErrorWarningLine} from "react-icons/ri";
import {useForm} from "react-hook-form";


function UpdateProduct() {
    const token = localStorage.getItem('token');
    const {user} = useContext(AuthContext);
    const [loading, toggleLoading] = useState(false);
    const [addSuccess, toggleAddSuccess] = useState(false);


    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        defaultValues: {
            product_id: '', product_name: '', product_description: '', product_price: 10.00
        }
    });

    async function updateItemData(data) {
        toggleLoading(true);
        try {
            await axios.put(`http://localhost:8080/products/${data.productId}`, {
                productId: data.product_id,
                productName: data.product_name,
                productDescription: data.product_description,
                productPrice: data.product_price
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                }
            })
            toggleAddSuccess(true);
            reset();
        } catch (e) {
            console.error(e);
        }
    }


    return (<>
            {user.roles !== "ROLE_ADMIN" ? <h3>Moet ingelogd zijn als Admin</h3> :
                <div className="iu-container" id="update_product">
                    <h2 className="uih-container">
                        Product Aanpassen
                    </h2>
                    <section className="ui-container">
                        <p>Pas hier je product</p>
                        <RiErrorWarningLine size={25}/>
                        <p>Alle velden moeten verplicht ingevuld worden!! </p>
                    </section>
                    <section>
                        <form
                            onSubmit={handleSubmit(updateItemData)}>
                            <input
                                type="text"
                                id="product_id"
                                {...register("product_id", {
                                    required: "Product nummer is verplicht",
                                })}
                                placeholder="product nummer"
                                autoComplete="off"
                            />
                            <p> {errors.product_id?.message}</p>
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
                                <button type="submit"
                                        disabled={loading}
                                >
                                    Product bijwerken
                                </button>
                            </div>
                            {addSuccess === true && <p>Gelukt met het creeren van een product. Ga naar mijn producten of
                                <NavLink to="/admin">klik hier!</NavLink>
                            </p>}
                        </form>
                    </section>
                </div>}
        </>)
}

export default UpdateProduct;