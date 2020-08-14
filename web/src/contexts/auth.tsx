import React, { createContext, useState, useEffect, useContext } from "react";
import * as auth from "../services/auth";

import api from '../services/api';

interface User{
    name: string;
    email: string;
}

interface AuthContextData{
    signed: boolean;
    user: User | null;
    signIn(): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    
    useEffect(() => {
        async function loadStorageData(){
            const storageUser = await localStorage.getItem('@Tcc:user');
            const storageToken = await localStorage.getItem('@Tcc:token');
            
            if(storageUser && storageToken){
                setUser(JSON.parse(storageUser));

                api.defaults.headers.Authorization = `Baerer ${storageToken}`;
            }
        }
        
        loadStorageData();
    }, []);
    
    async function signIn(){
        const response = await auth.signIn();
        setUser(response.user);

        api.defaults.headers.Authorization = `Baerer ${response.token}`;

        await localStorage.setItem('@Tcc:user', JSON.stringify(response.user));
        await localStorage.setItem('@Tcc:token', response.token);
    }

    async function signOut(){
        await localStorage.clear();
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{signed: !!user, user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(){
    const context = useContext(AuthContext);
    
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context;
}
