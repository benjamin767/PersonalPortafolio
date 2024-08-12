import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
    const [ input, setInput ] = useState({
        email: "",
        text: ""
    });
    const handleChange = (event) => {
        event.preventDefault();
        setInput({
            ...input, 
            [event.target.name]: event.target.value
        })
        console.log(event.target.value)
    };

    return (<section id="contact">
        <h2 className="contact-title">¡Contacta conmigo!</h2>
        <form id="form-contact">
            <div>
                <label>Email:</label>
                <input 
                    onChange={(e) => handleChange(e)}
                    type="email"
                    name="email"
                />
            </div>
            <textarea
                onChange={(e) => handleChange(e)}
                name="text"
                placeholder="Escriba su mensaje aqui..."
            />
            <button >ENVIAR</button>
        </form>
    </section>);
}

export default Contact;