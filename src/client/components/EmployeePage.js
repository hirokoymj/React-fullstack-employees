import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Table} from 'react-bootstrap';

export default class EmployeePage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      employees: this.props.location.state.employeeData,
      currentEmployeeId: this.props.match.params.id
    }
  }
  componentDidMount(){
    ReactDOM.findDOMNode(this.refs['employeeTbl']).focus();    
  }
  componentDidUpdate(){
    ReactDOM.findDOMNode(this.refs['employeeTbl']).focus();    
  }
  getNextData = () =>{
    let id = parseInt(this.state.currentEmployeeId)+1;
    fetch(`https://dt-interviews.appspot.com/${id}`)
      .then(res =>res.json())
      .then(
        (result)=>{
          this.setState({
            employees: result,
            currentEmployeeId: result.id
          });
        },
        (error)=>{
          console.log(error);
          console.log("ERR: getNextData() - failed to get data.");
        });  
  }
  getPrevData = () =>{
    let id = parseInt(this.state.currentEmployeeId)-1;
    id = (id ===0) ? 1: id;

    fetch(`https://dt-interviews.appspot.com/${id}`)
    .then(res =>res.json())
    .then(
      (result)=>{
        this.setState({
          employees: result,
          currentEmployeeId: result.id
        })
      },
      (error)=>{
        console.log(error);
        console.log("ERR: getPrevData() - failed to get data.");
      })
  }
  handleKeyDown = (e) =>{
    let code = e.keyCode;
    if (code === 13) { //Enter key
      const {pageNum, rowId} = this.calculatePageNumANDRowId(this.state.currentEmployeeId);
      this.props.history.push(`/?page=${pageNum}`, {rowId: rowId});
    }
    if(code === 38){ //arrow Up key -> prev data
      this.getPrevData();
    }
    if(code === 40){ //arrow Down key -> next data
      this.getNextData();
    }
  }
  calculatePageNumANDRowId = (employeeId) =>{
      // Calculate page number for Dashboad page
      let pageNum = Math.ceil(employeeId/100);
      pageNum === 0 ? 1 : pageNum;

      // Calculate highlighed RowId for Dashboad page
      let startIndex = ((pageNum-1)*100)+1;
      let rowId = (this.state.currentEmployeeId)-startIndex;
      //console.log(rowId);
      let obj = {}
      obj['pageNum'] = pageNum;
      obj['rowId'] = rowId;
      return obj;
  }
 
  render(){
    //const {department, employee_annual_salary, job_titles, id, name} = this.props.location.state.employeeData;
    const {department, employee_annual_salary, job_titles, id, name} = this.state.employees;
    return(
      <Grid>
        <Row>
          <Col xs={12} sm={10}>
            <h1>Employee Detail Page</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={10}>
            <Table bordered ref="employeeTbl" tabIndex={0} onKeyDown={this.handleKeyDown} className="employeeInfoTbl">
              <tbody>
                <tr>
                  <td className="item">ID</td>
                  <td>{id}</td>
                </tr>
                <tr>
                  <td className="item">Name</td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td className="item">Department</td>
                  <td>{department}</td>
                </tr>
                <tr>
                  <td className="item">Job Title</td>
                  <td>{job_titles}</td>
                </tr>
                <tr>
                  <td className="item">Salary</td>
                  <td>${employee_annual_salary}</td>
                </tr>
              </tbody>            
            </Table>
            <p>**Please click the table first to use Up and Down key to see prev/next employee.</p>
          </Col>
        </Row>
      </Grid>
    )
  }
}
