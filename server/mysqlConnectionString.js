var mysqlConnectionString = {

    connection :{
        dev :{
            host: "localhost",
            user: "root",
            password: "bagrsehen1",
            database: "fanki"

        }

        ,

        qa : {
            host: "hlocalhost",
            user: "root",
            password: "bagrsehen1",
            database: "productmanagaement"
        },
        prod : {
            host: "hlocalhost",
            user: "root",
            password: "bagrsehen1",
            database: "productmanagaement"
        }
    }
};

module.exports.mysqlConnectionString = mysqlConnectionString;