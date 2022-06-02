require('module-alias/register');
require('dotenv').config();

const express = require('express');
const db = require('@@db');
const chat = require('./chat');
const api = require('./api');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

const http = require('http');
const httpServer = http.createServer(app);
const res = require("express/lib/response");


//-- Gestion des erreurs de CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });
  
//-- Analyse du corps de la requête HTTP
app.use(bodyParser.json());

//-- Analyse du cookie HTTP
app.use(cookieParser());


db.setup().then((models) => {
    const log = require("@@lib/log")(models)
    chat.init(httpServer, models);
    api.init(app, models, log);
    httpServer.listen(8080, () => {
        console.log(`Listening on port: 8080...`)
    })
})

