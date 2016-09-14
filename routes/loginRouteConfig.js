function loginRouteConfig(app) {
    this.app = app;
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

        if(route.requestType == "get"){
            self.app.get(route.requestUrl, route.callbackFunction);
        } else if(route.requestType == "post"){
            console.log("posting");
            self.app.post(route.requestUrl, route.callbackFunction);
        } else if(route.requestType == "delete"){
            self.app.delete(route.requestUrl, route.callbackFunction);
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

            productCategoryDao.productCategoryDao.getAllUserDecks(request.body.UserId, function(userData){
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
            response.render("myDecks", { title : "My Decks"})
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