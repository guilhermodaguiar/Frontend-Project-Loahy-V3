import "./CustomerRegister.css";

import React, {useEffect, useRef, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import axios from "axios";
import {MdAccountCircle} from "react-icons/md";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import {BsFillPencilFill} from "react-icons/bs";
import {IoIosAddCircle, IoMdLogIn} from "react-icons/io";


const NAME_REGEX = /^[a-z ,.'-]+$/i;
const NUMBER_REGEX = /^[0-9]+$/;
const DUTCH_PHONE_REGEX = /^\(?([+]31|0031|0)-?6(\s?|-)([0-9]\s{0,3}){8}$/;
const DUTCH_ZIPCODE_REGEX = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;


function CustomerRegister({customer}) {
    const history = useHistory();
    const email = customer

    const [successWishlist, toggleSuccessWishlist] = useState(false);

    const [wishlistName, setWishlistName] = useState('');

    const userRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [street, setStreet] = useState('');
    const [validStreet, setValidStreet] = useState(false);
    const [streetFocus, setStreetFocus] = useState(false);

    const [houseNumber, setHouseNumber] = useState('');
    const [validHouseNumber, setValidHouseNumber] = useState(false);
    const [houseNumberFocus, setHouseNumberFocus] = useState(false);

    const [houseNumberAdd, setHouseNumberAdd] = useState('');

    const [city, setCity] = useState('');
    const [validCity, setValidCity] = useState(false);
    const [cityFocus, setCityFocus] = useState(false);

    const [zipcode, setZipcode] = useState('');
    const [validZipcode, setValidZipcode] = useState(false);
    const [zipcodeFocus, setZipcodeFocus] = useState(false);

    const [phone, setPhone] = useState(0);
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [success, toggleSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidFirstName(NAME_REGEX.test(firstName));
    }, [firstName]);

    useEffect(() => {
        setValidLastName(NAME_REGEX.test(lastName));
    }, [lastName]);

    useEffect(() => {
        setValidStreet(NAME_REGEX.test(street));
    }, [street]);

    useEffect(() => {
        setValidHouseNumber(NUMBER_REGEX.test(houseNumber));
    }, [houseNumber]);

    useEffect(() => {
        setValidCity(NAME_REGEX.test(city));
    }, [city]);

    useEffect(() => {
        setValidZipcode(DUTCH_ZIPCODE_REGEX.test(zipcode));
    }, [zipcode]);

    useEffect(() => {
        setValidPhone(DUTCH_PHONE_REGEX.test(phone));
    }, [phone]);

    useEffect(() => {
        setErrorMessage('');
    }, [firstName, lastName, street, houseNumber, houseNumberAdd, city, zipcode, phone]);


    async function createNewWishlist(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/users/${email}/wishlist`,
                {
                    wishlistName: wishlistName,
                })
            console.log(response.data);
            toggleSuccessWishlist(true);

        } catch (e) {
            console.error(e, "er is iets misgegaan");
        }
    }

    async function assignCustomerToUser() {


        try {
            const response = await axios.post(`http://localhost:8080/users/${email}/customer`, {
                customerFirstName: firstName,
                customerLastName: lastName,
                customerStreetName: street,
                customerHouseNumber: houseNumber,
                customerHouseNumberAddition: houseNumberAdd,
                customerCity: city,
                customerZipcode: zipcode,
                customerPhone: phone,
            })

            console.log(response.data);
            toggleSuccess(true);

            setTimeout(() => {

                history.push('/customer/login');
            }, 2000);

        } catch (e) {
            console.error(e, 'er is iets misgegaan met registreren');
        }
    }


    return (
        <>
            <>
                {success ? (
                    <section className="block-new-user-created-with-succes">
                        <div>
                            gelukt! je kan nu inloggen
                        </div>
                            <NavLink to="/customer/login">klik dan hier!</NavLink>
                    </section>) : (
                    <div>
                        <div className="customer-register-page">
                            <h1 className="header-name">Registreren</h1>
                        </div>
                        <div className="customer-register-outer-container">
                            <div>
                                <h3 className="customer-h3-header"><MdAccountCircle size={36}/>
                                    &nbsp;Loahy account aanmaken: stap 2
                                </h3>
                            </div>
                            <div className="customer-inner-container">
                                {successWishlist ? (
                                    <>
                                        <div>
                                            gelukt! ga verder met registreren
                                        </div>
                                    </>
                                    ) : (
                                    <>
                                        <div>
                                        Creer eerst een wishlist naam om items toe te voegen aan jou wishlist.
                                        <form
                                            className="create-wishlist-form"
                                            onSubmit={createNewWishlist}
                                        >
                                            <label className="label-wishlist" htmlFor="listName-field">
                                                Voer een Wishlist naam in
                                                <input
                                                    type="text"
                                                    id="listName-field"
                                                    name="name"
                                                    value={wishlistName}
                                                    onChange={(e) => setWishlistName(e.target.value)}
                                                />
                                            </label>
                                            <div className="button-container">
                                                <button
                                                    type="submit"
                                                    className="form-create-product-button"
                                                >
                                                    <IoIosAddCircle/> Maak aan
                                                </button>
                                            </div>
                                        </form>
                                    </div></>
                                    )}

                                <div className="register-body">
                                    <section className="block-new-costumer">
                                        <p ref={errRef} className={errorMessage ? "err-msg" : "offscreen"}
                                           aria-live="assertive">{errorMessage}</p>

                                        <form
                                            className="form-container-register"
                                            onSubmit={assignCustomerToUser}>


                                            <section className="first-name">
                                                <label>
                                                    Voornaam:
                                                    <FontAwesomeIcon icon={faCheck}
                                                                     className={validFirstName ? "valid" : "hide"}/>
                                                    <FontAwesomeIcon icon={faTimes}
                                                                     className={validFirstName || !firstName ? "hide" : "invalid"}/>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="firstname"
                                                    ref={userRef}
                                                    autoComplete="off"
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    value={firstName}
                                                    required
                                                    aria-invalid={validFirstName ? "false" : "true"}
                                                    aria-describedby="user-firstname-note"
                                                    onFocus={() => setFirstNameFocus(true)}
                                                    onBlur={() => setFirstNameFocus(false)}
                                                />

                                                <p id="firstname-note"
                                                   className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>
                                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                                    Voornaam is verplicht!<br/>
                                                </p>
                                            </section>
                                            <section className="last-name">
                                                <label>
                                                    Achternaam:
                                                    <FontAwesomeIcon icon={faCheck}
                                                                     className={validLastName ? "valid" : "hide"}/>
                                                    <FontAwesomeIcon icon={faTimes}
                                                                     className={validLastName || !lastName ? "hide" : "invalid"}/>
                                                </label>


                                                <input
                                                    type="text"
                                                    id="lastname"
                                                    ref={userRef}
                                                    autoComplete="off"
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    value={lastName}
                                                    required
                                                    aria-invalid={validLastName ? "false" : "true"}
                                                    aria-describedby="user-lastname-note"
                                                    onFocus={() => setLastNameFocus(true)}
                                                    onBlur={() => setLastNameFocus(false)}
                                                />

                                                <p id="lastname-note"
                                                   className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>
                                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                                    Achternaam is verplicht!<br/>
                                                </p>
                                            </section>
                                            <section className="street-name">
                                                <label>
                                                    Straatnaam:
                                                    <FontAwesomeIcon icon={faCheck}
                                                                     className={validStreet ? "valid" : "hide"}/>
                                                    <FontAwesomeIcon icon={faTimes}
                                                                     className={validStreet || !street ? "hide" : "invalid"}/>
                                                </label>


                                                <input
                                                    type="text"
                                                    id="street-name"
                                                    ref={userRef}
                                                    autoComplete="off"
                                                    onChange={(e) => setStreet(e.target.value)}
                                                    value={street}
                                                    required
                                                    aria-invalid={validStreet ? "false" : "true"}
                                                    aria-describedby="user-street-name-note"
                                                    onFocus={() => setStreetFocus(true)}
                                                    onBlur={() => setStreetFocus(false)}
                                                />

                                                <p id="street-name-note"
                                                   className={streetFocus && street && !validStreet ? "instructions" : "offscreen"}>
                                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                                    Straatnaam is verplicht!<br/>
                                                </p>
                                            </section>
                                            <section className="house-number">
                                                <label>
                                                    Huisnummer:
                                                    <FontAwesomeIcon icon={faCheck}
                                                                     className={validHouseNumber ? "valid" : "hide"}/>
                                                    <FontAwesomeIcon icon={faTimes}
                                                                     className={validHouseNumber || !houseNumber ? "hide" : "invalid"}/>
                                                </label>


                                                <input
                                                    type="text"
                                                    id="house-number"
                                                    ref={userRef}
                                                    autoComplete="off"
                                                    onChange={(e) => setHouseNumber(e.target.value)}
                                                    value={houseNumber}
                                                    required
                                                    aria-invalid={validHouseNumber ? "false" : "true"}
                                                    aria-describedby="user-house-number-note"
                                                    onFocus={() => setHouseNumberFocus(true)}
                                                    onBlur={() => setHouseNumberFocus(false)}
                                                />

                                                <p id="house-number-note"
                                                   className={houseNumberFocus && houseNumber && !validHouseNumber ? "instructions" : "offscreen"}>
                                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                                    Huisnummer is verplicht!<br/>
                                                </p>
                                            </section>
                                            <section className="additional">
                                                <label>
                                                    Toevoeging: niet verplicht
                                                </label>

                                                <input
                                                    type="text"
                                                    id="house-number-add"
                                                    autoComplete="off"
                                                    onChange={(e) => setHouseNumberAdd(e.target.value)}
                                                    value={houseNumberAdd}
                                                />
                                            </section>
                                            <section className="zipcode">
                                                <label>
                                                    Postcode:
                                                    <FontAwesomeIcon icon={faCheck}
                                                                     className={validZipcode ? "valid" : "hide"}/>
                                                    <FontAwesomeIcon icon={faTimes}
                                                                     className={validZipcode || !houseNumber ? "hide" : "invalid"}/>
                                                </label>


                                                <input
                                                    type="text"
                                                    id="zipcode"
                                                    ref={userRef}
                                                    autoComplete="off"
                                                    onChange={(e) => setZipcode(e.target.value)}
                                                    value={zipcode}
                                                    required
                                                    aria-invalid={validZipcode ? "false" : "true"}
                                                    aria-describedby="user-email-note"
                                                    onFocus={() => setZipcodeFocus(true)}
                                                    onBlur={() => setZipcodeFocus(false)}
                                                />

                                                <p id="zipcode-note"
                                                   className={zipcodeFocus && zipcode && !validZipcode ? "instructions" : "offscreen"}>
                                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                                    Postcode is verplicht!<br/>
                                                </p>
                                            </section>
                                            <section className="city">
                                                <label>
                                                    Stad:
                                                    <FontAwesomeIcon icon={faCheck}
                                                                     className={validCity ? "valid" : "hide"}/>
                                                    <FontAwesomeIcon icon={faTimes}
                                                                     className={validCity || !city ? "hide" : "invalid"}/>
                                                </label>


                                                <input
                                                    type="text"
                                                    id="city"
                                                    ref={userRef}
                                                    autoComplete="off"
                                                    onChange={(e) => setCity(e.target.value)}
                                                    value={city}
                                                    required
                                                    aria-invalid={validCity ? "false" : "true"}
                                                    aria-describedby="user-email-note"
                                                    onFocus={() => setCityFocus(true)}
                                                    onBlur={() => setCityFocus(false)}
                                                />

                                                <p id="city-note"
                                                   className={cityFocus && city && !validCity ? "instructions" : "offscreen"}>
                                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                                    Stad is verplicht!<br/>
                                                </p>
                                            </section>
                                            <section className="phone">
                                                <label>
                                                    Mobielnummer:
                                                    <FontAwesomeIcon icon={faCheck}
                                                                     className={validPhone ? "valid" : "hide"}/>
                                                    <FontAwesomeIcon icon={faTimes}
                                                                     className={validPhone || !phone ? "hide" : "invalid"}/>
                                                </label>


                                                <input
                                                    type="tel"
                                                    id="phone-number"
                                                    ref={userRef}
                                                    autoComplete="off"
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    value={phone}
                                                    required
                                                    aria-invalid={validPhone ? "false" : "true"}
                                                    aria-describedby="user-email-note"
                                                    onFocus={() => setPhoneFocus(true)}
                                                    onBlur={() => setPhoneFocus(false)}
                                                />

                                                <p id="email-note"
                                                   className={phoneFocus && phone && !validPhone ? "instructions" : "offscreen"}>
                                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                                    Mobielnummer is verplicht!<br/>
                                                </p>
                                            </section>
                                            <button
                                                type="submit"
                                                className="form-button"
                                            >
                                                <BsFillPencilFill/>&nbsp; Registreer
                                            </button>
                                        </form>
                                    </section>
                                </div>
                                <div className="sign-in-body">
                                    <p className="form-footer">
                                        <IoMdLogIn size={40}/>Ik heb al een Loahy account!<br/>
                                        <span className="line">
                                            <NavLink to="/customer/login">
                                               login
                                            </NavLink>
                                    </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
            </>
        </>
    )
}

export default CustomerRegister;