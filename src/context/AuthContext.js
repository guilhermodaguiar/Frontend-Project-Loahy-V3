import React, {createContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const history = useHistory();
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: {},
        status: 'pending',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode(token);
            fetchUserData(decoded.sub, token);
        } else {
            toggleIsAuth({
                isAuth: false,
                user: {},
                status: 'done',
            });
        }
    }, []);

    function login(JWT) {

        localStorage.setItem('token', JWT);
        const decoded = jwt_decode(JWT);
        fetchUserData(decoded.sub, JWT);
    }

    function logout(e) {
        localStorage.clear();
        e.preventDefault();
        toggleIsAuth({
            isAuth: false,
            user: {},
            status: 'done',
        });

        console.log('Gebruiker is uitgelogd!');
        history.push('/');
    }


    async function fetchUserData(user_email, token) {
        try {
            const response = await axios.get(`http://localhost:8080/users/${user_email}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response);
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    user_email: response.data.userEmail,
                    user_password: response.data.password,
                    user_id: response.data.userId,
                    user_first_name: response.data.firstName,
                    user_last_name: response.data.lastName,
                    roles: response.data.authorities[0].authority,
                    address_id: response.data.address.addressId,
                    address_street_name: response.data.address.streetName,
                    address_house_number: response.data.address.houseNumber,
                    address_house_number_add: response.data.address.houseNumberAddition,
                    address_city: response.data.address.city,
                    address_zipcode: response.data.address.zipcode,
                    address_phone: response.data.address.phoneNumber,
                    wish_list: response.data.wishlist,
                    wishlist_id: response.data.wishlist.wishlistId
                },
                status: 'done',
            });

        } catch (e) {
            console.error('Er is iets misgegaan met het ophalen van user data', e);
            localStorage.clear();
        }
    }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;