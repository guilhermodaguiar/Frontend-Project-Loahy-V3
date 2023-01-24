import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import axios from "axios";

function AdminAboutUs() {
    const token = localStorage.getItem('token');
    const {user} = useContext(AuthContext);

    const[aboutUs, setAboutUs] = useState([]);
    const [succes, updateSucces] = useState('');
    const [brandTitle, setBrandTitle] = useState('');
    const [brandStory, setBrandStory] = useState({});

    useEffect(() => {

        async function fetchAboutUsData() {

            try {
                const response = await axios.post(`http://localhost:8080/orders`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                );
                setAboutUs(response.data);

            } catch (e) {
                console.error('Error: Er is iets misgegaan!', e);
            }
        }
        fetchAboutUsData();

        return function cleanup() {
            token.cancel();
        }

    }, [token]);

    async function handleBrandSubmit() {

    }

    return(
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
                )
                :
                (<div className="about-us-page" id="admin-contact-us">
                    <form onSubmit={handleBrandSubmit}>
                        <section>
                            <label htmlFor="about-us-title">
                                Titel:
                                <input
                                    type="text"
                                    id="about-us-title"
                                    placeholder="type je titel"
                                    value={brandTitle}
                                    onChange={(e) => setBrandTitle(e.target.value)}
                                />
                            </label>
                            <label htmlFor="about-us-story">
                                <input
                                    type="text"
                                    id="about-us-story"
                                    placeholder="type je verhaal"
                                    value={brandStory}
                                    onChange={(e) => setBrandStory(e.target.value)}
                                />
                            </label>
                        </section>
                        {updateSucces === true && <p>Je "Over Ons!" pagina is up to date!</p>}
                        <button type="submit">Update</button>
                    </form>
                </div>)
            }
        </>
    )
}

export default AdminAboutUs;