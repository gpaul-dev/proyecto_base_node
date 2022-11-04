const express=require('express');
const router=express.Router();
const mainController=require('../controllers/mainController');  
const mainApiController=require('../apis/mainApiController');
router.get('/',mainController.inicio);

module.exports=router;