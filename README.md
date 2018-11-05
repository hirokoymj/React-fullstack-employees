# React.js Pagination

### Live Demo
- Basic 
https://pure-basin-86913.herokuapp.com/

- Advanced
  https://pure-basin-86913.herokuapp.com/users
  

### Installing Pagination
- [react-js-pagination](https://www.npmjs.com/package/react-js-pagination)

```js
npm install react-js-pagination
```

### Code sample
```js
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
  // 1) onClick method of Pagination
  // 2) pageNumber that user clicked sets automatically in parameter. 
  //    So you won't need to increment/decrement the page number.
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

```



### Related topic
**Import .json file into MongoDB**

```js
mongoimport --db chicago --collection employees --drop --file data2.json --jsonArray
mongoimport -h ds151383.mlab.com:51383 -d heroku_bdn1hn0b -c employees -u root -p root123 --file src/server/data/data2.json

```

**How to detect an object is empty.**
```js
const obj = {}
console.log(Object.getOwnPropertyNames(obj).length === 0); //true
```

**Node/Express.js RESTful API - GET**
```js
router.get('/', (req, res)=>{
  let pageSize = 100;
  let pageNumber = (Object.getOwnPropertyNames(req.query).length===0) ? 1 : req.query.page
  Employee
    .find()
    .sort({id: 1})
    .skip((pageNumber-1) * pageSize) //pagination for mongoose
    .limit(pageSize)
    .exec((err, employees)=>{
      if(err) return res.send(err);
        res.json(employees);
      })
  }
);
```

**Node/Express.js - rounter configuration in both back-end and client**
- src/server/index.js

```js
// RESTful API router
app.use('/api/employees', employees);

// Client router
// If you want to get the content /users, index.html has to call first to download all JS resources.
app.get('/*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});
```