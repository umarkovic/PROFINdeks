const mongoose = require('mongoose');


const ocenaFakultet = new mongoose.Schema({

    ocena: {
        type:mongoose.SchemaTypes.Decimal128, min: 0, max: 5, default: 0
    },
    fakultet: {
         type: mongoose.Schema.Types.ObjectId, ref: 'Fakultet' 
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

module.exports = mongoose.model('OcenaFakultet', ocenaFakultet);