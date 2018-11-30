import React, {Component} from 'react';
import Pagination from "react-js-pagination";
import {Alert} from 'react-bootstrap';

export default class AppPagination extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      totalItemsCount: 0,
      activePage: this.props.activePage,
      error: null
    };
  }

  componentDidMount(){
    fetch('/api/employees/countDocs', {method: "POST"})
      .then((response)=>{
        if (!response.ok) throw Error(response.statusText);
        return response.json();         
      })
      .then((data)=>{
        this.setState({
          totalItemsCount: data.count
        });
      })
      .catch((error)=>{
        this.setState({error});        
      })
  }

  componentDidUpdate(prevProps){
    if(prevProps.activePage !== this.props.activePage){
      console.log('changed active page!!');
      this.setState({
        activePage: this.props.activePage
      });
    }
  }

  render() {
    const {error} = this.state;
    if(error){
      return <Alert bsStyle="danger"><h4>Syste Error:</h4><p> {error.message}</p></Alert>
    }else{
      return (
        <div className="text-center">
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={100}
            totalItemsCount={this.state.totalItemsCount}
            pageRangeDisplayed={10}
            onChange={this.props.handlePageChange} 
            /> 
        </div>
      )      
    }  
  }//end of render()
}
