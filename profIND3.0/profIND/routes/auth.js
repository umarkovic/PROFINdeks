const Korisnik = require('../models/korisnik')
const Komentar = require('../models/komentar')
const bcrypt =  require('bcryptjs')
const jwt = require('jsonwebtoken')
const express =  require('express');
const router =  express.Router();
const auth = require('../middleware/authenticate')
const Profesor= require('../models/profesor')
const OcenaProfesor = require('../models/ocenaProfesor')



router.post('/register',(req, res, next) => {
    bcrypt.hash(req.body.password,10,function (err, hashedPass) {
        if(err)
        {
            res.json({error:err});
        }
        let kor =  new Korisnik({
            email:req.body.email,
            password: hashedPass
        })
        kor.save().then( k => {
            res.json({
                message:'Korisnik je uspesno registrovan'
            })
        })
        .catch(error => {
            res.json({
                message:'Vec postoji korisnik sa unetom email adresom'
            })
        })
    })
    
})

router.post('/login', (req,res) => {
    var email = req.body.email
    var pw = req.body.password

    Korisnik.findOne({email:email})
    .then(kor => {
        if(kor){
            bcrypt.compare(pw, kor.password, function(err,result){
                if(err){
                    res.json({
                        error:err,
                        auth:false
                    })
                }
                if(result){
                    let token = jwt.sign({korisnik: kor}, 'secretValue', {expiresIn:'1h'})
                    res.json({
                        message: 'Login uspeo',
                        token,
                        auth:true
                    })
                } else {
                    res.json({
                        message: 'Pogresna lozinka',
                        auth:false
                    })
                }
            })
        }
        else {
            res.json({
                message:'Ne postoji takav user',
                auth:false
            })
        }
    })
})

router.get('/logout',auth,(req,res) => {
    

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
router.get('/GetProfesor',async (req,res) => {

   
    Korisnik.find({_id:req.body._id}).populate('komentari').exec(function (err,profesor)  {
        if(err) {

        } 
        if(profesor)
        {
            res.json(profesor.komentari);
        }
    });
});

router.get('/KomentariProfa',async(req,res) => {
    Profesor.findOne({_id:req.query._id}).populate('komentari ocene').exec(function (err,profesor)  {
        if(err) {

        } 
        if(profesor)
        {
            console.log(profesor.komentari);
            res.json(profesor);
        }
    });


})

router.post('/Komentarisi',async (req,res) => 
{ console.log(req.body);
    const komentar = new Komentar(
        {
            sadrzaj:req.body.komentar,
            postavljac:req.body.postavljac._id
        });
        console.log("komentar");
        console.log(komentar);
        console.log("komentar");
       await komentar.save();
    Profesor.findOneAndUpdate ({_id:req.body._id}, {$push:{komentari:komentar}}).then(function(result) {
        res.json({message:'Uspesno dodat komentar'});
    })
            
                
           
          
    
});

router.post('/OceniProfesora',async(req,res) => {


    let ocenaProfesor =  new OcenaProfesor({
        predavanjaKorisna : req.body.predavanjaKorisna,
        predavanjaInteresantna: req.body.predavanjaInteresantna,
        komunikacija : req.body.komunikacija,
        dostupnostMaterijala : req.body.materijali,
        profesor: JSON.parse(req.body.profesor)._id,
        postavljac: req.body.korisnik._id,
        konacnaOcena: req.body.konacnaOcena

    });
    await ocenaProfesor.save();
    Profesor.findOneAndUpdate ({_id:JSON.parse(req.body.profesor)._id}, {$push:{ocene:ocenaProfesor}}).then(function(result) {

    }).then(function(result) {
        Korisnik.findOneAndUpdate ({_id:req.body.korisnik._id}, {$push:{postavljeneOceneProf:ocenaProfesor}})
    }).then(function(result) {
        res.json({message:'Uspesno ocenjen profesor'})
    } )
    
})

router.get('/SviProfesoriByArrayOfIDs',async (req,res) => {
const ids = req.query.profesori;
    console.log(ids);
    Profesor.find({
        '_id': { $in: ids}
    }).populate([{path:'institucije', select:'naziv'}, {path:'komentari'}]).exec(function (err,profesori)  {
        if(err) {

        } 
        if(profesori)
        {
            console.log('%j', profesori);
            res.json({profesori});
        }
    });
});


/*router.get('/SviKorisnici',auth ,async (req,res) => {
    //preko ovog middlewarea auth imamo mogucnost da u svakom trenutku znamo koji user je prjavljen 
    res.json(req.korisnik)
   
})*/
router.get('/SviKorisnici',auth ,async (req,res) => {
    //preko ovog middlewarea auth imamo mogucnost da u svakom trenutku znamo koji user je prjavljen 
    res.json(req.korisnik)
   
})

router.get('/PrijavljenKorisnik',auth ,async(req,res) => {
    
    res.json(req.korisnik.korisnik);
})
module.exports = router;

