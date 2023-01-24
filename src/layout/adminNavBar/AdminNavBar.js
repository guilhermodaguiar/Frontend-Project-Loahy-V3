import './AdminNavBar.css';

import React, {useContext} from "react";
import {HashLink as Link} from "react-router-hash-link";
import {AuthContext} from "../../context/AuthContext";

function AdminNavBar() {
const {logout} = useContext(AuthContext);

    return(
        <>
            <section className="admin-nav-bar-outer-container">
                <div className="admin-nav-bar-inner-container">
                    <div className="container-for-padding">
                        <Link to="/admin/profile/#admin_product_overview">
                            Mijn producten
                        </Link>
                    </div>
                    <div className="container-for-padding">
                        <Link to="/admin/profile/#admin_add_new_product">
                            Product toevoegen
                        </Link>
                    </div>
                    <div className="container-for-padding">
                        <Link to="/admin/profile/#admin_update_product">
                            Product aanpassen
                        </Link>
                    </div>
                    <div className="container-for-padding">
                        <Link to="/admin/profile/#all_customers">
                            Klanten
                        </Link>
                    </div>
                    <div className="container-for-padding">
                        <Link to="/admin/profile/#all_orders">
                            Orders
                        </Link>
                    </div>
                    <div className="container-for-padding">
                        <Link to="/admin/profile/#all_contact_remarks">
                            Contact
                        </Link>
                    </div>
                </div>
                <div className="container-for-button">
                    <button className="logout-button"
                            type="button"
                            onClick={logout} >
                        Uitloggen
                    </button>
                </div>
            </section>
        </>
    )
}


export default AdminNavBar;

