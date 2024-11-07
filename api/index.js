const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { port, path_principal } = process.env;
const http = require('http');

//conectamos el server y despues la db
server.listen(port, () => {
    conn.sync({ force: true })
        .then(() => {
            console.log(`%s listening at ${port}`);
        });
    const opciones = {
        method: 'GET',
        hostname: 'localhost',
        port: port,
        path: path_principal, // Reemplaza '/tu-ruta' con la ruta deseada
        // headers: {
        //     'Content-Type': 'application/json'
        // }
    };
        
    const req = http.request(opciones, (res) => {
        let datos = '';
        res.on('data', (chunk) => {
            datos += chunk;
        });
        res.on('end', () => {
            console.log(datos);
        });
    });
        
    req.on('error', (error) => {
        console.error(error);
    });
        
    //   // Datos a enviar en el cuerpo de la petición
    // const datosEnviar = JSON.stringify();
    // req.write(datosEnviar);
    req.end();
});