import React from 'react';
import renderer from 'react-test-renderer'
import {LoginPage} from '../../components/LoginPage'

test("Render Login page", () => {  
    const tree = renderer.create(<LoginPage/>).toJSON();
    expect(tree).toMatchSnapshot()
})