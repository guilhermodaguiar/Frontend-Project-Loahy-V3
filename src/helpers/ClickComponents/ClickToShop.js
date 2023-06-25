

import React from "react";
import {NavLink} from "react-router-dom";
import {FcShop} from "react-icons/fc";

function ClickToShop() {
    return(
        <>
            <div>
                <p className="item-to-shop">
                    Klik&nbsp;
                    <span>
                                    <NavLink to="/#shop">
                                        <FcShop size={25}/>
                                    </NavLink>
                                </span>
                    &nbsp;om verder te winkelen
                </p>
            </div>

        </>
    )
}

export default ClickToShop;