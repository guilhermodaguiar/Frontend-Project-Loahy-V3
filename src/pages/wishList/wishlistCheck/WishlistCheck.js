import React, {useContext} from "react";
import {AuthContext} from "../../../context/AuthContext";
import WishList from "../wishList/WishList";


function WishlistCheck() {
    const {user} = useContext(AuthContext);

    console.log(user);

    return (
        <>
            {user.roles !== "ROLE_USER" ? (
                <div className="user-route-container">
                    <div className="user-route">
                        <h1>U moet ingelogd zijn als
                            <br/> CUSTOMER
                            <br/>om deze content te mogen zien..
                        </h1>
                    </div>
                </div>
            ) : (
                <>
                    <div>
                        <WishList/>
                    </div>
                </>
            )}
        </>
    )
}

export default WishlistCheck;
