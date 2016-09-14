angular.module("productModule").factory("productService",productService);

productService.$inject = ["$http", "$location"];


function productService($http, $location){

    return{




        createCard : function(product, deckId){
            return $http.post("/api/createProduct/",
                {
                    FrontSide : product.FrontSide,
                    BackSide : product.BackSide,
                    AddedBy : product.AddedBy,
                    Decks_FK : deckId,
                    Image : product.Image,
                    Literature : product.Literature,
                    Wikipedia : product.Wikipedia,
                    Wikiskripta : product.Wikiskripta,
                    Youtube : product.Youtube,
                    ExtraLink : product.ExtraLink,
                    Tag : product.Tag,
                    Detail : product.Detail

                }
            )
        }

        ,

        getAllProductCategories : function (){
            console.log("calling getall")
            return $http.get("/getAllProductCategory");
        }
        ,
       
        
        getIdFromEndPoint: function(){

            var absoluteUrl = $location.absUrl();

            var segments= absoluteUrl.split("/");

            var productCategoryId = segments[segments.length-1];

            return productCategoryId;
        },


        getIdFromSecondLast: function(){

            var absoluteUrl = $location.absUrl();

            var segments= absoluteUrl.split("/");

            var productCategoryId = segments[segments.length-2];

            return productCategoryId;
        },

        getAllProducts : function(){

            return $http.get("/api/getAllProducts");

        }
        ,
        getProductById : function (productId){
            console.log("im RETURNING");
            return $http.get("/getProductById/" + productId);
        }

        
        ,

        getProductCategoryById : function (productCategoryId){
            console.log("im RETURNING")
            return $http.get("/getProductCategoryById/" + productCategoryId);
        }
        
        ,

        updateProduct : function(product, productId){
            console.log(productId);
            console.log("THE ID!!!!!!!!!!!!!!!!!!!!!");

            return $http.post("/updateProduct",

                {
                    Id : productId,
                    FrontSide : product.FrontSide,
                    BackSide : product.BackSide,
                    AddedBy : product.AddedBy,
                    Decks_FK : product.Decks_FK,
                    Image : product.Image,
                    Literature : product.Literature,
                    Wikipedia : product.Wikipedia,
                    Wikiskripta : product.Wikiskripta,
                    Youtube : product.Youtube,
                    ExtraLink : product.ExtraLink,
                    Tag : product.Tag,
                    Detail : product.Detail

                });
        }

        ,
        
        getCardsFromDeck : function (deckId) {
            return $http.get("/getCardsFromDeck/" + deckId);
        }

        ,

        deleteCardById : function (cardId) {
            console.log("deleting in service")
            return $http['delete']("/deleteCardById/" + cardId)
        }

        


    }
}