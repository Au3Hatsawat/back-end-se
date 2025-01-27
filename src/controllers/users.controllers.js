const { getUsers , deleteUserById } = require("../models/users");

const getAllUsers = async (req , res) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

const deleteUser = async (req , res) => {
    try {
        const {id} = req.params;
        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}


module.exports = {
    getAllUsers,
    deleteUser
}