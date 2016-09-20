angular.module("productCategoryModule")
    .factory("productCategoryService", productCategoryService);

productCategoryService.$inject = ["$http", "$location"];

function productCategoryService($http, $location) {

    return {
        createProductCategory : function (productCategory, privilege) {

            return $http.post("/createProductCategory",

                {
                    DeckName : productCategory.DeckName,
                    Description : productCategory.Description,
                    AddedBy : productCategory.AddedBy,
                    Id : productCategory.productCategoryId,
                    CategoryId : productCategory.CategoryId,
                    Privilege : privilege
                })
        }

        ,

        getAllProductCategories : function (){
            console.log("calling getall")
            return $http.get("/getAllProductCategory");
        }

        ,

        getHierarchy : function (){
            console.log("calling getall")
            return $http.get("/getHierarchy");
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
                    ProductCategoryId : productCategoryId,
                    CategoryId : productCategory.CategoryId
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
        addDetails : function (deck, UserId, on) {
            deck["UserId"] = UserId;
            deck["On"] = on;

            return $http.post("/addDetails",deck);

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
        countCardsLeft : function(DeckId, UserId){
            return $http.post("/countCardsLeft",  {
                deckId : DeckId,
                UserId : UserId
            });
        }
        ,
        getSoonCard : function (deckId, UserId, bias) {

            return $http.post("/getSoonCard",  {
                deckId : deckId,
                UserId : UserId,
                Bias : bias
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
        ,
        getCategories : function (){
            console.log("calling getall")
            return $http.get("/getCategories");
        }
    }

    

}