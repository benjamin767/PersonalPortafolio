import React, { useState } from "react";
import "./Register.css"
import { createUser } from "../../redux/actions";
import { useDispatch } from "react-redux";

const Register = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        email: "",
        name: "",
        pasword: ""
    });
    const handleChange = (event) => { 
        event.preventDefault();
        setInput( { ...input, [event.target.name]: event.target.value } );
    }; 
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(createUser(input));
    };
    return (<>
        <h1>En verdad es que esto va ser un login por el momento.</h1>
        <section className="register">
            <h3>¡Registrate para una mejor experiencia!</h3>
            <form>
                <div className="blend"> 
                    <input 
                        onChange={(e) => handleChange(e)}
                        type="email"
                        name="email"
                        placeholder="Email"
                    />
                    <input 
                        onChange={(e) => handleChange(e)}
                        name="name"
                        placeholder="Nombre Completo"
                    />
                </div>
                <input 
                    onChange={(e) => handleChange(e)}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                />
                <button
                    onClick = {(e) => handleClick(e)}
                >
                    REGISTRARME
                </button>
            </form>
        </section>
    </>);
};

export default Register;