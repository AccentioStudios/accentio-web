const HomeController = require('../controllers/home.controller')();

module.exports = function (app) {

    app.get(`/`, HomeController.index);

}
    