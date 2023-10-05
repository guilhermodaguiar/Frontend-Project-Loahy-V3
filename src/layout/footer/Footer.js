import "./Footer.css";

import React from "react";
import {FaCopyright, FaFacebook} from "react-icons/fa";
import {GoMarkGithub} from "react-icons/go";
import {RiInstagramFill} from "react-icons/ri";

function Footer() {
    return (<>
        <footer>
            <section className="copyright-container">
                <h5><FaCopyright/> 2022 Loahy Webdesign - Guilhermo d'Aguiar</h5>
            </section>
            <section className="footer-icons">
                <a href="https://www.instagram.com/loahytree/">
                    <RiInstagramFill className="instagram-icon" size={24}/>
                </a>
                &nbsp;
                <a href="https://www.facebook.com/Loahytree-109562478288311/?notif_id=1655164686624838&notif_t=aymt_page_post_reminder_14d_notification&ref=notif">
                    <FaFacebook className="facebook-icon" size={22}/>
                </a>
                &nbsp;
                <a href="https://github.com/guilhermodaguiar">
                    <GoMarkGithub className="github-icon" size={22}/>
                </a>
            </section>
        </footer>
    </>)
}

export default Footer;