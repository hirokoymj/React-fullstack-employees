const {Employee} = require('../models/employees');
const express = require('express');
const router = express.Router();

/**
 * Returns paginated list of employees.
 * The default number of per page is set to 100.
 * If page number is not specified, it set to 1.
 * If there is no more employee an empty list, [], is returned.
 * @example
 * // URL:
 * http://localhost:8080/api/employees
 * http://localhost:8080/api/employees?page=1
 */
router.get('/', (req, res)=>{
  let pageSize = 100;
  let pageNumber = (Object.getOwnPropertyNames(req.query).length===0) ? 1 : req.query.page
  Employee
    .find()
    .sort({id: 1})
    .skip((pageNumber-1) * pageSize)
    .limit(pageSize)
    .exec((err, employees)=>{
      if(err) return res.send(err);
        //res.send(pageNumber);
        res.json(employees);
      })
  }
);

/**
 * Returns a single employee data.
 * @example
 * // URL:
 * http://localhost:3000/api/employees/5bdcebeb38bd99d30e97be11
 */
router.get('/:id', (req, res)=>{
  Employee.findById(req.params.id, (err, employees)=>{
    if(err) return res.status(500).send(err);
    res.json(employees);
  })
});

/**
 * Returns total count of all employee data.
 * HTTP Method: POST
 * @example
 * // URL:
 * http://localhost:3000/api/employees/countDocs
 */
router.post('/countDocs', (req, res)=>{
  Employee.countDocuments({}, function (err, count) {
    if (err) return res.status(500).send(err);
    const countObj = {"count": count};
    //res.json({ "count": count});
    res.send(countObj);
  });
});


module.exports = router; 