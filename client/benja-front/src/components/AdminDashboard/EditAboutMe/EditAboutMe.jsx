import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Editor } from "primereact/editor";
import Loading from "../../Loading/Loading";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { FloatLabel } from "primereact/floatlabel";

const EditAboutMe = () => {
    const [ principal ] = useSelector(state => state.principal_page);
    const [state, setState] = useState({
        name: principal.name,
        surname: principal.surname,
        description: principal.description,
        github: principal.github,
        linkedin: principal.linkedin,
        email: principal.email
    });
    const [ isOnEdit, setIsOnEdit ] = useState(false);

    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
            </span>
        );
    };
    const header = renderHeader();

    const onEdit = (event) => {
        event.preventDefault();
        setIsOnEdit(!isOnEdit);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setIsOnEdit(!isOnEdit);
    }

    return (<> 
    { principal.name ? <>
    <div className="p-inputgroup flex-1 flex-column justify-content-center align-items-center">
        <h3>Editar Datos de la Pagina</h3>
        <div className="flex w-6 mb-2">
            <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
            </span>
            { isOnEdit ? <InputText value={state.name} /> : <InputText disabled value={state.name} /> }
        </div>
        <div className="flex w-6 mb-2">
            <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
            </span>
            { isOnEdit ? <InputText value={state.surname} /> : <InputText disabled value={state.surname} />}
        </div>
        <div className="flex w-6 mb-2">
            <span className="p-inputgroup-addon">
                <i className="pi pi-at"></i>
            </span>
            { isOnEdit ? <InputText value={state.email} /> : <InputText disabled value={state.email} /> }
        </div>
        <div className="flex w-6 mb-2">
            <span className="p-inputgroup-addon">
                <i className="pi pi-github"></i>
            </span>
            { isOnEdit ? <InputText value={state.github} /> : <InputText disabled value={state.github} /> }
        </div>
        <div className="flex w-6 mb-2">
            <span className="p-inputgroup-addon">
                <i className="pi pi-linkedin"></i>
            </span>
            { isOnEdit ? <InputText value={state.linkedin} /> : <InputText disabled value={state.linkedin} />}
        </div>
        <div className="flex w-9 mb-4 mt-5"> { isOnEdit ?
            <Editor 
                value={state.description} 
                onTextChange={(e)=>e} headerTemplate={header} style={{ height: '320px' }} 
            />
            : 
            <FloatLabel>
                <label className="text-white-alpha-60" htmlFor="description">Descripcion de about me</label>
                <InputTextarea disabled value={state.description} rows={18} cols={70} />
            </FloatLabel>
        } </div>
        { isOnEdit ? <div className="flex flex-wrap justify-content-center gap-3">
            <Button 
                icon="pi pi-check" 
                rounded 
                text 
                severity="success" 
                aria-label="Filter" 
                onClick={onSubmit}
            />
            <Button 
                icon="pi pi-times" 
                rounded 
                text 
                severity="danger" 
                aria-label="Cancel" 
                onClick={onEdit}
            />
        </div> :
        <Button 
            raised 
            severity="success" 
            text icon="pi pi-pencil" 
            label="Editar"
            onClick={onEdit}
        /> }
    </div>
    </> : <Loading/> }
    </>);
};

export default EditAboutMe;