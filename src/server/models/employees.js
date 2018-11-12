const mongoose = require('mongoose');
const {Counter} = require('../models/counter');

const employeeSchema = new mongoose.Schema({
    name: String,
    department: String,
    employee_annual_salary: Number,
    job_titles: String,
    id: Number
  });

  employeeSchema.pre('save', function(next) {
    var doc = this;
      const counter = Counter.findByIdAndUpdate(
        {_id:'employeeId'},
        {$inc: {seq:1}},
        {new: true, upsert:true }, function(err, counter){ 
          if(err) return next(error);
          doc.id = counter.seq;
          next();
        });
  });


const Employee = mongoose.model('Employee', employeeSchema);
exports.Employee = Employee; 
