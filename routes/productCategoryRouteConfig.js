function productCategoryRouteConfig(app) {
    this.app = app;
    this.routeTable = [];
    this.init();
}

productCategoryRouteConfig.prototype.init = function () {
    var self = this;

    this.addRoutes();
    this.processRoutes();
}

productCategoryRouteConfig.prototype.processRoutes = function (){

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

productCategoryRouteConfig.prototype.addRoutes = function () {
    var self = this;

    self.routeTable.push({
        requestType : "get",
        requestUrl : "/createProductCategory",
        callbackFunction : function(request, response){
            response.render("createProductCategory", { title : "Create Deck"})
        }
    });


    self.routeTable.push({
        requestType : "post",
        requestUrl : "/createProductCategory",
        callbackFunction : function(request, response){
            console.log(request.body);
           
            var productCategoryDao = require("../server/dao/productCategoryDao.js");

            console.log(request.body);
            console.log("zdar");


            productCategoryDao.productCategoryDao.createProductCategory(request.body,
                function(result){
                    productCategoryDao.productCategoryDao.createTable(result, function (result2) {

                        productCategoryDao.productCategoryDao.addToUserDecks(result, function(status){


                                response.json(status);
                                console.log(status);
                            }

                        )

                    })

                  
                });

        }
    })

    self.routeTable.push({
        requestType : "get",
        requestUrl : "/getAllProductCategory",
        callbackFunction : function(request, response){
            var productCategoryDao = require("../server/dao/productCategoryDao.js");
            productCategoryDao.productCategoryDao.getAllProductCategory(
                function (productCategories) {
                    //console.log(productCategories);
                    response.json({productCategories : productCategories});
                });

        }
    });



    self.routeTable.push({
        requestType : "get",
        requestUrl : "/viewProductCategory",
        callbackFunction : function(request, response){
            response.render("viewProductCategory", { title : "All Decks"})
        }
    });


    self.routeTable.push({
        requestType : "get",
        requestUrl : "/editProductCategory/:productCategoryId",
        callbackFunction : function(request, response){
            response.render("editProductCategory", { title : "Edit Deck"})
        }
    });


    self.routeTable.push({
        requestType : "get",
        requestUrl : "/getProductCategoryById/:productCategoryId",
        callbackFunction : function(request, response){
            var productCategoryDao = require("../server/dao/productCategoryDao.js");
            productCategoryDao.productCategoryDao.getProductCategoryById(request.params.productCategoryId,
                function (productCategories) {
                    console.log("im here ")
                    //console.log(productCategories);
                    response.json({productCategories : productCategories});
                });

        }
    });


    self.routeTable.push({
        requestType : "post",
        requestUrl : "/updateProductCategory",
        callbackFunction : function(request, response){

            console.log(request.body.DeckName);

            var productCategoryDao = require("../server/dao/productCategoryDao.js");
            productCategoryDao.productCategoryDao.updateProductCategory(request.body.DeckName, request.body.Description, request.body.ProductCategoryId,
                    function (status) {
                    console.log("im here ")
                    console.log(status);
                    response.json(status);
                });
        }
    });

    self.routeTable.push({
        requestType : "delete",
        requestUrl : "/deleteProductCategoryById/:productCategoryId",
        callbackFunction : function(request, response){

            console.log(request.params.productCategoryId);

            var productCategoryDao = require("../server/dao/productCategoryDao.js");
            productCategoryDao.productCategoryDao.deleteProductCategoryById(request.params.productCategoryId,
                function (status) {
                    console.log("im here ")
                    if(status=="successful"){

                        productCategoryDao.productCategoryDao.deleteTable(request.params.productCategoryId, function(status2) {

                            productCategoryDao.productCategoryDao.deleteFromUserDecks(request.params.productCategoryId, function (status3) {

                                response.json(status3);
                                console.log(status3);
                            });

                        })
                    }



                });

        }
    });

    self.routeTable.push({
        requestType : "get",
        requestUrl : "/editDeck/:deckId",
        callbackFunction : function(request, response){
            response.render("editDeck", { title : "Edit Deck"})
        }
    });

    self.routeTable.push({
        requestType : "post",
        requestUrl : "/addDeckToUser",
        callbackFunction : function(request, response){

            console.log(request.body.Id);
            console.log(request.body.UserId);
            console.log(request.body.On);

            var productCategoryDao = require("../server/dao/productCategoryDao.js");

            productCategoryDao.productCategoryDao.updateUserDecks(request.body.Id, request.body.UserId, request.body.On,
                function (status) {
                    response.json(status);
                    /*
                    if(request.body.On){
                        productCategoryDao.productCategoryDao.addUserToDecksTable(request.body.Id, request.body.UserId, function (result) {

                        })
                    }

                    console.log("im here ")
                    console.log(status);
                    response.json(status);
                    */
                });
        }
    });

    self.routeTable.push({
        requestType : "get",
        requestUrl : "/getAllUserDecks/:UserId",
        callbackFunction : function(request, response){
            var productCategoryDao = require("../server/dao/productCategoryDao.js");
            console.log("checkthis")
            console.log(request.params.UserId)
            productCategoryDao.productCategoryDao.getAllUserDecks(request.params.UserId,
                function (productCategories) {
                    console.log("PROPERTIES")

                    response.json(productCategories);
                    /*
                    var activeDecks = [];
                    for (var property in productCategories[0]) {
                        if (productCategories[0].hasOwnProperty(property)) {
                            if (productCategories[0][property] == 1){
                                console.log(property);
                                activeDecks.push(property.split("_")[1])
                            }
                        }
                    }
                    console.log(activeDecks);
                    var inClause = "("
                    for (var i = 0; i < activeDecks.length; i++) {
                        inClause += (activeDecks[i]);
                        inClause += ","
                    }
                    inClause = inClause.slice(0, -1);
                    inClause += ")"
                    console.log(inClause)

                    productCategoryDao.productCategoryDao.getDeckInfo(inClause, function(resultDecks) {
                        response.json(resultDecks);
                    });
                    */
                });

        }
    });

    self.routeTable.push({
        requestType : "post",
        requestUrl : "/getCardsFromDeck",
        callbackFunction : function(request, response){

           

            var productCategoryDao = require("../server/dao/productCategoryDao.js");

            productCategoryDao.productCategoryDao.getCardsFromDeck(request.body.deckId, request.body.UserId,
                function (status) {

                    

                    console.log("im here ")
                    console.log(status);
                    response.json(status);
                });
        }
    });

    self.routeTable.push({
        requestType : "post",
        requestUrl : "/getNextCard",
        callbackFunction : function(request, response){
            var productCategoryDao = require("../server/dao/productCategoryDao.js");

            productCategoryDao.productCategoryDao.getCardsFromDeck(request.body.deckId, request.body.UserId,
                function (data) {


                    if(!data[0]) {
                        productCategoryDao.productCategoryDao.addNewCard(request.body.deckId, request.body.UserId,
                            function (newCards) {


                                console.log("Case 1");
                                //console.log(status);
                                response.json(newCards[0]);

                            })
                    } else if(new Date(data[0]["Timestamp"]).getTime() > new Date().getTime()){

                        productCategoryDao.productCategoryDao.addNewCard(request.body.deckId, request.body.UserId,
                            function (newCards) {


                                console.log("Case 2");
                                //console.log(status);
                                response.json(newCards[0]);

                            })
                    } else {
                        console.log(new Date(data[0]["Timestamp"]).getTime())
                        console.log(">");
                        console.log(new Date().getTime());
                        console.log("Case 3");
                        response.json(data[0]);
                    }

                    //if(!data[0] || now - data[0].Timestamp < 10000) {


                    /*
                    productCategoryDao.productCategoryDao.addNewCard(request.body.deckId, request.body.UserId,
                        function (newCard) {


                            console.log("im here ")
                            //console.log(status);
                            response.json(newCard);
                        });
*/

                });


        }
    });

    self.routeTable.push({
        requestType : "post",
        requestUrl : "/logRep",
        callbackFunction : function(request, response){



            var productCategoryDao = require("../server/dao/productCategoryDao.js");

            productCategoryDao.productCategoryDao.logRep(request,
                function (status) {



                    console.log("im here ")
                    console.log(status);
                    response.json(status);
                });
        }
    });


    self.routeTable.push({
        requestType : "post",
        requestUrl : "/addNewCard",
        callbackFunction : function(request, response) {
            console.log("ADDING NEW CARD - route");

            var productCategoryDao = require("../server/dao/productCategoryDao.js");

            productCategoryDao.productCategoryDao.addNewCard(request.body.deckId, request.body.UserId,
                function (newCards) {


                    console.log("im here ")
                    //console.log(status);
                    response.json(newCards);

                });
        }
    });




};

module.exports = productCategoryRouteConfig;