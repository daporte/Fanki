var mysqlConnectionString = {

    connection :{
        dev :{
            host: "gx97kbnhgjzh3efb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
            user: "y3q1ay9id81zhv7b",
            password: "z4z8628640iv46h3",
            database: "mbhkw9gpsgxyuaj7"

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