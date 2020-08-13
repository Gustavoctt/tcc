import React from 'react';
import  {useAuth}  from '../../contexts/auth';

 import './styles.css';

const Dashboard: React.FC = () => {
    const { user, signOut } = useAuth();
  
    function handleSignOut() {
      signOut();
    }
  
    return (
      <div className="container">
          <p>Dashboard</p>
            <button onClick={handleSignOut}>signOut</button>
        </div>
    );
  };

export default Dashboard;