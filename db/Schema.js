const {Schema,model} = require('mongoose');


const schemaMenu = Schema({
    url:{
       type: String,
    //    required: true
    },
    nombre:{
        type: String,
        // required: true
    },
    descripcion: {
        type: Array,
        // required: true
    },
     precio:{
         type: Number,
        //  required: true 
     }
})




module.exports = model('menus',schemaMenu);




// module.exports = model('menu',schemaMenu);