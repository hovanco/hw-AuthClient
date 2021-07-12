import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import React, { FC, lazy } from 'react';
import { NotFound } from '../../components';
import HeaderPage from './pages/header-page';

const Signin = lazy(() => import('./pages/sign-in'));
const Signup = lazy(() => import('./pages/sign-up'));
const ForgotPassword = lazy(() => import('./pages/forgot-password'));
const ResetPassword = lazy(() => import('./pages/reset-password'));

const Auth: FC = () => {
    const match = useRouteMatch();

    return (
        <>
            <HeaderPage />
            <Switch>
                <Route component={Signin} path={`${match.url}login`} />
                <Route component={Signup} path={`${match.url}sign-up`} />
                <Route
                    component={ForgotPassword}
                    path={`${match.url}forgot-password`}
                />
                <Route
                    component={ResetPassword}
                    path={`${match.url}reset-password`}
                />
                <Redirect exact from={match.url} to={`${match.url}login`} />
                <Route component={NotFound} />
            </Switch>
        </>
    );
};

export default Auth;
