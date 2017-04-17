var express = require('express');
var router = express.Router();
var dbConn = require("../Dbactions/dbConnector").DbConnector;

var db;

/* GET home page. */
router.get('/', function(req, res) {
    db = new dbConn();
    db.initializeDb();
  res.render('index', { title: 'Express' });
});

router.post('/updateUserInfo', function(req, res) {
    console.log("request recieved" +JSON.stringify(req.body.userInfo));
    var cb = function (err) {
        if(err){
            if(err.message == "SQLITE_CONSTRAINT: UNIQUE constraint failed: user.email"){
                console.log("user name already exists");
                res.status(400).send("username already exists");
            }
            else{
                console.log("error updating Db");
                res.status(400).send("error updating Db");
            }

        }
        else {
            console.log("send response");
            res.send("success");
        }
    }
    db.updateDb(req.body.userInfo,cb);


});

module.exports = router;
