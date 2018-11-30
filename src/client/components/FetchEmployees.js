import React from 'react';
import { Link } from 'react-router-dom';
import {Table, Alert} from 'react-bootstrap';

export default class FetchEmployees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      error: null,
      activeRow: this.props.activeRow,
      sortOrderByName: false, //false=acending order, true=decending order
      sortOrderByTitle: false
    };
    this.rowRefs = [];
  }
  componentDidMount() {
    const page = this.props.activePage > 0 ? this.props.activePage : 1;
    this.getEmployeeData(page);
  }
  componentDidUpdate(prevProps){
    if(prevProps.activePage !== this.props.activePage){
      this.getEmployeeData(this.props.activePage, this.props.search);
    }
  }

  getEmployeeData = (page)=>{
    fetch(`/api/employees?page=${page}`)
      .then((response) =>{
        if (!response.ok) throw Error(response.statusText);
        return response.json();       
      })
      .then(employees =>{
        this.setState({
          employees,
        })
        let activeRow = this.props.activeRow;
        this.rowRefs[activeRow] && this.rowRefs[activeRow].focus();   
        //throw Error('test to catch error');    
      })
      .catch(error=>{
        this.setState({error});
      })   
  }
  changeActiveRow = (index) =>{
    this.setState({
      activeRow: index
    })
    this.rowRefs[index] && this.rowRefs[index].focus();  
  }

  // Keyboard scroll
  handleKeyDown = (e) =>{
    let code = e.keyCode;
    let tabIndex = e.target.tabIndex;
    let eId = e.target.id;
    let maxLen = 100; // default data per page is 100.

    if (code === 13) { //Enter key
      this.props.history.push(`/employees/${eId}`);
    }
    if(code === 38){ //Up arrow key
      if(tabIndex === 0) return; //Check if the first row
      //Set highlighted
      tabIndex = parseInt(tabIndex)-1;
      this.changeActiveRow(tabIndex);
    }
    if(code === 40){ //Down arrow key
      if(tabIndex > maxLen) return; //Check if the last row
      // Set highlighted
      tabIndex = parseInt(tabIndex)+1;
      this.changeActiveRow(tabIndex);
    }
  }

  sortByName = () =>{
    let employees = [];
    let sortOrderByName = !this.state.sortOrderByName;

    if(sortOrderByName){ //sort by decending order
      employees = this.state.employees.sort((a,b)=> (b.name < a.name) ? -1 : 1);
    }else{ //sort by aecnding order
      employees = this.state.employees.sort((a,b)=> (a.name < b.name) ? -1 : 1);
    }
    // Update component states
    this.setState({
      employees,
      sortOrderByName
    });
  }
  sortByTitle = () =>{
    let employees = [];
    let sortOrderByTitle = !this.state.sortOrderByTitle;

    if(sortOrderByTitle){ //sort by decending order
      employees = this.state.employees.sort((a,b)=> (b.job_titles < a.job_titles) ? -1 : 1);
    }else{ //sort by aecnding order
      employees = this.state.employees.sort((a,b)=> (a.job_titles < b.job_titles) ? -1 : 1);
    }
    // Update component states
    this.setState({
      employees,
      sortOrderByTitle
    });
  }
  render() {
    const {error, employees} = this.state;
    if (error) {
      return <Alert bsStyle="danger"><h4>System Error:</h4><p> {error.message}</p></Alert>
    } else {
      return (
        <Table bordered className="employeeListTbl">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>
              Name
              <span onClick={this.sortByName} className="sortIcon"><i className="fa fa-sort"></i></span>
            </th>
            <th>
              Job Title
              <span onClick={this.sortByTitle} className="sortIcon"><i className="fa fa-sort"></i></span>
            </th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
        {
          employees.map((employee, index)=>
            <tr
              key={`${employee.name}-${employee.id}`}
              tabIndex={index}
              ref={ref=>this.rowRefs[index] = ref}
              onClick={() => this.changeActiveRow(index) }
              id={employee.id}
              onKeyDown={this.handleKeyDown}
            >
              <td>{employee.id}</td>
              <td><Link to={`/employees/${employee.id}`}>{employee.name}</Link></td>
              <td>{employee.job_titles}</td>
              <td>{employee.department}</td>              
            </tr>
          )
        }
        </tbody>
      </Table>
      );
    }//end of if
  }//end of render()
}

