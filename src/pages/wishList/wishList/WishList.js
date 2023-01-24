import './WishList.css';
import React, {useContext} from "react";
import WishlistComponent from "../wishlistComponent/WishlistComponent";
import {useDispatchWishlist, useWishlist} from "../../../context/WishlistContext";
import {NavLink} from "react-router-dom";
import {HashLink as Link} from "react-router-hash-link";
import {BiMessageError} from "react-icons/bi";
import {FcShop} from "react-icons/fc";
import {AuthContext} from "../../../context/AuthContext";
import {BsBookmarkHeart} from "react-icons/bs";


function WishList() {
    const {isAuth, user} = useContext(AuthContext);
    const wishlistItems = useWishlist();
    const dispatch3 = useDispatchWishlist();

    console.log(wishlistItems);
    console.log(isAuth);

    const handleRemove = (index) => {
        dispatch3({type: "REMOVE_FROM_WISHLIST", index});
    };

    function handleSaveWishlist() {
    return null;
    }

    return (
        <>
            <div className="wishlist-page">
                <h1 className="wishlist-h1">
                    {user.customer_firstname}
                    's Verlanglijst</h1>
            </div>
            <div className="wishlist-outer-outer-container">
                {!isAuth ? (
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
                ) : (
                    <div className="wishlist-outer-outer-container">
                        {wishlistItems.map((item, index) => {
                            return <WishlistComponent
                                key={index}
                                index={index}
                                handleRemove={handleRemove}
                                item={item}
                            />
                        })}
                        <div className="wishlist-outer-outer-container">
                            <div>
                                {wishlistItems.length > 0 ? (
                                        <button className="cart-checkout-button"
                                                                         onClick={handleSaveWishlist}
                                            >
                                        <BsBookmarkHeart size={22}/>&nbsp;<p>Opslaan</p>
                                        </button>
                                    )
                                    : (<span>
                                <div>
                                    <div className="warning-icon"><BiMessageError size={40}/></div>
                                    <p className="click-to-shop">Je wishlist {user.wish_list_name} is leeg</p>
                                    <div className="to-shop-link-container">
                                        <div className="click-to-shop">
                                            Klik&nbsp;
                                            <span>
                                                <Link to="/#shop">
                                                    <FcShop className="shop-icon"
                                                            size={25}/>
                                                </Link>
                                            </span>
                                            &nbsp;om verder te winkelen
                                        </div>
                                    </div>
                                </div>
                            </span>)}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default WishList;