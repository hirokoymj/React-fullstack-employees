const {Department} = require('../models/departments');
const express = require('express');
const router = express.Router();

/**
 * Returns department name by alphabetical order.
 * @example
 * // URL:
 * http://localhost:8080/api/departments
 */
router.get('/', (req, res)=>{
  Department
    .find()
    .sort({name: 1})
    .exec((err, departments)=>{
      if(err) return res.send(err);
        res.json(departments);
      })
  }
);

module.exports = router; 