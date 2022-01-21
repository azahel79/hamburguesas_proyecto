const express = require('express');
const conectar = require('../db/conectarDB');
require('dotenv').config({path: './env/.env'});


class Server{
    constructor(){
      this.app =express();
      this.middlewares();
      this.servers();
      this.conectarDB();
    }

    async conectarDB(){
      await conectar();
    }
    middlewares(){
        this.app.set('port',process.env.PORT);
         this.app.use(express.json());
         this.app.use(express.urlencoded({extended:false})); 
         this.app.use(express.static('public'));
    }
    servers(){
          this.app.use('/',require('../routers/router'))      
    }
    
    listen(){
     this.app.listen(this.app.get('port'),()=>{
            console.log(`server in port ${this.app.get('port')}`);
     })
    }
}

module.exports = Server;