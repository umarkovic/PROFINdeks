const mongoose = require('mongoose');
const korisnik =  require('./korisnik');

const komentar = new mongoose.Schema({

    sadrzaj: {
        type:String,
        required:true,

    },

    datum :{
        type: Date, 
        required: true,
        default: Date.now
    },

    postavljac:
      { type: mongoose.Schema.Types.ObjectId, ref: 'Korisnik' }

});

//var Korisnik = mongoose.model('Korisnik', korisnik);


module.exports = mongoose.model('Komentar', komentar);