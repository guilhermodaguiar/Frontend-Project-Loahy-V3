import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {BrowserRouter as Router} from 'react-router-dom';
import {WishlistProvider} from "./context/WishlistContext";
import AuthContextProvider from "./context/AuthContext";
import {CartProvider} from "./context/CartContext";
import {ItemListProvider} from "./context/ItemListContext";
import {ItemsProvider} from "./context/ItemsContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <AuthContextProvider>
            <CartProvider>
                <WishlistProvider>
                    <ItemsProvider>
                        <ItemListProvider>
                            <App/>
                        </ItemListProvider>
                    </ItemsProvider>
                </WishlistProvider>
            </CartProvider>
        </AuthContextProvider>
    </Router>
);

