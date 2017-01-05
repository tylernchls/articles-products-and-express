const express = require('express');
const router = express.Router();
const Products = require('../db/products');


const isObjEmpty = (req, res, next) => {
  if(Object.keys(req.body).length === 0) {
    res.redirect('products/new');
  } else {
    next()
  }
}

const isInputValid = (req, res, next) => {
  if(isNaN(Number(req.body.price || isNaN(Number(req.body.inventory))))) {
    res.redirect('products/new');
  } else {
    next()
  }
}



router.route('/')
  .post(isObjEmpty,isInputValid, (req, res) => {
    req.body.price = Number(req.body.price);
    req.body.inventory = Number(req.body.inventory);
    let uniqueId = Math.floor((Math.random() * 1000000) + 1);
    req.body["uniqueId"] = uniqueId;
    Products.add(req.body);
    res.redirect('/products');
  })

router.route('/new')
.get((req, res) => {
  res.render('new');
})






module.exports = router;