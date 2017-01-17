const Promise = require('bluebird');
const options = {
    promiseLib: Promise
};
const pgp = require('pg-promise')(options);

const connectionOptions = {
  host: 'localhost',
  database: 'articles_products',
  user: 'tylernichols',
  password: null
};

const db = pgp(connectionOptions);

module.exports = (function(){

  function _add(newProductValues) {
    return db.query('INSERT INTO products (name, price, inventory) VALUES($1, $2, $3)',
      [newProductValues.name, newProductValues.price, newProductValues.inventory]);
  }

  function _editById(productValues, productId) {
    return db.query('UPDATE products SET name=$1, price=$2, inventory=$3 WHERE id=$4',
      [productValues.name, productValues.price, productValues.inventory, productId]);
  }

  function _getById(productId) {
    return db.query('SELECT * FROM products WHERE id=$1',
      [productId]);
  }

  function _deleteById(productId) {
    return db.query('DELETE FROM products WHERE id=$1',
      [productId]);
  }

  function _checkValidId(productId) {
     return db.query('SELECT * FROM products WHERE id=$1',
      [productId]);
  }

  function _allProducts() {
    return db.query('SELECT * FROM products');
  }

  return {
    allProducts: _allProducts,
    add: _add,
    editById: _editById,
    getById: _getById,
    deleteById: _deleteById,
    checkValidId: _checkValidId
  };
})();