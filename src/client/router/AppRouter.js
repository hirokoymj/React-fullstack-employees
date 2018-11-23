import React from 'react';
import { BrowserRouter, Router, Route, Switch} from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage';
import DashboardPage from '../components/DashboardPage';
import EmployeeForm from '../components/EmployeeForm';
import FetchSingleEmployeePage from '../components/FetchSingleEmployeePage';
import Header from '../components/Header';
import createHistory from 'history/createBrowserHistory';
export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header history={history} />
      <Switch>
        <Route path="/" component={DashboardPage} exact={true} />
        <Route path="/employees/:id" component={FetchSingleEmployeePage}  />
        <Route path="/form" component={EmployeeForm}  />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;