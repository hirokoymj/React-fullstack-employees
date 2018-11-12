import React from 'react';

export default class FetchEmployees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      employees: [],
      error: null,
      filteredEmployees: [],
      filteredEmployeesTotal:0
    };
  }
  componentDidMount() {
    console.log(this.props.page);
    const page = this.props.page > 0 ? this.props.page : 1;
    this.getEmployeeData(page);
  }
  getEmployeeData = (page, search)=>{
    search = search || '';
    fetch(`/api/employees?page=${page}`)
      .then(res =>res.json())
      .then(employees =>{
        // console.log(employees);
        // console.log(employees.length);
        const filtered = employees.filter(employee => employee.department.toLowerCase().indexOf(search.toLowerCase()) > -1);
        const filtered_length = filtered.length;

        this.setState({
          employees,
          filteredEmployees: filtered,
          filteredEmployeesTotal: filtered_length,
          activePage: page
        }) 
      })
      .catch(error=>this.setState({error}))     
  }

  getEmployeeDataWithSearch = (page, search)=>{
    fetch(`/api/employees?page=${page}`)
      .then(res =>res.json())
      .then(employees =>{
        // console.log(employees);
        // console.log(employees.length);
        this.setState({
          employees,
          filteredEmployees: employees.filter(employee => employee.department.toLowerCase().indexOf(search.toLowerCase()) > -1),
          activePage: page
        }) 
      })
      .catch(error=>this.setState({error}))     
  }  

  filterDepartment = (userInput) =>{
    const filteredEmployees = this.state.employees.filter(employee => employee.department.toLowerCase().indexOf(userInput.toLowerCase()) > -1)
    this.setState({
      filteredEmployees,
      //filteredEmployeesTotal: filteredEmployees.length
    });
  }

  render() {
    const {loading, filteredEmployees, error} = this.state;
    return this.props.children({ loading, filteredEmployees, error });
  }
}
