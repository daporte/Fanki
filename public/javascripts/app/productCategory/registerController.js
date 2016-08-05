angular.module("loginModule")
    .controller("registerController", registerController);

registerController.$inject = ["$scope", "$timeout", "loginService", "requiredFieldValidationService_Login"];

function registerController($scope, $timeout, loginService, requiredFieldValidationService_Login) {

    console.log(loginService.storage)
    $scope.newUser = {

        Username : "",
        Password : "",

    };

    $scope.validationResult = {

        containsValidationError : false,
        validationSummary : ""
    }



    $scope.register = function () {

        console.log(loginService.scope)

        var validationMessages = requiredFieldValidationService_Login.getRequiredFieldValidationErrorMessage(
            [

                {name: $scope.newUser.Username || "", errorMessage: "Please enter username"},
                {name: $scope.newUser.Password || "", errorMessage: "Please enter password"},

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


            console.log($scope.newUser)
            loginService.createUser($scope.newUser)
                .success(function (data) {

                    window.location.href = "/";
                })
        }
    }


}