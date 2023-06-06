import './CartDropDown.css';

import React from "react";
import {BiMessageError} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import {formatCurrency} from "../../helpers/formatCurrency/FormatCurrency";
import {Link} from "react-router-dom";
import {CartState} from "../../context/CartContext";

function CartDropDown() {
    const {state: { cart }, dispatch} = CartState();

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
                            :
                            <div>
                                {cart.map((item) => (
                                    <span className="cart-item"
                                          key={item.productId}>
                                            <img src={item.image.url}
                                                 className="cartItemImg"
                                                 alt={item.image.fileName}/>
                                            <div className="cartItemDetail">
                                                <span>{item.productName}</span>
                                                <span><p>{formatCurrency(item.productPrice)}</p></span>
                                            </div>
                                            <AiFillDelete
                                                fontSize="20px"
                                                style={{cursor: "pointer"}}
                                                onClick={() =>
                                                    dispatch({
                                                        type: "REMOVE_FROM_CART",
                                                        payload: item,
                                                    })
                                                }/>
                                        </span>))
                                }
                                <Link to="/shopping-cart">
                                    <button
                                        type="button"
                                        className="button-to-shopping-cart"
                                        onClick={() => console.log("jij gaat naar shopping cart!")}>
                                        Naar winkelwagen!
                                    </button>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartDropDown;