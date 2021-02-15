const express =  require('express');
const router =  express.Router();
const Profesor =  require('../models/profesor');
const Komentar = require('../models/komentar');
const Korisnik = require("../models/korisnik");
const mongoose = require('mongoose');
const Fakultet = require('../models/fakultet')
const auth = require('../middleware/authenticate')
const multer = require('multer')

//storage za slike
const storage = multer.diskStorage({
    destination:function(request,file,callback)
    {
        callback(null,'../client/public/images');
    },
    filename:function(request,file,callback)
    {
        callback(null,Date.now()+ file.originalname);
    },

});
const upload = multer({
    storage:storage,
    limits:
    {
        fieldSize:1024*1024*3,
    }
});

router.post('/DodajProfu',/* upload.single('image'), */async (req, res) => {
    

    try{
       
        const profesor =  new Profesor({
            ime: req.body.ime,
            prezime: req.body.prezime,
            obrazovanje: req.body.obrazovanje,
            email: req.body.email,
            biografija: req.body.biografija,
            /* slika: req.file.filename, */
            
        });
        const inst = req.body.institucije;
        await profesor.save();
    
        inst.map(faks => (
            Fakultet.find({naziv:faks}).then(function(result) {
                 Profesor.findOneAndUpdate({email:profesor.email}, {$push:{institucije:result[0]}}).then(function(result) {
                    
                        Fakultet.findOneAndUpdate ({naziv:faks}, {$push:{profesori:profesor}}).then(function(result) {
                            res.json({message:'Uspesno dodat profesor'});
                        })

                    });
                })
            
        ))

        
        
    }
    
     catch(err)
    {
        res.status(400).json({msg: err.message});

    }
    
});


router.post('/DodajFaks', (req, res) => {
    
    const fakultet =  new Fakultet({
        naziv:req.body.naziv,
        adresa: req.body.adresa
        
    });
    

    Fakultet.findOne({naziv : fakultet.naziv}).exec(function (err,faks)  {
         
        if(faks)
        {
            res.json({message:'Fakultet sa unetim nazivom postoji'});
        }
        else {
            const newFakultet = fakultet.save();
            res.json({message:'Uspesno dodat fakultet'});

        }
    });

    
    
});


router.get('/SviFakulteti',async (req,res) => {
    Fakultet.find().exec(function (err,fakulteti)  {
        if(err) {

        } 
        if(fakulteti)
        {
            res.json({fakulteti});
        }
    });
});

 router.get('/GetFakultet',async (req,res) => {
    
    Fakultet.findOne({_id: req.query._id}).exec(function (err,faks)  {
            
        if(err) {
            console.log(err);
        } 
        if(faks)
        {
            res.json(faks.naziv);
        }
    });
}); 
router.post('/obrisiFaks',async (req,res) => {
    Fakultet.deleteOne({_id:req.body._id},function(err,response){
        if(err) {
            res.json({message:err})
        } else {
            res.json({message:'Uspesno obrisan fakultet'})
        }
        

    }); 
        
    
});
router.put('/UpdateFaks', (req, res) => {
    const fakultet = new Fakultet({
      _id: req.body._id,
      naziv: req.body.naziv,
      adresa: req.body.adresa,
      
    });

    
    Fakultet.updateOne({_id: req.body._id}, fakultet).then(
      () => {
        const updatedFakultet = fakultet.update();
        res.status(201).json({
            
          message: 'Uspesno izmenjen fakultet'
        });
        
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

  router.put('/UpdateProf', (req, res) => {
    const profesor = new Profesor({
      
      email: req.body.email, 
      ime:req.body.ime,
      prezime:req.body.prezime,
      obrazovanje:req.body.obrazovanje, 
      biografija:req.body.biografija, 
      institucije:req.body.institucije,
      _id:req.body._id
    });

    
    Profesor.updateOne({_id: req.body._id}, profesor).then(
      () => {
        const updatedProfesor = profesor.update();
        res.status(201).json({
            
          message: 'Uspesno izmenjen profesor'
        });
        
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });



router.get('/SviKorisnici',async (req,res) => {

   
    Korisnik.find().exec(function (err,korisnici)  {
        if(err) {
            console.log(err);
        } 
        if(korisnici)
        {
            res.json({korisnici});
        }
    });
})

router.post('/obrisiKorisnika',async (req,res) => {
    Korisnik.deleteOne({_id:req.body._id},function(err,response){
        if(err) {
            res.json({message:err})
        } else {
            res.json({message:'Uspesno obrisan korisnik'})
        }
        

    }); 
        
    
});

router.get('/SviProfesori',async (req,res) => {

   
    Profesor.find().exec(function (err,profesori)  {
        if(err) {

        } 
        if(profesori)
        {
            res.json({profesori});
        }
    });
})



router.post('/obrisiProfesora',async (req,res) => {
    Profesor.deleteOne({_id:req.body._id},function(err,response){
        if(err) {
            res.json({message:err})
        } else {
            res.json({message:'Uspesno obrisan profesor'})
        }
        

    }); 
        
    
});






module.exports = router
