import './ItemInfo.css';

import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {CartState} from "../../../context/CartContext";
import {formatCurrency} from "../../../helpers/formatCurrency/FormatCurrency";
import {WishlistState} from "../../../context/WishlistContext";
import ClickToShop from "../../ClickComponents/ClickToShop";
import {AuthContext} from "../../../context/AuthContext";
import NavBar from "../../../layout/navBar/NavBar";
import FromCartButton from "../../buttonComponents/cartButton/FromCartButton";
import ToCartButton from "../../buttonComponents/cartButton/ToCartButton";
import ToWishlistButton from "../../buttonComponents/wishlistButton/ToWishlistButton";
import FromWishlistButton from "../../buttonComponents/wishlistButton/FromWishlistButton";
import GetImage from "../../imageComponent/GetImage";

function ItemInfo() {
    const [itemInfo, setItemInfo] = useState([]);
    const {state: {cart}, dispatch} = CartState();
    const {state2: {wishlist}, dispatch2} = WishlistState();
    const {user, isAuth} = useContext(AuthContext);

    const {item_id} = useParams();

    useEffect(() => {
        const controller = new AbortController();

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
        return function cleanup() {
            controller.abort();
        }

    }, [item_id]);


    return (<>
        <div>
            <NavBar/>
        </div>
        <div className="background-item-info">
            {itemInfo.image ? <section>
                <div className="item-info-container">
                    <section className="hearts-container">
                        <div>
                            {wishlist.some((p) => p.productId === itemInfo.productId) ?
                                <ToWishlistButton onClick={() => {
                                    dispatch2({
                                        type: "REMOVE_FROM_WISHLIST", payload: {item: itemInfo}
                                    });
                                    dispatch2({
                                        type: "DELETE_FROM_WISHLIST_BACKEND", payload: {
                                            item: itemInfo,
                                            wishlist_id: user.wishlist_id,
                                            isAuth: isAuth,
                                        }
                                    });
                                }}/>
                                :
                                <FromWishlistButton onClick={() => {
                                    dispatch2({
                                        type: "ADD_TO_WISHLIST", payload: {item: itemInfo}
                                    })
                                    dispatch2({
                                        type: "SEND_TO_WISHLIST_BACKEND",
                                        payload: {item: itemInfo, wishlist_id: user.wishlist_id}
                                    })
                                }}/>
                            }
                        </div>
                    </section>
                    <section>
                        <GetImage alt={itemInfo.image.fileName}
                                  src={itemInfo.image.url}
                                  className="item-image"
                        />
                    </section>
                    <div className="item-details">
                        <strong className="product-name">
                            {itemInfo.productName}
                        </strong>
                        <div className="product-information">
                            {itemInfo.productDescription}
                        </div>
                        <div>
                            <p>{formatCurrency(itemInfo.productPrice)}</p>
                        </div>
                        {cart.some((p) => p.productId === itemInfo.productId) ?

                            <FromCartButton onClick={() => dispatch({
                                type: "REMOVE_FROM_CART", payload: itemInfo
                            })}/>

                            :

                            <ToCartButton onClick={() => dispatch({
                                type: "ADD_TO_CART", payload: itemInfo
                            })}/>}

                    </div>
                </div>
                <div className="c2s-container">
                    <ClickToShop/>
                </div>
            </section> : <section className="product-info-container">
                <div className="main-container-product">
                    <div className="border-effect-container">
                        <div className="product-details">
                            <strong className="product-name">
                                {itemInfo.productName}
                            </strong>
                            <div className="product-information">
                                {itemInfo.productDescription}
                            </div>
                            <div>
                                <p>{formatCurrency(itemInfo.productPrice)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>}
        </div>
    </>);
}

export default ItemInfo;