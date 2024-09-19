import React, { useEffect, useState } from "react";
import "./Login.css";
import { validation } from "../Register/Register";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, login, setSpinner } from "../../redux/actions";
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router';
import Error404 from "../Error12345/Error"
import Loading from "../Loading/Loading";
let msg;

const Login = () => {
    const [ input, setInput ] = useState({
        email:"",
        password:""
    });
    const [ errors, setErrors ] = useState({});
    const dispatch = useDispatch();
    const [ isOk, setIsOk ] = useState(true);
    const [ isOpen, setIsOpen ] = useState(false);
    const navigate = useNavigate();
    const { profile, spinner } = useSelector(state => state);

    useEffect(() => {
        dispatch(getProfile());
    },[dispatch]);

    const handleChange = (event) => {
        event.preventDefault();
        setInput({ ...input, [event.target.name]: event.target.value });
        setErrors( validation({ ...input, [event.target.name]: event.target.value }) );
    };

    const handleClick =  async (event) => {
        event.preventDefault();
        await setErrors(validation(input,true));
        if(!errors.canSend) {
            await dispatch(login(input))
                .then((res) => {
                    if(res){
                        msg = res.data;
                        setIsOk(false);
                        setIsOpen(true);
                    } else {
                        setIsOk(true);
                        setIsOpen(true);
                        setInput({ 
                            email: "",
                            password: ""
                        });
                    }
                });
        }
    };
    const handleSuccess = () => {
        setIsOpen(false)
        dispatch(setSpinner(false));
        navigate("/");
    };

    const toAgain = () => {
        dispatch(setSpinner(false));
        setIsOpen(false);
    };

        return (<section className="login">
        {  spinner ? <Loading/> 
        : <>
            { profile.id ? <Error404/> 
            : 
            <>
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
            </> }
        </> }
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
                    <p>¡Ingresaste correctamente!</p> 
                    <button 
                        className="ok"
                        onClick={() => handleSuccess()}
                    >OK</button>
                </> 
                : <>
                    <p>Ups, algo salio mal... <br/> {msg}</p> 
                    <button
                        className="ok"
                        onClick={toAgain}
                    >OK</button>
                </> }
            </ReactModal>
        </section>);
};

export default Login;