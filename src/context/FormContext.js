import React, {createContext} from "react";

import { useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

export const FormContext = createContext({})

const schema = yup.object().shape({
    firstName: yup.string().required("First Name should be required please"),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(15).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

function FormContextProvider(props) {

    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });

    const contextData = {
        handleSubmit: handleSubmit,
        register: register,
        errors: errors,
    };

    return (
        <FormContext.Provider value = {contextData}>
            {props.children}
        </FormContext.Provider>
    );
}

export default FormContextProvider;