import React from "react";
import './App.css';
import Footer from "./layout/footer/Footer";
import Routes from "./routing/Routes";
import NavBar from "./layout/navBar/NavBar";



function App() {
  return (
      <>
        <NavBar/>
        <Routes/>
        <Footer/>
      </>

  );
}

export default App;

