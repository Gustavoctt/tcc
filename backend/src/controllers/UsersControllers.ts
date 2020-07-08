import { Request, Response, request, response } from 'express';
import knex from '../database/connection';
import bcrypt from 'bcryptjs';

class UsersController{
    async create( request: Request, response: Response ){
        const {
            name,
            email,
            password
        } = request.body;
    
        //const trx = await knex.transaction();
        
        const passwordHash = bcrypt.hashSync(password);

        const user = {
            name,
            email,
            passwordHash
        }

        const insertUsers = await knex('users').insert(user);
        
        const user_id = insertUsers[0];
    
        return response.json({
            id: user_id,
            password,
            ...user
         });
    }

    async index(request: Request, response: Response){
        const users = await knex('users').select('*');
       

        return response.json({
            users  
        });
    }
};

export default UsersController;