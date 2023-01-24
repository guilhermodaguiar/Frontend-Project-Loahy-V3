import './CustomerNavBar.css'

import React, {useContext} from "react";
import {HashLink as Link} from "react-router-hash-link";
import {AuthContext} from "../../context/AuthContext";


function CustomerNavBar() {
    const {user,logout} = useContext(AuthContext);

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
            ) : (<section className="customer-nav-bar-outer-container">
                <div className="customer-nav-bar-inner-container">
                    <div className="container-for-padding">
                        <Link to="/customer/profile/#customer_user_profile">
                            Profiel
                        </Link>
                    </div>
                    <div className="container-for-padding">
                        <Link to="/customer/profile/#customer_change_password">
                            Wachtwoord
                        </Link>
                    </div>
                    <div className="container-for-padding">
                        <Link to="/customer/profile/#customer_user_update">
                            Profiel aanpassen
                        </Link>
                    </div>
                    <div className="container-for-padding">
                        <Link to="/customer/profile/#customer_order_history">
                            Orders
                        </Link>
                    </div>
                    <div className="container-for-padding">
                        <Link to="/customer/profile/#customer_wishlist">
                            verlanglijstje
                        </Link>
                    </div>
                </div>
                <div className="container-for-button">
                    <button
                            type="button"
                            onClick={logout} >
                        Uitloggen
                    </button>
                </div>
            </section>)}
        </>
    )
}

export default CustomerNavBar
