import React from 'react';
import { Switch } from 'react-router-dom'
import Route from './Route'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SingUp'
import Dashboard from '../pages/Dashboard'


const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route path="/signUp" component={SignUp} />

    <Route path="/dash" component={Dashboard} isPrivate />

  </Switch>
)

export default Routes;
