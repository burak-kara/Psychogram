import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../_session';
import * as ROUTES from '../_constants/routeConstants';
import * as ROLES from '../_constants/roles';
import SignOut from './signPages/sign-out/SignOut';
import logo from '../assets/logo/logo.jpg';
import { MenuItem, ListItemIcon, Menu } from '@material-ui/core';
import { FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { IoIosMore } from 'react-icons/io';
import { IconContext } from 'react-icons';

const Navigation = () => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? (
                <>
                    <NavigationAuth authUser={authUser} />
                </>
            ) : null
        }
    </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <nav className="navbar navbar-expand-lg navigator">
            <a className="navbar-brand" href="/">
                <img src={logo} width="50" height="50" alt="" />
            </a>
            {/* TODO  button doesnt work import bootstrap js also add redux as dependency*/}
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link " href={ROUTES.LANDING}>
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={ROUTES.CONTACT}>
                            Contact
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={ROUTES.FORUM}>
                            Forum
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={ROUTES.ABOUT_US}>
                            About Us
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={ROUTES.PATIENT_MEETING}>
                            Meetings
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav dots">
                    <IconContext.Provider
                        value={{ color: 'white', size: '2em' }}
                    >
                        <div>
                            <IoIosMore onClick={handleClick} />
                        </div>
                    </IconContext.Provider>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <MenuItem>
                            {authUser &&
                            authUser.roles[ROLES.ADMIN] &&
                            authUser.roles[ROLES.ADMIN] === ROLES.ADMIN ? (
                                <>
                                    <ListItemIcon>
                                        <FaUserAlt fontSize="small" />
                                    </ListItemIcon>
                                    <li>
                                        <Link to={ROUTES.PROFILE}>Profile</Link>
                                    </li>
                                </>
                            ) : null}
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <FaSignOutAlt fontSize="small" />
                            </ListItemIcon>
                            <li>
                                <SignOut />
                            </li>
                        </MenuItem>
                    </Menu>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
