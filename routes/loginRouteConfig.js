function loginRouteConfig(app, bs) {
    this.app = app;
    this.BS = bs;
    this.routeTable = [];
    this.init();
}

loginRouteConfig.prototype.init = function () {
    var self = this;

    this.addRoutes();
    this.processRoutes();
}

loginRouteConfig.prototype.processRoutes = function (){

    var self = this;
    self.routeTable.forEach(function (route) {

        var requiresLogin = require('./requiresLogin.js');

        if(route.requestType == "get"){
            self.app.get(route.requestUrl, requiresLogin,route.callbackFunction);
        } else if(route.requestType == "post"){
            console.log("posting");
            self.app.post(route.requestUrl, requiresLogin,route.callbackFunction);
        } else if(route.requestType == "delete"){
            self.app.delete(route.requestUrl, requiresLogin,route.callbackFunction);
        }
    })
}

loginRouteConfig.prototype.addRoutes = function () {
    var self = this;

    self.routeTable.push({
        requestType : "get",
        requestUrl : "/registration",
        callbackFunction : function(request, response){
            response.render("registration", { title : "Register plz"})
        }
    });


    self.routeTable.push({
        requestType : "post",
        requestUrl : "/createUser",

        callbackFunction: function(request, response){
            console.log(request.body)

            var loginDao = require("../server/dao/loginDao.js");

            loginDao.loginDao.createUser(request.body, function(status){

                response.json(status);
                console.log(status);
            })
        }
    });

    self.routeTable.push({
        requestType : "post",
        requestUrl : "/login",

        callbackFunction: function(request, response) {
            console.log("in route")
            
            console.log(request.body)

            var loginDao = require("../server/dao/loginDao.js");
            var productCategoryDao = require("../server/dao/productCategoryDao.js");

            productCategoryDao.productCategoryDao.getUserDeckInfo(request.body.UserId, function(userData){
                response.json(userData);
                console.log(userData);
            });





         
        }

    });

    self.routeTable.push({
        requestType : "get",
        requestUrl : "/chooseDecks",
        callbackFunction : function(request, response){
            response.render("chooseDecks", { title : "Choose ur decks"})
        }

    });

    self.routeTable.push({
        requestType : "get",
        requestUrl : "/myDecks",
        callbackFunction : function(request, response){
            console.log("aaaaa")
            if(request.app.get('bs')["_json"]["roles"][0]=="admin"){
                response.render("myDecks", { title : "My Decks"})
            } else {
                response.redirect("/")
            }


        }

    });

    self.routeTable.push({
        requestType : "post",
        requestUrl : "/learn",

        callbackFunction: function(request, response) {
            console.log(request.body)


            var productCategoryDao = require("../server/dao/productCategoryDao.js");
            productCategoryDao.productCategoryDao.learn(request.body, function (status) {


            })

        }

    });

    self.routeTable.push({
        requestType : "get",
        requestUrl : "/learn/:deckId",
        callbackFunction : function(request, response){
            response.render("learn", { title : "learn"})
        }
    });




}

module.exports = loginRouteConfig;