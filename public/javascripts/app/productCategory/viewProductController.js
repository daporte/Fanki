angular.module("productModule").controller("viewProductController",viewProductController);

viewProductController.$inject = ["$scope", "$timeout", "productService"];

function viewProductController($scope, $timeout, productService) {

    $scope.product = [];

    populateProducts();
    console.log("now what");
    console.log($scope.product);
    function populateProducts(){
        productService.getAllProducts()
            .success(function(data){
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAaaa");
            console.log(data);
            $scope.products = data;
        });
    };

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


}
