/**
 * Created by nutan on 4/17/2017.
 */

sqlite3 = require('sqlite3');
var _ = require('lodash');

function dbConnector() {
    var userDb;
    userDb = new sqlite3.Database("./users.db");

    function initializeDb() {

        console.log("initialize db *********");
        
        userDb.run("CREATE TABLE IF NOT EXISTS userinfo (email Text PRIMARY KEY,firstName Text," +
                    " lastName TEXT,password Text,socketid INTEGER)");

    }


    function updateDb(user,callback) {
        console.log("updating the db with details "+JSON.stringify(user));
        var cb = function (err) {
            console.log("error occured" +err);
            callback(err);
        }
        userDb.run("INSERT into userinfo(email,firstName,lastName,password,socketid) VALUES (?,?,?,?,?)",user.email,user.firstName,user.lastName,user.password,0,cb);
    }

    function fetchDb(user,callback) {
        console.log("Fetching from db with details "+JSON.stringify(user));
        var cb = function (err, results) {
            console.log("error occured in fetch" +err+ "     " +results );
            if(results.length == 0){
                err = 400;
            }
            callback(err, results);
        }
        userDb.all("SELECT * from userinfo WHERE email=? AND password=?", user.userName,user.password,cb);
    }


    function closeDb(callback) {
       
        function cb(err,results){
             console.log("close db ")
            userDb.close(); 
            callback();
        }

        userDb.run("UPDATE userinfo SET socketid=0",cb);

       
    }

    function updatesocketid(data,socketid,callback){

        userDb.run("UPDATE userinfo SET socketid=? WHERE email=?",socketid,data.name);
         var cb = function (err, results) {
            console.log(" get the result with updated data" +JSON.stringify(results) );
            callback(results);
        }
         userDb.all("SELECT * from userinfo WHERE socketid!=0",cb);

    }

    return {
        initializeDb : initializeDb,
        updateDb : updateDb,
        closeDb : closeDb,
        fetchDb : fetchDb,
        updatesocketid :updatesocketid
    }

}

exports.DbConnector = dbConnector;


