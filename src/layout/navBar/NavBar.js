import React from "react";

import './NavBar.css';
import {NavLink} from "react-router-dom";
import {HashLink as Link} from "react-router-hash-link";
import {HiOutlineHeart, HiOutlineShoppingCart, HiOutlineUser} from "react-icons/hi";
import CartDropDown from "../../components/cartDropDownMenu/CartDropDown";
import {WishlistState} from "../../context/WishlistContext";
import {CartState} from "../../context/CartContext";


function NavBar() {
    const {state: { wishlist }} = WishlistState();
    const {state: { cart }} = CartState();



    return (
        <div className="inner-container">
            <nav>
                <ul className="navbar-list-options">
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/#shop">
                            Shop
                        </Link>
                    </li>
                    <li>
                        <Link to="/#our-story">
                            Ons verhaal
                        </Link>
                    </li>
                    <li>
                        <Link to="/#contact-us">
                            Contact
                        </Link>
                    </li>
                </ul>
                <ul className="navbar-list-icons">
                    <li>
                        <NavLink to="/shopping-cart" className="navbar-icon">
                            <div className="hover-icon">
                                <div>
                                    <HiOutlineShoppingCart
                                        className="cart-icon"
                                        size={22}/>
                                </div>
                                <div className="dropdown-content">
                                    <div className="cart-component-background">
                                        <CartDropDown/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {cart.length > 0 && <div className="rounded-circle">
                                    {cart.length}
                                </div>}
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/wishlist" className="navbar-icon">
                            <HiOutlineHeart
                                size={22}
                                className="wishlist-icon"
                            />
                            {wishlist.length > 0 && (<div className="rounded-circle-2">
                                {wishlist.length}
                            </div>)}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/user" className="navbar-icon">
                            <HiOutlineUser
                                size={22}
                                className="customer-icon"
                            />
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>)

}

export default NavBar;