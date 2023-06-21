const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const port = process.env.PORT || 3001;

//conectamos el server y despues la db
server.listen(port, () => {
    conn.sync({ force: true })
        .then(() => {
            console.log(`%s listening at ${port}`);
        });
});