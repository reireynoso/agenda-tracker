import React from 'react';
import {shallow} from 'enzyme'
import renderer from 'react-test-renderer'
import {LoginPage} from '../../components/LoginPage'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'

test("Render Login page", () => {
    const mockStore = configureStore();
    let store = mockStore({})
    const component = <Provider store={store}>
        <LoginPage/>
    </Provider>
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot()
})