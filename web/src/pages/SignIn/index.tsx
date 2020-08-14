import React, { FormEvent } from 'react';

import './styles.css';
import Input from '../../components/Input';

//import {signIn} from '../../services/auth';
import {useAuth} from '../../contexts/auth';
import { FiLogIn } from 'react-icons/fi';

const SignIn: React.FC = () => {
    const {signIn} = useAuth();

    async function handleSign(e: FormEvent){
        e.preventDefault();

        signIn();
    }

  return (
      <div id="page-signin">
            <div className="component-left">
                <p>Left</p>
            </div>
            <div className="component-rigth">
                <form>
                    <Input name="Email"/>
                    <input 
                        type="email" 
                        placeholder="Email"
                    />
                    <input 
                        type="password" 
                        placeholder="Senha"
                    />
                        <div className="button-acess">
                            <button 
                                onClick={handleSign}
                            >
                            <span>
                                <FiLogIn/>
                            </span>
                                <strong>Acessar</strong>
                            </button>
                        </div>
                </form>
            </div>
      </div>
    );
}

export default SignIn;