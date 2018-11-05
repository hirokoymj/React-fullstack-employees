import React, {Component} from 'react';
import Pagination from "react-js-pagination";

export default class FetchUsers extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      error: null,
      activePage: 1
    };
  }

  componentDidMount(){
    this.getUserData(1);
  }

  getUserData = (page) =>{
    fetch(`/api/employees?page=${page}`)
      .then(res =>res.json())
      .then(data =>{
        console.log(data)
        this.setState({
          users: data,
          activePage: page
        }) 
      })
      .catch(error=>this.setState({error: "ERROR"}))    
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.getUserData(pageNumber);
  }

  render() {
    const {users, error} = this.state;
    return (
      <div>
      <Pagination
        activePage={this.state.activePage}
        itemsCountPerPage={100}
        totalItemsCount={500}
        pageRangeDisplayed={10}
        onChange={this.handlePageChange}
      /> 
      {
        users.map((u, index)=>
          <div key={u.name+index}>{u.id}, {u.name}</div>
          )
      }
     
      </div>
    )
  }
}
