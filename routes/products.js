const express = require('express');
const router = express.Router();
const Products = require('../db/products');
let i = 0;

// start middleware
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
// end middleware

/*
Posts on /products, if succesful redirects back to products page.
Else, redirects to /products/new page.
*/
router.route('/')
  .post(isObjEmpty,isInputValid,uniqueId, (req, res) => {
    Products.add(req.body)
      .then(products => {
        res.redirect('/products');
      })
      .catch((err) => {
        console.error(err);
        res.json(err);
      })
  })
  .get((req, res) => {
    Products.allProducts()
      .then(products => {
        res.render('../views/products/index', {products})
      })
      .catch((err) => {
        console.error(err);
        res.json(err);
      })
  })

router.route('/new')
  .get((req, res) => {
    res.render('../views/products/new');
  })

router.route('/:id')
  .get((req,res) => {
    Products.getById(Number(req.params.id))
      .then(products => {
        res.render('../views/products/product', {product: products[0]});
      })
      .catch((err) => {
        console.error(err);
        res.json(err);
      })
  })
  .put(checkIfEdited,(req, res) => {
    Products.editById(req.body, Number(req.params.id))
      .then(products => {
        res.redirect('/products/'+req.params.id);
      })
      .catch((err) => {
        console.error(err);
        res.json(err);
      })
  })

  .delete(isIdValid,(req, res) => {
    Products.deleteById(Number(req.params.id))
      .then(products => {
        res.redirect('/products');
      })
      .catch((err) => {
        console.error(err);
        res.json(err);
      })
  })

router.route('/:id/edit')
  .get((req, res) => {
    Products.getById(Number(req.params.id))
      .then(products => {
        res.render('../views/products/edit', {productId: req.params.id, title: products[0]});
      })
      .catch((err) => {
        console.error(err);
        res.json(err);
      })
  })

module.exports = router;











