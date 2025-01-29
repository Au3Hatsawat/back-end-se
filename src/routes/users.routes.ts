import { getAllUsers , deleteUser } from "../controllers/users.controllers";
import { isAuthenticated } from "../middlewares/isAuthentication.middleware";
import { isOwner } from "../middlewares/isOwner.middleware";
import express from "express";

module.exports = (router:express.Router) => {
    router.get('/users' ,isAuthenticated, getAllUsers);
    router.delete('/users/:id' ,isAuthenticated, isOwner , deleteUser);
};