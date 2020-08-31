import {createStore} from 'redux'
import todosReducer from '../reducers/todosReducer'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//     trace: true,
//     traceLimit: 25
// }) : compose;

export default () => {
    const store = createStore(todosReducer)

    return store
}