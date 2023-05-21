import './ItemInfo.css';

import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {BsFillCartDashFill, BsFillCartPlusFill} from "react-icons/bs";
import {CartState} from "../../../context/CartContext";
import {formatCurrency} from "../../../helpers/formatCurrency/FormatCurrency";


function ItemInfo({item}) {
    const [itemInfo, setItemInfo] = useState([]);
    const {state: {cart}, dispatch} = CartState();

    const {item_id} = useParams();

    useEffect(() => {
        async function fetchItemInfo() {
            try {
                const itemData = await axios.get(`http://localhost:8080/products/${item_id}`);
                console.log(itemData.data);
                setItemInfo(itemData.data);

            } catch (e) {
                console.error('er is iets misgegaan met het ophalen van item data', e);
            }
        }

        fetchItemInfo();
    }, [item_id]);


    return (
        <>
            <div className="background-item-info">
                {itemInfo.image ?
                    <section>
                        <div className="item-info-container">
                            <div>
                                <img alt={itemInfo.image.fileName}
                                     src={itemInfo.image.url}
                                     className="item-image"
                                />
                            </div>
                            <div className="item-details">
                                <strong className="product-name">
                                    {itemInfo.productName}
                                </strong>
                                <div className="product-information">
                                    {itemInfo.productInformation}
                                </div>
                                <div>
                                    <p>{formatCurrency(itemInfo.productPrice)}</p>
                                </div>
                                {cart.some((p) => p.productId === itemInfo.productId) ?
                                    <button onClick={() => dispatch({
                                        type: "REMOVE_FROM_CART3",
                                        payload: item
                                    })}>
                                        <p><BsFillCartDashFill/> &nbsp;Uit winkelwagen</p>
                                    </button>
                                    :
                                    <button onClick={() => dispatch({
                                        type: "ADD_TO_CART3",
                                        payload: item
                                    })}>
                                        <p><BsFillCartPlusFill/> &nbsp;In winkelwagen</p>
                                    </button>
                                }
                            </div>
                        </div>
                    </section>
                    :
                    <section className="product-info-container">
                        <div className="main-container-product">
                            <div className="border-effect-container">
                                <div className="product-details">
                                    <strong className="product-name">
                                        {itemInfo.productName}
                                    </strong>
                                    <div className="product-information">
                                        {itemInfo.productInformation}
                                    </div>
                                    <div>
                                        <p>{formatCurrency(itemInfo.productPrice)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                }
            </div>
        </>
    );
}

export default ItemInfo;