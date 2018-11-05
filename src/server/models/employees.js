const mongoose = require('mongoose');

const Employee = mongoose.model('Employee', new mongoose.Schema({
  name: String,
  department: String,
  employee_annual_salary: Number,
  job_titles: String
}));

exports.Employee = Employee; 