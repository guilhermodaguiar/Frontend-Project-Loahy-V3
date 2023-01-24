import "./WishlistLogin.css";

import React, {useContext} from "react";
import {BiMessageError} from "react-icons/bi";
import {NavLink} from "react-router-dom";
import {HashLink as Link} from "react-router-hash-link";
import {FcShop} from "react-icons/fc";
import {AuthContext} from "../../../context/AuthContext";
import WishList from "../wishList/WishList";

function WishlistLogin() {
    const {isAuth} = useContext(AuthContext);


    return (
        <>
            {!isAuth ? (
                <>
                    <div className="wishlist-page">
                        <h1 className="wishlist-h1">Verlanglijst</h1>
                    </div>
                    <div className="wishlist-outer-outer-container">
                        <div>
                            <div>
                                <div className="warning-icon"><BiMessageError size={40}/></div>
                                <div className="click-to-shop">
                                    <p>Je moet ingelogd zijn om je Wishlist te zien en te
                                        updaten</p>
                                </div>
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
                                    <div className="click-to-shop">
                                        Klik&nbsp;
                                        <span>
                                        <Link to="/#shop">
                                            <FcShop className="shop-icon"
                                                    size={25}/>
                                        </Link>
                                    </span>&nbsp;om verder te winkelen
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            ) : (
                <div>
                    <WishList/>
                </div>
            )}

        </>
    )
}

export default WishlistLogin;