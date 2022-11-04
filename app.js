const express = require('express');
const path = require('path');
const port=3000;
process.env.TZ = 'America/Argentina';
const methodOverride = require('method-override');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const server = express();
const mainRouter=require ('./routers/mainRouter');
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(session({ 
    secret: "Sarasa",
    resave:true,
    saveUninitialized:true }));
server.use(cookieParser());
server.set('views', path.resolve(__dirname, './views'));
server.set('view engine', 'ejs');
server.use(express.static(path.resolve(__dirname, './public')));
server.use(methodOverride('_method'));
server.use('/', mainRouter);
server.listen(port, () => console.log('Servidor corriendo en el puerto '+port));
