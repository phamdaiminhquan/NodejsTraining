const jwt = require('jsonwebtoken');
const UserModels = require('../models/sequelize/user');

function authenToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    // Beaer [token]
    const token = authorizationHeader.split(' ')[1];
    if(!token) res.sendStatus(401);

    jwt.verify(token, 'next user secret', (err, data) => {
        console.log(err, data);
        if (err) res.sendStatus(403);
        next();
    })
}

function authorization(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader.split(' ')[1];
    
    if(token){
        jwt.verify(token, 'next user secret', async (err, decodedToken) => {
            if(err){
                res.locals.user = null
                res.status(403).json('token khong hop le')
                next()
            }else{
                let user = await UserModels.findOne({ where: { userName: decodedToken.userName}})
                res.locals.user = user
                next()
            }
        })
    }else{
        res.sendStatus(401);
        res.locals.user = null
        next()
    }   
}
module.exports = { authenToken, authorization }