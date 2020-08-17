import React, { FormEvent, useState } from 'react';
import  {useAuth}  from '../../contexts/auth';

 import './styles.css';
import PageHeader from '../../components/PageHeader';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const { user, signOut } = useAuth();
  
    function handleSignOut() {
      signOut();
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader title="Awesome! You want to give lessons"
            description="The first step is fill this inscription form"/>
        
        
            <main>
                <form>
                    <fieldset>
                        <legend>Your info</legend>

                        
                        
                    </fieldset>

                    <fieldset>
                        <legend>About your lesson</legend>
                        
                       
                        
                    </fieldset>

                    <fieldset>
                        <legend>Available Times
                            <button type="button">
                                + New time
                            </button>
                        </legend>
                        return (
                          <div></div>
                        )
                    
                    </fieldset>

                    <footer>
                        <p>
                            
                        </p>
                        <button type="submit">
                            Register Class
                        </button>
                    </footer>
                </form>
            </main>
        </div>

    )
  };

export default Dashboard;