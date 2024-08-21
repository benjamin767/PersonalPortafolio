import React, { useState } from "react";
import "./Login.css";
import { validation } from "../Register/Register";

const Login = () => {
    const [ input, setInput ] = useState({
        email:"",
        password:""
    });
    const [ errors, setErrors ] = useState({});

    const handleChange = (event) => {
        event.preventDefault();
        setInput({ ...input, [event.target.name]: event.target.value });
        setErrors( validation({ ...input, [event.target.name]: event.target.value }) )
    }

        return (<section className="login">
            <h1 className="login-title">Ingrese ¡Campeon!</h1>
            <form id="login-form">
                <input
                    className="login-email"
                    onChange={ (event) => handleChange(event) }
                    type="email"
                    name="email"
                    placeholder="*Email"
                    value={input.email}
                />
                {errors.email ? <p className="error"> { errors.email } </p> : null}
                <input 
                className="login-password"
                    onChange={ (event) => handleChange(event) }
                    type="password"
                    name="password"
                    placeholder="*Contraseña"
                    value={input.password}
                />
                {errors.password ? <p className="error"> { errors.password } </p> : null}
                <button
                    className="button-send"
                    onClick={ (event) => {} }
                >
                    Ingresar
                </button>
            </form>
        </section>);
};

export default Login;