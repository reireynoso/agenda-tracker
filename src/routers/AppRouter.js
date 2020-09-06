import React, {useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router'

import App from '../components/App'
import LoginPage from '../components/LoginPage'

import {firebase} from '../firebase/firebase';
import {login, logout} from '../actions/auth';

import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute'

const AppRouter = ({history}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                dispatch(login(user.uid))
                // dispatch().then(() => {
                    // console.log(history.location)
                    if(history.location.pathname === "/"){
                        history.push('/dashboard')
                
                    }
                // })
            }else{
                dispatch(logout())
                history.push('/')
            }
        })
        return () => {
            // cleanup firebase auth?
        }
    }, [])
       
    return (
        <div>
            <Switch>
                <Route path="/" component={LoginPage} exact/>
                <PrivateRoute path="/dashboard" component={App}/>
            </Switch>
        </div>
    )
}


export default withRouter(AppRouter)