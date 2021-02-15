const mongoose = require('mongoose');


const ocenaProfesor = new mongoose.Schema({

    predavanjaKorisna: {
        type:mongoose.SchemaTypes.Number, min: 0, max: 5, default: 0
    },
    predavanjaInteresantna: {
        type:mongoose.SchemaTypes.Number, min: 0, max: 5, default: 0
    },
    komunikacija: {
        type:mongoose.SchemaTypes.Number, min: 0, max: 5, default: 0
    },
    konacnaOcena: {
        type:mongoose.SchemaTypes.Decimal128, default: 0
    },
    dostupnostMaterijala: {
        type:mongoose.SchemaTypes.Number, min: 0, max: 5, default: 0
    },
    profesor: {
         type: mongoose.Schema.Types.ObjectId, ref: 'Profesor' 
    },
    postavljac: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Korisnik' 
   }


});

/*
{
    upsert: true,
    new: true,
    runValidators: true,
    setDefaultsOnInsert: true
  } */

module.exports = mongoose.model('OcenaProfesor', ocenaProfesor);