import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

export default class FetchSingleEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeData: {},
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
        .then(response => response.json())
        .then(employees => {
          if(employees.length===0){ // When it returns an emply array [] - no data found.
            this.setState({
              error: "No data found",
            })
          }else{
            this.setState({
              employeeData: employees[0],
              eid
            });
          }
        })
  }

  render() {
    const {employeeData, eid, error} = this.state;
    return(
      <div>
      {
        employeeData &&
          <Table className="employeeDetailTbl">
            <tbody>
            <tr>
              <td className="item">ID</td>
              <td>{employeeData.id}</td>
            </tr>
            <tr>
              <td className="item">name</td>
              <td>{employeeData.name}</td>
            </tr>
            <tr>
              <td className="item">Department</td>
              <td>{employeeData.department}</td>
            </tr>
            <tr>
              <td className="item">Job Title</td>
              <td>{employeeData.job_titles}</td>
            </tr>
            <tr>
              <td className="item">Salary</td>
              <td>${employeeData.employee_annual_salary}</td>
            </tr>                
            </tbody>
          </Table>
      }
      </div>
    )
  }
}

