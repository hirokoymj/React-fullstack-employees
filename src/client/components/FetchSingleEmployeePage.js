import React, {Component} from 'react';
import FetchSingleEmployee from './FetchSingleEmployee';
import {Grid, Row, Col, Table, Button, Panel, Pager} from 'react-bootstrap';

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
  onDelete = (id) =>{
    fetch(`/api/employees/${id}`,{
      method: 'DELETE',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      })
      .then(res =>res.json())
      .then(
        (data) => { // catch Promise resoluve
          console.log("DELETE:", data);
          this.props.history.push('/');
        },
        (error) =>{ //// catch Promise reject
          console.log(error);
        }
      )
  }
 
  render(){
    return(
      <Grid>
        <Row>
          <Col xs={12} sm={10} className="employee-detail-row">
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h3">
                <span className="title">Employee Details</span>
                <Button bsStyle="danger" className="pull-right" onClick={() => this.onDelete(this.state.id)}>Delete</Button>
                <div className="clearfix"></div>
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <Pager>
                <Pager.Item href="#" onClick={this.getPrevId}>Previous</Pager.Item>{' '}
                <Pager.Item href="#" onClick={this.getNextId}>Next</Pager.Item>
              </Pager>

              <FetchSingleEmployee id={this.state.id} >
                {({ loading, employeeData, error }) => {
                  if(loading) return <p>Loading</p>;
                  if(error) return <p>No data loaded.</p> 
                  if(employeeData) return (
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
                  )
                }}
              </FetchSingleEmployee>             
            </Panel.Body>
          </Panel>        
          </Col>
        </Row>  
      </Grid>
    )
  }
}
