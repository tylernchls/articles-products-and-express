const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const articles = require('./routes/articles');
const products = require('./routes/products');
let methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
  extended:true
}))

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
}));

app.set('view engine', '.hbs');

app.use('/products', products);

app.use('/articles', articles);




if(!module.parent){
    app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}

module.exports = app;










