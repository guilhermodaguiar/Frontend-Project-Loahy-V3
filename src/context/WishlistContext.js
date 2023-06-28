import {createContext, useContext, useEffect, useReducer} from "react";
import axios from "axios";
import {wishlistReducer} from "../helpers/reducers/Reducers";
import {AuthContext} from "./AuthContext";


export const WishlistContext = createContext({});


const initialState = {
    initialized: false,
    wishlist: [],
};

export const WishlistProvider = ({children}) => {
    const {user, isAuth} = useContext(AuthContext);
    const [state2, dispatch2] = useReducer(wishlistReducer, initialState);


    useEffect(() => {
        if (!isAuth) {
            console.log("hallo user");
            dispatch2({type: "CLEAR_WISHLIST"});
        } else {
            async function fetchWishlistData() {
                try {
                    const fetchWishlistData = await axios.get(`http://localhost:8080/wishlists/products/${user.wishlist_id}`, {
                    });
                    console.log(fetchWishlistData);
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
        }
    }, [isAuth, user.wishlist_id]);


    return (
        <WishlistContext.Provider value={{state2, dispatch2}}>
            {children}
        </WishlistContext.Provider>
    )
};

export const WishlistState = () => {
    return useContext(WishlistContext);
}






