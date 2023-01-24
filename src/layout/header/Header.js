import React from "react";
import './Header.css';
import {HashLink as Link} from "react-router-hash-link";
import {BsShopWindow} from "react-icons/bs";

function Header() {

    return(
        <>
            <div className="inner-container">
                <div className="home-page" >
                    <h1>Loahy</h1>
                    <Link to="/#shop">
                        <button
                            type="button"
                            className="button-to-shopping-page"
                            onClick={() => console.log("Jij wil shoppen!")}
                        ><BsShopWindow size={23}/>&nbsp; Shop nu
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Header;