import React, {Component} from 'react';
import Pagination from "react-js-pagination";

export default class AppPagination extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      totalItemsCount: 0
    };
  }

  componentDidMount(){
    fetch('/api/employees/countDocs', {method: "POST"})
      .then(res=>res.json())
      .then((data)=>{
        console.log(data.count);
        this.setState({
          totalItemsCount: data.count
        });
      }, (error)=>{
        console.log(error);
      });
  }

  render() {
    return (
      <div className="text-center">
        <Pagination
          activePage={this.props.activePage}
          itemsCountPerPage={100}
          totalItemsCount={this.state.totalItemsCount}
          pageRangeDisplayed={10}
          onChange={this.props.handlePageChange} 
          className="margin-bottom-5"
          /> 
      </div>
    )
  }
}
