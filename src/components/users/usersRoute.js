var express = require('express');
var router = express.Router();

var controller = require('./usersController')

router.get('/list', controller.users_list);

module.exports = router;
