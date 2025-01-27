const {getUserByEmail , createUser} = require("../models/users");
const {random, authentication} = require("../helpers/encryption");

const login = async (req , res) => {
    try {
        const {email , password} = req.body;
        if(!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if(!user) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt , password);
        if(user.authentication.password !== expectedHash){
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt , user._id.toString());

        await user.save();

        res.cookie('SOFTWARE-ENGINEER-CLASS' , user.authentication.sessionToken, { domain : 'localhost' , path : '/' });

        return res.status(200).json(user).end();
    }catch(err){
        console.log();
        return res.sendStatus(400);
    }
}

const register = async (req , res) => {
    try {
        const { userName , email , password , firstName , lastName , province} = req.body;

        if(!email || !userName || !password || !firstName || !lastName || !province){
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);
        if(!existingUser){
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            userName,
            email,
            authentication: {
                password : authentication(salt , password),
                salt
            },
            firstName,
            lastName,
            province,
        });

        return res.status(200).json(user).end();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
} 


module.exports = {
    register,
    login
}