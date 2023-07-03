import axios from "axios";

export const cartReducer = (state, action) => {

    switch (action.type) {
        case "ADD_TO_CART":
            return {...state, cart: [...state.cart, {...action.payload, qty: 1}]};
        case "REMOVE_FROM_CART":
            return {
                ...state, cart: state.cart.filter((c) => c.productId !== action.payload.productId),
            };
        case "CHANGE_CART_QTY":
            return {
                ...state,
                cart: state.cart.filter((c) => c.productId === action.payload.productId ? (c.qty = action.payload.qty) : c.qty),
            };
        case "CLEAR_CART":
            return {
                ...state, cart: [],
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
            return {
                ...state2, wishlist: [...state2.wishlist, {...action.payload.item, qty: 1}]
            };
        case "SEND_TO_WISHLIST_BACKEND":
            if (action.payload.wishlist_id === undefined) {
                console.log("hello world! nog inloggen");
            } else {
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
            }
            return {
                ...state2,
            }
        case "REMOVE_FROM_WISHLIST":
            return {
                ...state2, wishlist: state2.wishlist.filter((c) => c.productId !== action.payload.item.productId),
            };
        case "DELETE_FROM_WISHLIST_BACKEND":
            if (action.payload.wishlist_id === undefined) {
                console.log("hello world! graag inloggen")
            } else {
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
            }
            return {
                ...state2
            }
        case "CLEAR_WISHLIST":
            return {
                ...state2, wishlist: []
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
                ...state3, itemList: []
            }
        default:
            return state3;
    }
}

export const ItemsReducer = (state4, action) => {
    switch (action.type) {
        case "FETCH_DATA_ITEMS":
            return {...action.payload, initialized: true};
        case "REMOVE_ITEMS":
            return {...state4, items: state4.items.filter((c) => c.productId !== action.payload.item.productId)}
        default:
            return state4;
    }
}







