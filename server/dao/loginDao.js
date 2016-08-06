var connectionProvider = require("../mysqlConnectionStringProvider.js");

var loginDao = {

    createUser: function(user, OnSuccessfulCallback){

        var insertStatement = "INSERT INTO users SET?";

        var userToBeAdded = {

            Username : user.Username,
            Password : user.Password

        };

        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();

        //----------------------------------
        var insertStatement2 = "INSERT INTO userDecks SET Username = ?";


        if (connection){
            connection.query(insertStatement, userToBeAdded, function(err, result){
                if (err) {console.log(err)}

                console.log("ADDED IT")

            });

            connection.query(insertStatement2, userToBeAdded.Username, function(err, result){
                if (err) {console.log(err)}

                console.log("ADDED IT 2 ")

            });

            OnSuccessfulCallback({status : "successful"});
            
            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }

    }
,

    login: function(user, OnSuccessfulCallback){
        console.log("imindao")
        var insertStatement = "SELECT Password FROM users WHERE Username = ?";



        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        console.log("see");
        //console.log(connection);

        if (connection){
            connection.query(insertStatement, user.Username, function(err, rows, fields){
                if (err) {console.log(err)}
                console.log("resulkt")
                if(rows && rows.length>0){
                    console.log(rows[0].Password)
                    if(rows[0].Password == user.Password){
                        
                        OnSuccessfulCallback({status : "successful", username : user.Username});
                    } else {
                        OnSuccessfulCallback({status : "FAIL"});
                    }

                    console.log("ADDED IT")
                }
                else {
                    OnSuccessfulCallback({status : "FAIL"})
                }

            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }

    }

};

module.exports.loginDao = loginDao;
