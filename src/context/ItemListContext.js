import React, {createContext, useContext, useEffect, useReducer} from "react";
import {CartState} from "./CartContext";
import {itemListReducer} from "../helpers/reducers/Reducers";
export const ItemListContext = createContext({});



const initialState = {
    initialized: false, itemList: [],
}

export const ItemListProvider = ({children}) => {
    const {state: {cart}} = CartState();
    const [state3, dispatch3] = useReducer(itemListReducer, initialState);

    useEffect(() => {
        const itemListData = cart.map(item => {
            return ["id: " + (item.productId), item.productName, "€ " + (item.productPrice), "qty: " + parseInt(item.qty)]
        })
        console.log(itemListData);
        dispatch3({
            type: 'FETCH_DATA', payload: {
                ...initialState, itemList: itemListData
            }
        })
    }, [cart]);


    return (<ItemListContext.Provider value={{state3, dispatch3}}>
            {children}
        </ItemListContext.Provider>)
}

export const ItemListState = () => {
    return useContext(ItemListContext);
}

