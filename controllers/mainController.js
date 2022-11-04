const db = require('../database/models');
const sequelize = require('sequelize');
const moment = require('moment');
const Op = sequelize.Op;

const mainController={
    inicio:(req,res)=>{
        res.render('inicio');
    }
}

module.exports=mainController;