import {createContext, useContext, useEffect, useReducer} from "react";
import axios from "axios";
import {cartReducer} from "../helpers/reducers/Reducers";


export const CartContext = createContext({});

const initialState = {
    initialized: false,
    items: [],
    cart: []
};


export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        async function getItemData() {
            try {
                const itemData = await axios.get(`http://localhost:8080/products/all`);
                dispatch({type: 'FETCH_DATA', payload: {
                        ...initialState, items: itemData.data}}
                );
                console.log(itemData.data);
            } catch (e) {
                console.error('er is iets misgegaan het halen van items voor cart-context', e);
            }
        }
        getItemData()
    } , []);


    return (
        <CartContext.Provider value={{state, dispatch}}>
            {children}
        </CartContext.Provider>
    )
};

export const CartState = () => {
    return useContext(CartContext);
}




