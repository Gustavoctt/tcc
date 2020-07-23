import { Request, Response, request, response } from 'express';
import knex from '../database/connection';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UsersController{
    async create( request: Request, response: Response ){
        const {
            name,
            email,
            password
        } = request.body;
    
        const passwordHash = bcrypt.hashSync(password, 10);

        const user = {
            name,
            email,
            passwordHash
        }
        
        const insertUsers = await knex('users').insert(user);
            
        const user_id = insertUsers[0];

        const token = jwt.sign({ id: user_id }, "secret", { expiresIn: 86400 })
    
        return response.json({
            id: user_id,
            password,
            ...user,
            token
         });
    }

    async returnAll(request: Request, response: Response){
        
        const users = await knex('users').select('*')

        return response.json({ users });
    }

    async login(request: Request, response: Response){

        const {email, password} = request.body;

        console.log(email, password);
        
        const user = await knex('users').where({email}).select('*');
        
        if(user.length > 0){         
            
            if(bcrypt.compareSync(password, user[0].passwordHash)){

                return response.status(200).json({message: 'Entrou'});

            }else{
                
                return response.status(401).json({message: 'Errado'});
            }
        }else{
            return response.status(401).json({message: 'Email Inválido'});
        } 
    }
};

export default UsersController;