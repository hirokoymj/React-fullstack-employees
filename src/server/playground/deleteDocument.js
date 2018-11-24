const mongoose = require('mongoose');
// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/chicago', { useNewUrlParser: true })
  .then(()=>console.log("Connected to MongoDB"))
  .catch(err =>console.log('Could not connect MongoDB', err));



const Employee = mongoose.model('Employee', new mongoose.Schema({
  name: String,
  department: String,
  employee_annual_salary: Number,
  job_titles: String,
  id: Number
}));


// Delete
async function deleteEmployee(id){
    const employee = await Employee.deleteOne({"id": id});
    if(!employee) return;
    console.log(employee);
  }
  
deleteEmployee(503);

// $ node delete.js 
// Connected to MongoDB
// { n: 1, ok: 1 }
