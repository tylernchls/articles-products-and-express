const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const articles = require('./routes/articles');
const products = require('./routes/products');


app.use(bodyParser.urlencoded({
  extended:true
}))

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
}));

app.set('view engine', '.hbs');

app.use('/products', products);




if(!module.parent){
    app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}










module.exports = app;