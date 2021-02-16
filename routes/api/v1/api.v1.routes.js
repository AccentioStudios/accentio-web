module.exports = function (app) {
    let apiVersion = "v1";
    let endPoint = `/api/${apiVersion}`;

    // Aqui estan referenciadas todas las apis de la version.

     app.use(`${endPoint}/helloWorld`, require(`./helloWorld.${apiVersion}.routes`)());
};