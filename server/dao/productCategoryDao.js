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
            CategoryId : productCategory.CategoryId,
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
        var queryStatement = "SELECT Decks.Id, DeckName, Description, AddedBy, IsValid, CreatedDate, ModifiedDate, CategoryId, CategoryName FROM Decks LEFT JOIN Categories ON Decks.CategoryId = Categories.Id ORDER BY Decks.Id DESC";
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
    updateProductCategory : function(deckName, description, productCategoryId, categoryId, callback){

        console.log("daomelden")
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "UPDATE Decks SET DeckName = ?, Description = ?, ModifiedDate = ?, CategoryId = ? WHERE Id = ?";

        if (connection){
            connection.query(queryStatement, [deckName, description, new Date(), categoryId, productCategoryId], function(err, rows, fields){
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
    addDetails : function(DeckId, UserId, on, callback){
        var tinyInt = on ? 1:0;
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "UPDATE userDecks SET Details = ? WHERE UserId = ? AND DeckId = ?";
        if (connection){
            connection.query(queryStatement, [tinyInt, UserId, DeckId],function(err, rows, fields){
                if (err) {throw err;}



                console.log("calling back")

                callback({status : "successful"});


            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
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
                console.log(rows);
                callback(rows);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    }
    ,
    getUserDeckInfo : function(UserId, callback){
        console.log("in dao m7");

        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "SELECT DeckId, Details, CategoryId FROM userDecks INNER JOIN Decks ON userDecks.DeckId = Decks.Id WHERE UserId = ?";
        console.log(UserId)
        console.log(queryStatement)
        if (connection){
            connection.query(queryStatement, UserId, function(err, rows, fields){
                if (err) {throw err;}

                //console.log(rows);
                console.log("zzzzzaaa");
                console.log(rows);
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



        if(deckId == "all") {
            var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
            var queryStatement = "SELECT * FROM bridge INNER JOIN Cards ON bridge.CardId = Cards.Id WHERE UserId = ? AND DeckId IN (SELECT DeckId FROM userDecks WHERE UserId = ?)  ORDER BY (bridge.Timestamp + bridge.RepInterval) ASC LIMIT 1";


            if (connection) {
                connection.query(queryStatement, [UserId, UserId], function (err, rows, fields) {
                    if (err) {
                        throw err;
                    }

                    console.log("rows");
                    console.log(rows);


                    callback(rows);


                });

                connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
            }

        } else {
                var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
                var queryStatement = "SELECT * FROM bridge INNER JOIN Cards ON bridge.CardId = Cards.Id WHERE UserId = ? AND DeckId = ? ORDER BY (bridge.Timestamp + bridge.RepInterval) ASC LIMIT 1";

                if (connection) {
                    connection.query(queryStatement, [UserId, deckId], function (err, rows, fields) {
                        if (err) {
                            throw err;
                        }

                        console.log("rows");
                        console.log(rows);


                        callback(rows);


                    });

                    connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
                }
        }


    }

    ,
    addNewCard : function (deckId, UserId, callback) {
        console.log("ADDING NEW CARD - DAO");



        if(deckId == "all") {
            var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
            var queryStatement = "SELECT * FROM Cards Ca WHERE Decks_FK IN (SELECT DeckId FROM userDecks WHERE UserId = ?) AND Ca.Id NOT IN (SELECT CardId FROM bridge WHERE UserId = ? ) AND " +
                "IF((SELECT Details FROM userDecks WHERE DeckId = Ca.Decks_FK AND UserId = ? LIMIT 1) = 0, Ca.Detail,  0) = 0 LIMIT 1";
            if (connection) {
                connection.query(queryStatement, [UserId, UserId, UserId], function (err, rows, fields) {
                    if (err) {
                        throw err;
                    }

                    console.log("zzzzz");
                    console.log(rows);
                    callback(rows);
                });

                connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
            }
        } else {
            var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
            var queryStatement = "SELECT * FROM Cards Ca WHERE Decks_FK = ? AND Ca.Id NOT IN (SELECT CardId FROM bridge WHERE UserId = ? AND DeckId = ? ) AND " +
                "IF((SELECT Details FROM userDecks WHERE DeckId = Ca.Decks_FK AND UserId = ? LIMIT 1) = 0, Ca.Detail,  0) = 0 LIMIT 1"
            if (connection) {
                connection.query(queryStatement, [deckId, UserId, deckId, UserId], function (err, rows, fields) {
                    if (err) {
                        throw err;
                    }


                    console.log("zzzzz");
                    console.log(rows);
                    callback(rows);
                });

                connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
            }



        }

    }
    ,

    getHierarchy : function(callback){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        //var queryStatement = "SELECT Decks.Id, DeckName, Description, AddedBy, IsValid, CreatedDate, ModifiedDate, CategoryId, CategoryName FROM Decks LEFT JOIN Categories ON Decks.CategoryId = Categories.Id GROUP BY Decks.CategoryId ";
        var queryStatement = "SELECT CategoryId, CategoryName, GROUP_CONCAT(CONCAT('{\"Id\":\"', Decks.Id, '\", \"DeckName\":\"', DeckName, '\", \"Description\" : \"',Description, " +
            "'\" , \"AddedBy\" : \"', AddedBy, '\", \"IsValid\" : \"', IsValid, '\", \"CreatedDate\" : \"', CreatedDate, '\", \"ModifiedDate\" : \"', IFNULL(ModifiedDate, 'NULL'), '\", \"CategoryName\" : \"', IFNULL(CategoryName, 'NULL'), '\"," +
            "\"CategoryId\" : \"', IFNULL(CategoryId, 'NULL'), '\"}') SEPARATOR '|') as DeckList " +
            " FROM Decks LEFT JOIN Categories ON Decks.CategoryId = Categories.Id GROUP BY CategoryId, CategoryName;"


        if (connection){
            connection.query(queryStatement, function(err, rows, fields){
                if (err) {throw err;}
                console.log("zzzzz");
                console.log(rows);
                console.log("zzzzz");
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
            var queryLog = "INSERT INTO Logs (UserId, CardId, DeckId, Timestamp, Reps, TotalReps, EF, RepInterval)" +
                " (SELECT UserId, CardId, DeckId, Timestamp, Reps, TotalReps, EF, RepInterval FROM bridge WHERE UserId = ? AND CardId = ?)";



            if (connection){
                connection.query(queryLog, [request.body.UserId, request.body.CardId], function(err, rows, fields) {
                    if (err) {
                        throw err;
                    }


                    console.log("zzzzz");
                    console.log(rows)

                    //callback(rows);


                });

                connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
            }
            console.log("updateQuery");
            var queryUpdate = "UPDATE bridge SET? WHERE UserId = ? AND CardId = ?";
            var connection2 = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
            if (connection2){
                connection2.query(queryUpdate, [request.body, request.body.UserId, request.body.CardId], function(err, rows, fields) {
                    if (err) {
                        throw err;
                    }


                    console.log("updateData");
                    console.log(rows)

                    callback(rows);


                });

                connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection2);
            }
        }


    }
    ,
    saveLog : function (request, callback) {
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();

        connection.query(queryUpdate, [request.body, request.body.UserId, request.body.CardId], function (err, rows, fields) {
            if (err) {
                throw err;
            }


            console.log("zzzzz");
            console.log(rows)

            callback(rows);
        });
    }
    ,
    getCategories : function(callback){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "SELECT * FROM Categories";
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
};

module.exports.productCategoryDao = productCategoryDao;
