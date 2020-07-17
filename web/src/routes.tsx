import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={Home} path="/" exact/>
            <Route component={Login} path="/login" exact/>
            <Route component={Cadastro} path="/cadastro" exact/>
        </BrowserRouter>
    )
}

export default Routes;