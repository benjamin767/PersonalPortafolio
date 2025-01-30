import "./CreateTech.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error404 from "../Error12345/Error";
import { createTech, uploadImage } from "../../redux/actions";

export const verificarTamañoImagen = (imagen) => {
    const ancho = imagen.width;
    const alto = imagen.height;
    const maxAncho = 750; // ancho máximo permitido
    const maxAlto = 500; // alto máximo permitido
    const minAncho = 150; // ancho mínimo permitido
    const minAlto = 150; // alto mínimo permitido
  
    if (ancho > maxAncho || alto > maxAlto) {
      alert("La imagen es demasiado grande. Por favor, seleccione una imagen con un ancho máximo de " + maxAncho + "px y un alto máximo de " + maxAlto + "px.");
      return false;
    }
  
    if (ancho < minAncho || alto < minAlto) {
      alert("La imagen es demasiado pequeña. Por favor, seleccione una imagen con un ancho mínimo de " + minAncho + "px y un alto mínimo de " + minAlto + "px.");
      return false;
    }
  
    return true;
};

const CreateTech = () => {
    const [ input, setInput ] = useState({
        name: "",
        image: []
    });
    const [ imgPreview, setImgPreview ] = useState(null);
    const dispatch = useDispatch();
    const { id } = useSelector(state => state.profile);

    const handleChange = (event) => {
        event.preventDefault();
        
        if(event.target.name === "image") {
            const selectedFile = event.target.files[0];
            const image = new Image();
            image.src = URL.createObjectURL(selectedFile);
            image.onload = () => {
                if (!verificarTamañoImagen(image)) {
                    event.target.files = [];
                } else {
                    const reader = new FileReader();
                    reader.onload = () => {
                        setImgPreview(reader.result);
                    };
                    reader.readAsDataURL(selectedFile);
                    const formData = new FormData();
                    formData.append("file", event.target.files[0]);
                    setInput({
                        ...input,
                        [event.target.name]: formData
                    });
                }
            };
        } else {
            setInput({
                ...input,
                [event.target.name]: event.target.value
            });
        }
    };
    const handleClick = async (event, input) => {
        event.preventDefault();
        console.log(input)
        const imageData = await uploadImage(input.image)
            .then((data) => data.data)
            .catch((error) => console.error(error));
        console.log(imageData);
        dispatch(createTech({...input, image: imageData.url}));
    };
    return (<>    
        { id ? <>
            <section className="create-tech">
                <h1>Agregar una Tecnologia</h1>
                <form>
                    <aside>Nombre de la tencnologia</aside>
                    <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                    />
                    <aside>Imagen</aside>
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                    />
                    <div> { 
                        imgPreview && <img src={imgPreview}/> 
                    } </div>
                    <button
                        className="edit-button"
                        onClick={handleClick}
                    >
                        CREAR
                    </button>
                </form>
            </section>
        </> 
        :
        <Error404/> }
    </>);
};

export default CreateTech;