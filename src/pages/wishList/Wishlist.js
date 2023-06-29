import "./Wishlist.css";

import React, {useContext} from "react";
import {BiMessageError} from "react-icons/bi";
import {NavLink} from "react-router-dom";
import {BsBookmarkHeart} from "react-icons/bs";
import {AuthContext} from "../../context/AuthContext";
import {WishlistState} from "../../context/WishlistContext";
import WishlistComponent from "./WishlistComponent";
import ClickToShop from "../../helpers/ClickComponents/ClickToShop";


function Wishlist() {
    const {state2: {wishlist}, dispatch2} = WishlistState();
    const {isAuth} = useContext(AuthContext);

    console.log(wishlist);

    return (
        <>
            <div>
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
                    <div className="wishlist-outer-outer-container">
                        <div className="wishlist-outer-outer-container">
                            {wishlist.map((item) => {
                                return <WishlistComponent
                                    key={item.productId}
                                    item={item}
                                />
                            })}
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Wishlist;