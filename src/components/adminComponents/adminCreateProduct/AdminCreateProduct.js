import "./AdminCreateProduct.css"

import React, {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import {useHistory} from "react-router-dom";
import {MdAddCircle} from "react-icons/md";
import {IoIosAddCircle} from "react-icons/io";


function AdminCreateProduct() {
    const history = useHistory();
    const {user} = useContext(AuthContext);
    const [loading, toggleLoading] = useState(false);

    const [productName, setProductName] = useState('');
    const [productInfo, setProductInfo] = useState('');
    const [productPrice, setProductPrice] = useState();


//POST Product
    async function sendItemData() {
        toggleLoading(true);
        try {
            const response = await axios.post(`http://localhost:8080/products/create`,
                {
                    productName: productName,
                    productInformation: productInfo,
                    productPrice: productPrice,
                }).then(addedNewProduct);
            console.log(response.data);

        } catch (e) {
            console.error(e, "er is iets misgegaan");
        }
    }

    function addedNewProduct() {
        history.push('/admin/profile/#admin_product_overview');
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
                <div className="item-add-container" id="admin_add_new_product">
                    <h2>Product Toevoegen<MdAddCircle size={25}/></h2>
                    <div className="add-item-container">
                        <p>Voeg hier je product:</p>
                        <p>Een product Id wordt automatisch gegenereerd, deze is terug te vinden in: Mijn producten
                        </p>
                        <p> Een afbeelding kan geupload worden in Mijn producten</p>
                    </div>
                    <div className="form-container">
                        <form className="update-item-form-"
                              onSubmit={sendItemData}>
                            <label className="label-container" htmlFor="itemName-field">
                                Product Naam
                                <input
                                    type="text"
                                    id="itemName-field"
                                    name="name"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </label>
                            <label className="label-container" htmlFor="itemDescription-field">
                                product Informatie
                                <textarea
                                    id="itemDescription-field"
                                    name="description"
                                    value={productInfo}
                                    onChange={(e) => setProductInfo(e.target.value)}
                                    rows={4}
                                    cols={50}
                                    placeholder="max 250 karakters"
                                    maxLength="150"
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
                                    onChange={(e) => setProductPrice(e.target.value)}
                                />
                            </label>
                            <div className="button-container">
                                <button
                                    type="submit"
                                    className="form-create-product-button"
                                    disabled={loading}
                                >
                                    <IoIosAddCircle/> Voeg producten toe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>)
            }
        </>
    )
}

export default AdminCreateProduct;
