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
  function _add(newPostValues) {
    return db.query('INSERT INTO articles (title, body, author, urltitle) VALUES($1, $2, $3, $4)',
      [newPostValues.title, newPostValues.body, newPostValues.author, newPostValues.urltitle]);
  }

  function _allArticles() {
    return db.query('SELECT * FROM articles');
  }

  function _getByTitle(articleTitle) {
    return db.query('SELECT * FROM articles WHERE title=$1',
      [articleTitle]);
  }


  return {
    allArticles: _allArticles,
    add: _add,
    getByTitle: _getByTitle

    // getByTitle: _getByTitle,
    // editByTitle: _editByTitle
  };
})();

