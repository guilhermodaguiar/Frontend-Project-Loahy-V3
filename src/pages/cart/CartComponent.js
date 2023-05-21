import './CartComponent.css';

import React from "react";
import {IoCloseSharp} from "react-icons/io5";
import {formatCurrency} from "../../helpers/formatCurrency/FormatCurrency";

function CartComponent({item, index, handleRemove}) {

    return (
        <>
            <div>
                <div className="inner-container">
                    <div className="container-shopping-cart">
                        <div className="notice-wrapper">
                            <div className="shopping-cart-outer-container">
                                <div className="shopping-cart-new-container">
                                    <div className="cart-container-outer">
                                        <div className="cart-container-inner">
                                            <button className="remove-from-cart-button">
                                                <IoCloseSharp
                                                    size={20}
                                                    onClick={() => handleRemove(index)}
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
                                            <p>{formatCurrency(item.productPrice)}</p></div>
                                    </div>
                                    <div className="cart-container-outer">
                                        <div className="cart-container-inner">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

export default CartComponent;

