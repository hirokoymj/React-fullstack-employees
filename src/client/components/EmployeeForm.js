import React from 'react';
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import validator from 'validator';

export default class EmployeeForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      department: '',
      employee_annual_salary: 0,
      job_titles: '',
      titleOptions: [], //dropdown elements
      departmentOptions: [], //dropdown elements
      firstNameErr: null,
      lastNameErr: null
    }
  }
  componentDidMount(){
    fetch('/employee.json')
      .then(res =>res.json())
      .then(data =>{
        const departments = data.meta.view.columns.find(col => col.id === 218245485);
        const titles = data.meta.view.columns.find(col=>col.id ===218245484);
        const departmentOptions = departments.cachedContents.top.map(d => d.item).sort((a,b)=>(a<b ? -1: 1));
        const titleOptions = titles.cachedContents.top.map(t => t.item).sort((a,b) => (a<b ? -1: 1));
        this.setState({
          departmentOptions,
          titleOptions
        });
      }, (error)=>{
        console.log(error);
        console.log('ERR: componentDidMount');
      });
  }
  handleChange = (e) =>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  onSubmit = (e) =>{
    e.preventDefault();
    const {department, employee_annual_salary, id, job_titles, firstName, lastName} = this.state;
    //console.log(`${department}, ${employee_annual_salary}, ${id}, ${job_titles}, ${firstName}, ${lastName}`);

    /* Reset error message before validating. */
    const errArray = [];
    let errMsg = '';
    this.setState({
      firstNameErr: null,
      lastNameErr: null
    });

    /* Validating form fields  */
    if(validator.isEmpty(firstName)){
      errArray.push('firstName');
      errMsg = "Please fill in required field(s).";
      this.setState(()=>({
        firstNameErr: "error",
      }));
    }
    if(validator.isEmpty(lastName)){
      errArray.push('lastName');
      errMsg = "Please fill in required field(s).";
      this.setState(()=>({
        lastNameErr: "error",
      }));
    }    

    if(errArray.length > 0){
      toast.error(errMsg);
    }else{
      // HTTP POST Request Start
      const formData = {
        "name": `${firstName} ${lastName}`,
        "department": department,
        "employee_annual_salary": parseInt(employee_annual_salary),
        "job_titles": job_titles,
      }
      let h = new Headers();
      h.append('Accept', 'application/json');
      let req = new Request('https://dt-interviews.appspot.com', {
        method: 'POST',
        headers: h,
        mode: 'cors',
        body: JSON.stringify(formData)
      })
      fetch(req).then(res=>res.json())
        .then(res =>{
          console.log(res);
          toast.success("Success to save!");
          // Reset input fields
          this.setState({
            firstName: '',
            lastName: '',
            department: '',
            employee_annual_salary: 0,
            job_titles: '',
          })        
        }, (error)=>{
          console.log(error);
        })
    }
  }//end of onSubmit

  render(){
    return(
      <Grid>
        <Row>
          <Col xs={12}>
            <h1>Create a new employee</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <form onSubmit={this.onSubmit} className="addEmployeeForm">
              <FormGroup controlId="firstName" validationState={this.state.firstNameErr}>
                <ControlLabel>First Name:</ControlLabel>
                <FormControl type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup controlId="lastName" validationState={this.state.lastNameErr}>
                <ControlLabel>Last Name:</ControlLabel>
                <FormControl type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Job Title:</ControlLabel>
                <FormControl 
                  componentClass="select" 
                  name="job_titles" 
                  value={this.state.job_titles} 
                  onChange={this.handleChange}>
                <option value="">Select your title</option>
                {
                  this.state.titleOptions.map(title =>
                    <option key={title} value={title}>{title}</option>
                    )
                }
                </FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Department:</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="department"
                  value={this.state.department}
                  onChange={this.handleChange}>
                  <option value="">Select your department</option>
                  {
                    this.state.departmentOptions.map(department =>
                      <option key={department} value={department}>{department}</option>
                      )
                  }
                </FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Salary:</ControlLabel>
                <FormControl type="number" name="employee_annual_salary" value={this.state.employee_annual_salary} onChange={this.handleChange} />
              </FormGroup>
            <Button type="submit" type="submit" className="btn btn-success addBtn">Submit</Button>
          </form>
          <ToastContainer hideProgressBar />
          </Col>
        </Row>
      </Grid>
    )
  }
}

