const jwt = require('jsonwebtoken')
/*
const authenticate = (req, res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'secretValue', (err, kor) =>{
            if(err) return res.sendStatus(403)
            req.korisnik = kor
            next()

        });
    } 
    catch(error) {
        res.json({
            message: 'Autentifikacija nije prosla'
        })
    }
}*/


const authenticate = (req, res,next) => {
    try{
        
        const token = req.headers['authorization'];
        jwt.verify(token, 'secretValue', (err, kor) =>{
            if(err) return res.sendStatus(403)
            req.korisnik = kor
            next();

        });
    } 
    catch(error) {
        res.json({
            message: 'Autentifikacija nije prosla'
        })
    }
}

module.exports = authenticate