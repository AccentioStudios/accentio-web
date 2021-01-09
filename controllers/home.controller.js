  
var path = require('path');

module.exports = function () {
    var RestResponse = require('../models/RestResponse.model');
    var developmentMode = process.env.NODE_ENV == 'production' ? false : true;
    class HomeController {
        index(req, res){
            try{
                return res.render('pages/index', {
                    test:"Hello world! v2 git flow"
                });
            }catch(onError){
                developmentMode ? console.log(`Error ${path.basename(__filename)}.index`, onError):
                console.log("Error desconocido.");
            }
        }
    }

    return new HomeController();
}