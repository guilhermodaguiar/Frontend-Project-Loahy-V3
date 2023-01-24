import './CustomerInformation.css';

import React, {useContext} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {MdAccountCircle} from "react-icons/md";

function CustomerInformation() {
    const {
        user: {
            customer_firstname, customer_lastname,
            customer_street_name, customer_house_number,
            customer_house_number_add, customer_city,
            customer_zipcode, customer_phone,
        }
    } = useContext(AuthContext);

    return (
        <>
            <div>
                <div>
                    <section className="userprofile-page">
                        <h1 className="profile-header-container"><MdAccountCircle size={40}/>Profiel</h1>
                        <div className="userprofile-container">

                            <div className="info-container">
                                <div><strong>voornaam:</strong> {customer_firstname}</div>
                                <div><strong>Achternaam:</strong> {customer_lastname}</div>
                                <div><strong>Straat:</strong> {customer_street_name}</div>
                                <div><strong>Huisnr:</strong> {customer_house_number}</div>
                                <div><strong>toevoeging:</strong> {customer_house_number_add}</div>
                                <div><strong>postcode:</strong> {customer_zipcode} </div>
                                <div><strong>Stad:</strong> {customer_city}</div>
                                <div><strong>Mobiel nummer:</strong> {customer_phone}</div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </>
    )
}

export default CustomerInformation;