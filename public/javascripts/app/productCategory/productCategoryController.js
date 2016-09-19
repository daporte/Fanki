angular.module("productCategoryModule")
    .controller("productCategoryController", productCategoryController);

productCategoryController.$inject = ["$scope", "$timeout", "productCategoryService", "requiredFieldValidationService", "loginService"];

function productCategoryController($scope, $timeout, productCategoryService, requiredFieldValidationService, loginService) {
    $scope.productCategory = {

        DeckName : "",
        Description : "",
        AddedBy : "",
        CategoryId : 0

    };

    $scope.Categories = [];

    getCategories();

    $scope.validationResult = {

        containsValidationError : false,
        validationSummary : ""
    };

    $scope.createProductCategory = function(productCategory){

        productCategory["AddedBy"] = loginService.storage.Username;

        var validationMessages = requiredFieldValidationService.getRequiredFieldValidationErrorMessage(
            [
            {name : $scope.productCategory.DeckName || "", errorMessage : "Please enter the name of the deck"},
            {name : $scope.productCategory.Description || "", errorMessage : "Please describe the deck"}
                ]
        );

        if(validationMessages.length > 0){
            $scope.validationResult.containsValidationError = true;
            console.log("validation errors exist");
            angular.element("#validationErrorMessage").empty();
            validationMessages.forEach(function(errorMessage){
                angular.element("<li></li>")
                    .html(errorMessage)
                    .appendTo("#validationErrorMessage")
            });
        } else {

            $scope.validationResult.containsValidationError = false;
            productCategoryService.createProductCategory(productCategory, loginService.storage.Privilege)
                .success(function (data) {
                    console.log(" SUCCESS" + data.resultId)
                    loginService.storage.decks[data.resultId] = 0;
                    console.log(loginService.storage)
                    window.location.href = "/viewProductCategory";
                    /*
                     $timeout(function () {

                     }, 3000)
                     */
                })

        }
    }

    function getCategories(){
        console.log("do you even");
        productCategoryService.getCategories()
            .success(function (data){

                if(data){

                    $scope.Categories = data;
                    console.log("CCCCCCCCCCCCCCCc");
                    console.log($scope.Categories);
                }

            })
    }
}

