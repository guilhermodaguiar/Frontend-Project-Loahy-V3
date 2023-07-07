import "./CartBackground.css";

import React, {useContext} from "react";
import Cart from "./Cart";
import {useHistory} from "react-router-dom";
import {IoBagCheckOutline} from "react-icons/io5";
import {AuthContext} from "../../context/AuthContext";
import ClickToShop from "../../helpers/ClickComponents/ClickToShop";
import {CartState} from "../../context/CartContext";
import NavBar from "../../layout/navBar/NavBar";


function CartBackground() {
    const {isAuth} = useContext(AuthContext);
    const history = useHistory();
    const {state: {cart}} = CartState();

    function checkout() {
        history.push('user/checkout');
    }

    return (<>
        <NavBar/>
        <div>
            <div className="shopping-cart-page">
                <h1 className="shopping-cart-h1">Winkelwagen</h1>
            </div>
            <div className="cart-container">
                <Cart/>
            </div>
            <div className="ref-container">
                {!isAuth ?
                    <ClickToShop/>
                    :
                    <>
                        {cart.length > 0 && <div className="button-size">
                            <button className="cc-button"
                                    onClick={checkout}>
                                <IoBagCheckOutline size={22}/>&nbsp;Bestellen
                            </button>
                        </div>}
                    </>}
            </div>
        </div>
    </>)
}

export default CartBackground