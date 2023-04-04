



function EntitiesFromDB() {
    console.log("hi there");
    const mysql = require('mysql');
    let resultFromDB = null;
    const con = mysql.createConnection({
        host     : "database-1.cwd3greadrvm.us-east-1.rds.amazonaws.com",
        user     : "admin",
        password : "922962700",
        port     : 3306
    });



    con.connect(function(err) {
        if (err) throw err;
        con.query('SELECT * from test.users', function (err, result, fields) {

            console.log("In database section");
            resultFromDB = result;
            console.log(22);
            console.log(resultFromDB);
            return resultFromDB;

        });

        console.log("Connected!");
        con.end();
    });
    console.log(33);
    console.log(resultFromDB);
    return resultFromDB;

}
exports.EntitiesFromDB = EntitiesFromDB;
