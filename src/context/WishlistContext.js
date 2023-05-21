import {createContext, useContext, useEffect, useReducer} from "react";
import axios from "axios";
import {wishlistReducer} from "../helpers/reducers/Reducers";
import {AuthContext} from "./AuthContext";



export const WishlistContext = createContext({});

const initialState = {
    initialized: false,
    wishlistItems: [],
    wishlist: []
};

export const WishlistProvider = ({children}) => {
    const {user} = useContext(AuthContext);
    const token =  localStorage.getItem('token');
    const [state, dispatch] = useReducer(wishlistReducer, initialState);

    useEffect(() => {
        async function fetchItemData() {
            try {
                const itemData = await axios.get(`http://localhost:8080/products/`);
                console.log(itemData.data);
                dispatch({type: 'FETCH_DATA', payload: {
                        ...initialState, wishlistItems: itemData.data}});
            } catch (e) {
                console.error('er is iets misgegaan het halen van itemsdata voor wishlist', e);
            }
        }

        fetchItemData();
    }, []);

    useEffect(() => {
        async function fetchWishlistData() {
            try {
                const fetchWishlistData= await axios.get(`http://localhost:8080/wishlists/products/${user.wishlist_id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
                console.log(fetchWishlistData);
                dispatch({type: 'FETCH_WISHLIST_DATA', payload: {
                        ...initialState, wishlist: fetchWishlistData.data
                    }});
            } catch (e) {
                console.error('er is iets misgegaan met het halen van wishlist data voor wishlist', e);
            }
        }

        fetchWishlistData();
    }, [token, user.wishlist_id]);


    return (
        <WishlistContext.Provider value={{state, dispatch}}>
            {children}
        </WishlistContext.Provider>
    )
};

export const WishlistState = () => {
    return useContext(WishlistContext);
}






