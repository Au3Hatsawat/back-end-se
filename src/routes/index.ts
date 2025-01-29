import express from "express";
import authentication from "./authentication.routes";

const users = require("./users.routes")


const router = express.Router();

export default () => {
    authentication(router);
    users(router);
    
    return router;
}