angular.module("loginModule")
    .controller("loginController", loginController);

loginController.$inject = ["$scope", "$http", "$timeout", "loginService", "requiredFieldValidationService_Login", "$localStorage", "Constants"];

function loginController($scope, $http, $timeout, loginService, requiredFieldValidationService_Login, $localStorage, Constants) {


    $http.get("http://fanki2.herokuapp.com/callback")
        .success(function(data) {
            console.log("this is coming from wherever:" + data);
        });


    $scope.user = Constants.user;
    console.log(Constants.user);
    console.log($scope.user);

    $scope.$storage = loginService.storage;
    console.log(loginService.storage);
        
   /*
    $scope.user = {

        Username: "",
        Password: "",
        

    };
*/
    $scope.validationResult = {

        containsValidationError: false,
        validationSummary: ""
    }


    $scope.showUser = function (nickname, id) {
        console.log("HELLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
        console.log(nickname);
        console.log(id);


        loginService.login(id)
            .success(function (data) {
                loginService.storage.Username = nickname;
                loginService.storage.UserId = id;
                console.log("LOGIN")
                console.log(data)
                for(var i=0;i<data.length;i++){
                    if(!loginService.storage.decks[data[i]["DeckId"]]){
                        loginService.storage.decks[data[i]["DeckId"]] = [2];
                    }

                    loginService.storage.decks[data[i]["DeckId"]][0]=1;
                    loginService.storage.decks[data[i]["DeckId"]][1]=data[i]["Details"];
                    if(!loginService.storage.Categories[data[i]["CategoryId"]]){
                        loginService.storage.Categories[data[i]["CategoryId"]] = 1;
                    } else {
                        loginService.storage.Categories[data[i]["CategoryId"]]++;
                    }

                }




                //$scope.$apply();
                //window.location.href = "/myDecks";

            })

    }


    $scope.logout = function () {
        loginService.storage.Username = "";
        loginService.storage.UserId = "";

        for(var i =0; i <loginService.decks.length; i++){
            loginService.decks[i] = [];
        }

        for(var i =0; i <loginService.Categories.length; i++){
            loginService.Categories[i] = 0;
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