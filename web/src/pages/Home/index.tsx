import React from 'react';
import { FiLogIn, FiArrowRight } from 'react-icons/fi';
import {Link} from 'react-router-dom';

import './styles.css';

const Home = () => {
    return(
        <div id="page-home">
            <div className="content">
                <header>
                    <h1>Titulo do tcc</h1>
                </header>

                <main>
                    <Link to="/login">
                        <span>
                            <FiLogIn/>
                        </span>
                    </Link>
                    <Link to="/cadastro">
                        <span>
                            <FiArrowRight/>
                        </span>
                    </Link>
                </main>
            </div>
        </div>
    )
}

export default Home;