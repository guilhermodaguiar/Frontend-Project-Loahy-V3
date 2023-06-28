import axios from "axios";

export const cartReducer = (state, action) => {

    switch (action.type) {
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
                ...state,
                cart: [],
            }
        default:
            return state;
    }
};

export const wishlistReducer = (state2, action) => {
    switch (action.type) {
        case "FETCH_WISHLIST_DATA":
            return {...action.payload, initialized: true};
        case "ADD_TO_WISHLIST":
            axios
                .put(`http://localhost:8080/wishlists/${action.payload.wishlist_id}/${action.payload.item.productId}`)
                .then((response) => {
                    console.log(response.data);
                    console.log(action.payload.item.productId);
                    console.log(action.payload.wishlist_id);
                })
                .catch((error) => {
                    console.error(error, 'er is iets misgegaan met het versturen van item naar wishlist backend');
                });

            return {
                ...state2,
                wishlist: [...state2.wishlist, {...action.payload.item, qty: 1}]
            };
        case "REMOVE_FROM_WISHLIST":
            axios
                .delete(`http://localhost:8080/wishlists/${action.payload.wishlist_id}/${action.payload.item.productId}`)
                .then((response) => {
                    console.log(response.data);
                    console.log(action.payload.item.productId);
                    console.log(action.payload.wishlist_id);
                })
                .catch((error) => {
                    console.error(error, 'er is iets misgegaan met het versturen van item naar wishlist backend');
                });

            return {
                ...state2,
                wishlist: state2.wishlist.filter((c) => c.productId !== action.payload.productId),
            };
        case "CLEAR_WISHLIST":
            return {
                ...state2,
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
        case "CLEAR_ITEM_LIST":
            return {
                ...state3,
                itemList: []
            }
        default:
            return state3;
    }
}

export const ItemsReducer = (state4, action) => {
    switch (action.type) {
        case "FETCH_DATA_ITEMS":
            return {...action.payload, initialized: true};
        default:
            return state4;
    }
}







