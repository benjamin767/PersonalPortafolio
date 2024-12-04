import React from "react";
import "./Loading.css";

const Loading = ({ id }) => {
    return (<>
        <div 
            id={id}
            className="center-body"
        >
            <div className="loader-circle-11">
                <div className="arc"></div>
                <div className="arc"></div>
                <div className="arc"></div>
            </div>
        </div>
    </>);
};

export default Loading;