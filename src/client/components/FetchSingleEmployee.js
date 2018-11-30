import React, {Component} from 'react';
import {Table, Alert} from 'react-bootstrap';

export default class FetchSingleEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeData: [],
      error: null,
      eid: this.props.eid
    };
  }
  componentDidMount() {
    this.getEmployeeData(this.props.eid);
  }

  componentDidUpdate(prevProps){
    if(prevProps.eid !== this.props.eid){
      this.getEmployeeData(this.props.eid);
    }
  }

  getEmployeeData(eid){
    fetch(`/api/employees/${eid}`)
      .then((response) =>{
        if (!response.ok) throw Error(response.statusText);
        return response.json();  
      })
      .then((employee) => {
        this.setState({
          employeeData: employee,
          eid
        });
      })
      .catch((error)=>{
        this.setState({error});
      }) 
  }

  render() {
    const {employeeData, eid, error} = this.state;
    if(error){
      return <Alert bsStyle="danger"><h4>System Error:</h4><p> {error.message}</p></Alert>
    }else if(employeeData.length===0){
      return <Alert bsStyle="warning"><h4>There is no employee data. Employee ID: {eid}</h4></Alert>
    }else{
      return(
        <div>
        {
          employeeData.map(employee =>
            <Table className="employeeDetailTbl">
              <tbody>
              <tr>
                <td className="item">ID</td>
                <td>{employee.id}</td>
              </tr>
              <tr>
                <td className="item">name</td>
                <td>{employee.name}</td>
              </tr>
              <tr>
                <td className="item">Department</td>
                <td>{employee.department}</td>
              </tr>
              <tr>
                <td className="item">Job Title</td>
                <td>{employee.job_titles}</td>
              </tr>
              <tr>
                <td className="item">Salary</td>
                <td>${employee.employee_annual_salary}</td>
              </tr>                
              </tbody>
            </Table>
          )
        }
        </div>
      )
    }
  }
}

