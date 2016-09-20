module.exports = function(req, res, next) {
    if(! request.app.get('bs')["_json"]["roles"][0]=="admin"){
        return res.redirect('/');
    }
    next();
}