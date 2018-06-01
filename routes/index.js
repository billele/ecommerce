var express = require('express');
var router = express.Router();
var Product = require('../models/product')

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, docs) {
    var productChuncks = [];
    var ChunckSize = 3;
    res.render('shop/index', { title: 'babysshow', products: docs });
  });
});

module.exports = router;
