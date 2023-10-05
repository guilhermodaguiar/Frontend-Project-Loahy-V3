import "./WishlistComponent.css"

import React, {useContext} from "react";
import {BiMessageError} from "react-icons/bi";
import {WishlistState} from "../../context/WishlistContext";
import ClickToShop from "../../components/ClickComponents/ClickToShop";
import {AuthContext} from "../../context/AuthContext";
import RemoveButton from "../../components/buttonComponents/removeButton/RemoveButton";


function WishlistComponent({item}) {
    const {state2: {wishlist}, dispatch2} = WishlistState();
    const {user, isAuth} = useContext(AuthContext);

    return (<>
        {wishlist.length > 0 ? <div className="notice-wrapper">
                <div className="shopping-cart-outer-container">
                    <div className="shopping-cart-new-container">
                        <div className="cart-container-outer">
                            <div className="list-container-inner"
                            >
                                <RemoveButton onClick={() => {
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
                                }}/>
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
                        <ClickToShop/>
                    </div>
                </span>
        }
    </>)
}

export default WishlistComponent;