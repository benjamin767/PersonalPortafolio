const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const session = require('express-session');
const { store } =require("./db.js")
const path = require("path");
require("dotenv").config();

require('./db.js');

const server = express();
const { secret } = process.env;

server.name = 'API';

server.use(express.static(path.join(__dirname, "public")));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials','true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-requested-With, Content-Type, Aceppt');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Content-Type', 'multipart/form-data');
    next();
});

server.use(session({
    store,
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000 // 24 horas 
    }
}));

server.use('/', routes);

server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = server;