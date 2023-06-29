import "./WishlistComponent.css"

import React, {useContext} from "react";
import {BiMessageError} from "react-icons/bi";
import {IoCloseSharp} from "react-icons/io5";
import {WishlistState} from "../../context/WishlistContext";
import ClickToShop from "../../helpers/ClickComponents/ClickToShop";
import {AuthContext} from "../../context/AuthContext";


function WishlistComponent({item}) {
    const {state2: {wishlist}, dispatch2} = WishlistState();
    const {user, isAuth} = useContext(AuthContext);

    console.log(item.productId);




    return (<>
        <div className="wishlist-outer-outer-container">
            <div>
                {wishlist.length > 0 ? <div className="notice-wrapper">
                    <div className="shopping-cart-outer-container">
                        <div className="shopping-cart-new-container">
                            <div className="cart-container-outer">
                                <div className="list-container-inner"
                                >
                                    <button className="remove-from-cart-button">
                                        <IoCloseSharp
                                            size={20}
                                            onClick={() => {
                                                dispatch2({
                                                    type: "REMOVE_FROM_WISHLIST", payload: {item}
                                                });
                                                dispatch2({
                                                    type: "DELETE_FROM_WISHLIST_BACKEND",
                                                    payload: {
                                                        item: item,
                                                        wishlist_id: user.wishlist_id,
                                                        isAuth: isAuth,
                                                    }
                                                });
                                            }}
                                        />
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
                </div> : <span>
                            <div>
                                <div className="warning-icon"><BiMessageError size={40}/></div>
                                <p className="click-to-shop">Je wishlist is leeg</p>
                                <ClickToShop/>
                            </div>
                    </span>}
            </div>
        </div>
    </>)
}

export default WishlistComponent;