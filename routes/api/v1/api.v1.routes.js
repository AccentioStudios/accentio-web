module.exports = function (app) {
    let apiVersion = "v1";
    let endPoint = `/api/${apiVersion}`;

     app.use(`${endPoint}/helloWorld`, require(`./helloWorld.${apiVersion}.routes`)());
};