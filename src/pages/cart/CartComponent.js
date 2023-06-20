import './CartComponent.css';

import React from "react";
import {IoCloseSharp} from "react-icons/io5";
import {formatCurrency} from "../../helpers/formatCurrency/FormatCurrency";
import {CartState} from "../../context/CartContext";
import {BiMessageError} from "react-icons/bi";

function CartComponent({item}) {
    const {state: {cart}, dispatch} = CartState();
    const itemSubtotal = formatCurrency((item.productPrice.toFixed(2)) * item.qty);

    return (
        <>
            <div>
                <div className="inner-container">
                    <div className="container-shopping-cart">
                        {cart.length === 0 ?
                            <div className="content-for-shopping-cart" id="shopping-cart">
                                <p className="click-to-shop">Je winkelwagen is
                                    momenteel leeg&nbsp;<BiMessageError size={30}/></p>
                            </div>
                            : <div>
                                <div>
                                    <div className="shopping-cart-new-container">
                                        <div className="cart-container-outer">
                                            <div className="cart-container-inner-x">
                                                <button className="remove-from-cart-button">
                                                    <IoCloseSharp
                                                        size={20}
                                                        onClick={() => dispatch({
                                                            type: "REMOVE_FROM_CART",
                                                            payload: item
                                                        })}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="cart-container-outer">
                                            <div className="cart-container-inner">
                                                <img alt={item.image.fileName}
                                                     className="cart-cartItemImg"
                                                     src={item.image.url}
                                                />
                                            </div>
                                        </div>
                                        <div className="cart-container-outer">
                                            <div className="cart-container-inner">{item.productName}</div>
                                        </div>
                                        <div className="cart-container-outer">
                                            <div className="cart-container-inner">
                                                <p>{formatCurrency(item.productPrice.toFixed(2))}</p></div>
                                        </div>
                                        <div className="cart-container-outer">
                                            <div className="cart-container-inner">
                                                <input
                                                    value={item.qty}
                                                    onChange={(e) => dispatch({
                                                        type: "CHANGE_CART_QTY",
                                                        payload:{
                                                            productId: item.productId,
                                                            qty: e.target.value
                                                        }
                                                    })}
                                                    type="number"
                                                    min="1"
                                                    max="10"
                                                    id="item-quantity"
                                                    name="items"
                                                />
                                            </div>
                                        </div>
                                        <div className="cart-container-outer">
                                            <div className="cart-container-inner">
                                                {itemSubtotal}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartComponent;

