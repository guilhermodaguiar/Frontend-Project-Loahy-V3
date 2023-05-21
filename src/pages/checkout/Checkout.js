import "./Checkout.css";

import React, {useContext, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {FcShop} from "react-icons/fc";
import {FaShoppingCart} from "react-icons/fa";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {MdLocalShipping} from "react-icons/md";
import {formatCurrency} from "../../helpers/formatCurrency/FormatCurrency";
import {IoListCircle} from "react-icons/io5";
import {HiEmojiHappy} from "react-icons/hi";
import CheckoutComponent from "./CheckoutComponent";
import UserInformation from "../../components/userComponents/userInformation/UserInformation";
import UserUpdate from "../../components/userComponents/userUpdate/UserUpdate";
import {CartState} from "../../context/CartContext";


function Checkout() {
    const [success, toggleSuccess] = useState();
    const token = localStorage.getItem('token');
    const [addSuccess, toggleAddSuccess] = useState(false);
    const {state: {items, cart}} = CartState();

    const {
        user,
        user: {
            customer_firstname, customer_lastname,
            customer_street_name, customer_house_number,
            customer_house_number_add, customer_city,
            customer_zipcode, customer_phone,
        }
    } = useContext(AuthContext);


    const totalPrice = cart.reduce((acc, cart) => acc + cart.productPrice, 0);
    const [itemList, setItemList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [comment, setComment] = useState('');


    useEffect(() => {
        setItemList(items.map(item => {
            return item.productId
        }))
    }, [items])

    async function sendOrder(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/orders/create`, {
                    productList: itemList,
                    comment: comment,
                    customer: user.customer_id,
                    orderDate: Date().toLocaleString(),
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            setOrderList(response.data);
            toggleAddSuccess(true);
        } catch (e) {
            console.error(e, 'er is iets misgegaan met het verzenden van je order');
        }
    }

    console.log(Date().toLocaleString());


    return (
        <>
            {user.roles !== "ROLE_USER" ?
                <h3>
                    U moet ingelogd zijn als CUSTOMER om deze content te mogen zien..
                </h3>
                :
                <>
                    <div className="check-out-page">
                        <h1 className="check-out-h1">Checkout</h1>
                    </div>
                    <div className="checkout-out-outer-container">
                        {success ?
                            <strong>gelukt! je kan verder gaan met check out</strong>
                            :
                            <div className="first-box-container">
                                <div className="shipping-information-container">
                                    <h3 className="shipping-details-container"><MdLocalShipping size={25}/>&nbsp;Verzend
                                        gegevens</h3>
                                    <UserInformation/>
                                </div>
                                <div className="shipping-update-list">
                                    <section>
                                        <h3>Kies een ander verzendadres</h3>
                                        <UserUpdate/>
                                    </section>
                                </div>
                                <div className="go-to-container">
                                    <div className="to-shop-link-container">
                                        <p className="click-to-shop">
                                            Klik&nbsp;
                                            <span>
                                                <NavLink to="/shop">
                                                    <FcShop className="shop-icon" size={25}/>
                                                </NavLink>
                                            </span>&nbsp;om naar de shop te gaan
                                        </p>
                                    </div>
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
                        }

                        <div className="second-box-container">
                            <div>
                                <div>
                                    <h3 className="order-header"><IoListCircle size={25}/>&nbsp;Bestelling</h3>
                                </div>
                                <div className="order-cart-summary">
                                    {cart.map((item) => {
                                        return <CheckoutComponent
                                            key={item.productId}
                                            item={item}
                                        />
                                    })}
                                    <div className="price-container">
                                        <div className="total-price2">
                                            <strong>Totaal prijs: {formatCurrency(totalPrice.toFixed(2))}</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="check-cart-checkout">
                                    Nog enkele wensen? of gewoon even groeten?
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
                                        >
                                            Order
                                        </button>
                                        {addSuccess === true &&
                                            <div>
                                                <h3><HiEmojiHappy size={30}/>Bedankt voor je bestelling </h3>
                                                <p> Je bestelling wordt zo snel verwerkt. Je krijgt van ons een e-mail
                                                    bericht</p>
                                            </div>
                                        }
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Checkout;