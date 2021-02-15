const express =  require('express');
const router =  express.Router();
const Profesor =  require('./../models/profesor');
const Komentar = require('../models/komentar');
const Korisnik = require("../models/korisnik");
const mongoose = require('mongoose');






router.post('/addKorisnik', async (req,res) => {
   const korisnik =  new Korisnik({
       email: req.body.email,
       password: req.body.password
   });
   try {
    const newKorisnik = await korisnik.save();
    res.status(201).json(newKorisnik);
   } catch(err)
    {
        res.status(400).json({msg: err.message});

    }
   
})




router.post('/addKomentar', async (req, res)=> {
    
    Korisnik.findOne({email:"srbija@gmail.com"}).exec( async function(err, korisnik) {    
        if (err) {
          
        }
        if (korisnik) {
            const newKomentar = new Komentar ({
                sadrzaj: req.body.sadrzaj,
                postavljac: korisnik._id
                
        
            });
            const n = await newKomentar.save();
            res.json(n);
          
        }
      });
    
    
    

})

router.get('/Komentari', async (req,res) => {
    Komentar
.findOne({ sadrzaj: "Odlican predavac i pre svega veliki gospodin" })
.populate('postavljac') // <--
.exec(function (err, postavljac) {
  if (err) {

  }
  res.json(postavljac);
  
  //BITNA STVAR: fja populate omogucava da se referenca pribavi i da se pribavljena referenca(dokument) vidi u drugom dokumentu
})
})

router.get('/Korisnici', async (req,res) => {
    Korisnik.findOne({email:"srbija@gmail.com"}).exec(function(err, korinsik) {    
        if (err) {
          
        }
        if (korinsik) {
          
          console.log(korinsik._id.id);
        }
      });
    //BiTNA STVAR: primeti kako pretrazuju podaci, kako se pise query
})

router.get('/SviKorisnici',async (req,res) => {
    Korisnik.find().exec(function (err,korinsici)  {
        if(err) {

        } 
        if(korinsici)
        {
            res.json(korinsici);
        }
    });
})
module.exports = router;