import './AdminContactUs.css';

import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {IoCloseSharp, IoListCircleSharp} from "react-icons/io5";


function AdminContactUs() {
    const history = useHistory();
    const token = localStorage.getItem('token');
    const {user} = useContext(AuthContext);
    const [remarks, setRemarks] = useState([]);

    useEffect(() => {

        async function fetchContactUsData() {

            try {
                const response = await axios.get(`http://localhost:8080/contact-remarks/all`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                );
                setRemarks(response.data);
                console.log(response.data);
            } catch (e) {
                console.error('Er is iets misgegaan!', e);
            }
        }

        fetchContactUsData();
    }, [token]);

    async function deleteRemark(contactEmail) {
        try {
            await axios.delete(`http://localhost:8080/contact-remarks/${contactEmail}`,
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
                    <div className="contact-page" id="all_contact_remarks">
                        <div>
                            <h2 className="contact-us-header-container">
                                Contact&nbsp;<IoListCircleSharp size={30}/>
                            </h2>
                        </div>
                        <section>
                            <table>
                                <thead>
                                <tr>
                                    <th className="contact-delete"></th>
                                    <th className="contact-name">Naam</th>
                                    <th className="contact-email">E-mailadres</th>
                                    <th className="contact-phone">Telefoonnummer</th>
                                    <th className="contact-organisation">Organisatie</th>
                                    <th className="contact-remark-field">Onderwerp</th>
                                </tr>
                                </thead>
                                <tbody>
                                {remarks.map((contact) => {
                                    return <tr key={contact.contactEmail}>
                                        <td>
                                            <button className="delete-button">
                                                <IoCloseSharp
                                                    size={20}
                                                    onClick={() => deleteRemark(contact.contactEmail)}
                                                />
                                            </button>
                                        </td>
                                        <td>{contact.contactName}</td>
                                        <td>{contact.contactEmail}</td>
                                        <td>{contact.contactPhone}</td>
                                        <td>{contact.contactOrganisation}</td>
                                        <td>{contact.contactRemark}</td>
                                    </tr>
                                })}
                                </tbody>
                            </table>
                        </section>
                    </div>
                )
            }
        </>
    )
}

export default AdminContactUs;