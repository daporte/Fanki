angular.module("productModule").controller("editCardController",editCardController);

editCardController.$inject = ["$scope", "$timeout", "productService", "requiredFieldValidationService_Product", ];

function editCardController($scope, $timeout, productService, requiredFieldValidationService_Product){

    $scope.product = {

        FrontSide : "",
        BackSide : "",
        AddedBy : "",
        DeckName : "",
        Decks_FK : ""

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


    $scope.productCategories = [];

    getAllProductCategories();

    function getAllProductCategories(){
        console.log("do you even");
        productService.getAllProductCategories()
            .success(function (data){
                console.log("zzzzzzzzzzzzzzzzzzzzz");
                //console.log(data);
                //console.log(data.productCategories);
                if(data
                    && data.productCategories
                    && data.productCategories.length > 0){

                    $scope.productCategories = data.productCategories;
                    console.log("CCCCCCCCCCCCCCCc");
                }

            })
    }
    
    getProductById();

    function bindView(product) {
        console.log("binding view");
        $scope.product.DeckName = product.DeckName;
        $scope.product.FrontSide = product.FrontSide;
        $scope.product.BackSide = product.BackSide;
        $scope.product.AddedBy = product.AddedBy;
        $scope.product.Decks_FK = product.Decks_FK;
        console.log($scope.product.Decks_FK);
        console.log("that was the decks_FK");
    }
    
    function getProductById(){
        productService.getProductById(productService.getIdFromEndPoint())
            .success(function (data){
                console.log("zzzzzzzzzzzzzzzzzzzzzAAAAA");
                console.log(data);
                console.log(data.productCategories);
                if(data
                    && data.product
                    && data.product.length > 0){
                    console.log("ifififif");
                    console.log(data.product[0])

                    bindView(data.product[0])
                }

            })
    }

    $scope.editProduct = function() {


        var validationMessages = requiredFieldValidationService_Product.getRequiredFieldValidationErrorMessage(
            [

                {name : $scope.product.FrontSide || "", errorMessage : "Please enter the front side"},
                {name : $scope.product.BackSide || "", errorMessage : "Please enter the back side"},
                {name : $scope.product.Decks_FK || "", errorMessage : "Please choose deck"}
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
            productService.updateProduct($scope.product, productService.getIdFromEndPoint())
                .success(function (data) {
                    if (data && data.status && data.status == "successful") {

                        displayMessage()
                    }
                    window.location.href = "/editDeck/"+productService.getIdFromSecondLast();
                })
        }


    }

};