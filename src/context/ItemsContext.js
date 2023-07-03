import {createContext, useContext, useEffect, useReducer} from "react";
import axios from "axios";
import {ItemsReducer} from "../helpers/reducers/Reducers";
export const ItemsContext = createContext({});



const initialState = {
    initialized: false, items: []
};


export const ItemsProvider = ({children}) => {
    const [state4, dispatch4] = useReducer(ItemsReducer, initialState);

    useEffect(() => {
        async function getItemData() {
            try {
                const itemData = await axios.get(`http://localhost:8080/products/all`);
                dispatch4({
                    type: 'FETCH_DATA_ITEMS', payload: {
                        ...initialState, items: itemData.data
                    }
                });
            } catch (e) {
                console.error('er is iets misgegaan het halen van items voor items-context', e);
            }
        }

        getItemData()
    }, []);


    return (<ItemsContext.Provider value={{state4, dispatch4}}>
        {children}
    </ItemsContext.Provider>)
};

export const ItemsState = () => {
    return useContext(ItemsContext);
}




