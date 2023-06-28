import "./Checkout.css";

import React, {useContext, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {FaAngellist, FaShoppingCart} from "react-icons/fa";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {MdLocalShipping} from "react-icons/md";
import {IoListCircle} from "react-icons/io5";
import {HiEmojiHappy} from "react-icons/hi";
import UserInformation from "../../components/userComponents/userInformation/UserInformation";
import Cart from "../cart/Cart";
import ClickToShop from "../../helpers/ClickComponents/ClickToShop";
import {ItemListState} from "../../context/ItemListContext";
import {CartState} from "../../context/CartContext";


function Checkout() {
    const token = localStorage.getItem('token');
    const [addSuccess, toggleAddSuccess] = useState(false);
    const {user} = useContext(AuthContext);
    const [comment, setComment] = useState('');
    const {state3: {itemList}} = ItemListState();
    const {dispatch} = CartState();




    async function sendOrder(e) {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/orders/create`, {
                productList: itemList,
                comment: comment,
                userEmail: user.user_email,
                addressId: user.address_id,
                orderDate: Date().toLocaleString(),
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            }
            )
            toggleAddSuccess(true);
        } catch (e) {
            console.error(e, 'er is iets misgegaan met het verzenden van je order');
        }
    }

    return (
        <>
            {user.roles !== "ROLE_USER" ?
                <h3> U moet ingelogd zijn om dit content te mogen zien..</h3>
                :
                <>
                    <div className="check-out-page">
                        <h1 className="check-out-h1">Checkout</h1>
                    </div>
                    <div className="checkout-out-outer-container">
                        <div className="upper-checkout-box">
                            <div className="left-box">
                                <h3><MdLocalShipping size={25}/>&nbsp;Verzend
                                    gegevens</h3>
                                <UserInformation/>
                                <div>
                                    <div className="check-cart-checkout">
                                        <h3>
                                            <FaAngellist size={25}/>Nog enkele wensen?<br/> Of even groeten?
                                        </h3>
                                        <form
                                            className="form-cart-checkout"
                                            onSubmit={sendOrder}>
                                            <section>
                                            <textarea
                                                maxLength={240}
                                                name="remark"
                                                id="remark-field"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                rows={6}
                                                cols={40}
                                            />
                                            </section>

                                            <button
                                                type="submit"
                                                className="form-button"
                                                onClick = {() => dispatch({type: "CLEAR_CART"})}>
                                                Order
                                            </button>
                                            {addSuccess === true &&
                                                <div>
                                                    <h3><HiEmojiHappy size={30}/>Bedankt voor je bestelling </h3>
                                                    <p> Je bestelling wordt zo snel verwerkt. Je krijgt van ons een
                                                        e-mail
                                                        bericht</p>
                                                </div>}
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="right-box">
                                <h3 className="order-header"><IoListCircle size={25}/>&nbsp;Bestelling</h3>
                                <Cart/>
                            </div>
                        </div>
                        <div>
                            <div className="go-to-container">
                                <ClickToShop/>
                                <div className="to-shop-link-container">
                                    <p className="click-to-shop">
                                        Klik&nbsp;<span>
                                            <NavLink to="/shopping-cart">
                                                <FaShoppingCart className="cart-icon" size={22}/>
                                            </NavLink>
                                        </span>&nbsp;om naar winkelwagen te gaan
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
        </>
    )
}

export default Checkout;