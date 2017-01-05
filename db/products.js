module.exports = (function(){
  let products = [];

  function _add(data) {
    products.push(data);
    console.log(products);


  }

  // ...
  //...
  return {
    // all: _all,
    add: _add,
    // getByTitle: _getByTitle,
    // editByTitle: _editByTitle
  };
})();