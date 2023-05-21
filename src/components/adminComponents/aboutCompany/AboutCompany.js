import "./AboutCompany.css";

import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import {RiErrorWarningLine, RiLoginCircleFill} from "react-icons/ri";

function AboutCompany() {
    const history = useHistory();
    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('token');

    const [aboutLoahy, setAboutLoahy] = useState('');
    const [companyInfo, setCompanyInfo] = useState('');
    const [loading, toggleLoading] = useState(false);


    useEffect(() => {
        async function fetchData() {
            toggleLoading(false);
            try {
                const response = await axios.get(`http://localhost:8080/about-company/loahy`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                console.log(response);
                setAboutLoahy(response.data.information);
                toggleLoading(true);
            } catch (e) {
                console.error('er is iets misgegaan met get request', e);
            }
        }
        fetchData();
    }, [token]);


    async function updateData() {
        toggleLoading(false);
        try {
            await axios.put(`http://localhost:8080/about-company/update`,
                {
                    information: companyInfo
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                    }
                }).then(updatedCompanyInfo).then(toggleLoading(true));
        } catch (e) {
            console.error('er is iets misgegaan met update request', e)
        }
    }

    function updatedCompanyInfo() {
        history.push('/admin/profile')
    }


    return (
        <>
            {user.roles !== "ROLE_ADMIN" ?
                <h3>Moet ingelogd zijn als Admin</h3>
                :
                <>
                    <div id="company_overview">
                        <h2 className="update-item-header-container">
                            Product Aanpassen
                        </h2>
                        <div className="update-item-container">
                            <p>Pas hier je product</p>
                            <RiErrorWarningLine size={20}/>
                            <p>Alle velden moeten verplicht ingevuld worden!! </p>
                            <p>Vul het Product nummer Product nummer vindt je in Mijn
                                producten(link) </p>
                        </div>
                        <table>
                            <thead>
                            <tr>
                                <th>Naam</th>
                                <th>Beschrijving</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Loahy</td>
                                <td>{aboutLoahy}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h2 className="update-item-header-container">
                            Bedrijf informatie aanpassen
                        </h2>
                        <div className="update-item-container">
                            <p>Pas hier je informatie over Loahy</p>
                        </div>
                        <form onSubmit={updateData}>
                            <input
                                id="company-information-field"
                                type="text"
                                placeholder="beschrijving"
                                name="description"
                                value={companyInfo}
                                onChange={(e) => setCompanyInfo(e.target.value)}
                                rows={3}
                                cols={20}
                                required
                            />
                            <button
                                type="submit"
                                className="form-button-login"
                                disabled={loading}
                            >
                                <RiLoginCircleFill/>&nbsp;Registreren
                            </button>
                        </form>
                    </div>
                </>
            }
        </>
    )
}

export default AboutCompany;