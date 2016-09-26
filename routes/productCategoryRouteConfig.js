function productCategoryRouteConfig(app, bs) {
    this.app = app;
    this.BS = bs;
    this.routeTable = [];
    this.redirectRoute = "/"
    this.init();
}

productCategoryRouteConfig.prototype.init = function () {
    var self = this;

    this.addRoutes();
    this.processRoutes();
}

productCategoryRouteConfig.prototype.processRoutes = function (){

    var self = this;

    var requiresLogin = require('./requiresLogin.js');




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
/*
function checkUser(){
    self.app.get("/user")
}
*/
productCategoryRouteConfig.prototype.addRoutes = function () {
    var self = this;

    self.routeTable.push({
        requestType : "get",
        requestUrl : "/createProductCategory",
        callbackFunction : function(request, response){

            if(request.app.get('bs')["_json"]["roles"][0]=="admin"){
                response.render("createProductCategory", { title : "Create Deck"})
            } else{
                response.redirect(self.redirectRoute);
            }





        }
    });

    self.routeTable.push({
        requestType : "get",
        requestUrl : "/dokumentace",
        callbackFunction : function(request, response){

            response.render("dokumentace", {})


        }
    });

    self.routeTable.push({
        requestType : "post",
        requestUrl : "/createProductCategory",
        callbackFunction : function(request, response){

            if(request.app.get('bs')["_json"]["roles"][0]=="admin"){
                var productCategoryDao = require("../server/dao/productCategoryDao.js");

                console.log(request.body);
                console.log("zdar");


                productCategoryDao.productCategoryDao.createProductCategory(request.body,
                    function (result) {
                        productCategoryDao.productCategoryDao.createTable(result, function (result2) {

                            productCategoryDao.productCategoryDao.addToUserDecks(result, function (status) {


                                    response.json(status);
                                    console.log(status);
                                }
                            )

                        })


                    });
            } else{
                response.redirect(self.redirectRoute);
            }






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
        requestUrl : "/getHierarchy",
        callbackFunction : function(request, response){

            var productCategoryDao = require("../server/dao/productCategoryDao.js");
            productCategoryDao.productCategoryDao.getHierarchy(
                function (hierarchy) {
                    //console.log(productCategories);



                    for(var i=0;i<Object.keys(hierarchy).length;i++){

                        console.log(hierarchy[i]["DeckList"]);

                        var string = hierarchy[i]["DeckList"];
                        var splitString = string.split("|");
                        hierarchy[i]["Decks"] = [];

                        for(var z=0;z<splitString.length;z++){
                            //console.log(splitString[z]);
                            var deckJson = JSON.parse(splitString[z]);
                            hierarchy[i]["Decks"].push(deckJson);
                        }
                        delete hierarchy[i]["DeckList"]


                        console.log(hierarchy[i]["Decks"]);

                    }
                    var parsedHierarchy = JSON.parse(JSON.stringify(hierarchy));
                    console.log(parsedHierarchy);
                    //response.json(hierarchy);



                    productCategoryDao.productCategoryDao.getCategoryTree(
                        function(categoryTree){


                            console.log("CATEGORY TREEEE");
                            console.log(categoryTree);
                            console.log(hierarchy);
                            var combine = {"decks" : parsedHierarchy, "categories": categoryTree}
                            response.json(combine);
                        })




                });

        }
    });


    self.routeTable.push({
        requestType : "get",
        requestUrl : "/viewProductCategory",
        callbackFunction : function(request, response){

            if(request.app.get('bs')["_json"]["roles"][0]=="admin"){
                response.render("viewProductCategory", { title : "All Decks"})
            } else{
                response.redirect(self.redirectRoute);
            }


        }
    });


    self.routeTable.push({
        requestType : "get",
        requestUrl : "/editProductCategory/:productCategoryId",
        callbackFunction : function(request, response){
            if(request.app.get('bs')["_json"]["roles"][0]=="admin"){
                response.render("editProductCategory", { title : "Edit Deck"})
            } else{
                response.redirect(self.redirectRoute);
            }


        }
    });


    self.routeTable.push({
        requestType : "get",
        requestUrl : "/getProductCategoryById/:productCategoryId",
        callbackFunction : function(request, response){
            if(request.app.get('bs')["_json"]["roles"][0]=="admin"){
                var productCategoryDao = require("../server/dao/productCategoryDao.js");
                productCategoryDao.productCategoryDao.getProductCategoryById(request.params.productCategoryId,
                    function (productCategories) {
                        console.log("im here ")
                        //console.log(productCategories);
                        response.json({productCategories : productCategories});
                    });
            } else{
                response.redirect(self.redirectRoute);
            }


        }
    });


    self.routeTable.push({
        requestType : "post",
        requestUrl : "/updateProductCategory",
        callbackFunction : function(request, response){

            if(request.app.get('bs')["_json"]["roles"][0]=="admin"){
                var productCategoryDao = require("../server/dao/productCategoryDao.js");
                productCategoryDao.productCategoryDao.updateProductCategory(request.body.DeckName, request.body.Description, request.body.ProductCategoryId, request.body.CategoryId,
                    function (status) {
                        console.log("im here ")
                        console.log(status);
                        response.json(status);
                    });
            } else{
                response.redirect(self.redirectRoute);
            }

        }
    });

    self.routeTable.push({
        requestType : "delete",
        requestUrl : "/deleteProductCategoryById/:productCategoryId",
        callbackFunction : function(request, response){

            if(request.app.get('bs')["_json"]["roles"][0]=="admin"){
                if(request.app.get('bs')["_json"]["roles"][0]=="admin"){
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
                } else{
                    response.redirect(self.redirectRoute);
                }
            } else{
                response.redirect(self.redirectRoute);
            }





        }
    });

    self.routeTable.push({
        requestType : "get",
        requestUrl : "/editDeck/:deckId",
        callbackFunction : function(request, response){

            if(request.app.get('bs')["_json"]["roles"][0]=="admin"){
                response.render("editDeck", { title : "Edit Deck"})
            } else{
                response.redirect(self.redirectRoute);
            }


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
        requestType : "post",
        requestUrl : "/addDetails",
        callbackFunction : function(request, response){

            console.log(request.body.Id);
            console.log(request.body.UserId);
            console.log(request.body.On);

            var productCategoryDao = require("../server/dao/productCategoryDao.js");

            productCategoryDao.productCategoryDao.addDetails(request.body.Id, request.body.UserId, request.body.On,
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
                    
                });

        }
    });


    self.routeTable.push({
        requestType : "post",
        requestUrl : "/countDueCards",
        callbackFunction : function(request, response){



            var productCategoryDao = require("../server/dao/productCategoryDao.js");


            productCategoryDao.productCategoryDao.countDueCards(request.body.deckId, request.body.UserId,
                function (data) {



                    console.log("im here ")
                    console.log(data);
                    response.json(data);
                });
        }
    });

    self.routeTable.push({
        requestType : "post",
        requestUrl : "/countDeckCards",
        callbackFunction : function(request, response){



            var productCategoryDao = require("../server/dao/productCategoryDao.js");


            productCategoryDao.productCategoryDao.countDeckCards(request.body.DeckId,
                function (data) {



                    console.log("im here ")
                    console.log(data);
                    response.json(data);
                });
        }
    });

    self.routeTable.push({
        requestType : "post",
        requestUrl : "/countRemainingCards",
        callbackFunction : function(request, response){



            var productCategoryDao = require("../server/dao/productCategoryDao.js");


            productCategoryDao.productCategoryDao.countRemainingCards(request.body.DeckId, request.body.UserId,
                function (data) {



                    console.log("im here ")
                    console.log(data);
                    response.json(data);
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
        requestUrl : "/getSoonCard",
        callbackFunction : function(request, response){



            var productCategoryDao = require("../server/dao/productCategoryDao.js");

            productCategoryDao.productCategoryDao.getCardsFromDeck(request.body.deckId, request.body.UserId,
                function (data) {
                    console.log(data);
                    console.log(new Date(data[0]["Timestamp"]).getTime() + data[0]["RepInterval"] * 1000);
                    console.log("<")
                    console.log(new Date().getTime() + request.body.Bias * 1000)
                    if(new Date(data[0]["Timestamp"]).getTime() + data[0]["RepInterval"] * 1000 +7200000< new Date().getTime() + request.body.Bias * 1000){
                        response.json(data[0]);
                    } else {
                        response.json({"status":"fail"});
                    }

                    console.log("im here ")
                    console.log(data);

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

                    console.log("CALLING BACK ROUTE");
                    console.log(data)

                    if(data[0]){
                        console.log(new Date(data[0]["Timestamp"]).getTime());
                        console.log(">")
                        console.log(new Date().getTime())

                    }


                    if(!data[0]) {
                        productCategoryDao.productCategoryDao.addNewCard(request.body.deckId, request.body.UserId,
                            function (newCards) {


                                console.log("Case 1");
                                //console.log(status);
                                response.json(newCards[0]);

                            })
                    } else if(new Date(data[0]["Timestamp"]).getTime() + data[0]["RepInterval"] * 1000 +7200000> new Date().getTime()){

                        productCategoryDao.productCategoryDao.addNewCard(request.body.deckId, request.body.UserId,
                            function (newCards) {


                                console.log("Case 2");
                                //console.log(status);
                                response.json(newCards[0]);

                            })
                    } else {
                        console.log("Case 3");
                        response.json(data[0]);
                    }


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

    self.routeTable.push({
        requestType : "get",
        requestUrl : "/getCategories",
        callbackFunction : function(request, response){
            var productCategoryDao = require("../server/dao/productCategoryDao.js");
            productCategoryDao.productCategoryDao.getCategories(
                function (Categories) {
                    //console.log(productCategories);
                    response.json(Categories);
                });

        }
    });




};

module.exports = productCategoryRouteConfig;