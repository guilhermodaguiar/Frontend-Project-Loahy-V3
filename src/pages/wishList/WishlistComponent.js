import "./WishlistComponent.css"

import React from "react";
import {BiMessageError} from "react-icons/bi";
import {NavLink} from "react-router-dom";
import {IoCloseSharp} from "react-icons/io5";
import {FcShop} from "react-icons/fc";
import {WishlistState} from "../../context/WishlistContext";


function WishlistComponent({item}) {
    const {state4: {wishlistItems}, dispatch4} = WishlistState();

    //hier moet een get request komen voor het fetchen van wishlist data


    return (
        <>
            <div className="wishlist-outer-outer-container">
                <div>
                    {wishlistItems.length > 0 ? <div className="notice-wrapper">
                            <div className="shopping-cart-outer-container">
                                <div className="shopping-cart-new-container">
                                    <div className="cart-container-outer">
                                        <div className="list-container-inner"
                                        >
                                            <button className="remove-from-cart-button">
                                                <IoCloseSharp
                                                    size={20}
                                                    onClick={() => dispatch4({
                                                        type: "REMOVE_FROM_CART4",
                                                        payload: item
                                                    })} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="cart-container-outer">
                                        <div className="list-container-inner">
                                            <img alt={item.image.fileName}
                                                 className="cart-cartItemImg"
                                                 src={item.image.url}
                                            />
                                        </div>
                                    </div>
                                    <div className="cart-container-outer">
                                        <div className="list-container-inner">{item.productName}</div>
                                    </div>
                                </div>
                            </div>
                        </div> :
                        <span>
                            <div>
                                <div className="warning-icon"><BiMessageError size={40}/></div>
                                <p className="click-to-shop">Je wishlist is leeg</p>
                                <div className="to-shop-link-container">
                                    <p className="click-to-shop">
                                        Klik&nbsp;
                                        <span>
                                            <NavLink to="/shop">
                                                <FcShop
                                                    className="shop-icon"
                                                    size={25}/>
                                                </NavLink>
                                            </span>
                                        &nbsp;om verder te winkelen
                                    </p>
                                </div>
                            </div>
                    </span>
                    }
                </div>
            </div>
        </>)
}

export default WishlistComponent;