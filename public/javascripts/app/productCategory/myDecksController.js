angular.module("productCategoryModule").controller("myDecksController",myDecksController);

myDecksController.$inject = ["$scope", "$timeout", "productCategoryService", "loginService"];

function myDecksController($scope, $timeout, productCategoryService, loginService){

    $scope.productCategories = [];
    console.log(loginService.storage);

    getAllUserDecks(loginService.storage.UserId);

    function getAllUserDecks(UserId){
        console.log("do you even");
        console.log(UserId);
        productCategoryService.getAllUserDecks(UserId)
            .success(function (data){
                console.log("zzzzzzzzzzzzzzzzzzzzz");
                console.log(data);
                console.log(data.productCategories);





                for(var i=0;i<data["Decks"].length;i++){


                    console.log("xx");


                    data["Decks"][i]["DueCards"] = data["DueCards"][i]["DueCards"];


                }

                console.log(data);
                $scope.productCategories = data["Decks"];


                console.log("CCCCCCCCCCCCCCCc");


            })
    }

    console.log($scope.productCategories);

    $scope.currentProductCategoryId = 0;

    $scope.setCurrentProductCategoryId = function (productCategoryId){
        console.log(productCategoryId);
        $scope.currentProductCategoryId = productCategoryId;
    };

    $scope.addDeck = function (deck, on) {
        console.log(deck)
        productCategoryService.addDeckToUser(deck, loginService.storage.Username, on)
            .success(function (data) {

            })
    }

   

    $scope.deleteProductCategory = function(){
        console.log("HHHHHHHAIII");
        if($scope.currentProductCategoryId>0){
            productCategoryService.deleteProductCategoryById($scope.currentProductCategoryId)
                .success(function(data){
                    if(data && data.status && data.status == "successful"){
                        console.log("Succcess");
                    }

                });

            window.location.href = "/viewProductCategory";
        }
    };





    $scope.productDetailsView = {
        DeckName : "",

        Description : "",
        AddedBy : ""

    };

    $scope.showProductDetailsInformation = function(productCategory){
        console.log("ckeil");
        console.log(productCategory);

        $scope.productDetailsView.DeckName = productCategory.DeckName;
        $scope.productDetailsView.Description= productCategory.Description;
        $scope.productDetailsView.AddedBy= productCategory.AddedBy;
        console.log($scope.productDetailsView);
        //console.log($scope.productDetailsView.productCategoryName);
        /*
         $scope.productDetailsView.productName = product.Name
         $scope.productDetailsView.productDescription = product.Description
         $scope.productDetailsView.productSellingPrice = product.ProductPrice
         $scope.productDetailsView.productPrice = product.productCost
         $scope.productDetailsView.productReleaseDate = product.CreatedDt
         */


    }
    
    


};