import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';

const PublicRoute = ({children, ...rest }) => {
    const { isAuth } = useAuthContext();
    
    return (
        <Route {...rest} render={({ location }) => {
            if (isAuth) {
                return <Redirect to={{pathname: '/', state: {from: location}}} />
            }
            return (children)
        }} />
    )
}

export default PublicRoute;