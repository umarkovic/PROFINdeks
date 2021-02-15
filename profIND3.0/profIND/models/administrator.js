const mongoose = require('mongoose');

const administator = new mongoose.Schema({

    email: {
        type:String,
        required:true,
        index: {unique:true}

    },

    password :{
        type: String, 
        required: true
    },
});
module.exporst= administator;
