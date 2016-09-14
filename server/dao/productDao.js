var connectionProvider = require("../mysqlConnectionStringProvider.js");

var productDao = {

    getAllProducts : function(callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "SELECT de.DeckName, de.Id as Decks_FK, ca.Id, ca.FrontSide, ca.BackSide, ca.AddedBy," +
            " ca.CreatedDate, SUBSTRING(ca.BackSide, 1, 100) as PartialDescription," +
            " ca.IsValid, ca.ModifiedDate FROM Decks de INNER JOIN Cards ca on ca.Decks_FK = de.Id ORDER BY ca.CreatedDate DESC";
        if (connection){
            connection.query(queryStatement, function(err, rows, result){
                if (err) {console.log(err)}
                callback(rows);
                //console.log(rows);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);

        }
    }
    ,

    createProductCategory: function(product, callback){

        var insertStatement = "INSERT INTO Cards SET?";

        var productToBeAdded = {

            Decks_FK : product.Decks_FK,
            FrontSide : product.FrontSide,
            BackSide : product.BackSide,
            AddedBy : product.AddedBy,
            IsValid : true,//productCategory.IsValid,
            CreatedDate : new Date(),
            Image : product.Image,
            Literature : product.Literature,
            Wikipedia  : product.Wikipedia,
            Wikiskripta : product.Wikiskripta,
            Youtube : product.Youtube,
            ExtraLink : product.ExtraLink,
            Tag : product.Tag,
            Detail : product.Detail,





        };

        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        console.log("see");
        console.log(connection);
        console.log(productToBeAdded);
        if (connection){
            connection.query(insertStatement, productToBeAdded, function(err, result){
                if (err) {console.log(err)}
                callback(result);
                //console.log(result);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }

    }
    ,
    addToDeckTable : function (result, deckId, callback) {
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "AlTER TABLE deck_" + deckId + " ADD card_" + result.insertId + " VARCHAR(100) DEFAULT NULL" ;
        if (connection){
            connection.query(queryStatement, function(err, rows, fields){
                if (err) {throw err;}


                console.log("zzzzz");
                callback(rows);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    }
    ,
    getProductById : function(productId, callback){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "SELECT * FROM Cards WHERE id = ?";
        if (connection){
            connection.query(queryStatement,productId, function(err, rows, fields){
                if (err) {throw err;}

                
                console.log("zzzzz");
                callback(rows);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    }
    ,
    updateProduct : function(product, callback){
        console.log("im in dao")
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "UPDATE Cards SET? WHERE Id = ?";
        if (connection){
            connection.query(queryStatement, [product.body, product.body.Id], function(err, rows, fields){
                if (err) {throw err;}



                if(rows){
                    callback({status : "successful"});
                }

            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }

    }
    ,
    getCardsFromDeck : function(deckId, callback){

        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "SELECT de.DeckName, de.Id as Decks_FK, ca.Id, ca.FrontSide, ca.BackSide, ca.AddedBy," +
            " ca.CreatedDate, SUBSTRING(ca.BackSide, 1, 100) as PartialDescription," +
            " ca.IsValid, ca.ModifiedDate FROM Decks de INNER JOIN Cards ca on ca.Decks_FK = de.Id WHERE de.Id = ? ORDER BY ca.CreatedDate DESC";
        if (connection){
            connection.query(queryStatement, deckId, function(err, rows, result){
                if (err) {console.log(err)}
                callback(rows);
                //console.log(rows);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);

        }
    }
    ,

    deleteCardById : function (cardId, callback) {
        console.log("deleting in dao")
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "DELETE FROM Cards WHERE Id = ?";
        if (connection){
            connection.query(queryStatement, cardId, function(err, rows, fields){
                if (err) {throw err;}


                
                console.log("calling back")


                callback(rows);


            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    }
    ,
    getDeckIdFromCard : function (cardId, callback) {
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "SELECT decks_FK FROM Cards WHERE Id = ?" ;
        if (connection){
            connection.query(queryStatement, cardId, function(err, rows, fields){
                if (err) {throw err;}


                console.log("zzzzz");
                console.log(rows[0])
                callback(rows[0]);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    }
    ,
    deleteCardFromDeckTable : function (cardId, result,  callback) {
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "ALTER TABLE deck_" + result.decks_FK + " DROP COLUMN  card_" + cardId;
        console.log(queryStatement);
        if (connection){
            connection.query(queryStatement, cardId, function(err, rows, fields){
                if (err) {throw err;}


                console.log("zzzzz");
                callback(rows);
            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    }
    

};

module.exports.productDao = productDao;