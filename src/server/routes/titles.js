const {Title} = require('../models/titles');
const express = require('express');
const router = express.Router();

/**
 * Returns job titles by alphabetical order.
 * @example
 * // URL:
 * http://localhost:8080/api/titles
 */
router.get('/', (req, res)=>{
  Title
    .find()
    .sort({name: 1})
    .exec((err, docs)=>{
      if(err) return res.send(err);
        res.json(docs);
      })
  }
);
module.exports = router; 