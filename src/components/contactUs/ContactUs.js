import './ContactUs.css';

import React, {useState} from "react";
import {FaFacebook, FaInstagram} from "react-icons/fa";
import axios from "axios";
import {ReactComponent as KvK} from "../../assets/icons/kvk-logo.svg";
import {HiLocationMarker, HiOutlineMail, HiOutlinePhone} from "react-icons/hi";
import {FiSend} from "react-icons/fi";
import {useForm} from "react-hook-form";
import {AiFillRocket} from "react-icons/ai";

function ContactUs() {
    const [loading, toggleLoading] = useState(false);
    const [addSuccess, toggleAddSuccess] = useState(false);

    const {register, formState: {errors}, handleSubmit, reset} = useForm({
        defaultValues: {
            contact_name: '', contact_email: '', contact_phone: '', contact_org: '', remark: '',
        }
    })

    async function handleContactSubmit(data) {

        toggleLoading(true);
        try {
            await axios.post('http://localhost:8080/contact-remarks', {
                contactName: data.contact_name,
                contactEmail: data.contact_email,
                contactPhone: data.contact_phone,
                contactOrganisation: data.contact_org,
                contactRemark: data.remark,
            });
            reset();
            toggleAddSuccess(true);

        } catch (e) {
            console.error(e, "er is iets misgegaan");
        }
        toggleLoading(false);
    }

    return (<>
        <main>
            <article className="outer-container">
                <h1 id="contact-us">Contact ons</h1>
                <section className="contact-us-feedback">
                    <p>Wij houden van vragen en feedback - en we helpen iedereen zo graag! Hier zijn een aantal
                        manieren om ons te bereiken.</p>
                </section>
                <section className="contact-container">
                    <div className="remark-container">
                        <div>
                            <h3>Stuur ons een bericht</h3>
                            <p>Stuur ons een bericht en we reageren binnen 24 uur</p>

                            <form
                                className="c-form"
                                onSubmit={handleSubmit(handleContactSubmit)}>
                                <section>
                                    <div className="cus-containers">
                                        <input
                                            type="text"
                                            id="contact-fullName"
                                            autoComplete="off"
                                            {...register("contact_name", {
                                                required: "naam is verplicht", pattern: /^[a-z ,.'-]+$/i,
                                            })}
                                            placeholder="Naam"
                                        />
                                        <p>{errors.contact_name?.message}</p>

                                        <input className="section-email"
                                               type="email"
                                               autoComplete="off"
                                               {...register("contact_email", {
                                                   required: "email is verplicht",
                                                   pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                               })}
                                               placeholder="E-mailadres"
                                        />
                                        <p> {errors.contact_email?.message} </p>
                                    </div>

                                    <div className="cus-containers">
                                        <input
                                            type="tel"
                                            id="phone-number"
                                            autoComplete="off"
                                            {...register("contact_phone", {
                                                required: "mobiel nummer is verplicht",
                                            })}
                                            placeholder="mobiel"
                                        />
                                        <p> {errors.contact_phone?.message} </p>

                                        <input
                                            type="text"
                                            autoComplete="off"
                                            id="contact-fullName"
                                            placeholder="Bedrijf: Optioneel"
                                            {...register("contact_org", {
                                                required: false, pattern: /^[a-z ,.'-]+$/i,
                                            })}
                                        />
                                        <p> {errors.contact_org?.message} </p>
                                    </div>
                                </section>
                                <section className="cus-containers">
                                            <textarea
                                                id="remark-field"
                                                placeholder="Type hier je bericht"
                                                {...register("remark", {
                                                    required: "bericht is verplicht", pattern: /^[a-z ,.'-]+$/i,
                                                })}
                                                rows={7}
                                                cols={50}
                                            />
                                    <p> {errors.remark?.message} </p>
                                </section>

                                <button
                                    type="submit"
                                    disabled={loading}
                                ><FiSend/>&nbsp;verzend
                                </button>
                                {addSuccess === true && <p> <AiFillRocket size={25}/>Bedankt voor je bericht! Wij reageren binnen 24 uur </p>}

                            </form>
                        </div>
                    </div>
                    <div className="cus-information">
                        <h3>Contact Informatie</h3>
                        <p><KvK/>&nbsp;82072272</p>
                        <p><HiLocationMarker/>&nbsp;Balistraat 42, 3531PX, Utrecht</p>
                        <p><HiOutlineMail/>&nbsp;<a href="mailto:contact-ons@loahy.nl">contact-ons@loahy.nl</a></p>
                        <p><HiOutlinePhone/>&nbsp;<a href="tel:+31-06-30399190">06-30399190</a></p>
                        <div className="contact-us-icons">
                            <a className="instagram-icon" href="https://www.instagram.com/loahytree/">
                                <FaInstagram size={22}/>
                            </a>
                            &nbsp;
                            <a className="facebook-icon"
                               href="https://www.facebook.com/Loahytree-109562478288311/?notif_id=1655164686624838&
                                   notif_t=aymt_page_post_reminder_14d_notification&ref=notif">
                                <FaFacebook size={22}/>
                            </a>
                        </div>
                    </div>
                    <div className="contact-map">
                        <h3>GreenUp!</h3>
                        <p>Onze producten zijn ook verkrijgbaar bij GreenUp! warenhuis</p>
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
                </section>
            </article>
        </main>
    </>)
}

export default ContactUs;