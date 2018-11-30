import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
import {Grid, Row, Col, Table, FormGroup, FormControl, Button} from 'react-bootstrap';
import FetchEmployees from './FetchEmployees';
import AppPagination from './AppPagination';
import 'font-awesome/css/font-awesome.min.css';

export default class DashboardPage extends Component{
  constructor(props){
    super(props);
    this.state = {
//      search: '',
      activePage: 1,
      activeRow: 0
    }
  }
  componentDidMount(){
    if(this.props.location.search === ""){
      this.setState({
        activePage:1,
        activeRow: 0
      })
    }else{
      //?page=10
      const values = this.props.location.search.split('=');
      let page = values[1];
      let activeRow = this.props.location.state.activeRow;
      this.setState({
        activePage:page,
        activeRow: activeRow
      })
    }
  }
  

  // Clicked on pagination
  handlePageChange = (pageNumber) => {
    this.setState({
      activePage: pageNumber,
      activeRow: 0
    });
  }

  render(){
    return(
      <Grid>
        <Row>
          <Col xs={12} md={10}>
            <AppPagination 
              activePage={this.state.activePage}
              handlePageChange={this.handlePageChange}          
            />          
            <FetchEmployees 
              activePage={this.state.activePage} 
              activeRow={this.state.activeRow} 
              history={this.props.history} />
          </Col>
        </Row>
      </Grid>
    )
  }
}
