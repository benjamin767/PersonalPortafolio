const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const session = require('express-session');
const SequelizeStore = require('./sequelize-store')

require('./db.js');

const server = express();
const { secret } = process.env;12

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials','true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-requested-With, Content-Type, Aceppt');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

server.use(session({
    store: new SequelizeStore({
      db: sequelize,
      table: 'Sessions'
    }),
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

server.use('/', routes);

server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = server;