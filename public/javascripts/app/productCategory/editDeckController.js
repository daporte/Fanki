angular.module("productModule").controller("editDeckController",editDeckController);

editDeckController.$inject = ["$scope", "$timeout", "productService"];

function editDeckController($scope, $timeout, productService) {

    $scope.products = [];
    $scope.DeckName = "";
    $scope.Decks_FK = productService.getIdFromEndPoint();
    populateProducts();
    getDeckName();


    function populateProducts(){
        productService.getCardsFromDeck(productService.getIdFromEndPoint())
            .success(function(data){
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAaaa");
                console.log(data);
                $scope.products = data;
                console.log("scope products");
                console.log($scope.products);
            });
    };

    function getDeckName() {
        productService.getProductCategoryById(productService.getIdFromEndPoint())
            .success(function (data) {
                console.log(data);
                $scope.DeckName = data.productCategories[0].DeckName;
            })

    }

    $scope.productDetailsView = {
        productCategoryName : "",
        productName : "",
        productDescription : "",
        productSellingPrice : "",
        productPrice : "",
        productReleaseDate : ""
    }

    $scope.showProductDetailsInformation = function(product){
        console.log("CLICKED");
        $scope.productDetailsView.productCategoryName = product.CategoryName
        console.log($scope.productDetailsView.productCategoryName);
        $scope.productDetailsView.productName = product.Name
        $scope.productDetailsView.productDescription = product.Description
        $scope.productDetailsView.productSellingPrice = product.ProductPrice
        $scope.productDetailsView.productPrice = product.productCost
        $scope.productDetailsView.productReleaseDate = product.CreatedDt


    }


    $scope.currentCardId = 0;

    $scope.setCurrentCardId = function (cardId){
        console.log("cardId:")
        console.log(cardId);
        $scope.currentCardId = cardId;
    };

    $scope.deleteCard = function(){
        console.log("HHHHHHHAIII");
        console.log($scope.currentCardId);
        if($scope.currentCardId>0){
            productService.deleteCardById($scope.currentCardId)
                .success(function(data){
                    if(data && data.status && data.status == "successful"){
                        console.log("Succcess");
                        
                    }

                });


        }
    };

}
