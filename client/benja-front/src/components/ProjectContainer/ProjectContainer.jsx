import React from "react";
import Project from "../Project/Project";
import "./ProjectContainer.css";

const ProjectContainer = ({ projects })=> {
    return(<article id="project-container">
        <h2 className="project-title"><span>Mis</span> Proyectos</h2>
        <div id="container-cards">
            { projects.length > 0 ? projects.map((project, index) => <Project data={project} key={index}/>) : <p>No hay nada que ver</p> }
        </div>
    </article>);
};

export default ProjectContainer;