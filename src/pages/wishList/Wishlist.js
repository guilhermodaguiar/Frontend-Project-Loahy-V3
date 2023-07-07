import "./Wishlist.css";

import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {WishlistState} from "../../context/WishlistContext";
import WishlistComponent from "./WishlistComponent";
import ClickToShop from "../../helpers/ClickComponents/ClickToShop";


function Wishlist() {
    const {state2: {wishlist}} = WishlistState();
    const {isAuth} = useContext(AuthContext);

    console.log(wishlist);

    return (
        <>
            <div>
                {!isAuth ?
                    <ClickToShop/>
                    :
                    <div className="woo-container">
                            {wishlist.map((item) => {
                                return <WishlistComponent
                                    key={item.productId}
                                    item={item}
                                />
                            })}
                    </div>
                }
            </div>
        </>
    )
}

export default Wishlist;