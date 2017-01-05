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
      }
    }
  }

  function _getById(id) {
    for(var i = 0; i < products.length; i++){
      if(products[i].id == id) {
        return products[i];

      }
    }
    return false;
  }

  function _deleteById(id) {
    for(var i =0; i < products.length; i ++) {
      if(products[i].id == id) {
        products.splice(i,1);
        console.log(`{"removed" : true}`);
        return '{"removed" : true}';
      }
    }
    return '{"removed" : false}';
  }




  // ...
  //...
  return {
    // all: _all,
    add: _add,
    editById: _editById,
    getById: _getById,
    deleteById: _deleteById
    // getByTitle: _getByTitle,
    // editByTitle: _editByTitle
  };
})();