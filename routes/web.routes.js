const path = require('path');

const HomeController = require(path.resolve(__dirname, '../app/controllers/home.controller'))();

module.exports = function (app) {

    app.get(`/`, HomeController.index);

}
    