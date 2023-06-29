import "./ProductOverview.css";

import React, {useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import {IoCloseSharp} from "react-icons/io5";
import {FaProductHunt} from "react-icons/fa";
import UploadImage from "../uploadImage/UploadImage";
import {ItemsState} from "../../../context/ItemsContext";

function ProductOverview() {
    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const {state4: {items}} = ItemsState();


    async function deleteItem(productId) {
        try {
            await axios.delete(`http://localhost:8080/products/delete/${productId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                })
        } catch (e) {
            console.error(e, 'er is iets misgegaan')
        }
    }


    return (
        <>
            {user.roles !== "ROLE_ADMIN" ?
                <h3>Moet ingelogd zijn als Admin</h3>
                :
                <>
                    <div id="product_overview">
                        <h2 className="my-products-container">
                            Mijn Producten&nbsp;<FaProductHunt/>
                        </h2>
                        <table>
                            <thead>
                            <tr>
                                <th></th>
                                <th>Product nummer</th>
                                <th>Afbeelding</th>
                                <th>Naam</th>
                                <th>Informatie</th>
                                <th>Prijs in €</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items.map((product) => {
                                return <tr key={product.productId}>
                                    <td>
                                        <button className="remove-from-cart-button">
                                            <IoCloseSharp
                                                size={20}
                                                onClick={() => {
                                                    deleteItem(product.productId).then();

                                                }}/>
                                        </button>
                                    </td>
                                    <td>{product.productId}</td>
                                    <td>
                                        {product.image ?
                                            <img className="admin-item-image"
                                                 src={product.image.url}
                                                 alt={product.fileName}/>
                                            :
                                            <div>
                                                <UploadImage
                                                    key={product.productId}
                                                    product={product}
                                                />
                                            </div>
                                        }
                                    </td>
                                    <td>{product.productName}</td>
                                    <td>{product.productDescription}</td>
                                    <td>{product.productPrice}</td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>
                </>
            }
        </>
    )
}

export default ProductOverview;