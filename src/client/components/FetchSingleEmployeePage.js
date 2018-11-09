import React, {Component} from 'react';
import FetchSingleEmployee from './FetchSingleEmployee';
import {Grid, Row, Col, Table} from 'react-bootstrap';

export default class FetchSingleEmployeePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      id: this.props.match.params.id
    }
  }
  getNextId = () =>{
    this.setState((prevState)=>({
      id: parseInt(prevState.id)+1
    }));
    this.props.history.push(`/employees/${this.state.id}`);
  }
  getPrevId = () =>{
    this.setState((prevState)=>({
      id: parseInt(prevState.id)-1 === 0 ? 1 : parseInt(prevState.id)-1
    }));
    this.props.history.push(`/employees/${this.state.id}`);
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
            <button onClick={this.getPrevId}>Prev</button>
            <button onClick={this.getNextId}>Next</button>
            <FetchSingleEmployee id={this.state.id} >
              {({ loading, employeeData, error }) => {
                if(loading) return <p>Loading</p>;
                if(error) return <p>No data loaded.</p> 
                if(employeeData) return (
                  <Table bordered>
                    <tbody>
                    <tr>
                      <td>ID</td>
                      <td>{employeeData.id}</td>
                    </tr>
                    <tr>
                      <td>name</td>
                      <td>{employeeData.name}</td>
                    </tr>
                    <tr>
                      <td>Department</td>
                      <td>{employeeData.department}</td>
                    </tr>
                    <tr>
                      <td>Job Title</td>
                      <td>{employeeData.job_titles}</td>
                    </tr>
                    <tr>
                      <td>Salary</td>
                      <td>${employeeData.employee_annual_salary}</td>
                    </tr>                
                    </tbody>
                  </Table>
                )
              }}
            </FetchSingleEmployee>          
          </Col>
        </Row>  
      </Grid>
    )
  }
}
