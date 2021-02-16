  
var path = require('path');

module.exports = function () {
    var developmentMode = process.env.NODE_ENV == 'production' ? false : true;
    class HomeController {
        index(req, res){
            try{
                return res.render('pages/index', {
                    test:"Hello world! hotfix"
                });
            }catch(onError){
                developmentMode ? console.log(`Error ${path.basename(__filename)}.index`, onError):
                console.log("Error desconocido.");
            }
        }
    }

    return new HomeController();
}