/**
 * Programa realizado por Brayan Quirino
 * @param express creador del servidor
 * @param app aplicacion
 * @param morgan procesador de datos antes que el servidor; middleware
 * @param port puerto del servidor (8090)
 */

const express= require("express");
const app= express();
const morgan = require("morgan");
var port=8090
//settings
app.set("port", process.env.PORT || port)
//app.set('json spaces',2)


//Middleware
//process.env.PORT si está definido un puerto por la nube 
app.use(morgan('dev'));

//Usar datos formato json
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Routes
app.use(require('./routes/index.js'))

module.exports=app;