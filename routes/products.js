const express = require('express');
const router = express.Router();
const Products = require('../db/products');
let i = 0;


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
    req.body.id = Number(req.body.id);
    req.body.price = Number(req.body.price);
    req.body.inventory = Number(req.body.inventory);
    next()
  }
}

const uniqueId = (req, res, next) => {
  let id = i++;
  req.body["id"] = id;
  next()
}

const checkIfEdited = (req, res, next) => {
  let id = req.params.id;
  if(Products.editById(req.body,id) === false) {
    res.redirect('/products/'+req.params.id+'/edit');
  } else {
    next();
  }
}

const isIdValid = (req, res, next) => {
  let id  = req.params.id;
  if(Products.checkValidId(id) === false) {
    res.redirect('/products/'+req.params.id);
  } else {
    next();
  }
}








router.route('/')
  .post(isObjEmpty,isInputValid,uniqueId, (req, res) => {
    Products.add(req.body);
    res.redirect('/products');
  })
  .get((req, res) => {
    let currentProducts = Products.allProducts();
    // console.log('test', currentProducts);
    res.render('index', {products: currentProducts})
  })

router.route('/new')
  .get((req, res) => {
    res.render('new');
  })

router.route('/:id')
  .get((req,res) => {
    const updatedProduct = Products.getById(Number(req.params.id));
    res.render('product');
  })
  .put(checkIfEdited,(req, res) => {
    Products.editById(req.body, Number(req.params.id));
    res.redirect('/products/'+req.params.id);
  })
  .delete(isIdValid,(req, res) => {
    Products.deleteById(Number(req.params.id));
    res.redirect('/products');
  })

router.route('/:id/edit')
  .get((req, res) => {
    res.render('edit', {productId: req.params.id});
  })







module.exports = router;