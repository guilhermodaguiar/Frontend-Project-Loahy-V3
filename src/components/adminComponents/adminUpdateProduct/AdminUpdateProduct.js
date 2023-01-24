import "./AdminUpdateProduct.css"

import React, {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {RiErrorWarningLine} from "react-icons/ri";
import {GrUpdate} from "react-icons/gr";

function AdminUpdateProduct() {
    const {user} = useContext(AuthContext);
    const history = useHistory();

    const [productNumber, setProductNumber] = useState()
    const [productName, setProductName] = useState('');
    const [productInfo, setProductInfo] = useState('');
    const [productPrice, setProductPrice] = useState();


    async function sendItemData(id) {
        try {
            await axios.put(`http://localhost:8080/products/update/${id}`,
                {
                    productId: productNumber,
                    productName: productName,
                    productInformation: productInfo,
                    productPrice: productPrice,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            ).then(addedNewProduct)

        } catch (e) {
            console.error(e);
        }
    }

    function addedNewProduct() {
        history.push('/')
    }

    return (
        <>
            {user.roles !== "ROLE_ADMIN" ? (
                <div className="admin-route-container">
                    <div className="admin-route">
                        <h1>U moet ingelogd zijn als
                            <br/> ADMINISTRATOR
                            <br/>om deze content te mogen zien..
                        </h1>
                    </div>
                </div>
            ) : (
                <div className="item-update-container" id="admin_update_product">
                    <h2 className="update-item-header-container">
                        Product Aanpassen
                    </h2>
                    <div className="update-item-container">
                        <p>Pas hier je product</p>
                        <RiErrorWarningLine/>
                        <p>Alle velden moeten verplicht ingevuld worden!! </p>
                        <p>Vul het Product nummer Product nummer vindt je in Mijn
                            producten(link) </p>
                    </div>
                    <div className="form-update-container">
                        <form className="update-item-form"
                              onSubmit={sendItemData}>
                            <label className="label-container" htmlFor="itemName-field">
                                Product Nummer
                                <input
                                    type="number"
                                    id="itemName-field"
                                    placeholder="voorbeeld 1010"
                                    name="name"
                                    value={productNumber}
                                    onChange={(e) => setProductNumber(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="label-container" htmlFor="itemName-field">
                                Product Naam
                                <input
                                    type="text"
                                    id="itemName-field"
                                    name="name"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="label-container" htmlFor="itemDescription-field">
                                product Informatie
                                <textarea
                                    id="itemDescription-field"
                                    name="description"
                                    value={productInfo}
                                    onChange={(e) => setProductInfo(e.target.value)}
                                    rows={3}
                                    cols={20}
                                    required
                                />
                            </label>
                            <label className="label-container" htmlFor="itemPrice-field">
                                Product Prijs in €
                                <input
                                    placeholder="verander komma naar punt 0.00"
                                    type="number"
                                    id="itemPrice-field"
                                    required name="price"
                                    min="0"
                                    step="0.01"
                                    title="Currency"
                                    value={productPrice}
                                    lang="en-US"
                                    onChange={(e) => setProductPrice(e.target.value)}
                                />
                            </label>
                            <div className="button-container">
                                <button
                                    type="submit"
                                    className="form-update-product-button"
                                >
                                    Product bijwerken
                                </button>
                            </div>
                        </form>
                    </div>
                </div>)
            }
        </>
    )
}

export default AdminUpdateProduct;