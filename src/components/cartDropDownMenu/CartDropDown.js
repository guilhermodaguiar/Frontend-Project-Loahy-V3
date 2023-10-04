import './CartDropDown.css';

import React from "react";
import {BiMessageError} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import {formatCurrency} from "../../helpers/formatCurrency/FormatCurrency";
import {CartState} from "../../context/CartContext";
import GetImage from "../imageComponent/GetImage";

function CartDropDown() {
    const {state: {cart}, dispatch} = CartState();

    return (<>
        <div className="inner-container">
            {cart.length === 0 ?
                <section id="shopping-cart">
                    <p className="click-to-shop">
                        Je winkelwagen is momenteel leeg&nbsp;<BiMessageError size={30}/>
                    </p>
                </section> :
                <section>
                    {cart.map((item) => (
                        <span className="cart-item" key={item.productId}>
                            <GetImage
                                className="cartItemImg"
                                src={item.image.url}
                                alt={item.image.fileName}/>
                            <div className="cartItemDetail">
                                <span>{item.productName}</span>
                                <span><p>{formatCurrency(item.productPrice)}</p></span>
                            </div>
                            <AiFillDelete
                                fontSize="20px"
                                style={{cursor: "pointer"}}
                                onClick={() => dispatch({
                                    type: "REMOVE_FROM_CART", payload: item,
                                })}/>
                            </span>
                    ))}
                    <div>
                        <button
                            type="button"
                            className="button-to-shopping-cart"
                            onClick={() => console.log("jij gaat naar shopping cart!")}>
                            Naar winkelwagen!
                        </button>
                    </div>
                </section>}
        </div>
    </>)
}

export default CartDropDown;