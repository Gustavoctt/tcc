import React, { FormEvent } from 'react';

import './styles.css';
import Input from '../../components/Input';

//import {signIn} from '../../services/auth';
import {useAuth} from '../../contexts/auth';
import { FiLogIn, FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {
    const {signIn} = useAuth();

    async function handleSign(e: FormEvent){
        e.preventDefault();

        signIn();
    }

  return (
      <div id="page-signin">
            <div className="component-left">
                <div className="component-text">
                    <div className="text-primary">
                        <p>Sua plataforma de divulgação de negócios</p>
                    </div>
                    <div className="text-secondary">
                        <p>Faça o cadastro e atraia ainda mais turistas!</p>
                    </div>
                </div>
            </div>
            <div className="component-rigth">
                <form>
                    <p className="text-form">
                        Insira seu email e senha para ter acesso a plataforma.
                    </p>
                    <Input name="Email" label="E-mail"/>
                    <Input name="password" label="Senha"/>
                        <div className="button-acess">
                            <button 
                                onClick={handleSign}
                            >
                            <span>
                                <FiLogIn/>
                            </span>
                                <p>Acessar</p>
                            </button>
                        </div>
                        <div className="cad-acess">
                            <span>
                                <FiPlusCircle/>
                            </span>
                                <Link to="">
                                    <p>Se você é novo por aqui, faça o seu cadastro!</p>
                                </Link>
                        </div>
                </form>
            </div>
      </div>
    );
}

export default SignIn;