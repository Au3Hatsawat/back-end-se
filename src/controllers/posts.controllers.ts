import mongoose, { Schema } from "mongoose";
import { describe } from "node:test";

const PostSchema = new mongoose.Schema({
    userId : {type : String , require : true},
    description : {type : String , require : false},
    date : {type : Date , require : true},
    likesUserId : [
        {
            type : String , require : false
        }
    ],
    
});