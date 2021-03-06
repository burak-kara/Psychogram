import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withAuthentication } from '../_session';
import * as ROUTES from '../_constants/routeConstants';
import Profile from '../pages/profile/Profile';
import Home from '../pages/home/Home';
import Login from '../components/signPages/sign-in/SignIn';
import SignUp from '../components/signPages/sign-up/SignUp';
import Contact from '../pages/home/Contact';
import Forum from '../pages/forum/Forum';
import AboutUs from '../pages/aboutus/AboutUs';
import Faq from '../pages/faq/Faq';
import Meetings from '../pages/meetings';
import DoctorList from '../pages/doctor/DoctorList';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AdminPage from '../pages/admin/Admin';
import Reservations from '../pages/reservations';
import TestMeetingCreate from '../pages/testCreateMeeting';
import Rating from '../pages/doctor/Rating';
import ArticleList from '../pages/article/ArticleList';
import NotFound from '../components/httpPages/NotFound';
import Unauthorized from '../components/httpPages/Unauthorized';
import Users from '../pages/admin/Users';
import Notification from '../components/notification';

const App = () => (
    <Router>
        <Navigation />
        <div className="page-container">
            <div className="content-wrap">
                <Switch>
                    <Route exact path={ROUTES.LANDING} component={Home} />
                    <Route path={ROUTES.SIGN_IN} component={Login} />
                    <Route path={ROUTES.SIGN_UP} component={SignUp} />
                    <Route path={ROUTES.PROFILE} component={Profile} />
                    <Route path={ROUTES.CONTACT} component={Contact} />
                    <Route path={ROUTES.FORUM} component={Forum} />
                    <Route path={ROUTES.ABOUT_US} component={AboutUs} />
                    <Route path={ROUTES.FAQ} component={Faq} />
                    <Route path={ROUTES.MEETINGS} component={Meetings} />
                    <Route path={ROUTES.DOCTOR_LIST} component={DoctorList} />
                    <Route
                        path={ROUTES.RESERVATIONS}
                        component={Reservations}
                    />
                    <Route path={ROUTES.RATING} component={Rating} />
                    <Route path={ROUTES.ARTICLES} component={ArticleList} />
                    {/* TODO delete*/}
                    <Route path="/create" component={TestMeetingCreate} />

                    <Route exact path={ROUTES.ADMIN} component={AdminPage} />
                    <Route
                        exact
                        path={ROUTES.ADMIN_PASSWORD}
                        component={AdminPage}
                    />
                    <Route
                        exact
                        path={ROUTES.ADMIN_PATIENTS}
                        component={Users}
                    />
                    <Route
                        exact
                        path={ROUTES.ADMIN_DOCTORS}
                        component={Users}
                    />

                    <Route
                        path={ROUTES.UNAUTHORIZED}
                        component={Unauthorized}
                    />
                    <Route path={ROUTES.NOT_FOUND} component={NotFound} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </div>
            <Footer />
            <Notification />
        </div>
    </Router>
);

export default withAuthentication(App);
