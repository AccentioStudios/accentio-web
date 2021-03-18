module.exports = function (app) {
     app.use('event', require(`./event.routes`)());
};