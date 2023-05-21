import './App.css';

import React from "react";
import Footer from "./layout/footer/Footer";
import NavBar from "./layout/navBar/NavBar";
import {Route, Switch} from "react-router-dom";
import PrivateRoute from "./helpers/routing/PrivateRoute";
import UserPage from "./pages/user/userPage/UserPage";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import AdminLogIn from "./pages/admin/AdminLogIn";
import AdminPage from "./pages/admin/AdminPage";
import UploadImage from "./components/adminComponents/uploadImage/UploadImage";
import Home from "./pages/home/Home";
import UserLogin from "./pages/user/userLogin/UserLogin";
import ItemInfo from "./components/itemComponents/itemInfo/ItemInfo";
import WishList from "./pages/wishList/WishList";


function App() {

    return (
        <>
            <NavBar/>
            <div className="inner-container">
                <Switch>
                    <Route exact path="/user">
                        <UserLogin/>
                    </Route>
                    <PrivateRoute path="/user/profile">
                        <UserPage/>
                    </PrivateRoute>
                    {/*<PrivateRoute path="/user/wishlist">*/}
                    {/*    <WishList/>*/}
                    {/*</PrivateRoute>*/}
                    <Route path="/wishlist">
                        <WishList/>
                    </Route>
                    <Route path="/shopping-cart">
                        <Cart/>
                    </Route>
                    <Route exact path="/user/checkout">
                        <Checkout/>
                    </Route>

                    <Route exact path="/admin">
                        <AdminLogIn/>
                    </Route>
                    <PrivateRoute path="/admin/profile">
                        <AdminPage/>
                    </PrivateRoute>
                    <PrivateRoute path="/admin/products/images">
                        <UploadImage/>
                    </PrivateRoute>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/items/:item_id">
                        <ItemInfo/>
                    </Route>
                </Switch>
            </div>
            <Footer/>
        </>

    );
}

export default App;

