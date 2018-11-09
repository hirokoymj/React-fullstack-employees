import React, {Component} from 'react';
import {Grid, Row, Col, Table} from 'react-bootstrap';
import FetchSingleEmployee from './FetchSingleEmployee';

export default class EmployeePage extends Component{
  constructor(props){
    super(props);
  }

 
  render(){
    return(
      <Grid>
        <Row>
          <Col xs={12} sm={10}>
            <h1>Employee Detail Page</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={10}>
          <FetchSingleEmployee id="1">
          {({ loading, employeeData, error }) => {
            if(loading) return <tbody><tr><td>Loading</td></tr></tbody>;
            if(error) return <tbody><tr><td>No data loaded.</td></tr></tbody> 
            if(employeeData) return (
              <tbody>
                <tr>
                  <td className="item">ID</td>
                  <td>{employeeData.id}</td>
                </tr>
                <tr>
                  <td className="item">Name</td>
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
            )
          }}
          </FetchSingleEmployee>
          </Col>
        </Row>
      </Grid>
    )
  }
}
