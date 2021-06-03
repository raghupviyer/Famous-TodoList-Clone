import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import { AuthContext } from '../../context/Auth'

const PrivateRoute = ({component: RouteComponent, ...rest}) => {
  const currentUser = useContext(AuthContext)
  return (
    // <Route {...rest} render={routeProps => {
    //   currentUser!== null
    //   ?<RouteComponent {...routeProps}/>
    //   :<Redirect to="/login"/>
    // }}/>
    <>
    {currentUser
    ?<Route {...rest} render={routeProps => <RouteComponent {...routeProps} />}/>
    :<Redirect to="/login"/>}
    </>
  )
}

export default PrivateRoute
