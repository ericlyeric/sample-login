import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';

const PrivateRoute = ({children, roles, ...rest }) => {
    const { user, isAuth } = useAuthContext();
    
    return (
        <Route {...rest} render={({ location }) => {
            if (!isAuth) {
                return <Redirect to={{pathname: '/login', state: {from: location}}} />
            }
            if (!roles.includes(user.role)) {
                return <Redirect to={{pathname: '/home', state: {from: location}}} />
            }
            return (children)
        }} />
    )
}

export default PrivateRoute;