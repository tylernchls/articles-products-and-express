module.exports = (function(){
  let products = [];

  function _add(data) {
    products.push(data);
  }

  function _editById(body, id) {
    for(var i = 0; i < products.length; i++){
      if(products[i].id == id) {
        products[i].name = body.name;
        products[i].price = body.price;
        products[i].inventory = body.inventory;
        return true;
      }
    }
    return false;
  }

  function _getById(id) {
    for(var i = 0; i < products.length; i++){
      if(products[i].id === id) {
        return products[i];

      }
    }
    return false;
  }

  function _deleteById(id) {
    for(var i =0; i < products.length; i++) {
      if(products[i].id === id) {
        products.splice(i,1);
        return products;
      }
    }
    return false;
  }

  function _checkValidId(id) {
    for(var i = 0; i < products.length; i++) {
      if(products[i].id === id) {
        return true;
      }
    }
    return false;
  }

  function _allProducts() {
    return products;
  }





  // ...
  //...
  return {
    allProducts: _allProducts,
    add: _add,
    editById: _editById,
    getById: _getById,
    deleteById: _deleteById,
    checkValidId: _checkValidId
    // getByTitle: _getByTitle,
    // editByTitle: _editByTitle
  };
})();