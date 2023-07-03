import './AdminNavBar.css';

import React, {useContext} from "react";
import {HashLink as Link} from "react-router-hash-link";
import {AuthContext} from "../../context/AuthContext";

function AdminNavBar() {
    const {logout} = useContext(AuthContext);

    return (
        <>
            <section className="ad-navb-outer">
                <div className="ad-navb-inner">
                    <Link to="/admin/profile/#product_overview">
                        Mijn producten
                    </Link>

                    <Link to="/admin/profile/#add_new_product">
                        Product toevoegen
                    </Link>

                    <Link to="/admin/profile/#update_product">
                        Product aanpassen
                    </Link>

                    <Link to="/admin/profile/#all_users">
                        Klanten
                    </Link>

                    <Link to="/admin/profile/#orders">
                        Orders
                    </Link>
                    <Link to="/admin/profile/#contact_remarks">
                        Contact
                    </Link>
                </div>
                <div className="container-for-button">
                    <button className="logout-button"
                            type="button"
                            onClick={logout}>
                        Uitloggen
                    </button>
                </div>
            </section>
        </>
    )
}


export default AdminNavBar;

