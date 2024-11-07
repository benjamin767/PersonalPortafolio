import React, { useState } from "react";
import "./Contact.css";
import { sendEmail } from "../../redux/actions";
import { validation } from "../Register/Register";
import { useSelector } from "react-redux";

const Contact = () => {
    const [ errors, setErrors ] = useState({});
    const user = useSelector(state => state.profile);
    const [ input, setInput ] = useState({
        email: user.email,
        name: user.name,
        text: ""
    });
    
    const handleChange = (event) => {
        event.preventDefault();
        setInput({
            ...input, 
            [event.target.name]: event.target.value
        })
        setErrors( validation({ ...input }, false) )
    };

    const handleClic = async (e,input) =>{
        e.preventDefault();
        setErrors( validation({ ...input }, true) )
        await sendEmail(input);
        setInput({
            email: user.email,
            name: user.name,
            text: ""
        })
    };

    return (<section id="contact">
        <h2 className="contact-title">¡Contacta conmigo!</h2>
        <form id="form-contact">
            <div className="input-container">
                <div>
                    <label>Email:</label>
                    <input 
                        onChange={(e) => handleChange(e)}
                        type="email"
                        name="email"
                        value={input.email}
                    />
                    {errors.email ? <p className="error">{ errors.email }</p> : null}
                </div>
                <div>
                    <label>Nombre:</label>
                    <input 
                        onChange={(e) => handleChange(e)}
                        type="text"
                        name="name"
                        value={input.name}
                    />
                    {errors.name ? <p className="error">{ errors.name }</p> : null}
                </div>
            </div>
            <textarea
                onChange={(e) => handleChange(e)}
                name="text"
                placeholder="Escriba su mensaje aqui..."
                value={input.text}
            />
            {errors.text ? <p className="error">{ errors.text }</p> : null}
            <button 
                onClick={async (event) => await handleClic(event, input)}
            >
                ENVIAR
            </button>
            {errors.canSend ? <p className="error">{ errors.canSend }</p> : null}
        </form>
    </section>);
}

export default Contact;