import './Cart.css';

import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {FcShop} from "react-icons/fc";
import {CartState} from "../../context/CartContext";
import CartComponent from "./CartComponent";
import {formatCurrency} from "../../helpers/formatCurrency/FormatCurrency";


function Cart({setProductList}) {
    const {state: {cart}, dispatch} = CartState();
    const [total, setTotal] = useState();
    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        setTotal(
            formatCurrency(cart.reduce((acc, curr) => acc + Number(curr.productPrice).toFixed(2) * curr.qty, 0.00)
            ));
    }, [cart]);


    useEffect(() => {
        setItemList(cart.map(item => {
            return [item.productId, item.productName, item.productPrice, parseInt(item.qty)]
        }))
    }, [cart])

    console.log(itemList);

    return (
        <>
            {cart.length === 0 ?
                <div className="cart_empty">
                    Winkelwagen is leeg
                    <p>
                        Klik&nbsp;
                        <span>
                                <NavLink to="/#shop">
                                    <FcShop className="shop-icon"
                                            size={25}/>
                                </NavLink>
                            </span>
                        &nbsp;om verder te winkelen
                    </p>
                </div>
                :
                <div>
                    <div className="name-price-qty-container">
                        <div className="cart-container-x"></div>
                        <div className="cart-container-inner"></div>
                        <div className="cart-container-inner">Naam</div>
                        <div className="cart-container-inner">Prijs</div>
                        <div className="cart-container-inner">Aantal</div>
                        <div className="cart-container-inner">Subtotaal</div>
                    </div>

                    <div className="shopping-cart-container">
                        {cart.map((item) => {
                            return (
                                <div className="shopping-cart-outer-container" key={item.productId}>
                                    <CartComponent
                                        item={item}
                                    />
                                </div>
                            )
                        })}
                        <div className="total-and-price">
                            <div className="aantal-producten">
                                Totaal aantal: {cart.length} producten
                            </div>
                            <div>
                                <strong>
                                    Totaal:{total}
                                </strong>
                            </div>
                            <div>
                                <button onClick={() => dispatch({type: "CLEAR_CART"})}>
                                    verwijder lijst
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Cart;
