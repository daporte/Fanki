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


        login: function (id) {
            console.log("in service")
            console.log(id);
            return $http.post("/login",

                {
                    UserId : id

                })
        }
        ,
        storage : $localStorage.$default({
            x : 59,
            Username : "DEFAULT",
            decks : {},
            Categories : {},
            UserId : "auth0|57d6815cd4ae50142a5437af",
            Privilege: "User"
        })



    }
        
    



    return service;
}
