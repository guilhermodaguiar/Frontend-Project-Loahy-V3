import './ItemComponent.css';

import React, {useContext} from "react";
import {BsFillCartDashFill, BsFillCartPlusFill} from "react-icons/bs";
import {useHistory} from "react-router-dom";
import {FaInfoCircle} from "react-icons/fa";
import {CartState} from "../../../context/CartContext";
import {formatCurrency} from "../../../helpers/formatCurrency/FormatCurrency";
import {WishlistState} from "../../../context/WishlistContext";
import {GiHeartMinus} from "react-icons/gi";
import {HiHeart} from "react-icons/hi";
import {AuthContext} from "../../../context/AuthContext";


function ItemComponent({item}) {
    const history = useHistory();
    const {state: {cart}, dispatch} = CartState();
    const {state2: {wishlist}, dispatch2} = WishlistState();
    const {user} = useContext(AuthContext);
;

    function redirectToItemInform(item) {
        history.push(`items/${item.productId}`)
    }

    return (
        <div className="main-container-product">
            <div className="border-effect-container">
                <div className="random-robot-container">
                    <div className="info-item-marker" onClick={() => redirectToItemInform(item)}>
                        <FaInfoCircle/>
                    </div>
                    <div className="hearts-container">
                        <div>
                            {wishlist.some((p) => p.productId === item.productId) ?
                                <div className="wishlist-heart">
                                    <GiHeartMinus size={19}
                                                  className="add-to-list-heart"
                                                  onClick={() =>
                                                      dispatch2({
                                                      type: "REMOVE_FROM_WISHLIST",
                                                      payload: {item: item, wishlist_id: user.wishlist_id}
                                                  })
                                    }/>
                                </div>
                                :
                                <div className="wishlist-heart">
                                    <HiHeart size={22}
                                             className="remove-from-list-heart"
                                             onClick={() => dispatch2({
                                                 type: "ADD_TO_WISHLIST",
                                                 payload: {item: item, wishlist_id: user.wishlist_id}
                                             })}/>
                                </div>
                            }
                        </div>
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
                        {item.productDescription}
                    </div>
                    <div>
                        <p>{formatCurrency(item.productPrice)}</p>
                    </div>
                    <div>
                        {cart.some((p) => p.productId === item.productId) ?
                            <button className="click-from-cart"
                                    onClick={() => dispatch({
                                        type: "REMOVE_FROM_CART",
                                        payload: item
                                    })}
                            >
                                <p><BsFillCartDashFill/> &nbsp;Uit winkelwagen</p>
                            </button>
                            :
                            // Hier wil ik een DEL naar backend endpoint:
                            // wishlists/wishlistId/productId
                            <button className="click-to-cart"
                                    onClick={() => dispatch({
                                        type: "ADD_TO_CART",
                                        payload: item
                                    })}>
                                <p><BsFillCartPlusFill/> &nbsp;In winkelwagen</p>
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemComponent;