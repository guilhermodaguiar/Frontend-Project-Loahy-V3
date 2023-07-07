import './AdminNavBar.css';

import React from "react";
import {HashLink as Link} from "react-router-hash-link";
import LogoutButton from "../../components/buttonComponents/logoutButon/LogoutButton";

function AdminNavBar() {

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

                    <Link to="/admin/profile/#all_orders">
                        Orders
                    </Link>
                    <Link to="/admin/profile/#contact_remarks">
                        Opmerkingen
                    </Link>
                </div>
                <div className="container-for-button">
                    <LogoutButton/>
                </div>
            </section>
        </>
    )
}


export default AdminNavBar;

