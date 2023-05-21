import "./UserOverview.css"

import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import {FaUserCircle} from "react-icons/fa";
import {useHistory} from "react-router-dom";
import {IoCloseSharp} from "react-icons/io5";

function UserOverview() {
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
            {user.roles !== "ROLE_ADMIN" ?
                <h3>Moet ingelogd zijn als Admin</h3>
                :
                <>
                    <div className="users-page-admin-element" id="all_customers">
                        <h2 className="my-products-container">
                            Klanten&nbsp;<FaUserCircle/>
                        </h2>
                        <table>
                            <thead>
                            <tr>
                                <th></th>
                                <th>email</th>
                                <th>Naam</th>
                                <th>Achternaam</th>
                                <th>Straat</th>
                                <th>#</th>
                                <th>Tvg</th>
                                <th>Woonplaats</th>
                                <th>Poscode</th>
                                <th>Mobiel</th>
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
                </>
            }
        </>
    )
}

export default UserOverview;