var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.send('This is the root of the service');
});

module.exports = router;
