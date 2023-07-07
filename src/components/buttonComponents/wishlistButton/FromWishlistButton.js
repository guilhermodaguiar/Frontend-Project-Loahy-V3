import React from "react";
import {HiHeart} from "react-icons/hi";

function FromWishlistButton(props) {
    return (
        <>
            <div className="wishlist-heart">
                <HiHeart size={22}
                         className="remove-from-list-heart"
                         onClick={props.onClick}/>
            </div>

        </>
    )
}

export default FromWishlistButton;