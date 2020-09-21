import React, {useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router'

import App from '../components/App'
import LoginPage from '../components/LoginPage'

import {firebase} from '../firebase/firebase';
import {login, logout} from '../actions/auth';
import {startSetData} from '../actions/todosAction';

import PrivateRoute from './PrivateRoute';

const AppRouter = ({history}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                const uid = user.uid
                dispatch(login(uid))
                dispatch(startSetData())
                .then(() => {
                    // console.log(history.location)
                    if(history.location.pathname === "/"){
                        history.push('/dashboard')      
                    }
                })
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