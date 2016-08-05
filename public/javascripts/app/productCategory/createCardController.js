angular.module("productModule").controller("createCardController",createCardController);

createCardController.$inject = ["$scope", "$timeout", "productService", "requiredFieldValidationService_Product", "loginService"];

function createCardController($scope, $timeout, productService, requiredFieldValidationService_Product, loginService) {



    $scope.product = {
        productId: 0,
        productCategoryId : "",
        categoryDetails : "",
        cost : 0.00,
        name : "",
        description : "",
        createdDt : new Date(),
        productPrice :0.00
    };


    function clearProduct(){
        for (var productProperty in $scope.product){
            if($scope.product.hasOwnProperty(productProperty)){
                if (typeof (productProperty) == "string"){
                    $scope.product[productProperty] = "";
                }
            }
        }
    }

    $scope.DeckName = ""
    getDeckName();
    function getDeckName(){
        productService.getProductCategoryById(productService.getIdFromEndPoint())
            .success(function (data) {
                $scope.DeckName = data.productCategories[0].DeckName;
            })
    }

    $scope.productCategories = [];

    getProductCategories();
    function getProductCategories(){
        productService.getAllProductCategories().
        success(function(data){
            if (data && data.productCategories && data.productCategories.length > 0) {
                $scope.productCategories = data.productCategories;
            }
        })
    }

    $scope.validationResult = {

        containsValidationError : false,
        validationSummary : ""
    }

    $scope.createCard = function (card) {

        card["AddedBy"] = loginService.storage.Username;

        var validationMessages = requiredFieldValidationService_Product.getRequiredFieldValidationErrorMessage(
            [
                {name : $scope.product.FrontSide || "", errorMessage : "Please enter the front side"},
                {name : $scope.product.BackSide || "", errorMessage : "Please enter the back side"},
                //{name : $scope.product.Decks_FK || "", errorMessage : "Please choose deck"}
            ]
        );

        if(validationMessages.length > 0) {
            $scope.validationResult.containsValidationError = true;
            console.log("validation errors exist");
            angular.element("#validationErrorMessage").empty();
            validationMessages.forEach(function (errorMessage) {
                angular.element("<li></li>")
                    .html(errorMessage)
                    .appendTo("#validationErrorMessage")
            });
        } else {

            productService.createCard(card, productService.getIdFromEndPoint())
                .success(function(data){
                    clearProduct();
                    window.location.href = "/editDeck/"+productService.getIdFromEndPoint();
                })

        }


    }

}
