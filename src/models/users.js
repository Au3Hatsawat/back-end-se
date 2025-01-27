const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName : { type: String , require: true },
    email : {type: String , require: true},
    authentication : {
        password : {type : String , require : true , select: false},
        salt : {type : String , require : false},
        sessionToken : {type : String , require : true , select : false}
    },
    firstName : {type : String , require : true},
    lastName : {type : String , require : true},
    province : {type : String , require : true},
});

const UserModel = mongoose.model("Users" , UserSchema);

const getUsers = () => UserModel.find();
const getUserByEmail = (email) => UserModel.findOne({ email });
const getUserBySessionToken = (sessionToken) => UserModel.findOne({
    'authentication.sessionToken' : sessionToken
}) 
const getUserById = (id) => UserModel.findById(id);
const createUser = (values) => new UserModel(values).save().then((user)=> user.toObject());
const deleteUserById = (id) => UserModel.findOneAndDelete({_id : id});
const updateUserById = (id , values) => UserModel.findByIdAndUpdate(id , values);

module.exports = {
    UserModel,
    getUsers,
    getUserByEmail,
    getUserById,
    getUserBySessionToken,
    createUser,
    deleteUserById,
    updateUserById,
}
