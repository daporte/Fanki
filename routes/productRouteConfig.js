function productRouteConfig(app){

    this.app = app;
    this.routeTable = [];
    this.init();
};

productRouteConfig.prototype.init = function() {
    var self = this;
    this.addRoutes();
    this.processRoutes();

};//

productRouteConfig.prototype.processRoutes = function(){
    var self = this;

    self.routeTable.forEach(function(route){
        if(route.requestType == "get"){
            self.app.get(route.requestUrl, route.callbackFunction);
        }
        else if (route.requestType == "post"){
            self.app.post(route.requestUrl, route.callbackFunction);
        }
        else if (route.requestType == "delete"){}
        self.app.delete(route.requestUrl, route.callbackFunction);
    });
};

productRouteConfig.prototype.addRoutes = function() {

    var self = this;

    self.routeTable.push({
        requestType : "get",
        requestUrl : "/createProduct",
        callbackFunction: function(request, response){

            response.render("createProduct", { title: "Create Product"});
        }

    });

    self.routeTable.push({
        requestType : "post",
        requestUrl : "/api/createProduct",
        callbackFunction: function(request, response){

            var productDao = require("../server/dao/productDao.js");

            productDao.productDao.createProductCategory(request.body, function(result){
                
                response.json(result);
               
            })
        }

    })

    self.routeTable.push({
        requestType : "get",
        requestUrl : "/viewProduct",
        callbackFunction: function(request, response){

            response.render("viewProduct", { title: "View Product"});
        }

    });

    self.routeTable.push({
        requestType : "get",
        requestUrl : "/api/getAllProducts",
        callbackFunction: function(request, response){

            var productDao = require("../server/dao/productDao.js");

            productDao.productDao.getAllProducts( function(products){

                response.json(products);
                //console.log(products);
            })
        }
    });

    self.routeTable.push({
        requestType : "get",
        requestUrl : "/editProduct/:productId",
        callbackFunction : function(request, response){
            response.render("editProduct", { title : "Edit Product"})
        }
    });



    self.routeTable.push({
        requestType : "get",
        requestUrl : "/getProductById/:productId",
        callbackFunction : function(request, response){
            var productDao = require("../server/dao/productDao.js");
            productDao.productDao.getProductById(request.params.productId,
                function (product) {
                    console.log("im here ")
                    //console.log(product);
                    response.json({product : product});
                });

        }
    });

    self.routeTable.push({
        requestType : "post",
        requestUrl : "/updateProduct",
        callbackFunction : function(request, response){
            var productDao = require("../server/dao/productDao.js");
            productDao.productDao.updateProduct(request,
                function (status) {
                    console.log("im here ")
                    //console.log(status);
                    response.json(status);
                });

        }
    });

    self.routeTable.push({
        requestType : "get",
        requestUrl : "/getCardsFromDeck/:deckId",
        callbackFunction : function(request, response){
            var productDao = require("../server/dao/productDao.js");
            productDao.productDao.getCardsFromDeck(request.params.deckId,
                function (product) {
                    console.log("im here ")
                    //console.log(product);
                    response.json(product);
                });

        }
    });

    self.routeTable.push({
        requestType : "get",
        requestUrl : "/editCard/:deckId/:productId",
        callbackFunction : function(request, response){
            response.render("editCard", { title : "Edit Card"})
        }
    });

    self.routeTable.push({
        requestType : "delete",
        requestUrl : "/deleteCardById/:cardId",

        callbackFunction : function(request, response){

            console.log(request.params.cardId);
            console.log("deleting in route")

            var productDao = require("../server/dao/productDao.js");
            
            productDao.productDao.getDeckIdFromCard(request.params.cardId, function(result){
                console.log("fetch id");
                console.log(result);
               
                productDao.productDao.deleteCardById(request.params.cardId,
                    function (result2) {
                        
                         productDao.productDao.deleteCardFromDeckTable(request.params.cardId, result, function(result3){

                         })
                         
                        console.log("deleteResult")
                        console.log(result2)
                        response.json(result2);

                    });
            })
           
                
        }
    });

    self.routeTable.push({
        requestType : "get",
        requestUrl : "/createCard/:deckId",
        callbackFunction: function(request, response){

            response.render("createCard", { title: "Create Card"});
        }

    });

    
}


module.exports = productRouteConfig;