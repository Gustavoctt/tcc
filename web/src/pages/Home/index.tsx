import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logoProvisorio from '../../assets/image-principal.svg'

import './styles.css';

const Home = () => {
    return(
        <div id="page-home">
            <div className="content">
                <header>
                   <img src={logoProvisorio} alt="Logo"/>
                </header>

                <main>
                    <h1>Turismo Orleans</h1>
                    <p>
                        Caso você queira divulgar seu local, cadastre-se.
                    </p>

                    <Link to="/create-point">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Cadastre seu ponto</strong>
                    </Link>
                </main>
            </div>
        </div>
    );
};

export default Home;