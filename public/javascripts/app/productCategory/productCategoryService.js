angular.module("productCategoryModule")
    .factory("productCategoryService", productCategoryService);

productCategoryService.$inject = ["$http", "$location"];

function productCategoryService($http, $location) {

    return {
        createProductCategory : function (productCategory) {

            return $http.post("/createProductCategory",

                {
                    DeckName : productCategory.DeckName,
                    Description : productCategory.Description,
                    AddedBy : productCategory.AddedBy,
                    Id : productCategory.productCategoryId
                })
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
        }

        ,


        getProductCategoryById : function (productCategoryId){
            console.log("im RETURNING")
            return $http.get("/getProductCategoryById/" + productCategoryId);
        }

        ,

        updateProductCategory : function(productCategory, productCategoryId){
            console.log(productCategoryId);
            console.log("THE ID!!!!!!!!!!!!!!!!!!!!!");
            return $http.post("/updateProductCategory",

                {
                    DeckName : productCategory.DeckName,
                    Description : productCategory.Description,
                    AddedBy : productCategory.AddedBy,
                    ProductCategoryId : productCategoryId
                });
        }
        ,
        deleteProductCategoryById : function (productCategoryId) {

            return $http['delete']("/deleteProductCategoryById/" + productCategoryId)


        }
        ,
        addDeckToUser : function (deck, UserId, on) {
            deck["UserId"] = UserId;
            deck["On"] = on;

            return $http.post("/addDeckToUser",deck);

        }
        ,
        getAllUserDecks : function (UserId){
            
            return $http.get("/getAllUserDecks/" + UserId);
        }
        ,
        getCardsFromDeck : function (deckId, UserId) {

            return $http.post("/getCardsFromDeck",  {
                deckId : deckId,
                UserId : UserId
            });
        }
        ,

        getNextCard : function (deckId, UserId) {

            return $http.post("/getNextCard",  {
                deckId : deckId,
                UserId : UserId
            });
        }
        ,
        addNewCard : function (deckId, UserId) {
            console.log("ADDING NEW CARD - service");
            return $http.post("/addNewCard",  {
                deckId : deckId,
                UserId : UserId
            });
        }
        ,
        logRep : function (UserId, DeckId, CardId, EF, RepInterval, Reps, TotalReps) {
            return $http.post("/logRep",  {
                UserId : UserId,
                DeckId : DeckId,
                CardId : CardId,
                EF : EF,
                RepInterval : RepInterval,
                Reps : Reps,
                TotalReps : TotalReps
            });
        }
    }

    

}