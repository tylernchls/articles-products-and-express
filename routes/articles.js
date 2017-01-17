const express = require('express');
const router = express.Router();
const Articles = require('../db/articles');

router.route('/')
  .post((req, res) => {
    console.log(req.body);
    Articles.add(req.body)
      .then(articles => {
        res.redirect('/articles')
      })
      .catch((err) => {
        console.error(err);
        res.json(err);
      })
  })
  .get((req, res) => {
    Articles.allArticles()
      .then(articles => {
        res.render('../views/articles/index', {articles})
      })
      .catch((err) => {
        console.error(err);
        res.json(err);
      })
  })

router.route('/new')
  .get((req, res) => {
    res.render('../views/articles/new');
  })

router.route('/:title')
  .get((req,res) => {
    Articles.getByTitle(req.params.title)
      .then(articles => {
        res.render('../views/articles/article', {article: articles[0]});
      })
      .catch((err) => {
        console.error(err);
        res.json(err);
      })
  })


module.exports = router;
























