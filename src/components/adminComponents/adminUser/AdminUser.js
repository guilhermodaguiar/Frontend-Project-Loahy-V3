import "./AdminUser.css"

import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import {FaUserCircle} from "react-icons/fa";
import {useHistory} from "react-router-dom";
import {IoCloseSharp} from "react-icons/io5";

function AdminUser() {
    const history = useHistory();
    const token = localStorage.getItem('token');
    const {user} = useContext(AuthContext);
    const [users, setUsers] = useState([]);


    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get(`http://localhost:8080/users/all`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                );
                setUsers(response.data);
                console.log(response.data);
            } catch (e) {
                console.error('Er is iets misgegaan!', e);
            }
        }

        fetchUsers();
    }, [token]);

    async function deleteUser(userEmail) {

        try {
            await axios.delete(`http://localhost:8080/users/delete/${userEmail}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                })
        } catch (e) {
            console.error(e);
        }
        setTimeout(() => {
            history.push("/admin/profile");
        }, 300);
    }


    return (
        <>
            {user.roles !== "ROLE_ADMIN" ? (
                    <div className="admin-route-container">
                        <div className="admin-route">
                            <h1>Moet ingelogd zijn als Admin</h1>
                        </div>
                    </div>
                )
                :
                (
                    <>
                        <div className="users-page-admin-element" id="all_customers">
                            <section className="Admin_UsersComponent">
                                <div>
                                    <h2 className="user-header-container">
                                        Klanten&nbsp;<FaUserCircle/>
                                    </h2>
                                </div>
                                <div className="table-content">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Verwijder</th>
                                            <th>email</th>
                                            <th>Voornaam</th>
                                            <th>Achternaam</th>
                                            <th>Straatnaam</th>
                                            <th>Huisnummer</th>
                                            <th>Toevoeging</th>
                                            <th>Postcode</th>
                                            <th>Woonplaats</th>
                                            <th>Telefoon</th>
                                        </tr>
                                        </thead>
                                        <tbody className="admin_tbody">
                                        {users.map((user) => {
                                            return <tr key={user.userEmail}>
                                                <td>
                                                    <button className="delete-button">
                                                        <IoCloseSharp
                                                            size={20}
                                                            onClick={() => deleteUser(user.userEmail)}
                                                        />
                                                    </button>
                                                </td>
                                                <td>{user.userEmail}</td>
                                                <td>{user.customer.customerFirstName}</td>
                                                <td>{user.customer.customerLastName}</td>
                                                <td>{user.customer.customerStreetName}</td>
                                                <td>{user.customer.customerHouseNumber}</td>
                                                <td>{user.customer.customerHouseNumberAddition}</td>
                                                <td>{user.customer.customerCity}</td>
                                                <td>{user.customer.customerZipcode}</td>
                                                <td>{user.customer.customerPhone}</td>
                                            </tr>
                                        })}
                                        </tbody>
                                    </table>
                                </div>

                            </section>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default AdminUser;