import React, {createContext, useContext, useReducer} from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return [...state, action.item];
        case "REMOVE_FROM_CART":
            const newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr;
        case "CHANGE_CART_QTY":
            const newArr3 = [...state];
            newArr3.map((c) =>
                c.item === action.item ? (c.qty = action.qty) : c.qty, 1)
            return newArr3;
        case "CHANGE_CART_QTY2":
            return {
                ...state,
                cart: state.cart.filter((c) =>
                    c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
                ),
            };
        default:
            throw new Error(`unknown action ${action.type}`);
    }
};




export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, []
    );

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
