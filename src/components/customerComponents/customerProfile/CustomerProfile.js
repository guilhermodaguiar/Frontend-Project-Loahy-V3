import "./CustomerProfile.css";

import React, {useContext} from "react";
import GreetCustomer from "../greetCustomer/GreetCustomer";
import {AuthContext} from "../../../context/AuthContext";
import CustomerInformation from "../customerInformation/CustomerInformation";
import WishList from "../../../pages/wishList/wishList/WishList";
import CustomerUpdate from "../customerUpdate/CustomerUpdate";
import CustomerNavBar from "../../../layout/customerNavBar/CustomerNavBar";
import CustomerChangePassword from "../customerChangePassword/CustomerChangePassword";


function CustomerProfile() {
    const {user, logout} = useContext(AuthContext);

    return (
        <>
            {user.roles !== "ROLE_USER" ? (
                <div className="user-route-container">
                    <div className="user-route">
                        <h1>U moet ingelogd zijn als
                            <br/> CUSTOMER
                            <br/>om deze content te mogen zien..
                        </h1>
                    </div>
                </div>
            ) : (
                <div>
                    <section>
                        <GreetCustomer/>
                    </section>
                    <CustomerNavBar/>
                    <div className="customer-outer-container">
                        <div className="first-box-container">
                            <section id="customer_user_profile">
                                <CustomerInformation/>
                            </section>
                            <section id="customer_change_password">
                                <CustomerChangePassword/>
                            </section>
                        </div>
                        <div className="second-box-container">
                            <section id="customer_user_update">
                                <CustomerUpdate/>
                            </section>
                        </div>
                    </div>
                    <section id="customer_wishlist">
                        <WishList/>
                    </section>
                    <section>
                        <button type="button" onClick={logout}>
                            Uitloggen
                        </button>
                    </section>
                </div>
            )}
        </>
    )
}

export default CustomerProfile;