import './ItemInfo.css';

import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {BsFillCartDashFill, BsFillCartPlusFill} from "react-icons/bs";
import {CartState} from "../../../context/CartContext";
import {formatCurrency} from "../../../helpers/formatCurrency/FormatCurrency";
import {GiHeartMinus} from "react-icons/gi";
import {HiHeart} from "react-icons/hi";
import {WishlistState} from "../../../context/WishlistContext";


function ItemInfo({item}) {
    const [itemInfo, setItemInfo] = useState([]);
    const {state: {cart}, dispatch} = CartState();
    const {state: {wishlist}, dispatch2} = WishlistState();

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
                            <div className="hearts-container">
                                <div>
                                    {wishlist.some((p) => p.productId === itemInfo.productId) ?
                                        <div className="wishlist-heart">
                                            <GiHeartMinus size={19}
                                                          className="add-to-list-heart"
                                                          onClick={() => dispatch2({
                                                              type: "REMOVE_FROM_WISHLIST",
                                                              payload: itemInfo
                                                          })}/>
                                        </div>
                                        :
                                        <div className="wishlist-heart">
                                            <HiHeart size={22}
                                                     className="remove-from-list-heart"
                                                     onClick={() => dispatch2({
                                                         type: "ADD_TO_WISHLIST",
                                                         payload: itemInfo
                                                     })}/>
                                        </div>
                                    }
                                </div>
                            </div>
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
                                        type: "REMOVE_FROM_CART",
                                        payload: itemInfo
                                    })}>
                                        <p><BsFillCartDashFill/> &nbsp;Uit winkelwagen</p>
                                    </button>
                                    :
                                    <button onClick={() => dispatch({
                                        type: "ADD_TO_CART",
                                        payload: itemInfo
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