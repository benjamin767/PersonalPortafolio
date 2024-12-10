import React, { useRef, useEffect } from "react";
import "./ImgCanvas.css";
import perfil from "./img/bmino.png"

const ImgCanvas = () => {
    const canvasRef = useRef({});

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const fontSize = 20;
        const columns = canvas.width / fontSize;
        const rows = canvas.height / fontSize;
        const charactersArray = [];

        for (let i = 0; i < columns; i++) {
            charactersArray[i] = [];
        for (let j = 0; j < rows; j++) {
            charactersArray[i][j] = {
                character: characters.charAt(Math.floor(Math.random() * characters.length)),
                x: i * fontSize,
                y: j * fontSize,
                color: `rgba(0, 255, 0, ${Math.random()})`,
            };
        }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < columns; i++) {
                for (let j = 0; j < rows; j++) {
                ctx.fillStyle = charactersArray[i][j].color;
                ctx.fillText(charactersArray[i][j].character, charactersArray[i][j].x, charactersArray[i][j].y);
                charactersArray[i][j].y += fontSize;
                if (charactersArray[i][j].y > canvas.height) {
                    charactersArray[i][j].y = 0;
                }
                }
            }
            setTimeout(draw, 150);
        }

        draw();
    }, []);
    return (<div 
        className="img-profile"
    >
       
        <img 
            src={ perfil }
            alt="me"
        />
        <canvas 
            ref={canvasRef} 
            className='canvas'
        >
        </canvas>
        
    </div>);
};

export default ImgCanvas;