const express = require("express");
const authentication = require("./authentication.routes");
const users = require("./users.routes")

const router = express.Router();

module.exports = () => {
    authentication(router);
    users(router);
    
    return router;
}