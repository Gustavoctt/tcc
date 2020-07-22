import React, {useState} from 'react';
import { FiArrowLeftCircle } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

const Cadastro = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = ({
            name,
            email,
            password
        });

        try {
            await api.post('users', data);
            
            alert('Cadastro realizado com sucesso');

            history.push('/');
        } catch (error) {
            alert('Erro no cadastro, tente novamente')
        }
    }

    return(
        <div className="cadastro-container">
            <div className="container">
                <section>
                    <h1>Cadastro</h1>
                    <p>Faça o cadastro na plataforma para ter acesso</p>

                    <Link className="back-link" to="/">
                        <span>
                            <FiArrowLeftCircle />
                        </span>
                        Já tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome completo"
                        id={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="Email"
                        id={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Senha"
                        id={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button className="button" type="submit">
                        <strong>Cadastrar</strong>
                    </button>
                </form>

            </div>
        </div>
    )
}

export default Cadastro;