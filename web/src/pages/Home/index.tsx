import React, { useState } from 'react';
import { FiLogIn, FiArrowRightCircle } from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

const Home = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        const dados = ({
            email,
            password
        })

        try {
            const response = await api.post('login', dados)

            if(response.status === 200){
                history.push('/admin');
            }else{
                alert('erro')
            }

            
        } catch (err) {
            alert('erro')
        }

    }

    return(
        <div id="page-home">
            <div className="content">
            <main>
                <h1>Divulgue o seu negócio</h1>
                <p>E consiga muito mais clientes</p>

                <form>
                    <div className="field">
                        <input 
                            placeholder="Email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <input 
                            placeholder="Senha"
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div id="button-acess">
                        <button 
                            onClick={handleLogin}
                        >
                        <span>
                            <FiLogIn/>
                        </span>
                            <strong>Acessar</strong>
                        </button>
                    </div>

                        <Link to="/users">
                            <span>
                                <FiArrowRightCircle/>
                            </span>
                            <strong>Criar nova conta</strong>
                        </Link>
                </form>
            </main>
            </div>
        </div>
    )
}

export default Home;