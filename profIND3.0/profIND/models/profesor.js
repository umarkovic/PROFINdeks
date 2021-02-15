const mongoose = require('mongoose');
const fakultet = require('./fakultet');
const korisnik =  require('./korisnik');
const komentar = require('./komentar');

const profesor = new mongoose.Schema({

    email: {
        type:String,
        required:true,
        index: {unique:true}
    },
    ime: {
        type:String,
        required:true,
    },
    prezime: {
        type:String,
        required:true,
    },
    obrazovanje: {
        type:String,
        required:true,
    },
    biografija: {
        type:String,
    },
    slika: {
        type:String,
    },
    brojOcena: {
        type:Number,
        default: 0 
    },
    brojKomentara: {
        type:Number,
        default: 0 
    },
    komentari:
      [{ type: mongoose.Schema.Types.ObjectId, ref: 'Komentar' }],

    ocene:
      [{ type: mongoose.Schema.Types.ObjectId, ref: 'OcenaProfesor' }],

    institucije:
      [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fakultet' }]
        
    
});
//var Fakultet  = mongoose.model('Fakultet',fakultet);
//var Korisnik = mongoose.model('Korisnik', korisnik);
//var Komentar = mongoose.model('Komentar', komentar);

module.exports= mongoose.model('Profesor', profesor);