var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/updateUserInfo', function(req, res) {
    console.log("request recieved" +JSON.stringify(req.body.firstName));
    console.log("request recieved" +JSON.stringify(req.body.lastName));
    console.log("request recieved" +JSON.stringify(req.body.email));
    console.log("request recieved" +JSON.stringify(req.body.password));
    res.send("success");
});

module.exports = router;
