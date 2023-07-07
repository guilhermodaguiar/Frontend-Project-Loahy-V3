import './ContactUs.css';

import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {IoListCircleSharp} from "react-icons/io5";
import RemoveButton from "../../buttonComponents/removeButton/RemoveButton";


function ContactUs() {
    const history = useHistory();
    const token = localStorage.getItem('token');
    const {user} = useContext(AuthContext);
    const [remarks, setRemarks] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchContactUsData() {
            try {
                const response = await axios.get(`http://localhost:8080/contact-remarks`, {
                    headers: {
                        "Content-Type": "application/json", "Authorization": `Bearer ${token}`,
                    }
                });
                setRemarks(response.data);
                console.log(response.data);
            } catch (e) {
                console.error('Er is iets misgegaan met het ophalen van remarks!', e);
            }
        }
        fetchContactUsData();
        return function cleanup() {
            controller.abort();
        }
    }, [token]);


    async function deleteRemark(contactEmail) {
        try {
            await axios.delete(`http://localhost:8080/contact-remarks/${contactEmail}`, {
                headers: {
                    "Content-Type": "application/json", "Authorization": `Bearer ${token}`,
                }
            })
        } catch (e) {
            console.error(e);
        }
        setTimeout(() => {
            history.push("/admin/profile");
        }, 300);
    }


    function removeRemark(contact) {
        const newRemarks = remarks.filter((i) => i.contactEmail !== contact.contactEmail);
        setRemarks(newRemarks);
    }

    return (<>
        {user.roles !== "ROLE_ADMIN" ? <h3>Moet ingelogd zijn als Admin</h3> : <>
            <h2 className="contact-us-header-container" id="contact_remarks">
                Opmerkingen&nbsp;<IoListCircleSharp size={30}/>
            </h2>
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
                                <RemoveButton onClick={() => {
                                    deleteRemark(contact.contactEmail).then();
                                    removeRemark(contact);
                                }}/>
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
        </>}
    </>)
}

export default ContactUs;