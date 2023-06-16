import React, {useContext} from "react";

import './UserPage.css';
import UserProfile from "../../../components/userComponents/userProfile/UserProfile";
import ScrollIndicator from "../../../helpers/scrollIndicator/ScrollIndicator";
import ScrollToTop from "../../../helpers/scrollToTop/ScrollToTop";
import {AuthContext} from "../../../context/AuthContext";


function UserPage() {
    const {user} = useContext(AuthContext);

    return (
        <>
            {(user.roles !== "ROLE_USER")  ?
                <h3>
                    U moet ingelogd zijn om deze content te mogen zien..
                </h3>
             :
                <>
                    <ScrollIndicator/>
                    <ScrollToTop/>
                    <UserProfile/>
                </>
            }
        </>
    )

}

export default UserPage;