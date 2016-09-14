angular.module("productCategoryModule").controller("viewProductCategoryController",viewProductCategoryController);

viewProductCategoryController.$inject = ["$scope", "$timeout", "productCategoryService", "loginService"];

function viewProductCategoryController($scope, $timeout, productCategoryService, loginService){

    $scope.Hierarchy = {};

    getHierarchy();

    $scope.showTest = false;

    $scope.$storage = loginService.storage;


    function getHierarchy(){
        productCategoryService.getHierarchy()
            .success(function (data){
                console.log("zzzzzzzzzzzzzzzzzzzzz");

                if(data){
                    console.log(data);
                    $scope.Hierarchy = data;
                    console.log("CCCCCCCCCCCCCCCc");
                }

            })
    }
    /*
    function getAllProductCategories(){
        console.log("do you even");
        productCategoryService.getAllProductCategories()
            .success(function (data){
                console.log("zzzzzzzzzzzzzzzzzzzzz");
                console.log(loginService.storage)
                console.log(data);
                console.log(data.productCategories);
                if(data
                    && data.productCategories
                    && data.productCategories.length > 0){

                    $scope.productCategories = data.productCategories;
                    console.log("CCCCCCCCCCCCCCCc");
                }

            })
    }

    */

    $scope.currentProductCategoryId = 0;

    $scope.setCurrentProductCategoryId = function (productCategoryId){
        console.log(productCategoryId);
        $scope.currentProductCategoryId = productCategoryId;
    };

    $scope.addCategory = function(category, on){
        console.log(category.CategoryId);
        loginService.storage.Categories[category.CategoryId] = on ? 1: 0;
    }


    $scope.addDeck = function (deck, category, on) {
        console.log(deck)
        productCategoryService.addDeckToUser(deck, loginService.storage.UserId, on)
            .success(function (data) {
                console.log(deck.Id)
                console.log(on)
                console.log(deck);
                loginService.storage.decks[deck.Id] = on ? 1: 0;
                if(on){
                    if(loginService.storage.Categories[category.CategoryId]){
                        loginService.storage.Categories[category.CategoryId] ++;
                    }
                    else{
                        loginService.storage.Categories[category.CategoryId] = 1;
                    }
                } else {

                    loginService.storage.Categories[category.CategoryId] --;


                }
            })
    }


    $scope.deleteProductCategory = function(){
        console.log("HHHHHHHAIII");
        if($scope.currentProductCategoryId>0){
            productCategoryService.deleteProductCategoryById($scope.currentProductCategoryId)
                .success(function(data){


                    console.log("Succcess");
                    console.log(data.resultId);
                    //window.location.href = "/viewProductCategory/deck_"+data.resultId;
                    console.log(loginService.storage.decks[data.resultId])
                    delete loginService.storage.decks[data.resultId];
                    window.location.href = "/viewProductCategory";


                });
         
            //
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