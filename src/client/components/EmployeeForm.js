import React from 'react';
import {Grid, Row, Col, Panel, Button} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import validator from 'validator';
import Selectbox from './Selectbox';
import InputText from './InputText';
import 'react-toastify/dist/ReactToastify.css';

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
      lastNameErr: null,
      address: ''
    }
  }

  componentDidMount(){
    this.fetchDepartments();
    this.fetchJobTitles();
    this.firstNameElement.focus()
  }
  handleChange = (e) =>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  fetchDepartments = () =>{
    fetch("/api/departments")
    .then(response => response.json())
    .then((departments) => {
        this.setState({departmentOptions: departments})
      }),(error)=>{
        console.log(error);
      }
  }
  fetchJobTitles = () =>{
    fetch("/api/titles")
    .then(response => response.json())
    .then((titles) => {
        this.setState({titleOptions: titles})
      }),(error)=>{
        console.log(error);
      }
  }
  saveEmployee = (formData)=>{
    fetch('/api/employees', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(formData)
    }).then(res=>res.json())
      .then(res =>{
        //console.log(res);
        toast.success("Success to save!");
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
  onSubmit = (e) =>{
    e.preventDefault();
    const {department, employee_annual_salary, id, job_titles, firstName, lastName} = this.state;
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
    // Saving an employee
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
      this.saveEmployee(formData);
    }      
  }//end of onSubmit

  render(){
    return(
      <Grid>
        <Row>
          <Col xs={12} sm={10} className='centered-main-content'>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">
                  <span className="title">Create new employee</span>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <form onSubmit={this.onSubmit}>
                  <InputText name="firstName" type="text" formLabel="First Name" validationState={this.state.firstNameErr} value={this.state.firstName} onChange={this.handleChange} inputRef={el => this.firstNameElement = el} />
                  <InputText name="lastName" type="text" formLabel="Last Name" validationState={this.state.lastNameErr} value={this.state.lastName} onChange={this.handleChange} />
                  <Selectbox name="job_titles" options={this.state.titleOptions} formLabel="Job Titles" value={this.state.job_titles} onChange={this.handleChange}/>    
                  <Selectbox name="department" options={this.state.departmentOptions} formLabel="Department" value={this.state.department} onChange={this.handleChange}/>    
                  <InputText name="employee_annual_salary" type="number" formLabel="Salary" value={this.state.employee_annual_salary} onChange={this.handleChange} />
                  <Button type="submit" type="submit" className="btn btn-success createBtn">Create</Button>
                </form>
                <ToastContainer hideProgressBar />
              </Panel.Body>
            </Panel>  
          </Col>
        </Row>
      </Grid>
    )
  }
}

