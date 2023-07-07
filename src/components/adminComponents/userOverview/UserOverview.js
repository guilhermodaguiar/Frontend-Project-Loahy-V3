import "./UserOverview.css"

import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import {FaUserCircle} from "react-icons/fa";
import {GiCrownedSkull} from "react-icons/gi";
import RemoveButton from "../../buttonComponents/removeButton/RemoveButton";


function UserOverview() {
    const token = localStorage.getItem('token');
    const {user} = useContext(AuthContext);
    const [users, setUsers] = useState([]);


    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get(`http://localhost:8080/users`,
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
            await axios.delete(`http://localhost:8080/users/${userEmail}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                })
        } catch (e) {
            console.error(e);
        }
    }

    function removeUser(user) {
        const newUsers = users.filter((i) => i.userEmail !== user.userEmail);
        setUsers(newUsers);
    }


    return (
        <>
            {user.roles !== "ROLE_ADMIN" ?
                <h3>Moet ingelogd zijn als Admin</h3>
                :
                <>
                    <div className="users-page-admin-element" id="all_users">
                        <h2 className="products-container">
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
                                        {user.userEmail === 'admin@test.nl' ?
                                            <GiCrownedSkull size={30}/>
                                            :
                                            <RemoveButton onClick={() => {
                                                deleteUser(user.userEmail).then();
                                                removeUser(user);
                                            }}/>
                                        }
                                    </td>
                                    <td>{user.userEmail}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.address.streetName}</td>
                                    <td>{user.address.houseNumber}</td>
                                    <td>{user.address.houseNumberAddition}</td>
                                    <td>{user.address.city}</td>
                                    <td>{user.address.zipcode}</td>
                                    <td>{user.address.phoneNumber}</td>
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