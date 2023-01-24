import React, { useReducer, useContext, createContext } from "react";

const WishlistStateContext = createContext();
const WishlistDispatchContext = createContext();

const wishlistReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_WISHLIST":
            return [...state, action.item];
        case "REMOVE_FROM_WISHLIST":
            const newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr;
        default:
            throw new Error(`unknown action ${action.type}`);
    }
};

export const WishlistProvider = ({ children }) => {
    const [state3, dispatch3] = useReducer(wishlistReducer, []);

    return (
        <WishlistDispatchContext.Provider value={dispatch3}>
            <WishlistStateContext.Provider value={state3}>
                {children}
            </WishlistStateContext.Provider>
        </WishlistDispatchContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistStateContext);
export const useDispatchWishlist = () => useContext(WishlistDispatchContext);
