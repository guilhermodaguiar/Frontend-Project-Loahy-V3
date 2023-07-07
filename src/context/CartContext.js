import {createContext, useContext, useReducer} from "react";
import {cartReducer} from "../helpers/reducers/Reducers";


export const CartContext = createContext({});

const initialState = {
    initialized: false, cart: []
};

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (<CartContext.Provider value={{state, dispatch}}>
            {children}
        </CartContext.Provider>)
};

export const CartState = () => {
    return useContext(CartContext);
}




