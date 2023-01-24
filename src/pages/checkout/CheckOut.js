import "./CheckOut.css";

import React, {useContext, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {FcShop} from "react-icons/fc";
import {FaShoppingCart} from "react-icons/fa";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {useCart} from "../../context/CartContext";
import {MdLocalShipping} from "react-icons/md";
import {BsFillPencilFill} from "react-icons/bs";
import CheckoutComponentComponent from "./checkoutComponent/CheckoutComponentComponent";
import {formatCurrency} from "../../helpers/formatCurrency/FormatCurrency";
import {IoListCircle} from "react-icons/io5";
import {HiEmojiHappy} from "react-icons/hi";

function CheckOut() {
    const [success, toggleSuccess] = useState();
    const token = localStorage.getItem('token');
    const cartItems = useCart();
    const [addSuccess, toggleAddSuccess] = useState(false);

    const {
        user,
        user: {
            customer_firstname, customer_lastname,
            customer_street_name, customer_house_number,
            customer_house_number_add, customer_city,
            customer_zipcode, customer_phone,
        }
    } = useContext(AuthContext);

    const totalPrice = cartItems.reduce((acc, cart) => acc + cart.productPrice, 0);
    const [itemList, setItemList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [comment, setComment] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [houseNumberAdd, setHouseNumberAdd] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [phone, setPhone] = useState(0);



    useEffect(() => {
        setItemList(cartItems.map(item => {
            return item.productId
        }))
    }, [cartItems])

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
            console.error(e);
        }
    }

    console.log(Date().toLocaleString());



    async function handleUpdateCustomer(e) {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/customers/update/${user.customer_id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    customerFirstName: firstName,
                    customerLastName: lastName,
                    customerStreetName: street,
                    customerHouseNumber: houseNumber,
                    customerHouseNumberAddition: houseNumberAdd,
                    customerCity: city,
                    customerZipcode: zipcode,
                    customerPhone: phone,
                })
            toggleSuccess(true);
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <>
            {(user.roles !== "ROLE_USER") ? (
                <div className="user-route-container">
                    <div className="user-route">
                        <h1>U moet ingelogd zijn als
                            <br/> CUSTOMER
                            <br/>om deze content te mogen zien..
                        </h1>
                    </div>
                </div>
            ) : (
                <>
                    <div className="check-out-page">
                        <h1 className="check-out-h1">Checkout</h1>
                    </div>
                    <div className="checkout-out-outer-container">
                        {success ? (
                            <section className="block-shipping-address-success">
                                <div>
                                    gelukt! je kan verder gaan met check out
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
                            </section>
                        ) : (
                            <div className="first-box-container">
                                <div className="shipping-information-container">
                                    <h3 className="shipping-details-container"><MdLocalShipping size={25}/>&nbsp;Verzend
                                        gegevens</h3>
                                    <div className="info-container">
                                        <div><strong>Voornaam:</strong> {customer_firstname}</div>
                                        <div><strong>Achternaam:</strong> {customer_lastname}</div>
                                        <div><strong>Straat:</strong> {customer_street_name}</div>
                                        <div><strong>Huisnr:</strong> {customer_house_number}</div>
                                        <div><strong>toevoeging:</strong> {customer_house_number_add}</div>
                                        <div><strong>postcode:</strong> {customer_zipcode} </div>
                                        <div><strong>Stad:</strong> {customer_city}</div>
                                        <div><strong>Mobiel nummer:</strong> {customer_phone}</div>
                                    </div>
                                </div>
                                <div className="shipping-update-list">
                                    <section>
                                        <h3>Kies een ander verzendadres</h3>
                                        <div>
                                            <form
                                                className="shipping-form"
                                                onSubmit={handleUpdateCustomer}>

                                                <section className="update-customer-info">
                                                    <label>
                                                        <strong>Voornaam:</strong>
                                                    </label>
                                                    <input
                                                        className="input-order"
                                                        type="text"
                                                        id="firstname"
                                                        autoComplete="off"
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        value={firstName}
                                                        required
                                                    />
                                                </section>

                                                <section className="update-customer-info">
                                                    <label>
                                                        <strong>Achternaam:</strong>
                                                    </label>
                                                    <input
                                                        className="input-order"
                                                        type="text"
                                                        id="lastname"
                                                        autoComplete="off"
                                                        onChange={(e) => setLastName(e.target.value)}
                                                        value={lastName}
                                                        required
                                                    />
                                                </section>

                                                <section className="update-customer-info">
                                                    <label>
                                                        <strong>Straatnaam:</strong>
                                                    </label>
                                                    <input
                                                        className="input-order"
                                                        type="text"
                                                        id="street-name"
                                                        autoComplete="off"
                                                        onChange={(e) => setStreet(e.target.value)}
                                                        value={street}
                                                        required
                                                    />
                                                </section>

                                                <section className="update-customer-info">
                                                    <label>
                                                        <strong>Huisnummer:</strong>
                                                    </label>
                                                    <input
                                                        className="input-order"
                                                        type="text"
                                                        id="house-number"
                                                        autoComplete="off"
                                                        onChange={(e) => setHouseNumber(e.target.value)}
                                                        value={houseNumber}
                                                        required
                                                    />
                                                </section>

                                                <section className="update-customer-info">
                                                    <label>
                                                        <strong>Tvg:</strong>
                                                    </label>
                                                    <input
                                                        className="input-order"
                                                        type="text"
                                                        id="house-number-add"
                                                        autoComplete="off"
                                                        onChange={(e) => setHouseNumberAdd(e.target.value)}
                                                        value={houseNumberAdd}
                                                        placeholder="niet verplicht"
                                                    />
                                                </section>

                                                <section className="update-customer-info">
                                                    <label>
                                                        <strong>Postcode:</strong>
                                                    </label>
                                                    <input
                                                        className="input-order"
                                                        type="text"
                                                        id="zipcode"
                                                        autoComplete="off"
                                                        onChange={(e) => setZipcode(e.target.value)}
                                                        value={zipcode}
                                                        required
                                                    />
                                                </section>

                                                <section className="update-customer-info">
                                                    <label>
                                                        <strong>Stad:</strong>
                                                    </label>
                                                    <input
                                                        className="input-order"
                                                        type="text"
                                                        id="city"
                                                        autoComplete="off"
                                                        onChange={(e) => setCity(e.target.value)}
                                                        value={city}
                                                        required
                                                    />
                                                </section>

                                                <section className="update-customer-info">
                                                    <label>
                                                        <strong>Mobiel:</strong>
                                                    </label>
                                                    <input
                                                        className="input-order"
                                                        type="tel"
                                                        id="phone-number"
                                                        autoComplete="off"
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        value={phone}
                                                        required
                                                    />
                                                </section>
                                                <button
                                                    type="submit"
                                                    className="form-button"
                                                >
                                                    <BsFillPencilFill/>&nbsp; Wijzigen
                                                </button>
                                            </form>
                                        </div>
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
                        )}
                        <div className="second-box-container">
                            <div>
                                <div>
                                    <h3 className="order-header"><IoListCircle size={25}/>&nbsp;Bestelling</h3>
                                </div>
                                <div className="order-cart-summary">
                                    {cartItems.map((item, index) => {
                                        return <CheckoutComponentComponent
                                            key={index}
                                            item={item}
                                            index={index}
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
                    <div>
                    </div>
                </>
            )}
        </>
    )
}

export default CheckOut;