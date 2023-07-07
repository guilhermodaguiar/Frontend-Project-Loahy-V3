import React from "react";
import {GiHeartMinus} from "react-icons/gi";

function ToWishlistButton(props) {
    return (<>
            <div className="wishlist-heart">
                <GiHeartMinus size={19}
                              className="add-to-list-heart"
                              onClick={props.onClick}
                />
            </div>
        </>)
}

export default ToWishlistButton;