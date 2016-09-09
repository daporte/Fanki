//var connectionProvider = require("../../mysqlConnectionStringProvider.js");
var connectionProvider = require("../mysqlConnectionStringProvider.js");



var productCategoryDao = {

    createProductCategory : function(productCategory, OnSuccessfulCallback){

        console.log("indao")

        //var insertStatement = "ALTER TABLE userDecks ADD deck_ttt boolean default false";

        var resultId = ""


        var category = {

            DeckName : productCategory.DeckName,
            Description : productCategory.Description,
            AddedBy : productCategory.AddedBy,
            IsValid : true,
            CreatedDate : new Date()

        };
        console.log(category.DeckName)

        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();

        if(connection){

            var insertStatement = "INSERT INTO Decks SET?";

            connection.query(insertStatement, category, function (err, result) {

                console.log(result.insertId);
                OnSuccessfulCallback(result);                
                
            });


            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    }
    ,
    createTable : function(result, callback){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();

        console.log("INSERT ID");
        console.log(result.insertId);

        var createStatement = "CREATE TABLE deck_" + result.insertId + "(Username varchar(100) NOT NULL UNIQUE, FOREIGN KEY(Username) REFERENCES users(Username))ENGINE=InnoDB DEFAULT CHARSET=utf8;";
        console.log(createStatement)

        if(connection) {
            connection.query(createStatement, function (err, result) {


                callback(result);

            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }

    }
    ,

    addToUserDecks : function(result, callback){
        console.log("second functino")
        console.log(result)
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var insertStatement = "ALTER TABLE userDecks ADD deck_" + result.insertId + " boolean default false";
        if(connection){
            connection.query(insertStatement, function (err2, result2) {
                callback({status : "successful", resultId : result.insertId});
                })
            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    }



    ,
    getAllProductCategory : function(callback){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "SELECT * FROM Decks ORDER BY ID DESC";
        if (connection){
            connection.query(queryStatement, function(err, rows, fields){
                if (err) {throw err;}

                //console.log(rows);
                console.log("zzzzz");
                callback(rows);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    }
    ,
    getProductCategoryById : function(productCategoryId, callback){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "SELECT * FROM Decks WHERE id = ?";
        if (connection){
            connection.query(queryStatement,productCategoryId, function(err, rows, fields){
                if (err) {throw err;}

                //console.log(rows);
                console.log("zzzzz");
                callback(rows);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    }
    ,
    updateProductCategory : function(deckName, description, productCategoryId, callback){

        console.log("daomelden")
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "UPDATE Decks SET DeckName = ?, Description = ?, ModifiedDate = ? WHERE Id = ?";

        if (connection){
            connection.query(queryStatement, [deckName, description, new Date(), productCategoryId], function(err, rows, fields){
                if (err) {throw err;}

                console.log(deckName);
                console.log(description);
                console.log(productCategoryId);


                if(rows){
                    callback({status : "successful"});
                }


            });


            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }

    }
    ,
    deleteProductCategoryById : function (productCategoryId, callback) {
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "DELETE FROM Decks WHERE Id = ?";
        if (connection){
            connection.query(queryStatement, productCategoryId, function(err, rows, fields){
                if(err){
                    callback({status : "FAIL"});
                }

                console.log("rowz")
                console.log(rows);
                console.log("calling back")


                callback({status : "successful"});


            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
        
    }
    ,
    deleteTable : function (productCategoryId, callback) {
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "DROP TABLE deck_" + productCategoryId;

        if (connection){
            connection.query(queryStatement, function(err, rows, fields){
                if (err) {throw err;}
                
                


                callback({status : "successful"});


            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    }
    ,
    deleteFromUserDecks : function(deckId, callback){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "ALTER TABLE userDecks DROP COLUMN deck_" + deckId;
        if (connection){
            connection.query(queryStatement, function(err, rows, fields){
                if (err) {throw err;}



                console.log("calling back")

                callback({status : "successful", resultId : deckId});


            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    }
    ,
    updateUserDecks : function(DeckId, UserId, on, callback){
        console.log("sandwich");
        console.log(UserId);
        console.log("daohere");
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();

        if(on){

            var insertObject = {
                UserId : UserId,
                DeckId : DeckId
            }

            var queryStatement = "INSERT INTO userDecks SET?";
            if (connection){
                connection.query(queryStatement, insertObject, function(err, rows, fields){
                    if (err) {throw err;}


                    if(rows){
                        callback({status : "successful"});
                    }

                });

                connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
            }
        } else {
            var queryStatement = "DELETE FROM userDecks WHERE DeckId = ? AND UserId = ?";
            if (connection){
                connection.query(queryStatement, [DeckId, UserId], function(err, rows, fields){
                    if (err) {throw err;}

                    if(rows){
                        callback({status : "successful"});
                    }

                });
                connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
            }
        }




    }
    ,
    
    addUserToDecksTable : function (DeckId, UserId, callback) {
        console.log("in dao m8");
        var insertObject = {
            UserId : UserId,
            DeckId : DeckId
        }

        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        //var queryStatement = "INSERT INTO deck_" + deckId + " SET?";
        var queryStatement = "INSERT INTO userDecks SET?";
        console.log(queryStatement)
        if (connection){
            try {
                connection.query(queryStatement, insertObject, function (err, result) {
                   

                    //console.log(rows);
                    console.log("zzzzzaaa");
                    callback(result);
                });

            } catch(e) {
                console.log(e)
            }
            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    }
    
    ,
    
    getAllUserDecks : function(UserId, callback){
        console.log("in dao m7");
        
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "SELECT * FROM userDecks INNER JOIN Decks ON userDecks.DeckId = Decks.Id WHERE UserId = ?";
        console.log(UserId)
        console.log(queryStatement)
        if (connection){
            connection.query(queryStatement, UserId, function(err, rows, fields){
                if (err) {throw err;}

                //console.log(rows);
                console.log("zzzzzaaa");
                callback(rows);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    }
    ,
    getDeckInfo : function (inClause, callback) {
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        console.log("INCLAUSE")

        if (inClause.length > 1) {

            var queryStatement = "SELECT * FROM Decks WHERE Id IN " + inClause;
            console.log(queryStatement)
            if (connection) {
                connection.query(queryStatement, function (err, rows, fields) {
                    if (err) {
                        throw err;
                    }

                    console.log("rows");
                    callback(rows);
                });

                connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
        }

    }
    ,
    getCardsFromDeck : function (deckId, UserId, callback) {

        console.log("WTFD")
        console.log(UserId);
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "SELECT * FROM bridge INNER JOIN Cards ON bridge.CardId = Cards.Id WHERE UserId = ? ORDER BY (bridge.Timestamp + bridge.RepInterval) ASC";

        if (connection) {
            connection.query(queryStatement, UserId, function (err, rows, fields) {
                if (err) {
                    throw err;
                }

                console.log("rows");
                callback(rows);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    }
    ,
    addNewCard : function (deckId, UserId, callback) {
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "SELECT * FROM Cards Ca WHERE Decks_FK = ? AND Ca.id NOT IN (SELECT br.CardId FROM bridge br WHERE DeckId = ? ) LIMIT 1";
        if (connection){
            connection.query(queryStatement, [deckId, UserId, deckId], function(err, rows, fields){
                if (err) {throw err;}


                console.log("zzzzz");
                console.log(rows);
                callback(rows);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    }
    ,
    logRep : function (request, callback) {
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        console.log("Dao hi");
        console.log(request.body);

        if(!(request.body.TotalReps) || request.body.TotalReps == 1){
            console.log("inserting");
            var queryStatement = "INSERT INTO bridge SET?";
            if (connection){
                connection.query(queryStatement, request.body, function(err, rows, fields){
                    if (err) {throw err;}


                    console.log("zzzzz");
                    console.log(rows)
                    callback(rows);
                });

                connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
            }

        } else {
            console.log("updating");
            var queryStatement = "UPDATE bridge SET? WHERE UserId = ? AND CardId = ?";
            if (connection){
                connection.query(queryStatement, [request.body, request.body.UserId, request.body.CardId], function(err, rows, fields){
                    if (err) {throw err;}


                    console.log("zzzzz");
                    console.log(rows)
                    callback(rows);
                });

                connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
            }

        }


    }

};

module.exports.productCategoryDao = productCategoryDao;
