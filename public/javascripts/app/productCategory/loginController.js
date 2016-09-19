angular.module("loginModule")
    .controller("loginController", loginController);

loginController.$inject = ["$scope", "$http", "$timeout", "loginService", "requiredFieldValidationService_Login", "$localStorage"];

function loginController($scope, $http, $timeout, loginService, requiredFieldValidationService_Login, $localStorage) {

    var id = window.userId;
    var nick = window.userNickname;
    var privilege = window.privilege;

    


    $scope.$storage = loginService.storage;
    console.log(loginService.storage);



    if(id){
        loginService.storage.Username = nick;
        loginService.storage.UserId = id;
        loginService.storage.Privilege = privilege;
        loginService.login(id)
            .success(function (data) {

                console.log("LOGIN")
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    if (!loginService.storage.decks[data[i]["DeckId"]]) {
                        loginService.storage.decks[data[i]["DeckId"]] = [2];
                    }

                    loginService.storage.decks[data[i]["DeckId"]][0] = 1;
                    loginService.storage.decks[data[i]["DeckId"]][1] = data[i]["Details"];
                    if (!loginService.storage.Categories[data[i]["CategoryId"]]) {
                        loginService.storage.Categories[data[i]["CategoryId"]] = 1;
                    } else {
                        loginService.storage.Categories[data[i]["CategoryId"]]++;
                    }

                }


                //$scope.$apply();
                //window.location.href = "/myDecks";

            })
    }




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
        loginService.storage.Privilege = "";

        for (var key in loginService.storage.decks) {
            if (loginService.storage.decks.hasOwnProperty(key)) {
                loginService.storage.decks[key] = [];
            }
        }

        for (var key in loginService.storage.Categories) {
            if (loginService.storage.Categories.hasOwnProperty(key)) {
                loginService.storage.Categories[key] = 0;
            }
        }


        window.location.href = "https://daporte21.eu.auth0.com/v2/logout";
       
    }





 }