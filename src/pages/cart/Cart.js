import React, {useContext, useState} from "react";
import './Cart.css';
import {NavLink, useHistory} from "react-router-dom";
import {useCart, useDispatchCart} from "../../context/CartContext";
import CartComponent from "./CartComponent";
import {FcShop} from "react-icons/fc";
import {BiMessageError} from "react-icons/bi";
import {AuthContext} from "../../context/AuthContext";
import {IoBagCheckOutline} from "react-icons/io5";
import {formatCurrency} from "../../helpers/formatCurrency/FormatCurrency";


function Cart() {
    const history = useHistory();
    const cartItems = useCart();
    const {isAuth} = useContext(AuthContext);
    const dispatch = useDispatchCart();

    function checkout() {
        history.push('customer/checkout');
    }

    function handleRemove(index) {
        dispatch({type: "REMOVE_FROM_CART", index});
    }

    const totalPrice = cartItems.reduce((acc, cartItems) => acc + cartItems.productPrice, 0);




    return (
        <>
            <div>
                <div className="shopping-cart-page">
                    <h1 className="shopping-cart-h1">Winkelwagen</h1>
                </div>
                <div className="name-price-qty-container">
                    <div className="cart-container-inner"></div>
                    <div className="cart-container-inner"></div>
                    <div className="cart-container-inner">Naam</div>
                    <div className="cart-container-inner">Prijs</div>
                </div>

                <div className="shopping-cart-container">
                    {cartItems.map((item, index) => {
                        return (
                            <CartComponent
                                key={index}
                                item={item}
                                handleRemove={handleRemove}
                            />
                        )
                    })}
                    <div className="total-and-price-container">
                        <div className="aantal-producten">
                            Totaal aantal: {cartItems.length} producten
                        </div>
                        <div className="total-price2">
                            <strong>Totaal prijs: {formatCurrency(totalPrice.toFixed(2))}</strong>
                        </div>
                    </div>
                </div>
                <div className={"shopping-cart-container"}>

                    {!isAuth ? (
                        <div>
                            <div>
                                <div className="warning-icon"><BiMessageError size={40}/></div>
                                <div className="click-to-shop"> Je moet ingelogd zijn om bestellen</div>
                                <div className="click-to-shop"> Klik&nbsp;
                                    <NavLink to="/customer/register">
                                        <div className="click-p">hier</div>
                                    </NavLink>
                                    &nbsp;om te registreren
                                </div>
                                <div className="click-to-shop"> Klik&nbsp;
                                    <NavLink to="/customer/login">
                                        <div
                                            className="click-p">hier
                                        </div>
                                    </NavLink>
                                    &nbsp;om in te loggen
                                </div>

                                <div className="to-shop-link-container">
                                    <p className="click-to-shop">
                                        Klik&nbsp;
                                        <span>
                                        <NavLink to="/shop">
                                            <FcShop className="shop-icon"
                                                    size={25}/>
                                        </NavLink>
                                </span>&nbsp;om verder te winkelen
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="button-size">
                            <button className="cart-checkout-button"
                                    onClick={checkout}>
                                <IoBagCheckOutline size={22}/>&nbsp;Bestellen
                            </button>
                            &nbsp;In de volgende pagina kan je de aantal aanpassen
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}


export default Cart;
