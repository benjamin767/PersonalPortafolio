import React from "react";

const CreateProject = () => {
    return (<>
        <form>
            <div>
                <aside>Titulo</aside> <input/>
            </div>
            <div>
                <aside>Imagenes</aside> <input/>
            </div>
            <div>
                <aside>Descipcion</aside> <textarea/>
            </div>
                <button>Crear</button>
            
        </form>
    </>);
};

export default CreateProject;