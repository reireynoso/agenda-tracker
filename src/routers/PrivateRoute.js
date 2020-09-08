import React from 'react';
import {useSelector} from 'react-redux'
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    const isAuthenticated = useSelector(state => state.auth.uid)
    return (
        <Route
            {...rest} component={(props) => (
                isAuthenticated ? (
                    <Component {...props}/>
                )
                :(
                    <Redirect to="/"/>
                )
            )}
        />
    )
}

export default PrivateRoute