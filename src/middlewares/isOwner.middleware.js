const {get} = require('lodash');
const {getUserBySessionToken} = require('../models/users');

const isOwner = (req , res ,next) => {
    try {
        const {id} = req.params;
        const currentUserId = get(req , 'identity._id');

        if(!currentUserId) {
            return res.sendStatus(403);
        }

        if(currentUserId.toString() !== id){
            return res.sendStatus(403);
        }

        next();
    } catch (err){
        console.log(err);
        return res.sendStatus(400);
    }
};

module.exports = {
    isOwner
}
