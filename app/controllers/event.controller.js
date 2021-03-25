module.exports = function () {
    var developmentMode = process.env.NODE_ENV == 'production' ? false : true;
    class EventController {
        async index(req, res) {
            try{
                return res.status(200).send(new RestResponse().ok("Ok"));
            } catch(onError){
                developmentMode ? console.log(`Error ${path.basename(__filename)}.index`, onError):
                console.log("Error desconocido.");
            }
        }
        async firstEvent(req, res) {
            try{
                return res.status(200).send(new RestResponse().ok("Ok"));
            } catch(onError){
                developmentMode ? console.log(`Error ${path.basename(__filename)}.index`, onError):
                console.log("Error desconocido.");
            }
        }
    }
    return new EventController();
}