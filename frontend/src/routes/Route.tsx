import React from 'react';
import { RouteProps as ReactDOMRouteProps, Route as ReactDOMRoute, Redirect } from 'react-router-dom'

// import { Container } from './styles';

import { useAuth } from '../hooks/AuthContext'

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean,
  component: React.ComponentType
}


/*
Possiveis casos

Private | Autheticated

true/true - ok
true/false - redirect (/)
false/true - redirect (dash)
false/false - ok
*/


const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth()

  return (
    <ReactDOMRoute
      {...rest}
      render={
        ({ location }) => {
          return isPrivate === !!user ? (
            <Component />
          ) : (
            <Redirect to={{ pathname: isPrivate ? '/' : '/dash', state: { from: location } }} />
          )
        }
      } />
  )
}

export default Route;
