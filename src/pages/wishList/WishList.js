import "./Wishlist.css";

import React, {useContext, useEffect} from "react";
import {BiMessageError} from "react-icons/bi";
import {NavLink} from "react-router-dom";
import {FcShop} from "react-icons/fc";
import {BsBookmarkHeart} from "react-icons/bs";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {WishlistState} from "../../context/WishlistContext";
import WishlistComponent from "./WishlistComponent";


function Wishlist() {
    const token =  localStorage.getItem('token');
    const {isAuth, user} = useContext(AuthContext);
    const {state4:{wishlist4}, dispatch4} = WishlistState();

    console.log(wishlist4);

    function handleSaveWishlist() {
        return null;
    }

    //GET request
    //wanneer er ingelogd wordt EN er bestaat een created wishlist --> dan fetch deze wishlist id met data.
    // data is dan JSON objecten / product_id(s)


    useEffect(() => {
        async function fetchWishlist(id) {
            try {
                const response= await axios.get(`http://localhost:8080/wishlists/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
                console.log(response);
                // set je data items uit de backend in een array of  object om zo te mappen.
                // setProductItems(response.data.wishlistId[0].data) <-- something like this.

            } catch (e) {
                console.error(e, 'er is iets misgegaan met het fetchen van wishlist data')
            }
        }
        fetchWishlist();
    }, [token]);



    // POST request
    //wanneer er nog geen wishlist bestaat, dan laat er een create wishlist button zijn met daarin een form:
    //form bevat data: JSON wordt gestuurd.

    // async function creatWishlist() {
    //     try {
    //         await axios.post('http://localhost:8080/wishlists/create', {
    //             wishlistName: wishlist_name
    //         });
    //     } catch (e) {
    //         console.error(e, 'er is iets misgegaan met het creëren van wishlist')
    //     }
    // }


    //UPDATE request
    //wanneer er op de opslaan button wordt geclicked moet er een request worden gestuurd naar de backend met de
    //nodige product_id en om de wishlist_id dat verkregen wordt vanuit de backend te updaten.

    async function updateWishlist() {
        try {
            await axios.put('http://localhost:8080/wishlists/', {

            });
        } catch (e) {
            console.error(e, 'er is iets misgegaan met het opslaan van wishlist')
        }
    }


    return (
        <>
            <div className="wishlist-page">
                {!isAuth ?
                    <h1 className="wishlist-h1">Verlanglijst</h1> :
                    <h1 className="wishlist-h1"> {user.customer_firstname}'s Verlanglijst</h1>
                }
            </div>
            <div className="wishlist-outer-outer-container">
                {!isAuth ?
                    <div>
                        <div><BiMessageError size={40}/></div>
                        <div> Je moet ingelogd zijn om bestellen</div>
                        <div> Klik&nbsp;
                            <NavLink to="/user">
                                hier
                            </NavLink>
                            &nbsp;om in te loggen of om te registreren
                        </div>

                        <div className="to-shop">
                            <p>Klik&nbsp;
                                <span>
                                    <NavLink to="/#shop">
                                        <FcShop size={25}/>
                                    </NavLink>
                                </span>
                                &nbsp;om verder te winkelen
                            </p>
                        </div>
                    </div>
                    :
                    <div className="wishlist-outer-outer-container">
                        <div className="wishlist-outer-outer-container">
                            {wishlist4.map((item) => {
                                return <WishlistComponent
                                    key={item.productId}
                                    item={item}
                                />
                            })}
                            <div className="wishlist-outer-outer-container">
                                <div>
                                    {wishlist4.length > 0 &&
                                        <button className="cart-checkout-button"
                                                onClick={handleSaveWishlist}
                                        >
                                            <BsBookmarkHeart size={22}/>&nbsp;<p>Opslaan</p>
                                        </button>}
                                </div>
                                <button onClick={dispatch4({type: "CLEAR_WISHLIST4"})}>
                                    verwijder lijst
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Wishlist;