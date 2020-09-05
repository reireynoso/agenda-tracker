import {createStore, applyMiddleware,compose} from 'redux'
import todosReducer from '../reducers/todosReducer'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25
}) : compose;

export default () => {
    const store = createStore(
        todosReducer,
        composeEnhancers(applyMiddleware(thunk))
    )
    return store
}