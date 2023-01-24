import "./CheckoutComponent.css";

import React from "react";
import {formatCurrency} from "../../../helpers/formatCurrency/FormatCurrency";


function CheckoutComponentComponent({item}) {

    return(
        <>
            <div className="notice-wrapper">
                <div className="shopping-cart-outer-container">
                    <div className="shopping-cart-new-container">
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutComponentComponent;