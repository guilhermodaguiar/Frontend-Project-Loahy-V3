import './UserNavBar.css'

import React from "react";
import {HashLink as Link} from "react-router-hash-link";
import LogoutButton from "../../components/buttonComponents/logoutButon/LogoutButton";


function UserNavBar() {
    return (
        <>
            <section className="unbo-container">
                <div className="unbi-container">
                    <section className="container-for-padding">
                        <Link to="/user/profile/#profile">
                            Profiel
                        </Link>
                    </section>
                    <section className="container-for-padding">
                        <Link to="/user/profile/#change_password">
                            Wachtwoord
                        </Link>
                    </section>
                    <section className="container-for-padding">
                        <Link to="/user/profile/#user_update">
                            Profiel aanpassen
                        </Link>
                    </section>
                    <section className="container-for-padding">
                        <Link to="/user/profile/#wishlist">
                            verlanglijstje
                        </Link>
                    </section>
                </div>
                <div className="container-for-button">
                    <LogoutButton/>
                </div>
            </section>
        </>
    )
}

export default UserNavBar
