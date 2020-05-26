import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import AuthUserContext from './context';
import { withFirebase } from '../_firebase';
import * as ROUTES from '../_constants/routeConstants';

const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.onAuthUserListener(
                authUser => {
                    if (!condition(authUser)) {
                        this.props.history.push(ROUTES.UNAUTHORIZED);
                    }
                },
                () => this.props.history.push(ROUTES.UNAUTHORIZED)
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser =>
                        condition(authUser) ? (
                            <Component {...this.props} authUser={authUser} />
                        ) : null
                    }
                </AuthUserContext.Consumer>
            );
        }
    }

    return compose(withRouter, withFirebase)(WithAuthorization);
};

export default withAuthorization;
