import React, { useState } from "react";
import "./Register.css"
import { createUser } from "../../redux/actions";
import { useDispatch } from "react-redux";

export const validation = (data, isClic) => {
    let errors = {};
    if(!data.email) errors.email = "*El email es requerido";
    if(!data.name) errors.name = "*El nombre es requerido";
    if(!data.password) errors.password = "*La contraseña es obligatorio";
    if(data.hasOwnProperty("password") && data.hasOwnProperty("name") && (!data.password || !data.name || !data.email) && isClic) 
        errors.canSend = "Todos los campos deben ser rellenados";
    else if(data.hasOwnProperty("text") && (!data.text || !data.name || !data.email) && isClic) 
        errors.canSend = "Todos los campos deben ser rellenados";
    else if((!data.password || !data.email) && isClic) 
        errors.canSend = "Todos los campos deben ser rellenados";
    else {
        errors.canSend = undefined;
    }
    if(!data.text) errors.text = "*Escriba un mensaje porfavor*";
    return errors;
};

const Register = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        email: "",
        name: "",
        password: ""
    });
    const [ errors, setErrors ] = useState({});

    const handleChange = (event) => { 
        event.preventDefault();
        setInput( { ...input, [event.target.name]: event.target.value } );
        setErrors( validation({ ...input, [event.target.name]: event.target.value }, false) );
    }; 
    const handleClick = (e) => {
        e.preventDefault();
        setErrors( validation({ ...input }))
        if(!errors.canSend){
            dispatch(createUser(input));
            setInput({
                email: "",
                name: "",
                password: ""
            });
        }
    };
    return (<>
        <section className="register">
            <h2>¡Registrate para una mejor experiencia!</h2>
            <form>
                <div className="errors">
                    { errors.canSend ? <p>{errors.email}</p> : <p></p> }
                    { errors.canSend ? <p>{errors.name}</p> : null}
                </div>
                <div className="blend"> 
                    <input 
                        onChange={(e) => handleChange(e)}
                        type="email"
                        name="email"
                        placeholder="*Email"
                        value={input.email}
                    />
                    <input 
                        onChange={(e) => handleChange(e)}
                        name="name"
                        placeholder="*Nombre Completo"
                        value={input.name}
                    />
                </div>
                <input 
                    onChange={(e) => handleChange(e)}
                    type="password"
                    name="password"
                    placeholder="*Contraseña"
                    value={input.password}
                />
                <div className="errors">
                    { errors.canSend ? <p>{errors.password}</p> : null }
                </div>
                <button
                    onClick = {(e) => handleClick(e)}
                    className="button-send"
                >
                    REGISTRARME
                </button>
                <div className="errors">
                    { errors.canSend ? <p>{errors.canSend}</p> : null }
                </div>
            </form>
        </section>
    </>);
};

export default Register;