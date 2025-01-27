const {getAllUsers, deleteUser} = require("../controllers/users.controllers");
const {isAuthenticated} = require("../middlewares/isAuthentication.middleware");
const {isOwner} = require("../middlewares/isOwner.middleware");

module.exports = (router) => {
    router.get('/users' ,isAuthenticated, getAllUsers);
    router.delete('/users/:id' ,isAuthenticated, isOwner , deleteUser);
};