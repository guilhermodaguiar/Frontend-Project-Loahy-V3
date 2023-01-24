import React, {useContext} from "react";

import './CostumorPage.css';
import CustomerProfile from "../../components/customerComponents/customerProfile/CustomerProfile";
import ScrollIndicator from "../../helpers/scrollIndicator/ScrollIndicator";
import ScrollToTop from "../../helpers/scrollToTop/ScrollToTop";
import {AuthContext} from "../../context/AuthContext";


function CustomerPage() {
    const {user} = useContext(AuthContext);

    return (
        <>
            {(user.roles !== "ROLE_USER")  ? (
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
                    <ScrollIndicator/>
                    <ScrollToTop/>
                    <CustomerProfile/>
                </>
            )}
        </>
    )

}

export default CustomerPage;