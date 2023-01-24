import './ShopItem.css';

import React from "react";
import {BsFillCartDashFill, BsFillCartPlusFill} from "react-icons/bs";
import {formatCurrency} from "../../helpers/formatCurrency/FormatCurrency";
import {HiHeart} from "react-icons/hi";
import {useDispatchWishlist, useWishlist} from "../../context/WishlistContext";
import {useCart, useDispatchCart} from "../../context/CartContext";
import {GiHeartMinus} from "react-icons/gi";

function ShopItem({item}) {
    const dispatch3 = useDispatchWishlist();
    const dispatch = useDispatchCart();
    const cartItems = useCart();
    const wishlistItems = useWishlist();

    const addToWishlist = (item) => {
        dispatch3({
            type: "ADD_TO_WISHLIST",
            item
        })
    }

    const removeFromWishlist = ({item}) => {
        dispatch3({
            type: "REMOVE_FROM_WISHLIST",
            item
        })
    }

    const addToCart = (item) => {
        dispatch({
            type: "ADD_TO_CART",
            item,
        })
    }

    const removeFromCart = (item) => {
        dispatch({
            type: "REMOVE_FROM_CART",
            item,
        })
    }

    return (
        <>
            <div className="main-container-product">
                <div className="border-effect-container">
                    <div className="random-robot-container">
                        <div className="hearts-container">
                            {wishlistItems.some((p) => p.productId === item.productId) ? (
                                <div className="wishlist-heart">
                                    <GiHeartMinus size={19}
                                                  className="add-to-list-heart"
                                                  onClick={() => removeFromWishlist(item)}/>
                                </div>
                            ) : (
                                <div className="wishlist-heart">
                                    <HiHeart size={22}
                                             className="remove-from-list-heart"
                                             onClick={() => addToWishlist(item)}/>
                                </div>
                            )}

                        </div>
                        <div>
                            <img alt={item.image.fileName}
                                 src={item.image.url}
                            />
                        </div>
                    </div>
                    <div className="product-details">
                        <strong className="product-name">
                            {item.productName}
                        </strong>
                        <div className="product-information">
                            {item.productInformation}
                        </div>
                        <div>
                            <p>{formatCurrency(item.productPrice)}</p>
                        </div>
                        <div className="product-item-inner">
                            {cartItems.some((p) => p.productId === item.productId) ?
                                (<div className="remove-item-from-cart">
                                    <button className="click-from-cart"
                                            onClick={() => removeFromCart(item)}>
                                        <p><BsFillCartDashFill/> &nbsp;Uit winkelwagen</p>
                                    </button>
                                </div>)
                                :
                                (<div className="add-item-to-cart">
                                    <button className="click-to-cart"
                                            onClick={() => addToCart(item)}>
                                        <p><BsFillCartPlusFill/> &nbsp;In winkelwagen</p>
                                    </button>
                                </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopItem;