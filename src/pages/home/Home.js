import React from "react";

import './Home.css';
import ItemOverview from "../../components/itemComponents/itemOverview/ItemOverview";
import AboutCompany from "../../components/aboutCompany/AboutCompany";
import ContactUsComponent from "../../components/contactUs/ContactUs";
import ScrollIndicator from "../../components/scrollIndicator/ScrollIndicator";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import Header from "../../layout/header/Header";
import NavBar from "../../layout/navBar/NavBar";

function Home() {

   window.scrollTo({
      top:0,
       behavior: 'smooth'
   })

    return(
        <>
            <NavBar/>
            <ScrollIndicator/>
            <ScrollToTop/>
            <Header/>
            <ItemOverview/>
            <AboutCompany/>
            <ContactUsComponent/>
        </>
    )
}

export default Home;