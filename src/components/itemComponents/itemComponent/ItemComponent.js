import './ItemComponent.css';

import React from "react";
import {BsFillCartDashFill, BsFillCartPlusFill} from "react-icons/bs";
import {useHistory} from "react-router-dom";
import {FaInfoCircle} from "react-icons/fa";
import {CartState} from "../../../context/CartContext";
import {formatCurrency} from "../../../helpers/formatCurrency/FormatCurrency";


function ItemComponent({item}) {
    const history = useHistory();
    const {state: { cart }, dispatch} = CartState();


    function redirectToItemInform(item) {
        history.push(`items/${item.productId}`)
    }

    return (
        <div className="main-container-product">
            <div className="border-effect-container">
                <div className="random-robot-container">
                    <div className="info-item-marker" onClick={() =>redirectToItemInform(item)}>
                        <FaInfoCircle/>
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
                    <div>
                        {cart.some((p) => p.productId === item.productId) ?
                            <button className="click-from-cart"
                                    onClick={() => dispatch({
                                        type: "REMOVE_FROM_CART",
                                        payload: item
                                    })}>
                                <p><BsFillCartDashFill/> &nbsp;Uit winkelwagen</p>
                            </button>
                            :
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