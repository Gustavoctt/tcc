import React, { FormEvent } from 'react';

import './styles.css';

//import {signIn} from '../../services/auth';
import {useAuth} from '../../contexts/auth';

const SignIn: React.FC = () => {
    const {signIn, signed} = useAuth();

    console.log(signed);

    async function handleSign(e: FormEvent){
        e.preventDefault();

        signIn();

        console.log(signed);
    }

  return (
        <div className="container">
            <button onClick={handleSign}>SignIn</button>
        </div>
    );
}

export default SignIn;