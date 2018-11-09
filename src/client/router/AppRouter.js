import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage';
import DashboardPage from '../components/DashboardPage';
import EmployeeForm from '../components/EmployeeForm';
import FetchSingleEmployeePage from '../components/FetchSingleEmployeePage';
import Header from '../components/Header';
import 'react-toastify/dist/ReactToastify.css';


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
      <Route path="/" component={DashboardPage} exact={true} />
      <Route path="/employees/:id" component={FetchSingleEmployeePage}  />
      <Route path="/form" component={EmployeeForm}  />
      <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;