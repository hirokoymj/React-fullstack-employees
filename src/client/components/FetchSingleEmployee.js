import React, {Component} from 'react';

export default class FetchSingleEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      employeeData: {},
      error: null,
    };
  }
  componentDidMount() {
    this.getEmployeeData(this.props.id);
  }

  componentDidUpdate(prevProps){
    //console.log(`${prevProps.id}-${this.props.id}`);
    if(prevProps.id !== this.props.id){
      this.getEmployeeData(this.props.id);
    }
  }

  getEmployeeData(id){
    this.setState({ loading: true}, ()=>{
      fetch(`/api/employees/${id}`)
        .then(response => response.json())
        .then(employees => {
          if(employees.length===0){ // When it returns an emply array [] - no data found.
            this.setState({
              error: "No data found",
              loading: false
            })
          }else{
            this.setState({
              employeeData: employees[0],
              loading: false
            });
          }

        })
        .catch(error => this.setState({ error, loading: false })); 
    });    
  }

  render() {
    const {loading, employeeData, error} = this.state;
    return this.props.children({ loading, employeeData, error });
  }
}

