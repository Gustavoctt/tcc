import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useAuth } from './contexts/auth';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';

function Routes() {
    const { signed } = useAuth();

    if (signed) {
        return (
            <BrowserRouter>
                <Route path="/" exact component={Dashboard}/>
            </BrowserRouter>
        );
    } else{
        return (
            <BrowserRouter>
                <Route path="/" exact component={SignIn}/>
            </BrowserRouter>
        );
    }
}

export default Routes;