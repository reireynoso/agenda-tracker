import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './components/App'
import './styles/styles.scss'
import 'normalize.css/normalize.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import createStore from './store/redux-store'
import database from './firebase/firebase'
const theme = createMuiTheme({
    palette:{
        type:"dark"
    }
})

database.ref().set({
    "name": "Rei Reynoso",
    age: 29,
    isSingle: false,
    location: {
        city: "Jersey City"
    }
})

const store = createStore()
// const template = React.createElement('p', {}, "Hello from React")
// const template = <p>Heosss from React</p>

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Provider store={store}>
            <App/> 
        </Provider>
    </ThemeProvider>,    
    document.getElementById('root')
)