var express = require("express");
//yes! we are using MySQL overhere
var mysql = require("mysql");
var app = express();

//creates the connection pool to the database
var pool = mysql.createPool({
  connectionLimit : 100,
  host : "localhost",
  user : "user",
  password : "password",
  database : "database",
  debug : false
});

//Sbmits queries and checks for possible errors
function submitQuery(req, res, query) {
  pool.getConnection(function(err, connection) {
    if (err) {
      res.json({
        "code" : 100,
        "Status" : "Error while connecting to the database",
        "Error" : err.stack
      });

      return;
    }

    connection.query(query, function(err, rows) {
      connection.release();
      if (!err) {
        return res.json(rows);
      }

      connecting.on('error', function() {
        res.json({
          "code" : 100,
          "status" : "Error while performing query",
          "Error" : err.stack
        })

        return;
      });
    });
  });
}

//just for tests purpose - delete or comment it in production
app.get("/", function(req, res) {
  var query = "select * from user;";
  submitQuery(req, res, query);
});
app.listen(3000);
