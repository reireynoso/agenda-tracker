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
// import PublicRoute from './PublicRoute'

import database from '../firebase/firebase'

const AppRouter = ({history}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            const uid = user.uid
            if(user){
                dispatch(login(user.uid))
                // const usersRef = database.ref(`users/${uid}`);
                // usersRef.set({
                //     tasks: {
                //         'task-1': {
                //             id: 'task-1',
                //             content: "Take out the garbage"
                //             },
                //         'task-2': {
                //             id: 'task-2',
                //             content: "Watch my favorite show"
                //             },
                //         'task-3': {
                //             id: 'task-3',
                //             content: "Charge my phone"
                //             },
                //         'task-4': {
                //             id: 'task-4',
                //             content: "Cook dinner"
                //             },
                //     },
                //     columns: {
                //         'column-1': {
                //             title: "Unfinished",
                //             taskIds: {
                //                 'task-4': true, 
                //                 'task-2': true, 
                //                 'task-1': true, 
                //                 'task-3': true
                //             }
                //         },
                //         'column-2': {
                //             title: "W.I.P",
                //             taskIds: {

                //             }
                //         },
                //         'column-3': {
                //             title: "Finished",
                //             taskIds: {

                //             }
                //         },
                //     },
                // })
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