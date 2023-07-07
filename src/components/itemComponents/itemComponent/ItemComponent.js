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

    return (<div className="main-container-product">
        <div className="border-effect-container">
            <div className="random-robot-container">
                <div className="info-item-marker" onClick={() => redirectToItemInform(item)}>
                    <FaInfoCircle/>
                </div>
                <div className="hearts-container">
                    <div>
                        {wishlist.some((p) => p.productId === item.productId) ?
                            <ToWishlistButton onClick={() => {
                                dispatch2({
                                    type: "REMOVE_FROM_WISHLIST", payload: {item}});
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
                    </div>
                </div>

                <div>
                    <GetImage alt={item.image.fileName}
                         src={item.image.url}
                    />
                </div>
            </div>
            <div className="product-details">
                <strong className="product-name">
                    {item.productName}
                </strong>
                <div className="product-information">
                    {item.productDescription}
                </div>
                <div>
                    <p>{formatCurrency(item.productPrice)}</p>
                </div>
                <div>
                    {cart.some((p) => p.productId === item.productId) ?
                        <FromCartButton onClick={() => dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: item
                        })}/>
                        :
                        <ToCartButton onClick={() => dispatch({
                            type: "ADD_TO_CART", payload: item
                        })}/>}
                </div>
            </div>
        </div>
    </div>)
}

export default ItemComponent;