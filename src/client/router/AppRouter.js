import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage';
import MyPagination from '../components/MyPagination';
import FetchUsers from '../components/FetchUsers';
import DashboardPage from '../components/DashboardPage';
import Header from '../components/Header';



const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
      <Route path="/" component={DashboardPage} exact={true} />
      <Route path="/mypagination" component={MyPagination}  />
        <Route path="/users" component={FetchUsers} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;