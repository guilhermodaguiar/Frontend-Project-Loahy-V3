export const cartReducer = (state, action) => {

    switch (action.type) {
        case "FETCH_DATA":
            return {...action.payload, initialized: true};
        case "ADD_TO_CART":
            return {...state, cart: [...state.cart, {...action.payload, qty: 1}]};
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter((c) => c.productId !== action.payload.productId),
            };
        case "CHANGE_CART_QTY":
            return {
                ...state,
                cart: state.cart.filter((c) =>
                    c.productId === action.payload.productId ? (c.qty = action.payload.qty) : c.qty
                ),
            };
        case "CLEAR_CART":
            return {
                cart: []
            }

        default:
            return state;
    }
};


export const wishlistReducer = (state2, action) => {
    switch (action.type) {
        case "FETCH_DATA":
            return {...action.payload, initialized: true};
        case "FETCH_WISHLIST_DATA":
            return {...action.payload, initialized: true};
        case "ADD_TO_WISHLIST":
            return {...state2, wishlist: [...state2.wishlist, {...action.payload, qty: 1}]};
        case "REMOVE_FROM_WISHLIST":
            return {
                ...state2,
                wishlist: state2.wishlist.filter((c) => c.productId !== action.payload.productId),
            };
        case "CLEAR_WISHLIST":
            return {
                wishlist: []
            }
        default:
            return state2;
    }
}

export const itemListReducer = (state3, action) => {
    switch (action.type) {
        case "FETCH_DATA":
            return {...action.payload, initialized: true};
        default:
            return state3;
    }
}






