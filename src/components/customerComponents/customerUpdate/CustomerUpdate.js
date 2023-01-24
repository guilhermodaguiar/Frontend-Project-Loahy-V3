import './CustomerUpdate.css';

import React, {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import {useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import {BsFillPencilFill, BsFillPenFill} from "react-icons/bs";

const NAME_REGEX = /^[a-z ,.'-]+$/i;
const NUMBER_REGEX = /^[0-9]+$/;
const DUCTH_PHONE_REGEX = /^\(?([+]31|0031|0)-?6(\s?|-)([0-9]\s{0,3}){8}$/;
const DUTCH_ZIPCODE_REGEX = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;

function CustomerUpdate() {
    const history = useHistory();
    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('token');

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

    const [phone, setPhone] = useState();
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidFirstName(NAME_REGEX.test(firstName));
    }, [firstName])

    useEffect(() => {
        setValidLastName(NAME_REGEX.test(lastName));
    }, [lastName])

    useEffect(() => {
        setValidStreet(NAME_REGEX.test(street));
    }, [street])

    useEffect(() => {
        setValidHouseNumber(NUMBER_REGEX.test(houseNumber));
    }, [houseNumber])

    useEffect(() => {
        setValidCity(NAME_REGEX.test(city));
    }, [city])

    useEffect(() => {
        setValidZipcode(DUTCH_ZIPCODE_REGEX.test(zipcode));
    }, [zipcode])

    useEffect(() => {
        setValidPhone(DUCTH_PHONE_REGEX.test(phone));
    }, [phone])

    useEffect(() => {
        setErrorMessage('');
    }, [firstName, lastName, street, houseNumber, houseNumberAdd, city, zipcode, phone])

    async function handleUpdateCustomer(id) {
        try {
            await axios.put(`http://localhost:8080/customer/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    customerFirstName: firstName,
                    customerLastName: lastName,
                    customerStreetName: street,
                    customerHouseNumber: houseNumber,
                    customerHouseNumberAddition: houseNumberAdd,
                    customerCity: city,
                    customerZipcode: zipcode,
                    customerPhone: phone,
                }).then(updatedCustomer);
        } catch (e) {
            console.error(e);
        }
    }

    function updatedCustomer() {
        history.push('/customer/profile/#customer_user_profile')
    }


    return (
        <>
            {user.roles !== "ROLE_USER" ? (
                <div className="user-route-container">
                    <div className="user-route">
                        <h1>U moet ingelogd zijn als
                            <br/> CUSTOMER
                            <br/>om deze content te mogen zien..
                        </h1>
                    </div>
                </div>
            ) : (
                <>
                    <div className="customer-page-outer-container">
                            <h1 className="register-customer-container"><BsFillPenFill size={30}/>Profiel aanpassen</h1>
                        <div className="customer-register-inner-container">
                            <div>
                                <h3 className="register-user-text">Loahy account aanpassen
                                </h3>
                            </div>
                            <div>
                                <div className="register-body">
                                    <section className="block-new-costumer">
                                        <p ref={errRef} className={errorMessage ? "err-msg" : "offscreen"}
                                           aria-live="assertive">{errorMessage}</p>

                                        <form
                                            className="form-container-register"
                                            onSubmit={handleUpdateCustomer}>


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
                                                <BsFillPencilFill/>&nbsp; Wijzigen
                                            </button>
                                        </form>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            )}


        </>
    )
}

export default CustomerUpdate;