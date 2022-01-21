const mongoose = require('mongoose');
require('dotenv').config({path: './env/.env'})
const conectar = async()=>{
    try {
     await mongoose.connect(process.env.URI);
      console.log('se conecto base de datos');
    } catch (error) {
          throw error;
    }
}


module.exports = conectar;