import React from "react";
import {NavLink} from "react-router-dom";
import {FcShop} from "react-icons/fc";
import {BiMessageError} from "react-icons/bi";

function ClickToShop() {
    return (<>
        <article>
            <BiMessageError size={40}/>
            <section> Je moet ingelogd zijn om bestellen</section>
            <section> Klik&nbsp;
                <NavLink to="/user">
                    hier
                </NavLink>
                &nbsp;om in te loggen of om te registreren
            </section>
            <section>
                <p className="item-to-shop">
                    Klik&nbsp;<span>
                    <NavLink to="/#shop">
                        <FcShop size={25}/>
                    </NavLink>
                </span>
                    &nbsp;om verder te winkelen
                </p>
            </section>
        </article>
    </>)
}

export default ClickToShop;