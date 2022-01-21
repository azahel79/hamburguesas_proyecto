const express = require('express');
const router = express.Router();
const Menu = require('../db/Schema');
const mongoose = require('mongoose');


router.get('/menu',async(req,res)=>{
      try {
         const mostrarMenu = await Menu.find();
           console.log(mostrarMenu);
         res.json({
             result: mostrarMenu     
         })
      } catch (error) {
           console.log(error);
      }
       
})

module.exports = router;