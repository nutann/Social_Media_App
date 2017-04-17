/**
 * Created by nutan on 4/17/2017.
 */

sqlite3 = require('sqlite3');

function dbConnector() {
    var userDb;

    function initializeDb() {
        console.log("initialize db *********");
        userDb = new sqlite3.Database("./users.db");
        userDb.run("CREATE TABLE IF NOT EXISTS user (email Text PRIMARY KEY,firstName Text," +
                    " lastName TEXT,password Text)");

    }

    function updateDb(user,callback) {
        console.log("updating the db with details "+JSON.stringify(user));
        var cb = function (err) {
            console.log("error occured" +err);
            callback(err);
        }
        userDb.run("INSERT into user(email,firstName,lastName,password) VALUES (?,?,?,?)",user.email,user.firstName,user.lastName,user.password,cb);
    }

    function closeDb() {

        userDb.close();
    }
    return {
        initializeDb : initializeDb,
        updateDb : updateDb,
        closeDb : closeDb

    }

}

exports.DbConnector = dbConnector;


