import React from "react";
import "./Error.css"

const Error = ({ status, msg }) => {
    return (<section className="error-page">
        <h1 className="error-title">
            { status } Error
        </h1>
        <h2 className="error-subtitle">
            Ups, algio salio mal...
        </h2>
        <p className="error-msg">
            { msg }
        </p>
    </section>)
};

export default Error;