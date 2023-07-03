import "./WishlistBackground.css";

import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import Wishlist from "./Wishlist";
import NavBar from "../../layout/navBar/NavBar";

function WishlistBackground() {
    const {isAuth, user} = useContext(AuthContext);

    return(
        <>
            <NavBar/>
            <div className="wishlist-page">
                {!isAuth ?
                    <h1 className="wishlist-h1">Verlanglijst</h1> :
                    <h1 className="wishlist-h1"> {user.user_first_name}'s Verlanglijst</h1>
                }
            </div>
            <div className="wishlist-outer-outer-container">
                <Wishlist/>
            </div>

        </>
    )

}

export default WishlistBackground;