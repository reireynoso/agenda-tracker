import {createStore, applyMiddleware,compose, combineReducers} from 'redux'
import todosReducer from '../reducers/todosReducer'
import auth from '../reducers/auth'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25
}) : compose;

export default () => {
    const store = createStore(
        combineReducers({
            todosReducer,
            auth
        }),
        composeEnhancers(applyMiddleware(thunk))
    )
    return store
}