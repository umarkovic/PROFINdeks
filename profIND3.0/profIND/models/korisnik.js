const mongoose = require('mongoose');

const korisnik = new mongoose.Schema({

    email: {
        type:String,
        required:true,
        index: {unique:true}

    },

    password :{
        type: String, 
        required: true
    },

    postavljeniKomentari:
      [{ type: mongoose.Schema.Types.ObjectId, ref: 'Komentar' }],

    postavljeneOceneProf:
      [{ type: mongoose.Schema.Types.ObjectId, ref: 'OcenaProfesor' }],  
    
    postavljeneOceneFaks:
      [{ type: mongoose.Schema.Types.ObjectId, ref: 'OcenaFakultet' }],  

});

module.exports = mongoose.model('Korisnik', korisnik);