import React, {Component} from 'react';
import FetchSingleEmployee from './FetchSingleEmployee';
import {Grid, Row, Col, Button, Panel, Pager} from 'react-bootstrap';

export default class FetchSingleEmployeePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      eid: this.props.match.params.id
    }
  }
  getNextId = () =>{
    this.setState((prevState)=>({
      eid: parseInt(prevState.eid)+1
    }));
    this.props.history.push(`/employees/${this.state.eid}`);
  }
  getPrevId = () =>{
    this.setState((prevState)=>({
      eid: parseInt(prevState.eid)-1 === 0 ? 1 : parseInt(prevState.eid)-1
    }));
    this.props.history.push(`/employees/${this.state.eid}`);
  }
  onDelete = (eid) =>{
    fetch(`/api/employees/${eid}`,{
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
  backToDashboardPage = (eid) =>{
    const {activePage, activeRow} = this.calculateActivePageAndRow(eid);
    this.props.history.push(`/?page=${activePage}`, {activeRow: activeRow});
  }
  calculateActivePageAndRow = (employeeId) =>{
    // Calculate page number in Dashboad page
    let page = Math.ceil(employeeId/100);
    let target_page = page === 1 ? 1: page;

    // Calculate highlighed row in table in Dashboad page
    let target_rowRef = (employeeId < 100) ? employeeId-1 : (employeeId%100)-1;

    let obj = {}
    obj['activePage'] = target_page;
    obj['activeRow'] = target_rowRef;
    return obj;
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
                <div className="clearfix"></div>
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <Pager>
                <Pager.Item href="#" onClick={this.getPrevId}>Previous</Pager.Item>{' '}
                <Pager.Item href="#" onClick={this.getNextId}>Next</Pager.Item>
              </Pager>
              <Button bsStyle="link" className="backToDashboardBtn" onClick={() => this.backToDashboardPage(this.state.eid)}>&larr; back to Dashboard</Button>
              <FetchSingleEmployee eid={this.state.eid} />
            </Panel.Body>
          </Panel>        
          </Col>
        </Row>  
      </Grid>
    )
  }
}

// <Button bsStyle="danger" className="pull-right" onClick={() => this.onDelete(this.state.eid)}>Delete</Button>
