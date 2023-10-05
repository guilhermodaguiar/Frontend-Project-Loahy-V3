import './ItemComponent.css';

import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import {FaInfoCircle} from "react-icons/fa";
import {CartState} from "../../../context/CartContext";
import {formatCurrency} from "../../../helpers/formatCurrency/FormatCurrency";
import {WishlistState} from "../../../context/WishlistContext";
import {AuthContext} from "../../../context/AuthContext";
import ToCartButton from "../../buttonComponents/cartButton/ToCartButton";
import FromCartButton from "../../buttonComponents/cartButton/FromCartButton";
import ToWishlistButton from "../../buttonComponents/wishlistButton/ToWishlistButton";
import FromWishlistButton from "../../buttonComponents/wishlistButton/FromWishlistButton";
import GetImage from "../../imageComponent/GetImage";


function ItemComponent({item}) {
    const history = useHistory();
    const {state: {cart}, dispatch} = CartState();
    const {state2: {wishlist}, dispatch2} = WishlistState();
    const {user, isAuth} = useContext(AuthContext);

    function redirectToItemInform(item) {
        history.push(`items/${item.productId}`)
    }

    return (
        <main className="border-container">
            <article className="r-container">
                <section className="info-item-marker" onClick={() => redirectToItemInform(item)}>
                    <FaInfoCircle/>
                </section>
                <section className="hearts-container">
                    {wishlist.some((p) => p.productId === item.productId) ?
                        <ToWishlistButton onClick={() => {
                            dispatch2({
                                type: "REMOVE_FROM_WISHLIST", payload: {item}
                            });
                            dispatch2({
                                type: "DELETE_FROM_WISHLIST_BACKEND",
                                payload: {
                                    item: item,
                                    wishlist_id: user.wishlist_id,
                                    isAuth: isAuth
                                }
                            });
                        }}/>
                        :
                        <FromWishlistButton onClick={() => {
                            dispatch2({
                                type: "ADD_TO_WISHLIST", payload: {item}
                            })
                            dispatch2({
                                type: "SEND_TO_WISHLIST_BACKEND",
                                payload: {item: item, wishlist_id: user.wishlist_id}
                            })
                        }}/>
                    }
                </section>
                <section>
                    <GetImage alt={item.image.fileName}
                              src={item.image.url}
                    />
                </section>
            </article>

            <article className="product-details">
                <strong className="product-name">
                    {item.productName}
                </strong>
                <section className="product-information">
                    {item.productDescription}
                </section>
                <section>
                    <p>{formatCurrency(item.productPrice)}</p>
                </section>
                <section>
                    {cart.some((p) => p.productId === item.productId) ?
                        <FromCartButton onClick={() => dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: item
                        })}/>
                        :
                        <ToCartButton onClick={() => dispatch({
                            type: "ADD_TO_CART", payload: item
                        })}/>}
                </section>
            </article>
        </main>
    )
}

export default ItemComponent;