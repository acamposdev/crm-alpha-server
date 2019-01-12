/**
 * Middleware for override header of request
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = (req, res, next) => {
    //console.log(new Date().getMilliseconds() + ' --- Cross-domain req.headers-----> ' , req.headers);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization, client_id, scope");
    next();
}