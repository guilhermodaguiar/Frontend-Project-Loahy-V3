import React from "react";
import './Header.css';
import {HashLink as Link} from "react-router-hash-link";
import {BsShopWindow} from "react-icons/bs";

function Header() {

    return(
            <article className="inner-container">
                <div className="home-page" >
                    <h1>Loahy</h1>
                    <Link to="/#shop">
                        <button
                            type="button"
                        >
                            <BsShopWindow size={23}/>&nbsp; Shop nu
                        </button>
                    </Link>
                </div>
            </article>
    )
}

export default Header;