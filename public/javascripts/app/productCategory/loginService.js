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
            Username : "DEFAULT",
            decks : {},
            Categories : {},
            UserId : "auth0|57e02a361cc9858c1eb8bda3",
            Privilege: "admin",
            aa:""
        })

        



    }
        
    



    return service;
}
