import React, { useState } from "react";
import "./Register.css"
import { createUser } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
import Error404 from "../Error12345/Error"
import { useNavigate } from 'react-router';
let msg;

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
    const navigate = useNavigate()
    const [ isOk, setIsOk ] = useState(false);
    const [ isOpen, setIsOpen ] = useState(false);
    const [input, setInput] = useState({
        email: "",
        name: "",
        password: ""
    });
    const [ errors, setErrors ] = useState({});
    const userID = useSelector(state => state.profile ? state.profile.id : null);

    const handleChange = (event) => { 
        event.preventDefault();
        setInput( { ...input, [event.target.name]: event.target.value } );
        setErrors( validation({ ...input, [event.target.name]: event.target.value }, false) );
    }; 
    const handleClick = (e) => {
        e.preventDefault();
        setErrors( validation({ ...input }, true))
        if(!errors.canSend){
            dispatch(createUser(input))
            .then(res => {
                if(res){
                    msg = res.data;
                    // setErrors({...errors, canSend: res.data.msg});
                    console.log(res.data)
                    setIsOk(false);
                    setIsOpen(true);
                } else {
                    setIsOk(true);
                    setIsOpen(true);
                    setInput({
                        email: "",
                        name: "",
                        password: ""
                    });
                }
            });
        }
    };
    const handleOk = () => {
        setIsOpen(false);
        navigate("/");
    };

    return (<>
        <section className="register">
            {userID ? <Error404/> : <> <h2>¡Registrate para una mejor experiencia!</h2>
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
                
            </form> </> }
            <ReactModal
                isOpen={isOpen}
                shouldCloseOnEsc={false}
                ariaHideApp={false}
                data={
                    { background: "dark" }
                }
                style={{
                    overlay: {
                        position: "fixed",
                        backgroundColor: "rgba(0, 0, 0, 0.75)"
                    },
                    content: {
                        position: 'absolute',
                        color: "#aaa",
                        top: '35%',
                        left: '20%',
                        right: '20%',
                        bottom: '35%',
                        border: '1px solid #444',
                        background: '#111',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        outline: 'none',
                        textAlign: "center"
                        }
                }}
            >
                { isOk ? <>
                    <p> ¡Usuario creado con exito! </p>
                    <button
                        onClick={handleOk}
                    >OK</button>
                </> : <>
                    <p>Ups, algo salio mal... <br/>{msg}</p>
                    <button
                        onClick={() => setIsOpen(false)}
                    >OK</button>
                </> }
            </ReactModal>
        </section>
    </>);
};

export default Register;