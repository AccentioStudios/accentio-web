module.exports = function () {
    var RestResponse = require('../models/RestResponse.model');
    var developmentMode = process.env.NODE_ENV == 'production' ? false : true;
    class HelloWorldController {
        async create(req, res) {
            try{
                return res.status(200).send(new RestResponse().ok("Ok"));
            } catch(onError){
                developmentMode ? console.log(`Error ${path.basename(__filename)}.index`, onError):
                console.log("Error desconocido.");
            }
        }
        async getAll(req, res) {
            try{
                return res.status(200).send(new RestResponse().ok("Ok"));
            } catch(onError){
                developmentMode ? console.log(`Error ${path.basename(__filename)}.index`, onError):
                console.log("Error desconocido.");
            }
        }
    }
    return new HelloWorldController();
}