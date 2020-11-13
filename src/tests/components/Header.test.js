import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import renderer from 'react-test-renderer'
import {Header} from '../../components/Header'
import configureMockStore from 'redux-mock-store'
import {render} from 'enzyme'

const createMockStore = configureMockStore()
const component = <Provider store={createMockStore({
    todosReducer: {
        columns: {

        }
    }
})}>   
        <Header/>    
</Provider>

test("Render Header page", () => {  
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot()
})

test("Finds main container element", () => {
    const wrapper = render(component)
    const element = wrapper.html();
    expect(element).toContain('header')
})

test("Find button and click", () => {
    const wrapper = render(component)
    const element = wrapper.find("#header__logout")
    expect(element).toHaveLength(1)
})