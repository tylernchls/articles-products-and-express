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




router.route('/')
  .post(isObjEmpty,isInputValid,uniqueId, (req, res) => {
    Products.add(req.body);
    res.redirect('/products');
  })


router.route('/new')
.get((req, res) => {
  res.render('new');
})

router.route('/:id')
  .get((req,res) => {
    const updatedProduct = Products.getById(Number(req.params.id));
    res.render('product');
    // console.log('route',updatedProduct);
  })
  .put((req, res) => {
    Products.editById(req.body, Number(req.params.id));
    res.redirect('/products/'+req.params.id);
  })
  .delete((req, res) => {
    Products.deleteById(Number(req.params.id));
  })





module.exports = router;