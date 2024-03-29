import {createContext, useContext, useEffect, useReducer} from "react";
import axios from "axios";
import {wishlistReducer} from "../helpers/reducers/Reducers";
import {AuthContext} from "./AuthContext";

export const WishlistContext = createContext({});


const initialState = {
    initialized: false, wishlist: [],
};

export const WishlistProvider = ({children}) => {
    const {user, isAuth} = useContext(AuthContext);
    const [state2, dispatch2] = useReducer(wishlistReducer, initialState);
    const token = localStorage.getItem('token');


    useEffect(() => {
        const controller = new AbortController();

        if (!isAuth) {
            console.log("hallo user");
            dispatch2({type: "CLEAR_WISHLIST"});
        } else {
            async function fetchWishlistData() {
                try {
                    const fetchWishlistData = await axios.get(`http://localhost:8080/wishlists/${user.wishlist_id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    });
                    dispatch2({
                        type: 'FETCH_WISHLIST_DATA', payload: {
                            ...initialState, wishlist: fetchWishlistData.data.products
                        }
                    });
                } catch (e) {
                    console.error('er is iets misgegaan met het halen van wishlist data lijst voor wishlist_id', e);
                }
            }

            fetchWishlistData();
            return function cleanup() {
                controller.abort();
            }

        }
    }, [isAuth, user.wishlist_id]);


    return (<WishlistContext.Provider value={{state2, dispatch2}}>
        {children}
    </WishlistContext.Provider>)
};

export const WishlistState = () => {
    return useContext(WishlistContext);
}






