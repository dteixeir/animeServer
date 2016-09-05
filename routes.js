module.exports = {
    '/animes' : require('./controllers/animesController'),
    '/episodes' : require('./controllers/animeEpisodeController'),
    '/users': require('./controllers/userController'),
    '/authenticate': require('./controllers/authenticateController')
};