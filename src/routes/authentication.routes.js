const {register , login} = require("../controllers/authentication.controllers");

module.exports = (router) => {
    router.post('/auth/register' , register);
    router.get('/auth/login' , login);
};