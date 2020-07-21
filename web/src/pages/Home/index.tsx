import React from 'react';
import { FiLogIn, FiArrowRight } from 'react-icons/fi';
import {Link} from 'react-router-dom';

import './styles.css';

const Home = () => {
    return(
        <div id="page-home">
            <div className="content">
            <main>
                <h1>Divulgue o seu negócio em Orleans</h1>
                <p>E consiga muito mais clientes</p>

                <div id="button-acess">
                    <Link to="/login">
                        <span>
                            <FiLogIn/>
                        </span>
                        <strong>Acessar</strong>
                    </Link>
                </div>

                <div id="button-cadastro">
                    <Link to="/cadastro">
                        <span>
                            <FiArrowRight/>
                        </span>
                        <strong>Criar nova conta</strong>
                    </Link>
                </div>
            </main>
            </div>
        </div>
    )
}

export default Home;