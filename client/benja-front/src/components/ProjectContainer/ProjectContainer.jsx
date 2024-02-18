import React from "react";
import Project from "../Project/Project";
import "./ProjectContainer.css";

const ProjectContainer = ({ projects })=> {
    return(<article>
        <h3>Mis Proyectos</h3>
        <div>
            { projects.length > 0 ? projects.map((project) => <Project/>) : <p>No hay nada que ver</p> }
        </div>
    </article>);
};

export default ProjectContainer;