require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const {
  DB_USER, DB_PASSWORD, DB_HOST
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/benjamin`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

//Leemos todos los archivos de la carpeta models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models estan todos los modelos importados con propiedades
// Para relacionarlos hacemos un destructuring
const { Technologie, Project, Page } = sequelize.models;

Technologie.belongsToMany(Project, { through: 'Project_Tech' });
Project.belongsToMany(Technologie, { through: 'Project_Tech' });
Page.hasMany(Project);
Project.belongsTo(Page);

const store = new SequelizeStore({
  db: sequelize,
  table: 'Session',
  sidColumn: 'id'
});

module.exports = {
  ...sequelize.models, //Para poder importar modelos
  conn: sequelize,
  store,
};