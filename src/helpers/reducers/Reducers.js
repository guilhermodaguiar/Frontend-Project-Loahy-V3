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
                cart3: state.cart.filter((c) =>
                    c.productId === action.payload.productId ? (c.qty = action.payload.qty) : c.qty
                ),
            };
        case "CLEAR_CART":
            return []
        default:
            return state;
    }
};


export const wishlistReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_DATA":
            return {...action.payload, initialized: true};
        case "FETCH_WISHLIST_DATA":
            return {...action.payload, initialized: true};
        case "ADD_TO_WISHLIST":
            return {...state, wishlist: [...state.wishlist, {...action.payload, qty: 1}]};
        case "REMOVE_FROM_WISHLIST":
            return {
                ...state,
                wishlist: state.wishlist.filter((c) => c.productId !== action.payload.productId),
            };
        case "CLEAR_WISHLIST":
            return []
        default:
            return state;
    }
}







