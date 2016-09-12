angular.module("loginModule")
    .factory("loginService", loginService);

loginService.$inject = ["$http", "$location", "$localStorage"];

function loginService($http, $location, $localStorage) {
    var currentUser;
    var service = {

        createUser: function (user) {
            console.log(user)
            return $http.post("/createUser",

                {
                    Username: user.Username,
                    Password: user.Password,

                })
        }

        ,


        login: function (user) {
            console.log("in service")
            return $http.post("/login",

                {
                    Username: user.Username,
                    Password: user.Password,

                })
        }
        ,
        storage : $localStorage.$default({
            x : 59,
            Username : "DEFAULT",
            decks : {},
            UserId : "auth0|57d6815cd4ae50142a5437af"
        })



    }
        
    



    return service;
}
