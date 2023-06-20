import "./CartBackground.css";

import React, {useContext} from "react";
import Cart from "./Cart";
import {BiMessageError} from "react-icons/bi";
import {NavLink, useHistory} from "react-router-dom";
import {IoBagCheckOutline} from "react-icons/io5";
import {AuthContext} from "../../context/AuthContext";
import ClickToShop from "../../helpers/ClickComponents/ClickToShop";


function CartBackground() {
    const {isAuth} = useContext(AuthContext);
    const history = useHistory();

    function checkout() {
        history.push('user/checkout');
    }

    return (
        <>
            <div>
                <div className="shopping-cart-page">
                    <h1 className="shopping-cart-h1">Winkelwagen</h1>
                </div>
                <div className="cart-container">
                    <Cart/>
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
                            <ClickToShop/>
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

        </>
    )
}

export default CartBackground