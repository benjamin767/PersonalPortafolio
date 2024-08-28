import React, { useState } from "react";
import "./Login.css";
import { validation } from "../Register/Register";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";

const Login = () => {
    const [ input, setInput ] = useState({
        email:"",
        password:""
    });
    const [ errors, setErrors ] = useState({});
    const dispatch = useDispatch();

    const handleChange = (event) => {
        event.preventDefault();
        setInput({ ...input, [event.target.name]: event.target.value });
        setErrors( validation({ ...input, [event.target.name]: event.target.value }) );
    };

    const handleClick =  async (event) => {
        event.preventDefault();
        await setErrors(validation(input,true));
        if(!errors.canSend) {
            await dispatch(login(input));
            setInput({ 
                email: "",
                password: ""
            });
        }
    };

        return (<section className="login">
            <h1 className="login-title">Ingrese ¡Campeon!</h1>
            <form id="login-form">
                <div>
                    <input
                        className="login-email"
                        onChange={ (event) => handleChange(event) }
                        type="email"
                        name="email"
                        placeholder="*Email"
                        value={input.email}
                    />
                    { errors.email ? <p className="error"> { errors.email } </p> : null }
                </div>
                <div>
                    <input 
                        className="login-password"
                        onChange={ (event) => handleChange(event) }
                        type="password"
                        name="password"
                        placeholder="*Contraseña"
                        value={input.password}
                    />
                    { errors.password ? <p className="error"> { errors.password } </p> : null }
                </div>
                <button
                    className="button-send"
                    onClick={ async (event) => await handleClick(event) }
                >
                    Ingresar
                </button>
                { errors.canSend ? <p className="error"> { errors.canSend } </p> : null }
            </form>
        </section>);
};

export default Login;