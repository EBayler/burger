
 var connection;

 if (process.env.JAWSDB_URL) {
     var connection = require("../config/connection.js");
} else {
    connection = mysql.createConnection({
        port: 3306,
        host: "localhost",
        user: "root",
        password: process.env.DB_PASS,
        database: "burgers_db"
    });
}


 
 var orm = {
     selectAll: function (tableInput, cb) {
         var queryString = "SELECT * FROM " + tableInput + ";";
         connection.query(queryString, function (err, result) {
             if (err) {
                 throw err;
             }
             cb(result);
         });
     },
     insertOne: function (tableInput, colName, value, cb) {
         value = connection.escape(value);
         var queryString = "INSERT INTO " + tableInput + " (" + colName + ") VALUES (" + value + ");";
         connection.query(queryString, function (err, result) {
             if (err) throw err;
             cb(result);
         });
     },
     updateOne: function (tableInput, colName, value, idColName, id, cb) {
         var queryString = "UPDATE " + tableInput + " SET " + colName + " = " + value + " WHERE " + idColName + " = " + id + ";";
         connection.query(queryString, function (err, result) {
             if (err) throw err;
             cb(result);
         });
     }
 }


 module.exports = orm;