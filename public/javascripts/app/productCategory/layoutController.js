angular.module("loginModule")
    .controller("layoutController", layoutController);

layoutController.$inject = ["$scope", "loginService"];

function layoutController($scope, loginService) {

    $scope.$storage = loginService.storage;
}