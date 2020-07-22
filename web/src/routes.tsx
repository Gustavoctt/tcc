import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Inicio from './pages/Inicio';

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={Home} path="/" exact/>
            <Route component={Cadastro} path="/users" exact/>
            <Route component={Inicio} path="/admin" exact/>
        </BrowserRouter>
    )
}

export default Routes;