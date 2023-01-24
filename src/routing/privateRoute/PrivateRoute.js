import React, {useContext} from 'react';
import {Redirect, Route} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";


export const PrivateRoute = ({children, ...path}) => {
    const {isAuth} = useContext(AuthContext)

    return (
        <Route {...path} render={() => {
            return isAuth ? children : <Redirect to="customer/login"/>
        }}/>
    );
}

export default PrivateRoute;