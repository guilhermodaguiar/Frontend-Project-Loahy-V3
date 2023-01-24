import "./CheckoutSummary.css";

import React from "react";
import {HiEmojiHappy} from "react-icons/hi";

function CheckoutSummary() {

    //Hier komt de GET request van email adres en order id.

    return(
        <>
            <div>
                <h3> <HiEmojiHappy size={30}/>Bedankt voor je bestelling </h3>
                <p> Je bestelling wordt zo snel verwerkt. Je krijgt van ons een e-mail bericht</p>
            </div>
            <div>
                <div>
                    <div>Order nr</div>
                </div>
                <div>
                    <div> hier komt de order id</div>

                </div>
            </div>
        </>
    )
}

export default CheckoutSummary;