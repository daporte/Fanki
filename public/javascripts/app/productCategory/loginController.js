angular.module("loginModule")
    .controller("loginController", loginController);

loginController.$inject = ["$scope", "$timeout", "loginService", "requiredFieldValidationService_Login", "$localStorage"];

function loginController($scope, $timeout, loginService, requiredFieldValidationService_Login, $localStorage) {







    $scope.$storage = loginService.storage;
    console.log(loginService.storage);
        
    $scope.user = {

        Username: "",
        Password: "",
        

    };

    $scope.validationResult = {

        containsValidationError: false,
        validationSummary: ""
    }


    $scope.showUser = function (nickname, id) {
        console.log("HELLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
        console.log(nickname);
        console.log(id);
        loginService.storage.Username = nickname;
        loginService.storage.UserId = id;
        /*
        loginService.login(id)
            .success(function (data) {

                bindView(data)
                //window.location.href = "/myDecks";

            })
        */
    }

    bindView = function (user) {
        /*
         console.log(user.username);
         console.log("scope username")
         $scope.Username = user.username;
         console.log($scope.Username)
         */
/*
        for(var property in loginService.storage){
            if(property != "Username") {
                delete loginService.storage[property];
            }
        }
*/      console.log("alter this");
        console.log(loginService.storage);


        for (var property in user) {
            split = property.split("_")
            if(split[0] == "deck"){
                loginService.storage.decks[split[1]] = user[property];
            }

        }
        console.log("STORAGE")
        console.log(loginService.storage);
        $scope.$apply()

    }

    $scope.logout = function () {
        loginService.storage.Username = "";
        loginService.storage.UserId = "";

        for(var i =0; i <loginService.decks.length; i++){
            loginService.decks[i] = [];
        }

        window.location.href = "/";
    }


     $scope.login = function () {

     var validationMessages = requiredFieldValidationService_Login.getRequiredFieldValidationErrorMessage(
        [
         {name: $scope.user.Username || "", errorMessage: "Please enter username"},
         {name: $scope.user.Password || "", errorMessage: "Please enter password"},

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


         console.log($scope.User)
         loginService.login($scope.user)
         .success(function (data) {
             console.log("data")
             console.log(data)
             bindView(data)
             window.location.href = "/myDecks";

 })
 }
 }



 }