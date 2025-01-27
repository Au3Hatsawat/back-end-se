const {merge} = require('lodash');
const {getUserBySessionToken} = require('../models/users');

const isAuthenticated = async (req , res , next) =>{
    try{
        const sessionToken = req.cookies['SOFTWARE-ENGINEER-CLASS'];

        if(!sessionToken) {
            return res.sendStatus(403);
        }

        const exitingUser = await getUserBySessionToken(sessionToken);

        if(!exitingUser){
            return res.sendStatus(403);
        }

        merge(req , {identity: exitingUser});

        return next();
    }catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}

module.exports = {
    isAuthenticated
}

