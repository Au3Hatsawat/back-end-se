const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const config = require("./src/configs/config.js");
const mongoose = require("mongoose");
const router = require("./src/routes/index.js");

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(config.PORT , ()=> {
    console.log("Server running on http://localhost:3000/");
});

const MONGO_URL = config.MONGODB_URL;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error' , (error)=>console.log(error));


app.use('/' , router());