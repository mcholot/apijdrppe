const express = require('express')
const app = express();

app.get('', (req, res) => res.send('rarity_item'));


module.exports = app;