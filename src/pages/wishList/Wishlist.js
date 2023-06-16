import "./Wishlist.css";

import React, {useContext} from "react";
import {BiMessageError} from "react-icons/bi";
import {NavLink} from "react-router-dom";
import {FcShop} from "react-icons/fc";
import {BsBookmarkHeart} from "react-icons/bs";
import {AuthContext} from "../../context/AuthContext";
import {WishlistState} from "../../context/WishlistContext";
import WishlistComponent from "./WishlistComponent";


function Wishlist() {
    const token =  localStorage.getItem('token');
    const {isAuth, user} = useContext(AuthContext);
    const {state2: {wishlist}, dispatch2} = WishlistState();

    console.log(wishlist);

    function handleSaveWishlist() {
        return null;
    }

    return (
        <>
            <div className="wishlist-page">
                {!isAuth ?
                    <h1 className="wishlist-h1">Verlanglijst</h1> :
                    <h1 className="wishlist-h1"> {user.user_first_name}'s Verlanglijst</h1>
                }
            </div>
            <div className="wishlist-outer-outer-container">
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

                        <div className="to-shop">
                            <p>Klik&nbsp;
                                <span>
                                    <NavLink to="/#shop">
                                        <FcShop size={25}/>
                                    </NavLink>
                                </span>
                                &nbsp;om verder te winkelen
                            </p>
                        </div>
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
                            <div className="wishlist-outer-outer-container">
                                <div>
                                    {wishlist.length > 0 &&
                                        <button className="cart-checkout-button"
                                                onClick={() => handleSaveWishlist}
                                        >
                                            <BsBookmarkHeart size={22}/>&nbsp;<p>Opslaan</p>
                                        </button>}
                                </div>
                                <button onClick={() => dispatch2({type: "CLEAR_WISHLIST"})}>
                                    verwijder lijst
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Wishlist;