import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import Profile from '../pages/profile/Profile';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import SignUp from '../pages/signup/SignUp';
import Contact from '../pages/home/Contact';
import Forum from '../pages/forum/Forum';
import * as ROUTES from '../constants/routes';
import TestClass from '../pages/firebaseDemo/Test';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="navigator">
                    <ul className="header">
                        <li>
                            <NavLink exact to={ROUTES.LANDING}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.SIGN_IN}>Sign In</NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.SIGN_UP}>Sign Up</NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.PROFILE}>Profile</NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.CONTACT}>Contact</NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.FORUM}>Forum</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/test'}>Test</NavLink>
                        </li>
                    </ul>
                    <div className="content">
                        <Route exact path={ROUTES.LANDING} component={Home} />
                        <Route path={ROUTES.SIGN_IN} component={Login} />
                        <Route path={ROUTES.SIGN_UP} component={SignUp} />
                        <Route path={ROUTES.PROFILE} component={Profile} />
                        <Route path={ROUTES.CONTACT} component={Contact} />
                        <Route path={ROUTES.FORUM} component={Forum} />
                        <Route path={'/test'} component={TestClass} />
                    </div>
                </div>
            </Router>
        );
    }
}
