import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Grid, Row, Col, Table, FormGroup, FormControl, Button} from 'react-bootstrap';
import FetchEmployees from './FetchEmployees';
import AppPagination from './AppPagination';
import 'font-awesome/css/font-awesome.min.css';

export default class DashboardPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      search: '',
      activePage: 1
    }
    this.rowRefs = [];
    this.fetchEmployees = React.createRef();
  }
  componentDidMount(){    
    this.onRowHighlight(5)
  }

 
  handleKeyDown = (e) =>{
    let code = e.keyCode;
    let tabIndex = e.target.tabIndex;
    let eId = e.target.id;
    let maxLen = this.fetchEmployees.current.state.filteredEmployeesTotal;

    if (code === 13) { //Enter key
      this.props.history.push(`/employees/${eId}`);
    }
    if(code === 38){ //Up arrow key
      if(tabIndex === 0) return; //Check if the first row
      //Set highlighted
      tabIndex = parseInt(tabIndex)-1;
      this.onRowHighlight(tabIndex);
    }
    if(code === 40){ //Down arrow key
      if(tabIndex === maxLen-1) return; //Check if the last row
      // Set highlighted
      tabIndex = parseInt(tabIndex)+1;
      this.onRowHighlight(tabIndex);
    }
  }
  // Filter input box
  handleChange = (e) =>{
    const filter_text = e.target.value;
    this.setState({
      search: e.target.value,
    });
    this.fetchEmployees.current.filterDepartment(e.target.value);
    // Update total count in pagination
    const total = this.fetchEmployees.current.state.filteredEmployeesTotal;
    this.setState({
      totalItemsCount: (filter_text === "") ? 500: total
    })
  }

  // Clicked on pagination
  handlePageChange = (pageNumber) => {
    this.setState({
      activePage: pageNumber,
    });
  }

  onRowHighlight = (id) =>{
    console.log(`onRowHighlight - ${id}`);
    this.rowRefs[id] && this.rowRefs[id].focus(); 
  }    

  sortData = (orderType, fieldName) =>{
    console.log(`sortName: ${orderType}-${fieldName}`);
    this.fetchEmployees.current.sortEmployees(orderType, fieldName);
  }

  render(){
    return(
      <Grid>
        <Row>
          <Col xs={12} md={10} className="main-content">
            {/* Filter */}
            <FormGroup className="well zero-margin">
              <FormControl type="text" name="search" value={this.state.search} onChange={this.handleChange} placeholder="Search by department..." />
            </FormGroup>
            {/* Pagination */}
            <AppPagination 
              activePage={this.state.activePage}
              handlePageChange={this.handlePageChange}          
            />
            {/* Employee List */}
            <Table bordered className="employeeListTbl">
            <thead>
              <tr>
                <th className="item-employeeId">Employee<br />ID</th>
                <th>
                  <div className="sortables">
                    <span>Name</span>
                    <span onClick={() => this.sortData('ace','name')} className="fa fa-sort-up my-icon"></span>
                    <span onClick={() => this.sortData('dec','name')} className="fa fa-sort-down my-icon"></span>
                  </div>
                </th>
                <th>
                  <div className="sortables">
                    <span>Job Title</span>
                    <span onClick={() => this.sortData('ace','job_titles')}><i className="fa fa-sort-up"></i></span>       
                    <span onClick={() => this.sortData('dec', 'job_titles')}><i className="fa fa-sort-down"></i></span>         
                  </div>
                </th>
                <th className="item-department">Department</th>
              </tr>
            </thead> 
              <FetchEmployees page={this.state.activePage} search={this.state.search} ref={this.fetchEmployees}>
                {({ loading, filteredEmployees, error }) => {
                  if(loading) return <tbody><tr><td>Loading</td></tr></tbody>;
                  if(error) return <tbody><tr><td>No data loaded.</td></tr></tbody> 
                  if(filteredEmployees) return (
                    <tbody>
                    {
                      filteredEmployees.map((employee, index)=>
                        <tr key={`${employee.name}-${index}`}  
                          onClick={() => this.onRowHighlight(index) }
                          onKeyDown={this.handleKeyDown}
                          ref={ref=>this.rowRefs[index] = ref}
                          tabIndex={index}
                          id={employee.id}
                          >
                          <td>{employee.id}</td>
                          <td><Link to={`/employees/${employee.id}`}>{employee.name}</Link></td>
                          <td>{employee.job_titles}</td>
                          <td>{employee.department}</td>
                        </tr>
                      )
                    }
                    </tbody>
                  )
                }}
              </FetchEmployees>
            </Table>
          </Col>
        </Row>
      </Grid>
    )
  }
}


// <Pagination
// activePage={this.state.activePage}
// itemsCountPerPage={100}
// totalItemsCount={500}
// pageRangeDisplayed={10}
// onChange={this.handlePageChange}
// /> 