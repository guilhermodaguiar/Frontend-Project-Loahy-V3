import './AdminPage.css';

import React, {useContext} from "react";
import UpdateProduct from "../../components/adminComponents/updateProduct/UpdateProduct";
import ScrollIndicator from "../../helpers/scrollIndicator/ScrollIndicator";
import ScrollToTop from "../../helpers/scrollToTop/ScrollToTop";
import {AuthContext} from "../../context/AuthContext";
import AdminNavBar from "../../layout/adminNavBar/AdminNavBar";
import ProductOverview from "../../components/adminComponents/productOverview/ProductOverview";
import UserOverview from "../../components/adminComponents/userOverview/UserOverview";
import ContactUs from "../../components/adminComponents/contactUs/ContactUs";
import CreateProduct from "../../components/adminComponents/createProduct/CreateProduct";
import OrderOverview from "../../components/adminComponents/orderOverview/OrderOverview";
import AboutCompany from "../../components/adminComponents/aboutCompany/AboutCompany";


function AdminPage() {
    const {user, logout} = useContext(AuthContext);


    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    return (
        <>
            {user.roles !== "ROLE_ADMIN" ? (
                <div className="admin-route-container">
                    <div className="admin-route">
                        <h1>U moet ingelogd zijn als
                            <br/> ADMINISTRATOR
                            <br/>om deze content te mogen zien..
                        </h1>
                    </div>
                </div>
            ) : (
                <>
                    <div className="admin-header">
                        <h1>Welcome Admin</h1>
                    </div>
                    <div className="admin-navbar-container">
                        <AdminNavBar/>
                    </div>
                    <div className="admin-main">
                        <ScrollIndicator/>
                        <ScrollToTop/>
                        <section>
                            <AboutCompany/>
                        </section>
                        <section>
                            <ProductOverview/>
                        </section>
                        <section>
                            <CreateProduct/>
                        </section>
                        <section>
                            <UpdateProduct/>
                        </section>
                        <section>
                            <UserOverview/>
                        </section>
                        <section>
                            <OrderOverview/>
                        </section>
                        <section>
                            <ContactUs/>
                        </section>
                        <div>
                            <button
                                className="logout-button"
                                type="button"
                                onClick={logout}>
                                Uitloggen
                            </button>
                        </div>
                    </div>
                </>
            )
            }
        </>
    )
}


export default AdminPage