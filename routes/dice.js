const express = require('express')

module.exports = function(models, log){

    const app = express();
    const setup = require('../controllers/dice');
    const { lancer } = setup(models);

    app.post("/", lancer);

    return app;

}
