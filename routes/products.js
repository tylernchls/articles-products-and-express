const express = require('express');
const router = express.Router();

router.route('/')
  .post((req, res) => {
    res.send(`{200 : "ok"}`);
  })






module.exports = router;