import './UserInformation.css';

import React, {useContext} from "react";
import {AuthContext} from "../../../context/AuthContext";

function UserInformation() {
    const {
        user: {
            user_first_name, user_last_name,
            address_street_name, address_house_number,
            address_house_number_add, address_city,
            address_zipcode, address_phone,
        }
    } = useContext(AuthContext);

    return (
        <>
            <div className="info-container">
                <div><strong>Voornaam:</strong> {user_first_name}</div>
                <div><strong>Achternaam:</strong> {user_last_name}</div>
                <div><strong>Straat:</strong> {address_street_name}</div>
                <div><strong>Huisnr:</strong> {address_house_number}</div>
                <div><strong>Toevoeging:</strong> {address_house_number_add}</div>
                <div><strong>Postcode:</strong> {address_zipcode} </div>
                <div><strong>Stad:</strong> {address_city}</div>
                <div><strong>Mobiel nummer:</strong> {address_phone}</div>
            </div>
        </>
    )
}

export default UserInformation;