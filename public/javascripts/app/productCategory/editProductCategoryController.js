angular.module("productCategoryModule").controller("editProductCategoryController",editProductCategoryController);

editProductCategoryController.$inject = ["$scope", "$timeout", "productCategoryService", "requiredFieldValidationService"];

function editProductCategoryController($scope, $timeout, productCategoryService, requiredFieldValidationService){

    $scope.productCategory = {

        DeckName : "",
        Description : "",
        AddedBy : ""

    };

   

    $scope.validationResult = {

        containsValidationError : false,
        validationSummary : ""
    }

    $scope.message = {
        containsSuccessfulMessage : false,
        successfulMessage : ""
    }

    function displayMessage() {
        $scope.message.containsSuccessfulMessage = true;
        $scope.message.successfulMessage = "Deck update successful";
    }
    
    getProductCategoryById();

    function bindView(productCategory) {
        console.log("binding view");
        $scope.productCategory.DeckName = productCategory.DeckName;
        $scope.productCategory.Description = productCategory.Description;
        $scope.productCategory.AddedBy = productCategory.AddedBy;
        $scope.oldDeckName = "";
    }
    
    function getProductCategoryById(){
        productCategoryService.getProductCategoryById(productCategoryService.getIdFromEndPoint())
            .success(function (data){
                console.log("zzzzzzzzzzzzzzzzzzzzzAAAAA");
                console.log(data);
                console.log(data.productCategories);
                if(data
                    && data.productCategories
                    && data.productCategories.length > 0){
                    console.log("ifififif");
                    console.log(data.productCategories[0])

                    bindView(data.productCategories[0])
                }

            })
    }

    $scope.editProductCategory = function() {


        var validationMessages = requiredFieldValidationService.getRequiredFieldValidationErrorMessage(
            [
                {name: $scope.productCategory.DeckName || "", errorMessage: "Please enter the name of the deck"},
                {name: $scope.productCategory.Description || "", errorMessage: "Please describe the deck"}
            ]
        );
        
        if (validationMessages.length > 0) {
            $scope.validationResult.containsValidationError = true;
            console.log("validation errors exist");
            angular.element("#validationErrorMessage").empty();
            validationMessages.forEach(function (errorMessage) {
                angular.element("<li></li>")
                    .html(errorMessage)
                    .appendTo("#validationErrorMessage")
            });
        } else {

            $scope.validationResult.containsValidationError = false;
            productCategoryService.updateProductCategory($scope.productCategory, productCategoryService.getIdFromEndPoint())
                .success(function (data) {
                    if (data && data.status && data.status == "successful") {

                        displayMessage()
                        window.location.href = "/viewProductCategory";
                    }
                })
        }


    }

};