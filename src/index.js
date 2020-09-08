import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import AppRouter from './routers/AppRouter'
import './styles/styles.scss'
import 'normalize.css/normalize.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import createStore from './store/redux-store'
import database from './firebase/firebase';

const theme = createMuiTheme({
    palette:{
        type:"dark"
    }
})

// database.ref().set({
//     "name": "Rei Reynoso",
//     age: 29,
//     location: {
//         city: "Jersey City"
//     }
// })


const store = createStore()

const jsx = (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Provider store={store}>   
            <Router>
                <AppRouter/>        
            </Router>
        </Provider>
    </ThemeProvider>
)
// const template = React.createElement('p', {}, "Hello from React")
// const template = <p>Heosss from React</p>
// let hasRendered = false;
// const renderApp = () => {
//     if(!hasRendered){
        ReactDOM.render(
            jsx,    
            document.getElementById('root')
        )
//     }
//     hasRendered = true;
// }
