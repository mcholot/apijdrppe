
function index(req, res) {
    res.send("API JDR PPE");
}

const auth = require('./middleware/api/auth');

function init(app, models, log) {
    app.get('/', index);

    app.use('/auth', require('./routes/auth')(models, log));
    app.use('/users', auth ,require('./routes/user')(models, log));
    app.use('/character', auth , require('./routes/character')(models, log));
    app.use('/classes', auth , require('./routes/class')(models, log));
    app.use('/items', auth , require('./routes/item')(models, log));
    // app.use('/messages', require('./routes/message')(models, log));
    app.use('/races', require('./routes/race')(models,log))
    app.use('/rarity', require('./routes/rarity_item')(models))
    app.use('/sessions', require('./routes/session')(models, log));
    //app.use('/rooms', require('./routes/room')(models))
    app.use('/skills', require('./routes/skill')(models, log));
    // app.use('/type', require('./routes/type_item')(models))
    app.use('/dice', require('./routes/dice')(models, log));
    app.use('/logs', require('./routes/log')(models));

}



module.exports = { init };