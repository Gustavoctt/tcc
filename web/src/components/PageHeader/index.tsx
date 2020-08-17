import React from 'react';
import { FiLogOut } from 'react-icons/fi';

import './styles.css';
import { useAuth } from '../../contexts/auth';

interface PageHeaderProps{
    title: string;
    description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    const { user, signOut } = useAuth();
  
    function handleSignOut() {
      signOut();
    }
  return(
      <header className="page-header">
          <div className="top-bar-container">
                  <span>
                    <FiLogOut onClick={handleSignOut}/>
                  </span>
          </div>

          <div className="header-content">
                <strong>{props.title}</strong>
                {props.description && <p>{props.description}</p>}

                {props.children}
          </div>
      </header>
  )
}

export default PageHeader;