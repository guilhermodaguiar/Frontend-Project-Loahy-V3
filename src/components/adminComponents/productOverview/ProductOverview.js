import "./ProductOverview.css";

import React, {useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import {FaProductHunt} from "react-icons/fa";
import UploadImage from "../uploadImage/UploadImage";
import {ItemsState} from "../../../context/ItemsContext";
import RemoveButton from "../../buttonComponents/removeButton/RemoveButton";
import GetImage from "../../imageComponent/GetImage";


function ProductOverview() {
    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const {state4: {items}, dispatch4} = ItemsState();
    const controller = new AbortController();


    async function deleteItem(product) {
        try {
            await axios.delete(`http://localhost:8080/products/${product.productId}`, {
                headers: {
                    "Content-Type": "application/json", "Authorization": `Bearer ${token}`,
                }
            })
        } catch (e) {
            console.error(e, 'er is iets misgegaan met het verwijderen')
        }
    }

    async function downloadImage(product) {
        try {
            await axios.get(`http://localhost:8080/images/download/${product.image.fileName}`, {
                    headers: {
                        "Content-Type": "image/jpg", "Authorization": `Bearer ${token}`,
                    },
                    responseType: 'blob',
                    onDownloadProgress: function (progressEvent) {
                        console.log(((progressEvent.loaded / progressEvent.total) * 100).toFixed() + "%");
                    }
                }
            ).then((object) => {
                const blobUrl = URL.createObjectURL(object.data);
                const aTag = document.createElement('a');
                const fileName = blobUrl.split('/').pop();
                aTag.setAttribute('download', fileName);
                aTag.href = blobUrl
                aTag.download = 'download'
                document.body.appendChild(aTag);
                aTag.click();
                aTag.remove()
            });
        } catch (e) {
            console.error(e, 'er is iets misgegaan met het download van image');
        }
    }


    return (<>
        {user.roles !== "ROLE_ADMIN" ? <h3>Moet ingelogd zijn als Admin</h3> : <>
            <div id="product_overview">
                <h2 className="products-container">
                    Mijn Producten&nbsp;<FaProductHunt/>
                </h2>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Productnummer</th>
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
                                <RemoveButton onClick={() => {
                                    deleteItem(product).then();
                                    dispatch4({
                                        type: "REMOVE_ITEMS",
                                        payload: {item: product}
                                    })
                                }}/>
                            </td>
                            <td>{product.productId}</td>
                            <td>
                                {product.image ?
                                    <div>
                                        <GetImage className="admin-item-image"
                                                  src={product.image.url}
                                                  alt={product.fileName}
                                        />
                                    </div> :
                                    <div>
                                        <UploadImage
                                            key={product.productId}
                                            product={product}
                                        />
                                    </div>}
                                <button
                                    className="download-image"
                                    onClick={() => {
                                        downloadImage(product).then();
                                    }}>
                                    download image
                                </button>
                            </td>
                            <td>{product.productName}</td>
                            <td>{product.productDescription}</td>
                            <td>{product.productPrice}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        </>}
    </>)
}

export default ProductOverview;