import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import renderer from 'react-test-renderer'
import App from '../../components/App'
import configureMockStore from 'redux-mock-store'

const createMockStore = configureMockStore()
const component = <Provider store={createMockStore({
    todosReducer: {
        columns: {

        }
    }
})}>   
    <Router>
        <App/>        
    </Router>
</Provider>
test("Render App page", () => {  
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot()
})