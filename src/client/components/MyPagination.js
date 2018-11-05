import React, {Component} from 'react';
import Pagination from "react-js-pagination";
const users = [
 {id: 1, name: "AARON,  ELVIA J"},
 {id: 2, name: "AARON,  JEFFERY M"},
 {id: 3, name: "AARON,  KARINA"},
 {id: 4, name: "AARON,  KIMBERLEI R"},
 {id: 5, name: "ABAD JR,  VICENTE M"},
 {id: 6, name: "ABARCA,  ANABEL"},
 {id: 7, name: "ABARCA,  EMMANUEL"},
 {id: 8, name: "ABASCAL,  REECE E"},
 {id: 9, name: "ABBASI,  CHRISTOPHER"},
 {id: 10, name: "ABBATACOLA,  ROBERT J"},
];

export default class MyPagination extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      users:users,
      filteredUser: users,
      activePage: 1,
    };
  }

  componentDidMount(){
    this.handlePageChange(1);
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);

    const filteredUser = this.state.users;
    let perPage = 3;
    const start = pageNumber === 1 ? 0 : pageNumber*perPage-perPage;
    const end = start + 3;
    console.log(`${start}, ${end}`);
    const result = filteredUser.slice(start, end);

    this.setState({
      activePage: pageNumber,
      filteredUser:result
    });

  }
  render() {
    return (
      <div>
        <h1>Pagination basic</h1>
        {
          this.state.filteredUser.map((u,index)=>
            <div key={index}>{u.id} - {u.name}</div>
            )
        }
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={3}
          totalItemsCount={10}
          pageRangeDisplayed={10}
          onChange={this.handlePageChange}
        />      
      </div>
    )
  }
}
