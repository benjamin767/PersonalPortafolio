import React from "react";
import Project from "../Project/Project";
import "./ProjectContainer.css";

const ProjectContainer = ({ projects })=> {
    return(<article>
        { projects.length > 0 ? projects.map((project) => <Project/>) : <p>No hay nada que ver</p> }
    </article>);
};

export default ProjectContainer;