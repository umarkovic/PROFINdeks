const mongoose = require('mongoose');
const profesor =  require('./profesor');

const fakultet = new mongoose.Schema({

    naziv: {
        type:String,
        required:true,

    },

    adresa :{
        type: String, 
        required: true
    },
    brojOcena: {
        type:Number,
        default: 0 
    },

    profesori:
      [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profesor' }],

    ocene:
      [{ type: mongoose.Schema.Types.ObjectId, ref: 'OcenaFakultet' }]

});
//var Profesor = mongoose.model('Profesor', profesor);
module.exports = mongoose.model('Fakultet', fakultet);