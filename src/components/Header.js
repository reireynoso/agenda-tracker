import React from 'react';
import {useDispatch} from 'react-redux';
import {withRouter} from 'react-router'
import {startLogout} from '../actions/auth';

export const Header = ({history}) => {
    const dispatch = useDispatch();
    return (
        <header id="header">
            <section className="align-center">
                <span id="header__title">Agenda Tracker</span>
                <button id="header__logout" onClick={
                    () => dispatch(startLogout())
                    // () => history.push('/')
                }>Log Out</button>
            </section>
        </header>
    )
}

export default withRouter(Header)