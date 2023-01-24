import React from "react";

import {Route, Switch} from "react-router-dom";
import Home from "../pages/home/Home";
import Cart from "../pages/cart/Cart";
import WishList from "../pages/wishList/wishList/WishList";
import PrivateRoute from "./privateRoute/PrivateRoute";
import CustomerPage from "../pages/customer/CustomerPage";
import AdminPage from "../pages/admin/AdminPage";
import AdminLogIn from "../pages/admin/AdminLogIn";
import CheckOut from "../pages/checkout/CheckOut";
import CustomerSignUp from "../pages/customer/customerSignUp/CustomerSignUp";
import CustomerLogIn from "../pages/customer/customerLogIn/CustomerLogIn";
import AdminUploadImage from "../components/adminComponents/adminUploadImage/AdminUploadImage";
import CustomerRegister from "../pages/customer/customerRegister/CustomerRegister";
import WishlistLogin from "../pages/wishList/wishlistLogin/WishlistLogin";


function Routes() {

    return (
        <>
            <div className="inner-container">
                <Switch>
                    <Route exact path="/customer/login">
                        <CustomerLogIn/>
                    </Route>
                    <Route exact path="/customer/register">
                        <CustomerSignUp/>
                    </Route>
                    <Route exact path="/customer/register/step2">
                        <CustomerRegister/>
                    </Route>
                    <PrivateRoute path="/customer/profile">
                        <CustomerPage/>
                    </PrivateRoute>
                    <PrivateRoute path="/customer/wishlist">
                        <WishList/>
                    </PrivateRoute>
                    <Route path="/shopping-cart">
                        <Cart/>
                    </Route>
                    <Route exact path="/customer/checkout">
                        <CheckOut/>
                    </Route>
                    <Route path="/wishlist">
                        <WishlistLogin/>
                    </Route>
                    <Route exact path="/admin">
                        <AdminLogIn/>
                    </Route>
                    <PrivateRoute path="/admin/profile">
                        <AdminPage/>
                    </PrivateRoute>
                    <PrivateRoute path="/admin/products/images">
                        <AdminUploadImage/>
                    </PrivateRoute>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </>

    )
}

export default Routes;