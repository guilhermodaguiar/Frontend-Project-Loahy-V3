import React from "react";
import './App.css';
import Footer from "./layout/footer/Footer";
import NavBar from "./layout/navBar/NavBar";
import {Route, Switch} from "react-router-dom";
import LogIn from "./pages/customer/logIn/LogIn";
import CustomerSignUp from "./pages/customer/customerSignUp/CustomerSignUp";
import Register from "./pages/customer/register/Register";
import PrivateRoute from "./routing/PrivateRoute";
import CustomerPage from "./pages/customer/CustomerPage";
import WishList from "./pages/wishList/wishList/WishList";
import Cart from "./pages/cart/Cart";
import CheckOut from "./pages/checkout/CheckOut";
import WishlistLogin from "./pages/wishList/wishlistLogin/WishlistLogin";
import AdminLogIn from "./pages/admin/AdminLogIn";
import AdminPage from "./pages/admin/AdminPage";
import AdminUploadImage from "./components/adminComponents/adminUploadImage/AdminUploadImage";
import Home from "./pages/home/Home";


function App() {
    return (
        <>
            <NavBar/>
            <div className="inner-container">
                <Switch>
                    <Route exact path="/customer/login">
                        <LogIn/>
                    </Route>
                    <Route exact path="/customer/register">
                        <CustomerSignUp/>
                    </Route>
                    <Route exact path="/customer/register/step2">
                        <Register/>
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
            <Footer/>
        </>

    );
}

export default App;

