import './ContactUs.css';
import React, {useState} from "react";
import {FaFacebook, FaInstagram} from "react-icons/fa";
import axios from "axios";
import {ReactComponent as KvK} from "../../assets/icons/kvk-logo.svg";
import {HiLocationMarker, HiOutlineMail, HiOutlinePhone} from "react-icons/hi";
import {FiSend} from "react-icons/fi";


function ContactUs() {
    const [remark, setRemark] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactOrg, setContactOrg] = useState('');

    //state voor functionaliteiten
    const [loading, toggleLoading] = useState(false);
    const [addSuccess, toggleAddSuccess] = useState(false);
    const [contactInput, setContactInput] = useState([]);


    async function handleContactSubmit(e) {
        e.preventDefault(e);
        toggleLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/contact-remarks/create', {
                contactName: contactName,
                contactEmail: contactEmail,
                contactPhone: contactPhone,
                contactOrganisation: contactOrg,
                remark: remark,
            });
            setContactInput(response.data);
            toggleAddSuccess(true);

        } catch (e) {
            console.error(e, "er is iets misgegaan");
        }
        toggleLoading(false);
    }

    return (
        <>
            <main>
                <div className="contact-us-outer-container">
                    <div className="contact-us-outer-container-header">
                        <h1 id="contact-us">Contact ons</h1>
                    </div>
                    <div className="contact-us-feedback">
                        <p>Wij houden van vragen en feedback - en we helpen iedereen zo graag! Hier zijn een aantal
                            manieren om ons te bereiken.</p>
                    </div>
                    <div className="flex-container">
                        <div className="contact-us-inner-container">
                            <div className="contact-us-contact-us">
                                <div>
                                    <h3>Stuur ons een bericht</h3>
                                    <p className="just-a-p">Stuur ons een bericht en we reageren binnen 24 uur</p>
                                    <form
                                        className="container-contact-form"
                                        onSubmit={handleContactSubmit}>
                                        <div>
                                            <div className="contact-us-section-containers">
                                                <section>
                                                    <div>Naam:</div>
                                                    <input
                                                        className="input-containers"
                                                        type="text"
                                                        id="contact-fullName"
                                                        autoComplete="off"
                                                        placeholder="Naam en achternaam"
                                                        value={contactName}
                                                        onChange={(e) => setContactName(e.target.value)}
                                                        required
                                                    />
                                                </section>
                                                <section className="section-email">
                                                    <div>E-mailadres:</div>
                                                    <input
                                                        className="input-containers"
                                                        autoComplete="off"
                                                        type="email"
                                                        id="contact-email"
                                                        value={contactEmail}
                                                        onChange={(e) => setContactEmail(e.target.value)}
                                                        required
                                                    />
                                                </section>
                                            </div>
                                            <div className="contact-us-section-containers">
                                                <section>
                                                    <div>Telefoonnummer:</div>
                                                    <input
                                                        className="input-containers"
                                                        autoComplete="off"
                                                        type="tel"
                                                        id="contact-phone"
                                                        value={contactPhone}
                                                        onChange={(e) => setContactPhone(e.target.value)}
                                                        pattern="[0-9]{10}"
                                                        required
                                                    />
                                                </section>
                                                <section className="section-organisation">
                                                    <div>Organisatie:</div>
                                                    <input
                                                        className="input-containers"
                                                        type="text"
                                                        autoComplete="off"
                                                        id="contact-fullName"
                                                        placeholder="Optioneel"
                                                        value={contactOrg}
                                                        onChange={(e) => setContactOrg(e.target.value)}
                                                    />
                                                </section>
                                            </div>
                                        </div>
                                        <div className="contact-us-section-containers">
                                            <section>
                                            <textarea
                                                name="remark"
                                                id="remark-field"
                                                placeholder="Type hier je bericht"
                                                autoComplete="off"
                                                value={remark}
                                                onChange={(e) => setRemark(e.target.value)}
                                                rows={7}
                                                cols={50}
                                                required
                                            />
                                            </section>
                                        </div>
                                        <button
                                            type="submit"
                                            className="form-button-send-form"
                                            disabled={loading}
                                        ><FiSend/>&nbsp;verzend
                                        </button>
                                        {addSuccess === true &&
                                            <p>Bedankt voor je bericht! Wij reageren binnen 24 uur </p>}
                                    </form>
                                </div>
                            </div>
                            <div className="contact-us-border-container">
                                <div className="contact-us-information">
                                    <h3>Contact Informatie</h3>
                                    <div className="contact-us-information-list-contact">
                                        <p className="just_a-p"><KvK className="Kvk-icon"/>&nbsp;82072272</p>
                                        <p className="just_a-p"><HiLocationMarker/>&nbsp;Balistraat 42, 3531PX, Utrecht</p>
                                        <p className="just_a-p"><HiOutlineMail/>&nbsp;<a href="mailto:contact-ons@loahy.nl">contact-ons@loahy.nl</a></p>
                                        <p className="just_a-p"><HiOutlinePhone/>&nbsp;<a href="tel:+31-06-30399190">06-30399190</a></p>
                                    </div>
                                </div>
                                <div className="contact-us-icons">
                                    <div>
                                        <a className="instagram-icon" href="https://www.instagram.com/loahytree/">
                                            <FaInstagram size={22}/>
                                        </a>
                                    </div>
                                    &nbsp;
                                    <div>
                                        <a className="facebook-icon"
                                           href="https://www.facebook.com/Loahytree-109562478288311/?notif_id=1655164686624838&notif_t=aymt_page_post_reminder_14d_notification&ref=notif">
                                            <FaFacebook size={22}/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-map">
                                <div className="green-up-container">
                                    <h3>GreenUp!</h3>
                                </div>
                                <div className="green-up-container">
                                    <p>Onze producten zijn ook verkrijgbaar bij GreenUp! warenhuis</p>
                                </div>
                                <div className="green-up">
                                    <iframe
                                        title="green-up-warenhuis"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2451.358835162259!2d5.
                                    117260715725428!3d52.09140067973533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.
                                    1!3m3!1m2!1s0x47c66fea5f7de223%3A0x74bc5e881f872feb!2sGreen%20UP!5e0!3m2!1snl!2snl!
                                    4v1665526748126!5m2!1snl!2snl"
                                        width="290"
                                        height="290"
                                        style={{border: 0}}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade">
                                    </iframe>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ContactUs;