import './UserNavBar.css'

import React, {useContext} from "react";
import {HashLink as Link} from "react-router-hash-link";
import {AuthContext} from "../../context/AuthContext";


function UserNavBar() {
    const {logout} = useContext(AuthContext);

    return (
        <>
            <section className="unbo-container">
                <div className="unbi-container">
                    <div className="container-for-padding">
                        <Link to="/user/profile/#profile">
                            Profiel
                        </Link>
                    </div>
                    <div className="container-for-padding">
                        <Link to="/user/profile/#change_password">
                            Wachtwoord
                        </Link>
                    </div>
                    <div className="container-for-padding">
                        <Link to="/user/profile/#user_update">
                            Profiel aanpassen
                        </Link>
                    </div>
                    <div className="container-for-padding">
                        <Link to="/user/profile/#wishlist">
                            verlanglijstje
                        </Link>
                    </div>
                </div>
                <div className="container-for-button">
                    <button type="button"
                            onClick={logout}>
                        Uitloggen
                    </button>
                </div>
            </section>
        </>
    )
}

export default UserNavBar
