import './Cart.css';

import React, {useContext, useEffect, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {FcShop} from "react-icons/fc";
import {BiMessageError} from "react-icons/bi";
import {IoBagCheckOutline} from "react-icons/io5";
import {AuthContext} from "../../context/AuthContext";
import {CartState} from "../../context/CartContext";
import CartComponent from "./CartComponent";



function Cart() {
    const {isAuth} = useContext(AuthContext);
    const history = useHistory();
    const {state: { cart }, dispatch} = CartState();
    const [total, setTotal] = useState();

    useEffect(() => {
        setTotal(
            cart.reduce((acc, curr) => acc + Number(curr.productPrice) * curr.qty, 0)
        );
    }, [cart]);

    function checkout() {
        history.push('test/checkout');
    }


    return (
        <>
            <div>
                <div className="shopping-cart-page">
                    <h1 className="shopping-cart-h1">Winkelwagen</h1>
                </div>
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
                            <div className="cart-container-inner"></div>
                            <div className="cart-container-inner"></div>
                            <div className="cart-container-inner">Naam</div>
                            <div className="cart-container-inner">Prijs</div>
                            <div className="cart-container-inner">Aantal</div>
                            <div className="cart-container-inner">Subtotaal</div>
                        </div>

                        <div className="shopping-cart-container">
                            {cart.map((item) => {
                                return (
                                    <div className="shopping-cart-outer-container">
                                        <CartComponent
                                            key={item.productId}
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
                                    <button onClick={dispatch({type: "CLEAR_CART"})}>
                                        verwijder lijst
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <strong>
                                totaal: {total}
                            </strong>
                        </div>
                        <div className="shopping-cart-container">

                            {!isAuth ?
                                <div>
                                    <div><BiMessageError size={40}/></div>
                                    <div> Je moet ingelogd zijn om bestellen</div>
                                    <div> Klik&nbsp;
                                        <NavLink to="/user">
                                            hier
                                        </NavLink>
                                        &nbsp;om in te loggen of om te registreren
                                    </div>

                                    <div className="to-shop">
                                        <p>Klik&nbsp;
                                            <span>
                                                <NavLink to="/#shop">
                                                    <FcShop size={25}/>
                                                </NavLink>
                                            </span>
                                            &nbsp;om verder te winkelen
                                        </p>
                                    </div>
                                </div>
                                :
                                <>
                                    <div className="button-size">
                                        <button className="cart-checkout-button"
                                                onClick={checkout}>
                                            <IoBagCheckOutline size={22}/>&nbsp;Bestellen
                                        </button>
                                        &nbsp;In de volgende pagina kan je de aantal aanpassen
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                }
            </div>
        </>
    )
}


export default Cart;
