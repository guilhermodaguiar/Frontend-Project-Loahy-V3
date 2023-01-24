import './AboutUs.css'
import React from "react";
import Video from "../video/Video";
import kid_image from "./../../assets/Felipe_playing_Klein.png";
import kid_pirate from "./../../assets/Kid_playing_pirate Klein.png";
import owner_profile_pic from "./../../assets/me2_Klein.png";
import {FaRocket} from "react-icons/fa";
import {GiPirateFlag} from "react-icons/gi";
import {MdOutlineToys} from 'react-icons/md'


function AboutUs() {
    return (<>
        <main>
            <div className="outer-container">
                <div id="our-story">
                    <h1 className="title-about-us">Ons Verhaal</h1>
                </div>
                <div>
                    <article className="about-us-container">
                        <p>Loahy staat voor duurzaam en creatieve producten voor kinderen van alle leeftijden. Speelgoed om kinderen te stimuleren hun fantasie te gebruiken en hun vaardigheden te ontwikkelen.Na de geboorte van zijn zoon Felipe in 2017, besloot oprichter Guilhermo om op zoek te gaan naar de leukste kinderproducten die er zijn. Zo ontstond Loahy. De producten zijn met zorg geselecteerd en worden internationaal ingekocht. Mis je nog iets op de website? Laat het ons weten!</p>
                    </article>
                </div>
                <div className="inner-container-about-us">
                    <div className="video-spaceship">
                        <Video/>
                        <p className="p2"><FaRocket size={22}/>&nbsp;Blasting off to space</p>
                    </div>
                    <div className="image-kid-playing-with-toy">
                        <img src={kid_image} alt="kid-playing-with_loahy_toys"/>
                        <p className="p2"><MdOutlineToys size={22}/>&nbsp;Felipe playing with toys</p>
                    </div>
                    <div>
                        <img src={kid_pirate} alt="kid-playing-pirate"/>
                        <p className="p2"><GiPirateFlag size={22}/>&nbsp;Een klein piraat</p>
                    </div>
                    <div>
                        <img src={owner_profile_pic} alt="guilhermo-profile-pic"/>
                        <p className="p2">Guilhermo</p>
                    </div>
                </div>
            </div>
        </main>
    </>)
}

export default AboutUs;