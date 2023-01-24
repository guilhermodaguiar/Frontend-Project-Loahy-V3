import "./AdminProfile.css";
import React, {useContext} from 'react';
import {AuthContext} from "../../../context/AuthContext";


function AdminProfile() {

    const {user} = useContext(AuthContext);

    return (
        <>
            <div>
                <section id="admin-profile">
                    <h2>Gegevens</h2>
                    <p><strong>Admin Email:</strong> {user.userEmail}</p>
                </section>
                <section>
                    <p> hier uitloggen</p>
                    <button type="button" onClick={user.logout}>
                        Uitloggen
                    </button>
                </section>
            </div>
        </>
    )
}

export default AdminProfile;